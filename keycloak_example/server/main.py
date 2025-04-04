from fastapi import FastAPI
from users.users import router as users_router
from posts.posts import router as posts_router
from fastapi.responses import FileResponse

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the API"}

# Include the routers
app.include_router(users_router, prefix="/users", tags=["users"])
app.include_router(posts_router, prefix="/posts", tags=["posts"])

