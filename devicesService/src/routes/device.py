from fastapi import APIRouter
from ..controllers.deviceController import DeviceController
from ..schemas.deviceSchema import NewDeviceSchema


devicesRouter = APIRouter()
controller = DeviceController()


@devicesRouter.get("/devices")
def paginate(page: int = 1, size: int = 10):
    return controller.paginate(page, size)


@devicesRouter.post("/devices", status_code=201)
def create(device: NewDeviceSchema):
    return controller.create(device)


@devicesRouter.get("/devices/{id}")
def get(id: int):
    return controller.find(id)


@devicesRouter.put("/devices/{id}")
def update(id: int, device: NewDeviceSchema):
    return controller.update(id, device)


@devicesRouter.delete("/devices/{id}", status_code=204)
def delete(id: int):
    return controller.delete(id)
