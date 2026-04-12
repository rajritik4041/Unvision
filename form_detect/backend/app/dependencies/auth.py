from fastapi import Request, HTTPException, Depends
import jwt

SECRET_KEY = "my_super_secret_key"

def verify_token(request: Request):

    token = request.headers.get("Authorization")

    if not token:
        raise HTTPException(401, "Token missing")

    try:
        token = token.split(" ")[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["data"]

    except:
        raise HTTPException(401, "Invalid token")