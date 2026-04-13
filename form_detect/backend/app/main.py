from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from app.routes import user, auth

app = FastAPI()

# ✅ Session Middleware
app.add_middleware(
    SessionMiddleware,
    secret_key="raghupatiraghavrajaram"
)

# ✅ CORS (FINAL FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",              # local
        "https://unvision.vercel.app"     # production frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ routers
app.include_router(user.router)
app.include_router(auth.router)