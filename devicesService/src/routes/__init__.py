from .home import homeRouter
from .device import devicesRouter
from .user import usersRouter


def routes(app):
    app.include_router(homeRouter, prefix="")
    app.include_router(devicesRouter, prefix="/api/v1")
    app.include_router(usersRouter, prefix="/api/v1")
