from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://rajritik4041_db_user:adNYqP0tlo6RCOr0@cluster0.wnqka8h.mongodb.net/"

client = AsyncIOMotorClient(MONGO_URL)

db = client["register"]   # Database name