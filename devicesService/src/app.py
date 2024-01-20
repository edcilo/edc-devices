from fastapi import FastAPI

from .config import config

app = FastAPI()


@app.get("/")
def check():
    return {"app": config["app"]["name"], "version": config["app"]["version"]}
