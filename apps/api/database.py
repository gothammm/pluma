from sqlmodel import Session, create_engine

DATABASE_URL = "sqlite:///./pluma-finance.db"  # Use PostgreSQL or MySQL if needed

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})


def get_session():
    """Dependency function to get the database session."""
    with Session(engine) as session:
        yield session
