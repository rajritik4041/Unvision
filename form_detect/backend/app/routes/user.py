from fastapi import APIRouter, Depends
from app.database.connection import db

router = APIRouter()

@router.get("/users")
async def get_users():
    users = []
    
    cursor = db.users.find()
    
    async for user in cursor:
        users.append({
            "id": str(user["_id"]),
            "email": user.get("email")
        })

    return users


