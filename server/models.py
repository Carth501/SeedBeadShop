from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Product(Base):
    __tablename__ = 'products'
    id = Column(Integer, primary_key=True, autoincrement=True)
    images = Column(String, nullable=False)
    price = Column(String, nullable=False)
    label = Column(String, nullable=False)
    description = Column(String, nullable=False)
    inStock = Column(Boolean, nullable=False)

DATABASE_URL = "sqlite:///products.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)