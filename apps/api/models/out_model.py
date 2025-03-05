from typing import List

from pydantic import BaseModel

from models.base_model import BaseUUIDModel


class OutModel(BaseModel):
    @classmethod
    def from_orm(cls, sqlmodel_instance: BaseUUIDModel):
        return cls.model_validate(sqlmodel_instance.model_dump())

    @classmethod
    def from_orm_list(cls, sqlmodel_instances: List[BaseUUIDModel]):
        return [cls.from_orm(instance) for instance in sqlmodel_instances]
