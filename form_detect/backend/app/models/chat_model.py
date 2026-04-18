import uuid

def chat_schema(user_id, message, response, chat_id=None):
    return {
        "chat_id": chat_id or str(uuid.uuid4()),  # 👈 new
        "user_id": user_id,
        "message": message,
        "response": response
    }