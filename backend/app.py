from fastapi import FastAPI, Response, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from models import User, Post, UserReq, PostReq, slugify
import db
from sqlmodel import select, Session
from auth.cookie import validate, bake, sessions
from typing import Optional
from fastapi.responses import RedirectResponse
from auth.expiry import setExpiry, checkExpiry
from datetime import datetime


app = FastAPI()


origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/login")
def login(response: Response, user: UserReq, session: Session = Depends(db.get_session), authorized: Optional[bool] = Depends(validate)):
    if authorized:
        return {"message": "Success", "success": True, "authenticated":True}


    statement = select(User).where(User.username == user.username)
    result = session.exec(statement).first()
    if result and result.password == user.password:
        session_id = bake()
        sessions.append(session_id)
        expiry = setExpiry()
        response.set_cookie(key="Authorization", value=str(session_id), httponly=True)
        response.set_cookie(key="Expiry", value=str(expiry), httponly=True)
        return {"message": "Success", "success": True}
    elif result and result.password != user.password:
        return {"message": "Failed auth attempt"}
    else:
        return {"message": "Something else went wrong"}

@app.get("/api/v1/posts")
def posts(session: Session = Depends(db.get_session)):
    # if authorized and not expired:
        q = select(Post)
        result = session.exec(q)
        posts = result.all()
        posts_array = []
        for post in posts:
            # Format date_published and last_modified as dd:mm:yyyy hh:mm:ss
            date_published = post.date_published.strftime("%d %B, %Y") if post.date_published else None
            last_modified = post.last_modified.strftime("%d %B, %Y") if post.last_modified else None
            data = {
                "id": post.id,
                "title": post.title,
                "slug": post.slug,
                "content": post.content,
                "preview": post.preview,
                "date_published": date_published,
                "last_modified": last_modified,
                "is_public": post.is_public
            }
            posts_array.append(data)
        return posts_array
    # if authorized and expired:
    #     return RedirectResponse("/api/v1/login")
    # elif not authorized:
    #     return {"message": "Login first"}
    
    

@app.post("/api/v1/posts")
def new_post(post: PostReq, session: Session = Depends(db.get_session), authorized: bool = Depends(validate), expired: bool = Depends(checkExpiry)):
    if authorized:
        now = datetime.now()
        posting = Post(
            title=post.title,
            slug=slugify(post.title),
            content=post.content,
            preview=post.preview,
            date_published=now,
            last_modified=now,
            is_public=post.is_public
        )
        session.add(posting)
        session.commit()
        return {"message": "Success"}
    elif not authorized:
        return {"message": "Login first"}
    elif authorized and expired:
        return RedirectResponse("/api/v1/login")
    else:
        return {"message": "oops, something wrong"}

@app.delete("/api/v1/posts/{id}")
def delete_post(id: int, session: Session = Depends(db.get_session), authorized: bool = Depends(validate), expired: bool = Depends(checkExpiry)):
    if authorized and not expired:
        post = session.get(Post, id)
        session.delete(post)
        session.commit()
        return post

@app.put("/api/v1/posts/{id}")
def update_post(id: int, update: PostReq, session: Session = Depends(db.get_session), authorized: bool = Depends(validate), expired: bool = Depends(checkExpiry)):
    q = select(Post).where(Post.id == id)
    result = session.exec(q)
    post = result.one()

    post.title = update.title
    post.content = update.content
    post.preview = update.preview
    post.slug = slugify(update.title)
    post.last_modified = datetime.now()
    post.is_public = update.is_public

    session.add(post)
    session.commit()

    return post

@app.get("/api/v1/posts/{slug}")
def get_post(slug: str, session: Session = Depends(db.get_session)):
    # if authorized and not expired:
        q = select(Post).where(Post.slug == slug)
        result = session.exec(q)
        post = result.first()
        date = post.date_published
        post.date_published = date.strftime("%d %B, %Y")

        return post
    # else:
    #     raise HTTPException(status_code=401, detail="Auth missing")

@app.get("/api/v1/auth/check")
def auth_check(request: Request, authorized: Optional[bool] = Depends(validate)):
    if authorized:
        return {"authenticated": True}
    return {"authenticated": False}
