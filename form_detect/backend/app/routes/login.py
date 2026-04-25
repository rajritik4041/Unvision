# from fastapi import APIRouter, Request , Response
# from pydantic import BaseModel, EmailStr
# from app.database.connection import db
# import bcrypt
# from fastapi.responses import JSONResponse
# from dotenv import load_dotenv
# load_dotenv()
# from .utils import create_token
# from app.core.limiter import limiter 

# router = APIRouter()


# class LoginModel(BaseModel):
#     email: EmailStr
#     password: str 

# @router.post("/login")
# async def login(user: LoginModel, response: Response):

#     db_user = await db.users.find_one({"email": user.email})

#     if not db_user:
#         return JSONResponse(status_code=400, content={"message": "Email not found"})

#     if not bcrypt.checkpw(user.password.encode(), db_user["password"].encode()):
#         return JSONResponse(status_code=400, content={"message": "Wrong password"})

#     token = create_token({"email": user.email})
#     print("Login COOKIE:", token)
#     # 🔥 IMPORTANT: same response object use karo
#     response.set_cookie(
#     key="token",
#     value=token,
#     httponly=True,
#     max_age=60*60*24,
#     path="/",
#     samesite="lax",
#     secure=False
# )

#     return {
#         "success": True,
#         "message": "Login successful"
#     }
from fastapi import APIRouter, Response
from pydantic import BaseModel, EmailStr
from app.database.connection import db
import bcrypt
from fastapi.responses import JSONResponse
from app.routes.utils import create_token

router = APIRouter()


class LoginModel(BaseModel):
    email: EmailStr
    password: str


@router.post("/login")
async def login(user: LoginModel, response: Response):

    db_user = await db.users.find_one({"email": user.email})

    if not db_user:
        return JSONResponse(status_code=400, content={"message": "Email not found"})

    if not bcrypt.checkpw(user.password.encode(), db_user["password"].encode()):
        return JSONResponse(status_code=400, content={"message": "Wrong password"})

    token = create_token({"email": user.email})

    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=60*60*24,
        path="/",
        samesite="lax",
        secure=False   # localhost ke liye
    )

    return {"success": True, "token": token}