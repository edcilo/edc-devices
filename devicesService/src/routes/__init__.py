from .home import homeRouter
from .device import devicesRouter


def routes(app):
    app.include_router(homeRouter, prefix="")
    app.include_router(devicesRouter, prefix="/api/v1")
