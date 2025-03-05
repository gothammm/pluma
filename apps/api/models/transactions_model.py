import uuid
from datetime import datetime, timezone
from typing import Optional

import sqlalchemy as sa
from sqlmodel import Field

from .base_model import BaseUUIDModel


class Transaction(BaseUUIDModel, table=True):
    account_id: uuid.UUID = Field(foreign_key="account.id")
    amount: float = Field(sa_column=sa.Column(sa.Float, nullable=False))
    transaction_type: str = Field(sa_column=sa.Column(sa.String, nullable=False))
    category: str = Field(sa_column=sa.Column(sa.String, nullable=False))
    description: Optional[str] = Field(sa_column=sa.Column(sa.String, nullable=True))
    date: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
