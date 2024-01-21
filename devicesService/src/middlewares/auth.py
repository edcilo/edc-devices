from fastapi import HTTPException
from ..utils.jwt import jwt_verify


def auth(authorization: str):
    if authorization is None or "Bearer " not in authorization:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = authorization.split(" ")[1]
    is_valid = jwt_verify(token)

    if not is_valid:
        raise HTTPException(status_code=401, detail="Unauthorized")
