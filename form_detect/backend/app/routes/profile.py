from fastapi import APIRouter, Depends, UploadFile, File, Form
from datetime import datetime
import os
from app.database.connection import db
from dotenv import load_dotenv
load_dotenv()
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

@router.post("/profile/set")
async def set( user=Depends(verify_token),
    first_name: str = Form(None),   last_name: str = Form(None),   username: str = Form(None),
    email: str = Form(None),    Bio: str = Form(None), date_of_birth: str = Form(None),
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
    if email is not None:
        update_data["email"] = email
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
        os.makedirs("uploads", exist_ok=True)
        file_path = f"uploads/{file.filename}"

        with open(file_path, "wb") as f:
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