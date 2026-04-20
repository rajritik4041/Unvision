from typing import Optional
from fastapi import APIRouter, HTTPException 
from authlib.integrations.starlette_client import OAuthError
from pydantic import BaseModel, EmailStr, field_validator
from datetime import date, datetime, timedelta
from app.database.connection import db
import bcrypt
import re
from fastapi.responses import JSONResponse
from datetime import datetime   # ✅ correct
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError





router = APIRouter()

class SignupModel(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    email: EmailStr
    gender: Optional[str] = None
    # Auth
    password: Optional[str] = None
    confirmPassword: Optional[str] = None
    # OAuth
    googleId: Optional[str] = None
    githubId: Optional[str] = None
    microsoftId: Optional[str] = None
    # Profile
    profilePic: Optional[str] = None
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    # Location
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
    # Other
    providers: Optional[str] = None
    token: Optional[str] = None
    otp: str   # ✅ required
    isProfileComplete: bool = False
    createdAt: datetime = datetime.utcnow()


    @field_validator("first_name")
    def validate_first_name(cls, v):
        if not (3 <= len(v) <= 30) or not v.isalpha():
            raise ValueError("Invalid first name")
        return v.strip()

    @field_validator("last_name")
    def validate_last_name(cls, v):
      if v is None:
         return v
      if not (3 <= len(v) <= 15) or not v.isalpha():
         raise ValueError("Invalid last name")
      return v.strip()

    @field_validator("username")
    def validate_username(cls, v):
     if v is None:
        return v   # ✅ handle None

     if not re.match(r'^[a-z0-9_]{8,20}$', v):
        raise ValueError("Invalid username")
     return v

    @field_validator("password")
    def validate_password(cls, v):
    # ✅ Handle None (important for Optional field)
      if v is None:
        return v

    # ✅ Minimum length
      if len(v) < 8:
        raise ValueError("Password too short")

    # ✅ At least 1 uppercase
      if not re.search(r"[A-Z]", v):
        raise ValueError("Must include uppercase letter")

    # ✅ At least 1 lowercase
      if not re.search(r"[a-z]", v):
        raise ValueError("Must include lowercase letter")

    # ✅ At least 1 number
      if not re.search(r"[0-9]", v):
        raise ValueError("Must include number")

     # ✅ At least 1 special character
      if not re.search(r"[!@#$%^&*]", v):
        raise ValueError("Must include special character")
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

    if user.username:
        existing_username = await db.users.find_one({"username": user.username})
        if existing_username:
            raise HTTPException(
                status_code=400,
                detail={"username": "Username already exists"}
            )

    existing_email = await db.users.find_one({"email": user.email})

    otp_record = await db.otps.find_one({"email": user.email})
    print("OTP RECORD:", otp_record)
    if not otp_record:
       raise HTTPException(status_code=400, detail={"otp": "OTP not found"})
    created_time = otp_record.get("createdAt")

    if not created_time:
       raise HTTPException(status_code=400, detail={"otp": "OTP invalid"})

# ⏰ Expiry check
    if datetime.utcnow() - created_time > timedelta(minutes=5):
       raise HTTPException(status_code=400, detail={"otp": "OTP expired"})

# 🔑 OTP match
    if str(otp_record["otp"]) != str(user.otp):
       raise HTTPException(status_code=400, detail={"otp": "Invalid OTP"})

    hashed_password = bcrypt.hashpw(
        user.password.encode(),
        bcrypt.gensalt()
    ).decode("utf-8")

    if existing_email:
        providers = existing_email.get("provider", [])

    # convert to list if string
        if isinstance(providers, str):
            providers = [providers]

    # ✅ agar local already hai → error
        if "local" in providers:
            raise HTTPException(
               status_code=400,
               detail={"email": "Email already exists"}
           )

    # ✅ social login user → allow password set
        await db.users.update_one(
           {"email": user.email},
           {
             "$set": {
                 "password": hashed_password,
                "username": user.username,
                "first_name": user.first_name.strip(),
                "last_name": user.last_name.strip() if user.last_name else None,
                "gender": user.gender,
                "date_of_birth": str(user.date_of_birth) if user.date_of_birth else None,
                "age": user.age,
                "country": user.country,
                "state": user.state,
                "city": user.city,
            },
            "$addToSet": {
                "provider": "local"   # 👈 add local without removing others
            }
          }
      )

        await db.otps.delete_one({"email": user.email})
 
        return {
        "success": True,
        "message": "Password set successfully. You can now login with email & password."
    }

    new_user = {
        "first_name": user.first_name.strip() if user.first_name else None,
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
        "provider": "local",
        "created_at": datetime.utcnow()
    }
    print("DATA RECEIVED:", user.dict())
    print("DATA SAVED:", new_user)
    await db.users.insert_one(new_user)

    await db.otps.delete_one({"email": user.email})

    return {
        "success": True,
        "message": "Signup successful"
    }

