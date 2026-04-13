from typing import Optional
from fastapi import APIRouter, Depends, Request, HTTPException
from jose import JWTError
from pydantic import BaseModel, EmailStr, field_validator
from datetime import date, datetime, timedelta
from app.database.connection import db
import smtplib
from email.mime.text import MIMEText
import bcrypt
import re
from fastapi.responses import JSONResponse
import jwt  # PyJWT library
from datetime import datetime   # ✅ correct
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
import os
import traceback
from dotenv import load_dotenv
load_dotenv()
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
    provider: Optional[str] = None
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

    # -----------------------------
    # 🔐 OTP Check (PEHLE VERIFY KARO)
    # -----------------------------
    otp_record = await db.otps.find_one({"email": user.email})

    if not otp_record:
        raise HTTPException(
            status_code=400,
            detail={"otp": "OTP not found"}
        )

    if datetime.utcnow() - otp_record["created_at"] > timedelta(minutes=5):
      await db.otps.delete_one({"email": user.email})  # FIXED
      raise HTTPException(
         status_code=400,
         detail={"otp": "OTP expired"}
    )

    if str(otp_record["otp"]) != str(user.otp):
        raise HTTPException(
            status_code=400,
            detail={"otp": "Invalid OTP"}
        )

    # -----------------------------
    # 🔐 Password Check
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
    # 🔥 CASE 1: EMAIL EXISTS
    # -----------------------------
    if existing_email:
        provider = existing_email.get("provider", "local")

        # ✅ GOOGLE USER → UPDATE (SET PASSWORD)
        if provider != "local":

            await db.users.update_one(
                {"email": user.email},
                {
                    "$set": {
                        "password": hashed_password,
                        "provider": "local",  # अब email+password login allowed
                        "username": user.username,
                        "first_name": user.first_name.strip(),
                        "last_name": user.last_name.strip() if user.last_name else None,
                        "gender": user.gender,
                        "date_of_birth": str(user.date_of_birth) if user.date_of_birth else None,
                        "age": user.age,
                        "country": user.country,
                        "state": user.state,
                        "city": user.city,
                    }
                }
            )

            await db.otps.delete_one({"email": user.email})

            return {
                "success": True,
                "message": "Password set successfully. You can now login with email & password."
            }

        # ❌ NORMAL USER
        raise HTTPException(
            status_code=400,
            detail={"email": "Email already exists"}
        )

    # -----------------------------
    # 🔥 CASE 2: NEW USER → CREATE
    # -----------------------------
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

    await db.users.insert_one(new_user)

    await db.otps.delete_one({"email": user.email})

    return {
        "success": True,
        "message": "Signup successful"
    }



# @router.post("/signup")
# async def signup(user: SignupModel):

#     # -----------------------------
#     # 🔍 Check Username
#     # -----------------------------
#     if user.username:
#         existing_username = await db.users.find_one({"username": user.username})
#         if existing_username:
#             raise HTTPException(
#                 status_code=400,
#                 detail={"username": "Username already exists"}
#             )

#     # -----------------------------
#     # 🔍 Check Email
#     # -----------------------------
#     existing_email = await db.users.find_one({"email": user.email})
#     if existing_email:
#         raise HTTPException(
#             status_code=400,
#             detail={"email": "Email already exists"}
#         )
#     # -----------------------------
#     # 🔐 OTP Check
#     # -----------------------------
#     otp_record = await db.otp.find_one({"email": user.email})

#     if not otp_record:
#         raise HTTPException(
#             status_code=400,
#             detail={"otp": "OTP not found"}
#         )

#     # OTP expiry (5 min)
#     if datetime.utcnow() - otp_record["created_at"] > timedelta(minutes=5):
#         await db.otp.delete_one({"email": user.email})  # cleanup
#         raise HTTPException(
#             status_code=400,
#             detail={"otp": "OTP expired"}
#         )

#     # OTP match
#     if otp_record["otp"] != user.otp:
#         raise HTTPException(
#             status_code=400,
#             detail={"otp": "Invalid OTP"}
#         )

#     # -----------------------------
#     # 🔐 Password Hash
#     # -----------------------------
#     if not user.password:
#         raise HTTPException(
#             status_code=400,
#             detail={"password": "Password required"}
#         )

#     hashed_password = bcrypt.hashpw(
#         user.password.encode(),
#         bcrypt.gensalt()
#     ).decode("utf-8")

#     # -----------------------------
#     # 💾 Save User
#     # -----------------------------
#     new_user = {
#         "first_name": user.first_name.strip(),
#         "last_name": user.last_name.strip() if user.last_name else None,
#         "username": user.username,
#         "email": user.email,
#         "gender": user.gender,
#         "date_of_birth": str(user.date_of_birth) if user.date_of_birth else None,
#         "age": user.age,
#         "country": user.country,
#         "state": user.state,
#         "city": user.city,
#         "password": hashed_password,
#         "created_at": datetime.utcnow()
#     }

#     await db.users.insert_one(new_user)

#     # -----------------------------
#     # 🧹 Delete OTP after success
#     # -----------------------------
#     await db.otp.delete_one({"email": user.email})

#     return {
#         "success": True,
#         "message": "Signup successful"
#     }

# @router.post("/signup")
# async def signup(user: SignupModel):

#     # -----------------------------
#     # 🔍 Check Username
#     # -----------------------------
#     if user.username:
#         existing_username = await db.users.find_one({"username": user.username})
#         if existing_username:
#             raise HTTPException(
#                 status_code=400,
#                 detail={"username": "Username already exists"}
#             )

#     # -----------------------------
#     # 🔍 Check Email + Provider Logic
#     # -----------------------------
#     existing_email = await db.users.find_one({"email": user.email})

#     if existing_email:
#         provider = existing_email.get("provider", "local")

#         # 🔥 If user already registered via Google
#         if provider != "local":
#             raise HTTPException(
#                 status_code=400,
#                 detail={
#                     "email": f"This email is registered with {provider}. Please login using {provider.capitalize()}."
#                 }
#             )

#         # 🔥 If already normal user
#         raise HTTPException(
#             status_code=400,
#             detail={"email": "Email already exists"}
#         )

#     # -----------------------------
#     # 🔐 OTP Check
#     # -----------------------------
#     otp_record = await db.otp.find_one({"email": user.email})

#     if not otp_record:
#         raise HTTPException(
#             status_code=400,
#             detail={"otp": "OTP not found"}
#         )

#     # OTP expiry (5 min)
#     if datetime.utcnow() - otp_record["created_at"] > timedelta(minutes=5):
#         await db.otp.delete_one({"email": user.email})
#         raise HTTPException(
#             status_code=400,
#             detail={"otp": "OTP expired"}
#         )

#     # OTP match
#     if otp_record["otp"] != user.otp:
#         raise HTTPException(
#             status_code=400,
#             detail={"otp": "Invalid OTP"}
#         )

#     # -----------------------------
#     # 🔐 Password Hash
#     # -----------------------------
#     if not user.password:
#         raise HTTPException(
#             status_code=400,
#             detail={"password": "Password required"}
#         )

#     hashed_password = bcrypt.hashpw(
#         user.password.encode(),
#         bcrypt.gensalt()
#     ).decode("utf-8")

#     # -----------------------------
#     # 💾 Save User
#     # -----------------------------
#     new_user = {
#         "first_name": user.first_name.strip(),
#         "last_name": user.last_name.strip() if user.last_name else None,
#         "username": user.username,
#         "email": user.email,
#         "gender": user.gender,
#         "date_of_birth": str(user.date_of_birth) if user.date_of_birth else None,
#         "age": user.age,
#         "country": user.country,
#         "state": user.state,
#         "city": user.city,
#         "password": hashed_password,
#         "provider": "local",  # 🔥 IMPORTANT
#         "created_at": datetime.utcnow()
#     }

#     await db.users.insert_one(new_user)

#     # -----------------------------
#     # 🧹 Delete OTP after success
#     # -----------------------------
#     await db.otp.delete_one({"email": user.email})

#     return {
#         "success": True,
#         "message": "Signup successful"
#     }

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


# @router.post("/send-otp")
# async def send_otp(data: OTPRequest):
#     email = data.email
#     otp = data.otp

#     print("Received OTP request:", email, otp)

#     try:
#         # -----------------------------
#         # 📧 Email Setup
#         # -----------------------------
#         sender_email = "rajritik.9236@gmail.com"
#         sender_password = "dhhumufaemzaoyjo"

#         msg = MIMEText(f"Your OTP code is {otp}")
#         msg["Subject"] = "Your OTP Code"
#         msg["From"] = sender_email
#         msg["To"] = email

#         # -----------------------------
#         # 🔐 SMTP Connection
#         # -----------------------------
#         server = smtplib.SMTP("smtp.gmail.com", 587)
#         server.starttls()
#         server.login(sender_email, sender_password)
#         server.send_message(msg)
#         server.quit()

#         # -----------------------------
#         # 💾 Save OTP in DB
#         # -----------------------------

#         await db.otp.insert_one({
#               "email": email,
#                "otp": otp,
#                "created_at": datetime.utcnow()
#             })

#         return {"message": "OTP sent successfully"}

#     except Exception as e:
#         print("Error:", str(e))
#         raise HTTPException(status_code=500, detail="Failed to send OTP")
    


# -----------------------------
# 📦 Request Model
# -----------------------------

# -----------------------------
# 📧 Send OTP Route
# -----------------------------











# @router.post("/send-otp")
# async def send_otp(data: OTPRequest):
#     email = data.email
#     otp = data.otp

#     print("📩 Request:", email, otp)

#     try:
#         # -----------------------------
#         # 🔐 ENV VARIABLES
#         # -----------------------------
#         sender_email = os.getenv("EMAIL")
#         sender_password = os.getenv("PASSWORD")

#         if not sender_email or not sender_password:
#             raise Exception("Email or Password not set in environment variables")

#         # -----------------------------
#         # 📧 Email Content
#         # -----------------------------
#         msg = MIMEText(f"Your OTP code is {otp}")
#         msg["Subject"] = "Your OTP Code"
#         msg["From"] = sender_email
#         msg["To"] = email

#         # -----------------------------
#         # 🔌 SMTP Connection
#         # -----------------------------
#         print("🔌 Connecting to SMTP...")
#         server = smtplib.SMTP("smtp.gmail.com", 587, timeout=10)
#         server.starttls()

#         print("🔐 Logging in...")
#         server.login(sender_email, sender_password)

#         print("📤 Sending email...")
#         server.send_message(msg)

#         server.quit()
#         print("✅ Email sent successfully")

#         # -----------------------------
#         # 💾 Save OTP (MongoDB)
#         # -----------------------------
#         from app.database import db  # adjust path if needed

#         await db.otp.insert_one({
#             "email": email,
#             "otp": otp,
#             "created_at": datetime.utcnow()
#         })

#         return {"success": True, "message": "OTP sent successfully"}

#     except Exception as e:
#         print("🔥 ERROR:", str(e))
#         traceback.print_exc()
#         raise HTTPException(
#             status_code=500,
#             detail=str(e)   # 👈 now real error will show
#         )

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

# @router.get("/profile/home")
# async def profile(user=Depends(verify_token)):
#     return {
#         "success": True,
#         "user": serialize_user(user)  # 🔥 important
#     }





# from fastapi import APIRouter, Request
# from ..Service.oauth_service import oauth
# from app.controllers.auth_controller import handle_login


# # ================= GOOGLE =================
# @router.get("/auth/google")
# async def google_login(request: Request):
#     redirect_uri = request.url_for("google_callback")
#     return await oauth.google.authorize_redirect(request, redirect_uri)

# @router.get("/auth/google/callback")
# async def google_callback(request: Request):
#     token = await oauth.google.authorize_access_token(request)
#     user = token.get("userinfo")
#     return await handle_login("google", user)

# # ================= GITHUB =================
# @router.get("/auth/github")
# async def github_login(request: Request):
#     redirect_uri = request.url_for("github_callback")
#     return await oauth.github.authorize_redirect(request, redirect_uri)

# @router.get("/auth/github/callback")
# async def github_callback(request: Request):
#     token = await oauth.github.authorize_access_token(request)
#     user = await oauth.github.get("user", token=token)
#     return await handle_login("github", user.json())

# # ================= MICROSOFT =================
# @router.get("/auth/microsoft")
# async def microsoft_login(request: Request):
#     redirect_uri = request.url_for("microsoft_callback")
#     return await oauth.microsoft.authorize_redirect(request, redirect_uri)

# @router.get("/auth/microsoft/callback")
# async def microsoft_callback(request: Request):
#     token = await oauth.microsoft.authorize_access_token(request)
#     user = token.get("userinfo")
#     return await handle_login("microsoft", user)


# from fastapi import APIRouter, Request
# from ..Service.oauth_service import oauth
# from app.controllers.auth_controller import handle_login


# # ================= GOOGLE =================
# @router.get("/auth/google")
# async def google_login(request: Request):
#     redirect_uri = request.url_for("google_callback")
#     return await oauth.google.authorize_redirect(request, redirect_uri)


# @router.get("/auth/google/callback")
# async def google_callback(request: Request):
#     token = await oauth.google.authorize_access_token(request)

#     # ✅ FIX: correct way to get user
#     user = await oauth.google.parse_id_token(request, token)

#     return await handle_login("google", user)


# # ================= GITHUB =================
# @router.get("/auth/github")
# async def github_login(request: Request):
#     redirect_uri = request.url_for("github_callback")
#     return await oauth.github.authorize_redirect(request, redirect_uri)


# @router.get("/auth/github/callback")
# async def github_callback(request: Request):
#     token = await oauth.github.authorize_access_token(request)

#     user_resp = await oauth.github.get("user", token=token)
#     user = user_resp.json()

#     return await handle_login("github", user)


# # ================= MICROSOFT =================
# @router.get("/auth/microsoft")
# async def microsoft_login(request: Request):
#     redirect_uri = request.url_for("microsoft_callback")
#     return await oauth.microsoft.authorize_redirect(request, redirect_uri)


# @router.get("/auth/microsoft/callback")
# async def microsoft_callback(request: Request):
#     token = await oauth.microsoft.authorize_access_token(request)

#     # ✅ FIX: same as google
#     user = await oauth.microsoft.parse_id_token(request, token)

#     return await handle_login("microsoft", user)









# from fastapi import APIRouter, Request
# from ..Service.oauth_service import oauth
# from app.controllers.auth_controller import handle_login

# router = APIRouter()

# # ================= GOOGLE =================
# @router.get("/auth/google")
# async def google_login(request: Request):
#     redirect_uri = request.url_for("google_callback")
#     return await oauth.google.authorize_redirect(request, redirect_uri)


# @router.get("/auth/google/callback")
# async def google_callback(request: Request):
#     try:
#         token = await oauth.google.authorize_access_token(request)
#         print("GOOGLE TOKEN:", token)

#         # ✅ BEST FIX (NO id_token parsing)
#         user = token.get("userinfo")

#         if not user:
#             resp = await oauth.google.get(
#                 "https://www.googleapis.com/oauth2/v2/userinfo",
#                 token=token
#             )
#             user = resp.json()

#         return await handle_login("google", user)

#     except Exception as e:
#         print("❌ GOOGLE ERROR:", str(e))
#         return {"error": str(e)}


# # ================= GITHUB =================
# @router.get("/auth/github")
# async def github_login(request: Request):
#     redirect_uri = request.url_for("github_callback")
#     return await oauth.github.authorize_redirect(request, redirect_uri)


# @router.get("/auth/github/callback")
# async def github_callback(request: Request):
#     try:
#         token = await oauth.github.authorize_access_token(request)

#         resp = await oauth.github.get("user", token=token)
#         user = resp.json()

#         return await handle_login("github", user)

#     except Exception as e:
#         print("❌ GITHUB ERROR:", str(e))
#         return {"error": str(e)}


# # ================= MICROSOFT =================
# @router.get("/auth/microsoft")
# async def microsoft_login(request: Request):
#     redirect_uri = request.url_for("microsoft_callback")
#     return await oauth.microsoft.authorize_redirect(request, redirect_uri)


# @router.get("/auth/microsoft/callback")
# async def microsoft_callback(request: Request):
#     try:
#         token = await oauth.microsoft.authorize_access_token(request)
#         print("MICROSOFT TOKEN:", token)

#         user = token.get("userinfo")

#         if not user:
#             resp = await oauth.microsoft.get(
#                 "https://graph.microsoft.com/v1.0/me",
#                 token=token
#             )
#             user = resp.json()

#         return await handle_login("microsoft", user)

#     except Exception as e:
#         print("❌ MICROSOFT ERROR:", str(e))
#         return {"error": str(e)}


from .utils import verify_token
from ..Service.oauth_service import oauth
from app.controllers.auth_controller import handle_login

# ================= PROFILE =================
@router.get("/profile/home")
async def profile(user=Depends(verify_token)):
    return {
        "success": True,
        "user": {
            "email": user.get("email"),
            "first_name": user.get("first_name"),
            "last_name": user.get("last_name"),
            "profilePic": user.get("profilePic"),
            "providers": user.get("providers", []),
            "created_at": str(user.get("created_at"))
        }
    }


# ================= GOOGLE =================
@router.get("/auth/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)

    user = token.get("userinfo")

    if not user:
        resp = await oauth.google.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            token=token
        )
        user = resp.json()

    return await handle_login("google", user)



# ================= MICROSOFT =================
@router.get("/auth/microsoft")
async def microsoft_login(request: Request):
    redirect_uri = request.url_for("microsoft_callback")
    return await oauth.microsoft.authorize_redirect(request, redirect_uri)


@router.get("/auth/microsoft/callback")
async def microsoft_callback(request: Request):
    token = await oauth.microsoft.authorize_access_token(request)

    # Microsoft user info
    resp = await oauth.microsoft.get(
        "https://graph.microsoft.com/v1.0/me",
        token=token
    )
    user = resp.json()

    return await handle_login("microsoft", user)

# ================= GITHUB =================
@router.get("/auth/github")
async def github_login(request: Request):
    redirect_uri = request.url_for("github_callback")
    return await oauth.github.authorize_redirect(request, redirect_uri)


@router.get("/auth/github/callback")
async def github_callback(request: Request):
    token = await oauth.github.authorize_access_token(request)

    # Get user
    resp = await oauth.github.get(
        "https://api.github.com/user",
        token=token
    )
    user = resp.json()

    # Get email (GitHub separate API देता है)
    email_resp = await oauth.github.get(
        "https://api.github.com/user/emails",
        token=token
    )
    emails = email_resp.json()

    primary_email = None
    for e in emails:
        if e.get("primary"):
            primary_email = e.get("email")
            break

    user["email"] = primary_email

    return await handle_login("github", user)