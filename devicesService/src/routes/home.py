from fastapi import APIRouter

from ..config import config

homeRouter = APIRouter()


@homeRouter.get("/")
def check():
    return {
        "app": config["app"]["name"],
        "version": config["app"]["version"],
    }
