from sqlalchemy import select

from ..models.user import User
from .baseRepository import BaseRepository


class UserRepository(BaseRepository):
    def getModel(self):
        return User

    def get_by_email(self, email: str):
        q = select(self.model).where(self.model.email == email)
        return self.session.scalars(q).first()

    def create(self, data):
        password = data["password"]
        del data["password"]
        m = self.model(**data)
        m.set_password(password)
        return self.save(m)

    def update(self, id: int, data):
        password = None
        if "password" in data:
            password = data["password"]
            del data["password"]
        model = self.get_by_id(id)
        for key, value in data.items():
            setattr(model, key, value)
        if password is not None:
            model.set_password(password)
        self.save()
        return model

    def check_password(self, id: int, password: str):
        model = self.get_by_id(id)
        return model.verify_password(password)
