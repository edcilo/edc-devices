from fastapi import HTTPException
from ..repositories.deviceRepository import DeviceRepository
from ..schemas.deviceSchema import DeviceSchema, NewDeviceSchema


class DeviceController:
    def __init__(self):
        self.repo = DeviceRepository()

    def paginate(self, page, size):
        data = self.repo.paginate(page, size)
        total = self.repo.count()
        pages = total // size + (1 if total % size > 0 else 0)

        if len(data) == 0:
            raise HTTPException(status_code=404, detail="Devices not found")

        return {
            "data": data,
            "meta": {
                "total": total,
                "pages": pages,
            },
        }

    def create(self, device: NewDeviceSchema):
        device = self.repo.create(device.dict())
        return DeviceSchema.from_orm(device)

    def find(self, id: int):
        device = self.repo.get_by_id(id)
        if device is None:
            raise HTTPException(status_code=404, detail="Device not found")
        return DeviceSchema.from_orm(device)

    def update(self, id: int, device: NewDeviceSchema):
        device = self.repo.update(id, device.dict())
        if device is None:
            raise HTTPException(status_code=404, detail="Device not found")
        return DeviceSchema.from_orm(device)

    def delete(self, id: int):
        device = self.repo.delete(id)
        if device is None:
            raise HTTPException(status_code=404, detail="Device not found")
