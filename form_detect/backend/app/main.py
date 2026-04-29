from fastapi import FastAPI, Request , UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from app.core.limiter import limiter  
from PIL import Image
import io

from app.routes import user, auth, chat, send, signup, login, logout, profile
app = FastAPI()


app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.exception_handler(RateLimitExceeded)
async def handle_rate_limit(request: Request, exc: RateLimitExceeded):
    path = request.url.path
    if path == "/login":
        msg = "Login limit cross ho gaya  1 min baad try karo"
    elif path == "/send-otp":
        msg = "OTP bahut baar request ho gaya  thoda wait karo"
    else:
        msg = "Too many requests"
    return JSONResponse(
        status_code=429,
        content={
            "success": False,
            "message": msg
        }
    )


app.add_middleware(
    SessionMiddleware,
    secret_key="raghupatiraghavrajaram"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://unvision.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)
app.include_router(send.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(signup.router)
app.include_router(login.router)
app.include_router(logout.router)
app.include_router(profile.router)

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     contents = await file.read()
#     image = Image.open(io.BytesIO(contents))

#     result = predict_image(image)

#     return {
#         "label": result["label"],
#         "confidence": float(result["score"])
#     }