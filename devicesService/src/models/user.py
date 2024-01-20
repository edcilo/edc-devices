from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from werkzeug.security import check_password_hash, generate_password_hash

from .base import Base
from .mixins import TimestampMixin


class User(TimestampMixin, Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(60))
    password: Mapped[str] = mapped_column(String(255))

    def __repr__(self):
        return f"<User(id={self.id}, email={self.email}, password={self.password})>"

    def set_password(self, password: str) -> None:
        self.password = generate_password_hash(password)

    def verify_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)
