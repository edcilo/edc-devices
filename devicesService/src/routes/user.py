from fastapi import APIRouter

from ..controllers.userController import UserController
from ..schemas.userSchema import UserLoginSchema

usersRouter = APIRouter()
controller = UserController()


@usersRouter.post("/auth/login")
def login(credentials: UserLoginSchema):
    return controller.login(credentials)
