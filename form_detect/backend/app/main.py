from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from app.core.limiter import limiter  
import os
from starlette.middleware.base import BaseHTTPMiddleware

from app.routes import user, auth, chat, send, signup, login, logout, profile
app = FastAPI()


app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

APP_DIR = os.path.dirname(os.path.abspath(__file__))          # .../backend/app
BACKEND_DIR = os.path.dirname(APP_DIR)                       # .../backend
UPLOADS_DIR = os.path.join(BACKEND_DIR, "uploads")           # .../backend/uploads
os.makedirs(UPLOADS_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_BYTES", str(20 * 1024 * 1024)))  # default: 20MB

class MaxUploadSizeMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Enforce a hard upper limit early to avoid intermittent failures on big files.
        # Applies to multipart uploads, especially /predict and profile picture uploads.
        content_length = request.headers.get("content-length")
        if content_length is not None:
            try:
                if int(content_length) > MAX_UPLOAD_BYTES:
                    return JSONResponse(
                        status_code=413,
                        content={
                            "success": False,
                            "message": f"File too large. Max allowed is {MAX_UPLOAD_BYTES // (1024 * 1024)}MB."
                        },
                    )
            except ValueError:
                # If content-length is malformed, just continue and let downstream handle it.
                pass
        return await call_next(request)

app.add_middleware(MaxUploadSizeMiddleware)

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
        "https://unvision.vercel.app",
        "https://www.apnawebtech.online",
        "https://apnawebtech.online",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "ok", "service": "unvision-api"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

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