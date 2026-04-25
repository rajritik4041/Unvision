from fastapi import APIRouter, Depends
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
