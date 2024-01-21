from sqlalchemy import select, func

from ..models.device import Device
from .baseRepository import BaseRepository


class DeviceRepository(BaseRepository):
    def getModel(self):
        return Device

    def count_by_status(self, status: int):
        q = (
            select(func.count())
            .select_from(self.model)
            .where(self.model.status == status)
        )
        return self.session.execute(q).scalar()
