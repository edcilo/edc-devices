import jwt

from ...config import config

secret = config["app"]["secret"]


def jwt_encode(payload):
    return jwt.encode(payload, secret, algorithm="HS256")


def jwt_verify(token):
    try:
        return jwt.decode(token, secret, algorithms=["HS256"])
    except:
        return False
