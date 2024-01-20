from fastapi import FastAPI

from .routes import routes

app = FastAPI()

routes(app)
