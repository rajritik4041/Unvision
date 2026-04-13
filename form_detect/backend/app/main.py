from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.routes import user, auth

app = FastAPI()

# ✅ Session Middleware (VERY IMPORTANT for OAuth)
app.add_middleware(
    SessionMiddleware,
    secret_key="raghupatiraghavrajaram"  # strong secret hona chahiye
)

# ✅ CORS (frontend connect ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ routers include
app.include_router(user.router)
app.include_router(auth.router)