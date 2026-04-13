# from jose import jwt, JWTError
# from datetime import datetime, timedelta
# from fastapi import Depends, HTTPException
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
# from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
# from app.database.connection import db

# security = HTTPBearer()

# # 🔐 Create Token
# def create_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

#     to_encode.update({"exp": expire})

#     token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return token


# # 🔍 Verify Token
# def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    
#     token = credentials.credentials

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")
# from jose import jwt, JWTError
# from datetime import datetime, timedelta
# from fastapi import Depends, HTTPException
# from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# SECRET_KEY = "your_secret_key"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

# security = HTTPBearer()

# # 🔐 Create Token
# def create_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})

#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# # 🔍 Verify Token
# async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     token = credentials.credentials

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

#         email: str = payload.get("email")  # 🔥 important
#         if email is None:
#             raise HTTPException(status_code=401, detail="Invalid token")

#         # 🔥 fetch full user from DB
#         user = await db.users.find_one({"email": email})

#         if user is None:
#             raise HTTPException(status_code=401, detail="User not found")

#         return user  # ✅ full user object return

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")


# def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     token = credentials.credentials
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
#         return payload  # user data
#     except jwt.ExpiredSignatureError:
#         raise HTTPException(status_code=401, detail="Token expired")
#     except jwt.InvalidTokenError:
#         raise HTTPException(status_code=401, detail="Invalid token")





# async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
#     token = credentials.credentials

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

#         email: str = payload.get("sub")
#         if email is None:
#             raise HTTPException(status_code=401, detail="Invalid token")

#         user = await db.users.find_one({"email": email})
#         if user is None:
#             raise HTTPException(status_code=401, detail="User not found")

#         return user

#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")


from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from app.database.connection import db

security = HTTPBearer()

# 🔐 Create Token
def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# 🔍 Verify Token
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        email = payload.get("email")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = await db.users.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")