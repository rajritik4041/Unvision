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

# async def handle_login(provider: str, user: dict):
#     email = user.get("email")

#     if not email:
#         return {"error": "Email not found"}

#     db_user = await db.users.find_one({"email": email})

#     if not db_user:
#         new_user = {
#             "email": email,
#             "first_name": user.get("given_name") or user.get("name"),
#             "last_name": user.get("family_name"),
#             "profilePic": user.get("picture"),
#             "providers": [provider],   # 🔥 important
#             "password": None,
#             "created_at": datetime.utcnow()
#         }
#         await db.users.insert_one(new_user)

#     else:
#         # 🔥 merge providers
#         if provider not in db_user.get("providers", []):
#             await db.users.update_one(
#                 {"email": email},
#                 {"$push": {"providers": provider}}
#             )

#     token = create_token({"email": email})

#     return RedirectResponse(
#         url=f"https://unvision.vercel.app/profile/home?token={token}",
#         status_code=302
#     )

async def handle_login(provider: str, user: dict):
    email = user.get("email")

    if not email:
        return {"error": "Email not found"}

    db_user = await db.users.find_one({"email": email})

    # 🔥 Google data extract
    google_data = {
        "first_name": user.get("given_name") or user.get("name"),
        "last_name": user.get("family_name"),
        "profilePic": user.get("picture"),
    }

    if not db_user:
        # ✅ New user
        new_user = {
            "email": email,
            **google_data,
            "providers": [provider],
            "password": None,
            "created_at": datetime.utcnow()
        }
        await db.users.insert_one(new_user)

    else:
        update_fields = {}

        # 🔥 Provider merge
        if provider not in db_user.get("providers", []):
            update_fields["providers"] = db_user.get("providers", []) + [provider]

        # 🔥 Missing fields fill karo
        for key, value in google_data.items():
            if not db_user.get(key) and value:
                update_fields[key] = value

        # 🔥 Update only if needed
        if update_fields:
            await db.users.update_one(
                {"email": email},
                {"$set": update_fields}
            )

    token = create_token({"email": email})

    return RedirectResponse(
        url=f"https://unvision.vercel.app/profile/home?token={token}",
        status_code=302
    )