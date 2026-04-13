from fastapi.responses import RedirectResponse
from ..routes.utils import create_token
from datetime import datetime
from app.database.connection import db

# async def handle_login(provider: str, user: dict):
#     email = user.get("email")

#     if not email:
#         return {"error": "Email not found"}

#     # ✅ Check user exists
#     db_user = await db.users.find_one({"email": email})

#     if not db_user:
#         # 🔥 Create new user (OAuth user)
#         new_user = {
#             "email": email,
#             "first_name": user.get("given_name") or user.get("name"),
#             "profilePic": user.get("picture"),
#             "provider": provider,
#             "created_at": datetime.utcnow()
#         }
#         await db.users.insert_one(new_user)

#     # ✅ Create JWT token
#     token = create_token({"email": email})

#     # 🔥 REDIRECT TO FRONTEND
#     return RedirectResponse(
#         url=f"http://localhost:3000/profile/home?token={token}",
#         status_code=302
#     )

async def handle_login(provider: str, user: dict):
    email = user.get("email")

    if not email:
        return {"error": "Email not found"}

    db_user = await db.users.find_one({"email": email})

    if not db_user:
        new_user = {
            "email": email,
            "first_name": user.get("given_name") or user.get("name"),
            "last_name": user.get("family_name"),
            "profilePic": user.get("picture"),
            "providers": [provider],   # 🔥 important
            "password": None,
            "created_at": datetime.utcnow()
        }
        await db.users.insert_one(new_user)

    else:
        # 🔥 merge providers
        if provider not in db_user.get("providers", []):
            await db.users.update_one(
                {"email": email},
                {"$push": {"providers": provider}}
            )

    token = create_token({"email": email})

    return RedirectResponse(
        url=f"http://localhost:3000/profile/home?token={token}",
        status_code=302
    )