from fastapi import APIRouter,  Request
from dotenv import load_dotenv
load_dotenv()
from ..Service.oauth_service import oauth
from app.controllers.auth_controller import handle_login

router = APIRouter()
@router.get("/auth/google")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/auth/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)

    user = token.get("userinfo")

    if not user:
        resp = await oauth.google.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            token=token
        )
        user = resp.json()

    return await handle_login("google", user)
