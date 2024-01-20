from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from src.models.base import Base
from src.models.mixins import TimestampMixin


class User(TimestampMixin, Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(60))
    password: Mapped[str] = mapped_column(String(255))

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, password={self.password})>"
