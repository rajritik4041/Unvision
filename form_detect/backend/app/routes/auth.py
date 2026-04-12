from typing import Optional
from fastapi import APIRouter, Depends, Request, HTTPException
from jose import JWTError
from pydantic import BaseModel, EmailStr, field_validator
from datetime import date, datetime, timedelta
from app.database.connection import db
import smtplib
from email.mime.text import MIMEText
from datetime import datetime
import bcrypt
import re
from fastapi.responses import JSONResponse
import jwt  # PyJWT library
from datetime import datetime   # ✅ correct
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

from ..config import ALGORITHM, SECRET_KEY
from .utils import create_token, verify_token
router = APIRouter()

# -----------------------------
#  Schema
# -----------------------------
class LoginModel(BaseModel):
    email: EmailStr
    password: str 


class SignupModel(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    email: EmailStr
    gender: Optional[str] = None
    password: Optional[str] = None
    confirmPassword: Optional[str] = None
    googleId: Optional[str] = None
    githubId: Optional[str] = None
    microsoftId: Optional[str] = None
    isProfileComplete: Optional[bool] = False
    profilePic: Optional[str] = None
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    token: Optional[str] = None
    otp: str   # ✅ ADD THIS (VERY IMPORTANT)

    @field_validator("first_name")
    def validate_first_name(cls, v):
        if not (3 <= len(v) <= 30) or not v.isalpha():
            raise ValueError("Invalid first name")
        return v.strip()

    @field_validator("last_name")
    def validate_last_name(cls, v):
        if not (3 <= len(v) <= 15) or not v.isalpha():
            raise ValueError("Invalid last name")
        return v.strip()

    @field_validator("username")
    def validate_username(cls, v):
        if not re.match(r'^[a-z0-9_]{8,20}$', v):
            raise ValueError("Invalid username")
        return v

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Password too short")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Must include uppercase")
        if not re.search(r"[a-z]", v):
            raise ValueError("Must include lowercase")
        if not re.search(r"[0-9]", v):
            raise ValueError("Must include number")
        if not re.search(r"[!@#$%^&*]", v):
            raise ValueError("Must include special char")
        return v

    @field_validator("confirmPassword")
    def match_password(cls, v, values):
        if v != values.data.get("password"):
            raise ValueError("Passwords do not match")
        return v

    @field_validator("gender")
    def validate_gender(cls, v):
        if v not in ["Male", "Female", "Other"]:
            raise ValueError("Invalid gender")
        return v

    @field_validator("age")
    def validate_age(cls, v, values):
        dob = values.data.get("date_of_birth")
        if dob:
            today = date.today()
            calculated_age = today.year - dob.year - (
                (today.month, today.day) < (dob.month, dob.day)
            )
            if calculated_age != v:
                raise ValueError("Age mismatch")
        return v
    

@router.post("/signup")
async def signup(user: SignupModel):

    # -----------------------------
    # 🔍 Check Username
    # -----------------------------
    if user.username:
        existing_username = await db.users.find_one({"username": user.username})
        if existing_username:
            raise HTTPException(
                status_code=400,
                detail={"username": "Username already exists"}
            )

    # -----------------------------
    # 🔍 Check Email
    # -----------------------------
    existing_email = await db.users.find_one({"email": user.email})
    if existing_email:
        raise HTTPException(
            status_code=400,
            detail={"email": "Email already exists"}
        )
    # -----------------------------
    # 🔐 OTP Check
    # -----------------------------
    otp_record = await db.otp.find_one({"email": user.email})

    if not otp_record:
        raise HTTPException(
            status_code=400,
            detail={"otp": "OTP not found"}
        )

    # OTP expiry (5 min)
    if datetime.utcnow() - otp_record["created_at"] > timedelta(minutes=5):
        await db.otp.delete_one({"email": user.email})  # cleanup
        raise HTTPException(
            status_code=400,
            detail={"otp": "OTP expired"}
        )

    # OTP match
    if otp_record["otp"] != user.otp:
        raise HTTPException(
            status_code=400,
            detail={"otp": "Invalid OTP"}
        )

    # -----------------------------
    # 🔐 Password Hash
    # -----------------------------
    if not user.password:
        raise HTTPException(
            status_code=400,
            detail={"password": "Password required"}
        )

    hashed_password = bcrypt.hashpw(
        user.password.encode(),
        bcrypt.gensalt()
    ).decode("utf-8")

    # -----------------------------
    # 💾 Save User
    # -----------------------------
    new_user = {
        "first_name": user.first_name.strip(),
        "last_name": user.last_name.strip() if user.last_name else None,
        "username": user.username,
        "email": user.email,
        "gender": user.gender,
        "date_of_birth": str(user.date_of_birth) if user.date_of_birth else None,
        "age": user.age,
        "country": user.country,
        "state": user.state,
        "city": user.city,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    }

    await db.users.insert_one(new_user)

    # -----------------------------
    # 🧹 Delete OTP after success
    # -----------------------------
    await db.otp.delete_one({"email": user.email})

    return {
        "success": True,
        "message": "Signup successful"
    }


# @router.post("/signup")
# async def signup(user: SignupModel):

#     # Username check
#     if await db.users.find_one({"username": user.username}):
#         raise HTTPException(400, "Username already exists")

#     # Email check
#     if await db.users.find_one({"email": user.email}):
#         raise HTTPException(400, "Email already exists")
   

#     # OTP check
#     otp_record = await db.otp.find_one({"email": user.email})
#     if not otp_record:
#         raise HTTPException(400, "OTP not found")

#     # ⏱️ OTP expiry (5 min)
#     if datetime.utcnow() - otp_record["created_at"] > timedelta(minutes=5):
#         raise HTTPException(400, "OTP expired")

#     if otp_record["otp"] != user.otp:
#        raise HTTPException(
#           status_code=400,
#           detail={"otp": "Invalid OTP"}
#     )

#     # Hash password
#     hashed_password = bcrypt.hashpw(
#     user.password.encode(),
#     bcrypt.gensalt()
# )
#     # Save user
#     await db.users.insert_one({
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "username": user.username,
#         "email": user.email,
#         "gender": user.gender,
#         "date_of_birth": str(user.date_of_birth),
#         "age": user.age,
#         "country": user.country,
#         "state": user.state,
#         "city": user.city,
#        "password": hashed_password.decode('utf-8'),
#         "created_at": datetime.utcnow()
#     })

#     # Delete OTP
#     await db.otp.delete_one({"email": user.email})

#     return {"success": True, "message": "Signup successful"}


# -----------------------------
#  Send OTP
# -----------------------------

class OTPRequest(BaseModel):
    email: str
    otp: str

    @field_validator("email")
    def validate_email(cls, value):
        if not value or value.strip() == "":
            raise ValueError("Email is required")

        # Strict email regex
        email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(email_regex, value):
            raise ValueError("Invalid email format")

        return value

@router.post("/send-otp")
async def send_otp(data: OTPRequest):
    email = data.email
    otp = data.otp

    print("Received OTP request:", email, otp)

    try:
        # -----------------------------
        # 📧 Email Setup
        # -----------------------------
        sender_email = "rajritik.9236@gmail.com"
        sender_password = "dhhumufaemzaoyjo"

        msg = MIMEText(f"Your OTP code is {otp}")
        msg["Subject"] = "Your OTP Code"
        msg["From"] = sender_email
        msg["To"] = email

        # -----------------------------
        # 🔐 SMTP Connection
        # -----------------------------
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()

        # -----------------------------
        # 💾 Save OTP in DB
        # -----------------------------

        await db.otp.insert_one({
              "email": email,
               "otp": otp,
               "created_at": datetime.utcnow()
            })

        return {"message": "OTP sent successfully"}

    except Exception as e:
        print("Error:", str(e))
        raise HTTPException(status_code=500, detail="Failed to send OTP")
    

# -----------------------------
# Login
# -----------------------------


@router.post("/login")
async def login(user: LoginModel):

    db_user = await db.users.find_one({"email": user.email})

    if not db_user:
        return JSONResponse(
            status_code=400,
            content={"success": False, "message": "Email not found"}
        )

    if not bcrypt.checkpw(user.password.encode(), db_user["password"].encode()):
        return JSONResponse(
            status_code=400,
            content={"success": False, "message": "Wrong password"}
        )

    token = create_token({"email": user.email})

    return {
        "success": True,
        "message": "Login successful",
        "token": token
    }

# -----------------------------
# Profile
# -----------------------------
def serialize_user(user):
    return {
        "_id": str(user.get("_id")) if user.get("_id") else None,
        "first_name": user.get("first_name"),
        "last_name": user.get("last_name"),
        "username": user.get("username"),
        "email": user.get("email"),
        "gender": user.get("gender"),
        "date_of_birth": user.get("date_of_birth"),
        "age": user.get("age"),
        "country": user.get("country"),
        "state": user.get("state"),
        "city": user.get("city"),
        "created_at": str(user.get("created_at")) if user.get("created_at") else None,
    }

@router.get("/profile/home")
async def profile(user=Depends(verify_token)):
    return {
        "success": True,
        "user": serialize_user(user)  # 🔥 important
    }