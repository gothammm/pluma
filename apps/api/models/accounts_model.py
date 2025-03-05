from typing import Literal, Optional

import sqlalchemy as sa
from sqlmodel import Field

from .base_model import BaseUUIDModel


class Account(BaseUUIDModel, table=True):
    name: str = Field(sa_column=sa.Column(sa.String, nullable=False))
    account_type: Literal["savings", "checking", "credit", "investment"] = Field(
        sa_column=sa.Column(sa.String, nullable=False)
    )
    balance: float = Field(sa_column=sa.Column(sa.Float, nullable=False))
    currency: Literal["USD", "EUR", "GBP", "INR"] = Field(
        sa_column=sa.Column(
            sa.Enum("USD", "EUR", "GBP", "INR", name="currency_enum"),
            nullable=False,
            server_default="EUR",
        ),
        default="EUR",
    )
    status: Literal["active", "inactive", "closed"] = Field(
        sa_column=sa.Column(
            sa.Enum("active", "inactive", "closed", name="status_enum"),
            nullable=False,
            server_default="active",
        ),
        default="active",
    )
