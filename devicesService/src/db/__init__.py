from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from ..config import config


def get_dns() -> str:
    """
    Returns the DNS for the database

    :return: DNS for the database
    """
    host = config["db"]["host"]
    port = config["db"]["port"]
    name = config["db"]["name"]
    user = config["db"]["user"]
    password = config["db"]["password"]
    return f"postgresql://{user}:{password}@{host}:{port}/{name}"


def get_engine() -> create_engine:
    """
    Returns the database engine

    :return: Database engine
    """
    dns = get_dns()
    return create_engine(dns, echo=True)


def db_migrate():
    """
    Migrates the database
    """
    from src.models.models import Base

    engine = get_engine()
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def get_session() -> Session:
    """
    Returns the database session

    :return: Database session
    """
    engine = get_engine()
    return Session(engine)


def db_seed():
    """
    Seeds the database
    """
    from src.models.device import Device
    from src.models.user import User

    session = get_session()

    user = User(email="admin@edcilo.com")
    user.set_password("secret")
    session.add(user)

    devices = [
        Device(name="Google", ip="8.8.8.8"),
        Device(name="Localhost", ip="127.0.0.1"),
        Device(name="xbtech", ip="112.1.43.45"),
        Device(name="externo01", ip="190.17.45.10"),
    ]
    session.add_all(devices)

    session.commit()
