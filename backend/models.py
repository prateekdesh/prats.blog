from pydantic import BaseModel
from typing import Optional
from sqlmodel import SQLModel, table, Field
from datetime import datetime

def slugify(post):
    words = post.split()
    sluggy = '-'.join(words)
    return sluggy

class UserReq(BaseModel):
    username: str
    password: str

class User(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, default=None)
    username: str = Field(unique=True, index=True)
    password: str


class PostReq(BaseModel):
    title: str
    content: str
    is_public: bool

class Post(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, default=None)
    title: str
    slug: str = Field(unique=True)
    content: str
    date_published: datetime
    last_modified: datetime
    is_public: bool

