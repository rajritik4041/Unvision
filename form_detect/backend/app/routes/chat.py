from fastapi import APIRouter, Depends
from app.chatbot.bot import get_bot_response
from .utils import verify_token
from app.database.connection import db
from datetime import datetime
import uuid

router = APIRouter()

# 💬 Send Message
@router.post("/chat")
async def chat(data: dict, user=Depends(verify_token)):
    user_id = str(user["_id"])
    message = data.get("message")
    chat_id = data.get("chat_id")

    response = get_bot_response(message)

    if not chat_id:
        chat_id = str(uuid.uuid4())

    collection =   await db.chat_collection.insert_one({
        "chat_id": chat_id,
        "user_id": user_id,
        "message": message,
        "response": response,
        "created_at": datetime.utcnow()
    })
    if not collection :
        return{
            "success" :  True ,
            "message" :   "Do not  send  data  "

        }
    return {
        "chat_id": chat_id,
        "message": message,
        "response": response
    }


# 📂 Get single chat
@router.get("/chat/{chat_id}")
async def get_chat(chat_id: str, user=Depends(verify_token)):
    user_id = str(user["_id"])

    chats = await db.chat_collection.find(
        {"user_id": user_id, "chat_id": chat_id},
        {"_id": 0}
    ).sort("created_at", 1).to_list(100)

    return chats


# ❌ Delete chat
@router.delete("/chat/{chat_id}")
async def delete_chat(chat_id: str, user=Depends(verify_token)):
    user_id = str(user["_id"])

    await db.chat_collection.delete_many({
        "user_id": user_id,
        "chat_id": chat_id
    })

    return {"message": "Chat deleted"}


# 📜 Get all chats (FIXED)
@router.get("/chats")
async def get_all_chats(user=Depends(verify_token)):
    user_id = str(user["_id"])

    chats = await db.chat_collection.aggregate([
        {"$match": {"user_id": user_id}},
        {"$sort": {"created_at": 1}},
        {
            "$group": {
                "_id": "$chat_id",
                "last_message": {"$last": "$message"},
                "created_at": {"$last": "$created_at"}
            }
        },
        {"$sort": {"created_at": -1}}
    ]).to_list(100)

    # ✅ IMPORTANT FIX
    return [
        {
            "chat_id": c["_id"],
            "last_message": c["last_message"],
            "created_at": c["created_at"]
        }
        for c in chats
    ]