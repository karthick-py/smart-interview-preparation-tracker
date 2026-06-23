from fastapi.middleware.cors import CORSMiddleware
# Import FastAPI class
from fastapi import FastAPI
from app.routes.user_routes import router as auth_router
from app.routes.question_routes import router as question_router
from app.routes import interview_routes


# create FastAPI application
app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ["http://localhost:3000"]    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interview_routes.router)
# Include auth routes
app.include_router(auth_router)
# Home API
@app.get("/")
def home():
    return{
        "message":"Welcome to Smart Interview Preparation Tracker"
    }

app.include_router(question_router)