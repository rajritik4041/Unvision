from fastapi import APIRouter, Depends, Request, HTTPException
import bcrypt
from app.database.connection import db
from bson import ObjectId
import re
from datetime import date, datetime, timedelta
from pydantic import BaseModel, EmailStr, field_validator

class ResetNewPasswordModel(BaseModel):
    email: EmailStr
    newpassword: str
    confirmpassword: str 
    oldpassword: str 

class ResetPasswordModel(BaseModel):
    email: EmailStr
    otp: int
    password: str
    confirmPassword: str 

    @field_validator("password")
    def validate_password(cls, v):
    # ✅ Handle None (important for Optional field)
      if v is None:
        return v

      if len(v) < 8:
        raise ValueError("Password too short")

      if not re.search(r"[A-Z]", v):
        raise ValueError("Must include uppercase letter")

      if not re.search(r"[a-z]", v):
        raise ValueError("Must include lowercase letter")

      if not re.search(r"[0-9]", v):
        raise ValueError("Must include number")

      if not re.search(r"[!@#$%^&*]", v):
        raise ValueError("Must include special character")
      return v

    @field_validator("confirmPassword")
    def match_password(cls, v, values):
        if v != values.data.get("password"):
            raise ValueError("Passwords do not match")
        return v



router = APIRouter()


@router.post("/reset-password/{id}")
async def reset_password(id: str,  req: Request):
    body = await req.json()
    password = body.get("password")

    print("ID:", id)
    print("New Password:", password)
    
    hashed_password = bcrypt.hashpw( 
        password.encode(),
        bcrypt.gensalt()
    ).decode("utf-8")
    collection = await db.users.find_one({  "_id": ObjectId(id) })
    print(collection)
    print(collection["email"])

    if not collection:
      return {
        "success": False,
        "message": "Invalid user"
    }
    email  =  collection["email"]
    collection2 = await db.send_links.find_one({"email": email})
    print(collection2)
    # Yaha DB update karna hai
    if not collection2:
      return {
        "success": False,
        "message": "Expire Link"
    }

    updatedata = await db.users.update_one(
    {"_id": ObjectId(id)}, 
    {"$set": {"password": hashed_password}} 
)
    if not updatedata:
        return {
        "success": False,
        "message": "Do not update Password "
    }

    deletecollection = await db.send_links.delete_one({"email" : email})
    if not deletecollection:
        return {
        "success": False,
        "message": "Sorry link  is not  valid "
    }
    return {
       "success" : True  ,
       "message": "Password updated"}

@router.post("/reset-password")
async def reset_password(data: ResetPasswordModel):
    # direct access
    email = data.email
    otp = data.otp
    password = data.password
    confirmPassword = data.confirmPassword
    otp_record = await db.send_otps.find_one({
    "email": email.strip().lower()
    })
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
    if str(otp_record["otp"]) != str(otp):
       raise HTTPException(status_code=400, detail={"otp": "Invalid OTP"})

    hashed_password = bcrypt.hashpw( 
        password.encode(),
        bcrypt.gensalt()
        ).decode("utf-8")
    # print(email . otp , password , confirmPassword)
    print(email, otp, password, confirmPassword)
    if password == confirmPassword:
       updatepassword = await db.users.update_one(
       {"email": email}, 
      {"$set": {"password": hashed_password}} 
       )
    if password != confirmPassword:
         return {
        "success": False,
        "message": "Do not update Password "
    }
    otp_delete = await db.send_otps.delete_one({
    "email": email.strip().lower()
    })
    if not otp_delete :
       return {
          "success": False,
          "message" : ""
       }
    return {"message": "Password updated successfully"}


# http://127.0.0.1:8000/profile/reset-pasword/oldpassword


@router.post("/profile/reset-pasword/oldpassword")
async def reset_password(data: ResetNewPasswordModel):
   email = data.email 
   oldpassword = data.oldpassword
   newpassword = data.newpassword
   confirmpassword = data.confirmpassword
   print(email , oldpassword , newpassword , confirmpassword)
   
   return {
        "success": True,
        "message": "Password updated"
    }