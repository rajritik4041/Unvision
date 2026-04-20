from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware

from app.routes import user, auth , chat , send , signup , login , logout , profile

app = FastAPI()

app.add_middleware(
    SessionMiddleware,
    secret_key="raghupatiraghavrajaram"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",   # 👈 ADD THIS
    "https://unvision.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ routers

app.include_router(chat.router)
app.include_router(send.router)
app.include_router(user.router)
app.include_router(auth.router)
app.include_router(signup.router)
app.include_router(login.router)
app.include_router(logout.router)
app.include_router(profile.router)