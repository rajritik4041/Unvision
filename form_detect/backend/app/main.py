from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import user, auth

app = FastAPI()

# ✅ CORS (frontend connect करने के लिए)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ routers include करना जरूरी है
app.include_router(user.router)
app.include_router(auth.router)