from fastapi import APIRouter, Request, Header
from ..controllers.deviceController import DeviceController
from ..schemas.deviceSchema import NewDeviceSchema
from ..middlewares.auth import auth

devicesRouter = APIRouter()
controller = DeviceController()


@devicesRouter.get("/devices/stats")
def stats(authorization: str = Header(None)):
    auth(authorization)
    return controller.stats()


@devicesRouter.get("/devices")
def paginate(authorization: str = Header(None), page: int = 1, size: int = 10):
    auth(authorization)
    return controller.paginate(page, size)


@devicesRouter.post("/devices", status_code=201)
def create(device: NewDeviceSchema, authorization: str = Header(None)):
    auth(authorization)
    return controller.create(device)


@devicesRouter.get("/devices/{id}")
def get(id: int, authorization: str = Header(None)):
    auth(authorization)
    return controller.find(id)


@devicesRouter.put("/devices/{id}")
def update(id: int, device: NewDeviceSchema, authorization: str = Header(None)):
    auth(authorization)
    return controller.update(id, device)


@devicesRouter.delete("/devices/{id}", status_code=204)
def delete(id: int, authorization: str = Header(None)):
    auth(authorization)
    return controller.delete(id)
