import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING, Optional

import sqlalchemy as sa
from sqlmodel import Field, Relationship

from models.base_model import BaseUUIDModel
from models.categories_model import Category

if TYPE_CHECKING:
    from models.accounts_model import Account


class Transaction(BaseUUIDModel, table=True):
    __tablename__ = "transactions"

    account_id: uuid.UUID = Field(foreign_key="accounts.id")
    amount: float = Field(sa_column=sa.Column(sa.Float, nullable=False))
    transaction_type: str = Field(sa_column=sa.Column(sa.String, nullable=False))
    category_id: uuid.UUID = Field(foreign_key="categories.id")
    name: str = Field(sa_column=sa.Column(sa.String, nullable=False))
    description: Optional[str] = Field(sa_column=sa.Column(sa.String, nullable=True))
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    category: "Category" = Relationship(back_populates="transactions")
    account: "Account" = Relationship(back_populates="transactions")
