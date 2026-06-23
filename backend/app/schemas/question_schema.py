from pydantic import BaseModel

class Question_Create(BaseModel):
    question:str
    answer:str
    topic:str
    difficulty:str

class Question_Response(BaseModel):
    id:int
    question:str
    topic:str
    difficulty:str

class Single_Question(BaseModel):
    id:int
    question:str
    topic:str
    difficulty:str

class Question_Update(BaseModel):
    question:str
    answer:str
    topic:str
    difficulty:str

# List Response
class Question_Details(BaseModel):
    id:int
    question:str
    answer:str
    topic:str
    difficulty:str
    