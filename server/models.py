from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Product(Base):
	__tablename__ = 'products'
	id = Column(Integer, primary_key=True, autoincrement=True)
	images = Column(String, nullable=False)
	price = Column(Float, nullable=False)
	label = Column(String, nullable=False)
	description = Column(String, nullable=False)
	inStock = Column(Boolean, nullable=False)
	category = Column(String, nullable=False)
	color = Column(String, nullable=False)

class Panel(Base):
    __tablename__ = 'panels'
    id = Column(Integer, primary_key=True, autoincrement=True)
    image = Column(String, nullable=False)
    label = Column(String, nullable=False)
    description = Column(String, nullable=False)

DATABASE_URL = "sqlite:///products.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)