from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

# ✅ Import your routers
from app.routes import user, auth

# ================= APP =================
app = FastAPI(
    title="OAuth Backend",
    description="FastAPI OAuth with Google, GitHub, Microsoft",
    version="1.0.0"
)

# ================= SESSION MIDDLEWARE =================
# 🔥 REQUIRED for OAuth (VERY IMPORTANT)
app.add_middleware(
    SessionMiddleware,
    secret_key="raghupatiraghavrajaram",  # use same as .env SECRET_KEY
    session_cookie="session",
    max_age=60 * 60 * 24,  # 1 day
)

# ================= CORS =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://unvision.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= ROUTES =================
app.include_router(user.router)
app.include_router(auth.router)

# ================= HEALTH CHECK =================
@app.get("/")
async def home():
    return {
        "status": "ok",
        "message": "🚀 Backend running successfully"
    }

# ================= DEBUG ROUTE =================
@app.get("/test")
async def test():
    return {"message": "Test route working ✅"}