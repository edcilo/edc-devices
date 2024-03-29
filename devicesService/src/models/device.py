from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base
from .mixins import TimestampMixin


class Device(TimestampMixin, Base):
    __tablename__ = "devices"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    ip: Mapped[str] = mapped_column(String(30))
    status: Mapped[bool] = mapped_column(Integer, default=0)

    def __repr__(self):
        return f"<Device(id={self.id}, name={self.name}, ip={self.ip}) status={self.status}>"
