from sqlmodel import create_engine, SQLModel, Session


database = "blog.db"
DATABASE_URL = f"sqlite:///{database}"

engine = create_engine(DATABASE_URL, echo=True, connect_args={"check_same_thread": False})
SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session