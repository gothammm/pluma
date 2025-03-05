import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlmodel import Session, select

from database import get_session
from models.accounts_model import Account
from models.list_response import ListResponse
from models.out_model import OutModel

router = APIRouter()

from typing import Literal


class AccountsBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=50, description="Account name")
    account_type: Literal["checking", "savings", "credit"] = Field(
        ..., description="Account Type", example="checking", title="Account Type"
    )
    balance: float = Field(..., ge=0, description="Account Balance")
    currency: Literal["USD", "EUR", "GBP", "INR"] = Field(
        ..., description="Currency of the account", example="EUR"
    )
    status: Literal["active", "inactive", "closed"] = Field(
        ..., description="Account Status", example="active"
    )


class AccountsIn(AccountsBase):
    pass


class AccountsOut(OutModel, AccountsBase):
    id: uuid.UUID


class StatusUpdate(BaseModel):
    status: Literal["active", "inactive", "closed"]


@router.get("", response_model=ListResponse[AccountsOut])
def list_accounts(db: Session = Depends(get_session)):
    """List all accounts."""
    accounts = db.exec(select(Account)).all()
    return ListResponse[AccountsOut](results=AccountsOut.from_orm_list(accounts))


@router.post("", response_model=AccountsOut)
def create_account(account: AccountsIn, db: Session = Depends(get_session)):
    db_account = Account.model_validate(account)
    """Create a new account."""
    db.add(db_account)
    db.commit()
    db.refresh(db_account)
    return db_account


@router.put("/{account_id}", response_model=AccountsOut)
def update_account(
    account_id: uuid.UUID, account_data: AccountsIn, db: Session = Depends(get_session)
):
    """Update an existing account."""
    account = db.exec(select(Account).where(Account.id == account_id)).first()

    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    for key, value in account_data.model_dump(exclude_unset=True).items():
        setattr(account, key, value)

    db.commit()
    db.refresh(account)
    return account


@router.delete("/{account_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_account(account_id: uuid.UUID, db: Session = Depends(get_session)):
    """Delete an account."""
    account = db.exec(select(Account).where(Account.id == account_id)).first()

    if not account:
        raise HTTPException(status_code=404, detail="Account not found")

    db.delete(account)
    db.commit()
