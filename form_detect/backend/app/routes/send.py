from fastapi import APIRouter, Request
from pydantic import BaseModel, EmailStr

class ResetPasswordModel(BaseModel):
    email: EmailStr
    otp: int
    password: str
    confirmPassword: str

router = APIRouter()

@router.post("/reset-password/{id}")
async def reset_password(id: str, req: Request):
    body = await req.json()
    password = body.get("password")

    print("ID:", id)
    print("New Password:", password)

    # Yaha DB update karna hai
    return {"message": "Password updated"}


@router.post("/reset-password")
async def reset_password(data: ResetPasswordModel):
    # direct access
    email = data.email
    otp = data.otp
    password = data.password
    confirmPassword = data.confirmPassword
    # print(email . otp , password , confirmPassword)
    print(email, otp, password, confirmPassword)
    # check password match
    # verify otp (example)
    # hash password (important)
    # update DB

    return {"message": "Password updated successfully"}