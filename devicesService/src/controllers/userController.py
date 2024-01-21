import datetime

from fastapi import HTTPException
from ..repositories.userRepository import UserRepository
from ..schemas.userSchema import UserLoginSchema
from ..utils.jwt import jwt_encode


class UserController:
    def __init__(self):
        self.repo = UserRepository()

    def login(self, credentials: UserLoginSchema):
        user = self.repo.get_by_email(credentials.email)
        if not user or not user.verify_password(credentials.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = jwt_encode(
            {
                "sub": user.id,
                "iat": datetime.datetime.utcnow(),
            }
        )
        return {
            "token": token,
        }
