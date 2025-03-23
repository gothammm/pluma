import uuid
from typing import TYPE_CHECKING, List, Optional

import sqlalchemy as sa
from sqlmodel import Field, Relationship

from .base_model import BaseUUIDModel

if TYPE_CHECKING:
    from models.transactions_model import Transaction


class Category(BaseUUIDModel, table=True):
    __tablename__ = "categories"

    name: str = Field(sa_column=sa.Column(sa.String, nullable=False))
    parent_id: Optional[uuid.UUID] = Field(foreign_key="categories.id", nullable=True)
    lft: int = Field(sa_column=sa.Column(sa.Integer, nullable=False))
    rgt: int = Field(sa_column=sa.Column(sa.Integer, nullable=False))

    # Relationships
    parent: Optional["Category"] = Relationship(
        back_populates="children",
        sa_relationship_kwargs={"remote_side": lambda: Category.id},
    )
    children: List["Category"] = Relationship(back_populates="parent")
    transactions: List["Transaction"] = Relationship(back_populates="category")

    @property
    def depth(self) -> int:
        """Calculate depth based on lft and rgt values"""
        return (self.rgt - self.lft - 1) // 2

    @property
    def is_leaf(self) -> bool:
        """Check if category is a leaf node"""
        return self.rgt - self.lft == 1
