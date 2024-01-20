from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class TimestampMixin:
    created_at = mapped_column(DateTime, default=datetime.now)
    updated_at = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
