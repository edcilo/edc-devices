from abc import ABC, abstractmethod

from sqlalchemy import select, func

from ..db import get_session


class BaseRepository(ABC):
    def __init__(self):
        self.session = get_session()
        self.model = self.getModel()

    @abstractmethod
    def getModel(self) -> object:
        pass

    def save(self, model=None):
        if model is not None:
            self.session.add(model)
        self.session.commit()
        return model

    def count(self):
        q = select(func.count()).select_from(self.model)
        return self.session.execute(q).scalar()

    def get_all(self):
        q = select(self.model).where(self.model.id > 0)
        return self.session.scalars(q).all()

    def paginate(self, page: int, size: int = 10):
        offset = (page - 1) * size
        q = select(self.model).offset(offset).limit(size)
        return self.session.scalars(q).all()

    def get_by_id(self, id: int):
        q = select(self.model).where(self.model.id == id)
        return self.session.scalars(q).first()

    def create(self, data):
        m = self.model(**data)
        return self.save(m)

    def update(self, id: int, data):
        model = self.get_by_id(id)
        if model is None:
            return None
        for key, value in data.items():
            setattr(model, key, value)
        self.save()
        return model

    def delete(self, id: int):
        model = self.get_by_id(id)
        if model is None:
            return None
        self.session.delete(model)
        self.save()
        return model
