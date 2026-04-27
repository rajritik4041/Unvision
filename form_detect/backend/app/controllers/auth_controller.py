from fastapi.responses import RedirectResponse
from ..routes.utils import create_token
from datetime import datetime
from app.database.connection import db


async def handle_login(provider: str, user: dict):

    email = user.get("email")
    if not email:
        return {"error": "Email not found"}

    email = email.lower()


    user_data = {
        "first_name": user.get("given_name") or user.get("name") or user.get("login") or user.get("displayName"),
        "last_name": user.get("family_name"),
        "profilePic": user.get("picture") or user.get("avatar_url"),
    }

    provider_ids = {
        "googleId": user.get("sub") if provider == "google" else None,
        "githubId": str(user.get("id")) if provider == "github" else None,
        "microsoftId": user.get("id") if provider == "microsoft" else None,
    }


    db_user = await db.users.find_one({"email": email})

    if not db_user:
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

        if provider not in db_user.get("providers", []):
            update_fields["providers"] = db_user.get("providers", []) + [provider]


        for key, value in provider_ids.items():
            if value and not db_user.get(key):
                update_fields[key] = value


        for key, value in user_data.items():
            if value and not db_user.get(key):
                update_fields[key] = value

        update_fields["last_login"] = datetime.utcnow()

        if update_fields:
            await db.users.update_one(
                {"email": email},
                {"$set": update_fields}
            )


    token =  create_token({"email": email})
    response = RedirectResponse(
        # url=f"https://unvision.vercel.app/profile/home?token={token}",
        url=f"http://localhost:3000/profile/home?token={token}",
        status_code=302
    )
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=60*60*24,
        path="/",
        samesite="lax",
        secure=False   # localhost ke liye
    )
    return response