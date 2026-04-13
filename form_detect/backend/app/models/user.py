from datetime import datetime

def create_user(data):
    return {
        "first_name": data.get("first_name"),
        "last_name": data.get("last_name"),
        "email": data.get("email"),
        "username": data.get("username"),

        # OAuth IDs
        "googleId": data.get("googleId"),
        "githubId": data.get("githubId"),
        "microsoftId": data.get("microsoftId"),

        # Profile
        "profilePic": data.get("profilePic"),

        # Extra
        "provider": data.get("provider"),
        "otp": data.get("otp"),

        "isProfileComplete": False,
        "createdAt": datetime.utcnow()
    }