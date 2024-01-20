from datetime import datetime

from typing import Optional
from pydantic import BaseModel


class DeviceSchema(BaseModel):
    id: Optional[int]
    name: str
    ip: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NewDeviceSchema(BaseModel):
    name: str
    ip: str
