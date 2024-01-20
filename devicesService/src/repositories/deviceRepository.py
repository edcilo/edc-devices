from ..models.device import Device
from .baseRepository import BaseRepository


class DeviceRepository(BaseRepository):
    def getModel(self):
        return Device
