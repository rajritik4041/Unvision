from fastapi import APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

@router.post("/logout")
def logout():
    response = JSONResponse(
        content={
            "success": True,
            "message": "Logged out"
        }
    )
    response.delete_cookie(
        key="token",
        path="/",
        samesite="lax",
        secure=False
    )
    response.delete_cookie(
        key="session",
        path="/",
        samesite="lax",
        secure=False
    )
    return response