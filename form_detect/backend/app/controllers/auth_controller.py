import os

from fastapi.responses import RedirectResponse
from ..routes.utils import create_token
from datetime import datetime
from app.database.connection import db

# # async def handle_login(provider: str, user: dict):
# #     email = user.get("email")

# #     if not email:
# #         return {"error": "Email not found"}

# #     # ✅ Check user exists
# #     db_user = await db.users.find_one({"email": email})

# #     if not db_user:
# #         # 🔥 Create new user (OAuth user)
# #         new_user = {
# #             "email": email,
# #             "first_name": user.get("given_name") or user.get("name"),
# #             "profilePic": user.get("picture"),
# #             "provider": provider,
# #             "created_at": datetime.utcnow()
# #         }
# #         await db.users.insert_one(new_user)

# #     # ✅ Create JWT token
# #     token = create_token({"email": email})

# #     # 🔥 REDIRECT TO FRONTEND
# #     return RedirectResponse(
# #         url=f"http://localhost:3000/profile/home?token={token}",
# #         status_code=302
# #     )

# # async def handle_login(provider: str, user: dict):
# #     email = user.get("email")

# #     if not email:
# #         return {"error": "Email not found"}

# #     db_user = await db.users.find_one({"email": email})

# #     if not db_user:
# #         new_user = {
# #             "email": email,
# #             "first_name": user.get("given_name") or user.get("name"),
# #             "last_name": user.get("family_name"),
# #             "profilePic": user.get("picture"),
# #             "providers": [provider],   # 🔥 important
# #             "password": None,
# #             "created_at": datetime.utcnow()
# #         }
# #         await db.users.insert_one(new_user)

# #     else:
# #         # 🔥 merge providers
# #         if provider not in db_user.get("providers", []):
# #             await db.users.update_one(
# #                 {"email": email},
# #                 {"$push": {"providers": provider}}
# #             )

# #     token = create_token({"email": email})

# #     return RedirectResponse(
# #         url=f"https://unvision.vercel.app/profile/home?token={token}",
# #         status_code=302
# #     )

# async def handle_login(provider: str, user: dict):
#     email = user.get("email")

#     if not email:
#         return {"error": "Email not found"}

#     db_user = await db.users.find_one({"email": email})

#     # 🔥 Google data extract
#     google_data = {
#         "first_name": user.get("given_name") or user.get("name"),
#         "last_name": user.get("family_name"),
#         "profilePic": user.get("picture"),
#         "google_id": user.get("sub")
#     }

#     if not db_user:
#         # ✅ New user
#         new_user = {
#             "email": email,
#             **google_data,
#             "providers": [provider],
#             "password": None,
#             "created_at": datetime.utcnow()
#         }
#         await db.users.insert_one(new_user)

#     else:
#         update_fields = {}

#         # 🔥 Provider merge
#         if provider not in db_user.get("providers", []):
#             update_fields["providers"] = db_user.get("providers", []) + [provider]

#         # 🔥 Missing fields fill karo
#         for key, value in google_data.items():
#             if not db_user.get(key) and value:
#                 update_fields[key] = value

#         # 🔥 Update only if needed
#         if update_fields:
#             await db.users.update_one(
#                 {"email": email},
#                 {"$set": update_fields}
#             )

#     token = create_token({"email": email})
#     return RedirectResponse(
#         url=f"http://localhost:3000/profile/home?token={token}",
#         status_code=302
#     )

# import os
# from fastapi.responses import RedirectResponse
# from datetime import datetime
# from app.database.connection import db
# from ..routes.utils import create_token


# async def handle_login(provider: str, user: dict):
#     # -----------------------------
#     # 📧 Email extract
#     # -----------------------------
#     email = user.get("email")

#     if not email:
#         return {"error": "Email not found"}

#     email = email.lower()  # ✅ avoid duplicates

#     # -----------------------------
#     # 👤 Universal user data
#     # -----------------------------
#     user_data = {
#         "first_name": (
#             user.get("given_name") 
#             or user.get("name") 
#             or user.get("login")          # GitHub
#             or user.get("displayName")    # Microsoft
#         ),
#         "last_name": user.get("family_name"),
#         "profilePic": (
#             user.get("picture") 
#             or user.get("avatar_url")     # GitHub
#         ),
#     }

#     # -----------------------------
#     # 🔍 Check existing user
#     # -----------------------------
#     db_user = await db.users.find_one({"email": email})

#     if not db_user:
#         # ✅ New user
#         new_user = {
#             "email": email,
#             **user_data,
#             "providers": [provider],
#             "password": None,
#             "created_at": datetime.utcnow(),
#             "last_login": datetime.utcnow()
#         }

#         await db.users.insert_one(new_user)

#     else:
#         update_fields = {}

#         # 🔥 Add provider if not exists
#         if provider not in db_user.get("providers", []):
#             update_fields["providers"] = db_user.get("providers", []) + [provider]

#         # 🔥 Fill missing fields only
#         for key, value in user_data.items():
#             if not db_user.get(key) and value:
#                 update_fields[key] = value

#         # 🔥 Update last login
#         update_fields["last_login"] = datetime.utcnow()

#         if update_fields:
#             await db.users.update_one(
#                 {"email": email},
#                 {"$set": update_fields}
#             )

#     # -----------------------------
#     # 🔐 Create JWT token
#     # -----------------------------
#     token = create_token({"email": email})

#     # -----------------------------
#     # 🔁 Redirect to frontend
#     # -----------------------------

#     return RedirectResponse(
#         url=f"http://localhost:3000/profile/home?token={token}",
#         status_code=302
#     )




async def handle_login(provider: str, user: dict):

    email = user.get("email")
    if not email:
        return {"error": "Email not found"}

    email = email.lower()

    # -----------------------------
    # 👤 Extract user data
    # -----------------------------
    user_data = {
        "first_name": user.get("given_name") or user.get("name") or user.get("login") or user.get("displayName"),
        "last_name": user.get("family_name"),
        "profilePic": user.get("picture") or user.get("avatar_url"),
    }

    # -----------------------------
    # 🆔 Provider IDs
    # -----------------------------
    provider_ids = {
        "googleId": user.get("sub") if provider == "google" else None,
        "githubId": str(user.get("id")) if provider == "github" else None,
        "microsoftId": user.get("id") if provider == "microsoft" else None,
    }

    # -----------------------------
    # 🔍 Check existing user
    # -----------------------------
    db_user = await db.users.find_one({"email": email})

    if not db_user:
        # ✅ Create full schema user
        new_user = {
            # Basic
            "first_name": user_data.get("first_name"),
            "last_name": user_data.get("last_name"),
            "username": email.split("@")[0],  # auto username

            "email": email,
            "gender": None,

            # Auth
            "password": None,

            # OAuth IDs
            "googleId": provider_ids["googleId"],
            "githubId": provider_ids["githubId"],
            "microsoftId": provider_ids["microsoftId"],

            # Profile
            "profilePic": user_data.get("profilePic"),
            "date_of_birth": None,
            "age": None,

            # Location
            "country": None,
            "state": None,
            "city": None,

            # Other
            "providers": [provider],
            "token": None,
            "otp": "0000",  # dummy (since OAuth)

            "isProfileComplete": False,

            "createdAt": datetime.utcnow(),
            "last_login": datetime.utcnow()
        }

        await db.users.insert_one(new_user)

    else:
        update_fields = {}

        # ✅ Add provider
        if provider not in db_user.get("providers", []):
            update_fields["providers"] = db_user.get("providers", []) + [provider]

        # ✅ Update provider IDs
        for key, value in provider_ids.items():
            if value and not db_user.get(key):
                update_fields[key] = value

        # ✅ Fill missing fields
        for key, value in user_data.items():
            if value and not db_user.get(key):
                update_fields[key] = value

        update_fields["last_login"] = datetime.utcnow()

        if update_fields:
            await db.users.update_one(
                {"email": email},
                {"$set": update_fields}
            )

    # -----------------------------
    # 🔐 Token
    # -----------------------------
    token =  create_token({"email": email})

    return RedirectResponse(
        # url=f"https://unvision.vercel.app/profile/home?token={token}",
        url=f"http://localhost:3000/profile/home?token={token}",
        status_code=302
    )