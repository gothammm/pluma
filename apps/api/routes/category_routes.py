from loguru import logger

import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlmodel import Session, select

from models.out_model import OutModel
from models.accounts_model import Account
from database import get_session
from models.categories_model import Category


router = APIRouter(prefix="/categories", tags=["categories"])


class CategoryBase(BaseModel):
    name: str = Field(..., min_length=3, max_length=50, description="Category name")
    parent_id: Optional[uuid.UUID] = Field(None, description="Parent category ID")

class CategoryIn(CategoryBase):
    pass


class CategoryOut(OutModel, CategoryBase):
    id: uuid.UUID



@router.post("", response_model=CategoryOut)
def create_category(category: CategoryIn, db: Session = Depends(get_session)):
    """Create a new category within the nested set model."""

    new_lft, new_rgt = None, None

    try:
        if category.parent_id:
            logger.info(f"Creating category under parent {category.parent_id}")
            # Check if parent category exists
            parent = db.exec(
                select(Category).where(Category.id == category.parent_id)
            ).one()
            if not parent:
                logger.error(f"Parent category {category.parent_id} not found")
                raise HTTPException(
                    status_code=400, detail="Parent Category not found"
                )
                
            # Find last sibling of the parent category
            last_sibling = db.exec(
                select(Category).where(Category.parent_id == parent.id).order_by(Category.rgt.desc())
            ).first()
            
            categories_to_update = None
            if last_sibling:
                # Insert after last sibling
                new_lft = last_sibling.rgt + 1
                new_rgt = new_lft + 1
                
                # Make space for new node
                categories_to_update = db.exec(select(Category).where(Category.rgt >= last_sibling.rgt)).all()
            else:
                # Insert as the first child of the parent
                new_lft = parent.lft + 1
                new_rgt = new_lft + 1
                
                # Make space for new node
                categories_to_update = db.exec(select(Category).where(Category.lft >= parent.lft)).all()
            for cat in categories_to_update:
                if cat.rgt >= new_lft:
                    cat.rgt += 2
                if cat.lft >= new_lft:
                    cat.lft += 2
            parent.rgt = new_rgt + 1
        else:
            # If no parent, add as a root node
            max_rgt_category = db.exec(
                select(Category).where(Category.parent_id == None).order_by(Category.rgt.desc())
            ).first()
            
            if max_rgt_category:
                new_lft = max_rgt_category.rgt + 1
            else:
                new_lft = 1
            new_rgt = new_lft + 1

        # Create the new category
        new_category = Category(
            name=category.name,
            parent_id=category.parent_id,
            lft=new_lft,
            rgt=new_rgt,
        )
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
    except HTTPException:
        db.rollback()
        raise
    return new_category


@router.get("", response_model=List[CategoryOut])
def list_categories(db: Session = Depends(get_session)):
    """Retrieve all categories in a nested set order."""
    categories = db.exec(select(Category).order_by(Category.lft)).all()
    return categories


@router.put("/{category_id}", response_model=CategoryOut)
def update_category(
    category_id: uuid.UUID,
    category_data: CategoryIn,
    db: Session = Depends(get_session),
):
    """Update an existing category, including renaming or reassigning parent."""

    category = db.exec(select(Category).where(Category.id == category_id)).first()

    if not category:
        logger.error(f"Category {category_id} not found")
        raise HTTPException(status_code=404, detail="Category not found")

    try:
        # Update category name
        category.name = category_data.name

        db.commit()  # Explicit commit without using db.begin()
        db.refresh(category)

    except HTTPException:
        db.rollback()
        raise

    return category
