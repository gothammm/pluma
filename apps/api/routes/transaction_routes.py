from typing import List

from fastapi import APIRouter, HTTPException

from models.transactions_model import Transaction

router = APIRouter()

# In-memory storage for transactions
transactions = []


@router.get("", response_model=List[Transaction])
def list_transactions():
    """List all transactions."""
    return transactions


@router.post("", response_model=Transaction)
def add_transaction(transaction: Transaction):
    """Add a new transaction."""
    if any(t.id == transaction.id for t in transactions):
        raise HTTPException(
            status_code=400, detail="Transaction with this ID already exists."
        )
    transactions.append(transaction)
    return transaction


@router.put("/{transaction_id}", response_model=Transaction)
def update_transaction(transaction_id: int, updated_transaction: Transaction):
    """Update an existing transaction."""
    for idx, t in enumerate(transactions):
        if t.id == transaction_id:
            transactions[idx] = updated_transaction
            return updated_transaction
    raise HTTPException(status_code=404, detail="Transaction not found.")
