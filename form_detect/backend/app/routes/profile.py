from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status, Request
from pydantic import BaseModel, EmailStr, field_validator
from datetime import date, datetime, timedelta
import os
import shutil
from app.database.connection import db
from typing import Optional
from dotenv import load_dotenv
load_dotenv()
import re
import logging
from .utils import  verify_token
router = APIRouter()


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
        "profilePic": user.get("profilePic"),
        "country": user.get("country"),
        "state": user.get("state"),
        "city": user.get("city"),
        "Bio" : user.get("Bio") ,
        "created_at": str(user.get("created_at")) if user.get("created_at") else None,
    }



# @router.get("/profile/home")
# async def profile(user=Depends(verify_token)):
#     return {
#         "success": True,
#         "user": {
#             "email": user.get("email"),
#             "first_name": user.get("first_name"),
#             "last_name": user.get("last_name"),
#             "profilePic": user.get("profilePic"),
#             "providers": user.get("providers", []),
#             "created_at": str(user.get("created_at"))
#         }
#     }


@router.get("/profile/home")
async def home(user=Depends(verify_token)):
    return {
        "success": True,
        "user": serialize_user(user)
    }

@router.get("/profile/settings/Update")
async def home(user=Depends(verify_token)):
    return {
        "success": True,
        "user": serialize_user(user)
    }

@router.get("/profile/home/contactus")
async def profile(user=Depends(verify_token)):
    return {
        "success": True,
        "user": {
            "email": user.get("email"),
        }
    }

# @router.get("/profile/settings/Update")
# async def profile(user=Depends(verify_token)):
#     return {
#         "success": True,
#         "user": {
#             "email": user.get("email"),
#             "first_name": user.get("first_name"),
#             "last_name": user.get("last_name"),
#             "profilePic":  user.get("profilePic"),
#             "providers": user.get("providers", []),
#             "created_at": str(user.get("createdAt")),
#             "age":user.get("age"),
#             "date_of_birth": user.get("date_of_birth"),
#             "gender": user.get("gender"),
#             "country": user.get("country"),
#             "state": user.get("state"),
#             "city": user.get("city")
#         }
#     }


class UpdateModel(BaseModel):
    first_name: str
    last_name: Optional[str] = None
    username: Optional[str] = None
    email: EmailStr
    gender: Optional[str] = None
    profilePic: Optional[str] = None
    date_of_birth: Optional[date] = None
    age: Optional[int] = None
    country: Optional[str] = None
    state: Optional[str] = None
    city: Optional[str] = None
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

   
    @field_validator("gender")
    def validate_gender(cls, v):
        if v not in ["Male", "Female", "Other"]:
            raise ValueError("Invalid gender")
        return v

    @field_validator("age")
    def validate_age(cls, v, values):
        dob = values.data.get("date_of_birth")

        if v < 18:
            raise ValueError("Age must be at least 18")

        if dob:
            today = date.today()
            calculated_age = today.year - dob.year - (
                 (today.month, today.day) < (dob.month, dob.day)
        )

        if calculated_age != v:
            raise ValueError("Age mismatch with date of birth")

        return v
    



@router.post("/profile/set")
async def set( user=Depends(verify_token),
    first_name: str = Form(None),   last_name: str = Form(None),   username: str = Form(None),
    Bio: str = Form(None), date_of_birth: str = Form(None),
    age: int = Form(None),  country: str = Form(None),   state: str = Form(None),
    city: str = Form(None),   gender: str = Form(None),  file: UploadFile = File(None)
):
    update_data = {}

    if first_name is not None:
        update_data["first_name"] = first_name
    if last_name is not None:
        update_data["last_name"] = last_name
    if username is not None:
        update_data["username"] = username
    if Bio is not None:
        update_data["Bio"] = Bio
    if date_of_birth is not None:
        update_data["date_of_birth"] = date_of_birth
    if age is not None:
        update_data["age"] = age
    if country is not None:
        update_data["country"] = country
    if state is not None:
        update_data["state"] = state
    if city is not None:
        update_data["city"] = city
    if gender is not None:
        update_data["gender"] = gender

    if file:
        os.makedirs(UPLOADS_DIR, exist_ok=True)
        file_path = f"uploads/{file.filename}"
        disk_path = os.path.join(UPLOADS_DIR, file.filename)

        with open(disk_path, "wb") as f:
            f.write(await file.read())

        update_data["profilePic"] = file_path

    update_data["updated_at"] = datetime.utcnow()

    print(update_data)
    await db.users.update_one(
        {"email": user.get("email")},
        {"$set": update_data}
    )

    updated_user = await db.users.find_one({"email": user.get("email")})

    return {
        "success": True,
        "user": serialize_user(updated_user)
    }

collection= db["History"]
from PIL import Image
from PIL import UnidentifiedImageError
import io
import httpx

logger = logging.getLogger(__name__)

MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", str(20 * 1024 * 1024)))  # default: 20MB
MODEL_API_BASE = os.getenv("MODEL_API_BASE", "https://model.apnawebtech.online").rstrip("/")
MODEL_API_TOKEN = os.getenv("MODEL_API_TOKEN")  # optional fallback token
APP_DIR = os.path.dirname(os.path.abspath(__file__))             # .../backend/app/routes
BACKEND_DIR = os.path.abspath(os.path.join(APP_DIR, "..", "..")) # .../backend
UPLOADS_DIR = os.path.join(BACKEND_DIR, "uploads")               # .../backend/uploads

async def _read_upload_limited(file: UploadFile, max_bytes: int) -> bytes:
    total = 0
    chunks: list[bytes] = []
    while True:
        chunk = await file.read(1024 * 1024)  # 1MB chunks
        if not chunk:
            break
        total += len(chunk)
        if total > max_bytes:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"File too large. Max allowed is {max_bytes // (1024 * 1024)}MB.",
            )
        chunks.append(chunk)
    return b"".join(chunks)

@router.post("/predict")
async def predict(
    request: Request,
    file: UploadFile = File(...),
    user=Depends(verify_token),
):

    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No file provided.",
        )

    # quick allow-list: browsers may omit/lie, but helps fail fast
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Only image uploads are supported.",
        )

    contents = await _read_upload_limited(file, MAX_UPLOAD_BYTES)
    if not contents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty file.",
        )

    try:
        with Image.open(io.BytesIO(contents)) as im:
            image = im.convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid image file.",
        )
    except Exception as e:
        logger.exception("Image decode failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read image.",
        )

    # Forward to external model API (model is hosted separately now).
    # Important: model service uses its own bearer token (not this backend's user JWT).
    headers: dict[str, str] = {}
    if MODEL_API_TOKEN:
        headers["Authorization"] = f"Bearer {MODEL_API_TOKEN}"
    else:
        auth_header = request.headers.get("authorization")
        if auth_header:
            headers["Authorization"] = auth_header

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            resp = await client.post(
                f"{MODEL_API_BASE}/predict",
                headers=headers,
                files={
                    "file": (
                        file.filename,
                        contents,
                        file.content_type or "application/octet-stream",
                    )
                },
            )
            resp.raise_for_status()
            result = resp.json()
    except httpx.HTTPStatusError as e:
        detail = "Model API request failed."
        try:
            detail = e.response.json()
        except Exception:
            detail = e.response.text or detail
        logger.error("Model API error: %s", detail)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=detail,
        )
    except Exception as e:
        logger.exception("Model API call failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Prediction service unavailable. Please try again.",
        )

    label = result.get("label")
    confidence = result.get("confidence")
    if label is None or confidence is None:
        logger.error("Unexpected model API response: %s", result)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Unexpected response from prediction service.",
        )

    confidence = float(confidence)

    # 📌 save in DB
    await collection.insert_one({
        "user_id": str(user["_id"]),
        "label": label,
        "confidence": confidence,
        "created_at": datetime.utcnow()
    })

    return {
        "label": label,
        "confidence": confidence
    }


@router.get("/history")
async def get_history(user=Depends(verify_token)):

    data = await collection.find(
        {"user_id": str(user["_id"])}
    ).to_list(length=100)

    for item in data:
        item["_id"] = str(item["_id"])

    return data