from fastapi import APIRouter, Response
from datetime import datetime, timedelta

router = APIRouter()

@router.post("/logout")
def logout(response: Response):

    response.set_cookie(
        key="token",
        value="",
        httponly=True,
        expires=0,  # same as new Date(0)
        path="/",
        samesite="lax",
        secure=False  # True in production
    )

    return {
        "success": True,
        "message": "Logged out"
    }