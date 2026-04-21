from fastapi import APIRouter, Request 
from pydantic import BaseModel, EmailStr
from app.database.connection import db
import bcrypt
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
load_dotenv()
from .utils import create_token
from app.core.limiter import limiter 

router = APIRouter()


class LoginModel(BaseModel):
    email: EmailStr
    password: str 



@router.post("/login")
@limiter.limit("3/minute", error_message="OTP limit cross. Thoda wait karo")
async def login(request: Request, user: LoginModel):

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
