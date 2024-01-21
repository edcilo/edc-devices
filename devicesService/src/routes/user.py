from fastapi import APIRouter, Header

from ..controllers.userController import UserController
from ..schemas.userSchema import UserLoginSchema
from ..middlewares.auth import auth

usersRouter = APIRouter()
controller = UserController()


@usersRouter.post("/auth/login")
def login(credentials: UserLoginSchema):
    return controller.login(credentials)


@usersRouter.get("/auth/check", status_code=204)
def check(authorization: str = Header(None)):
    auth(authorization)
    return None
