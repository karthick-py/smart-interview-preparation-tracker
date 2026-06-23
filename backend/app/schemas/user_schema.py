# Import Basemodel from Pydantic
from pydantic import BaseModel, Field

# User registration 
class User_Register(BaseModel):
    name: str = Field(min_length=2)
    email: str
    password: str = Field(min_length=4)

class User_Response(BaseModel):
    name:str
    email:str

# user details
class User_Details(BaseModel):
    id:int
    name:str
    email:str

class Single_User(BaseModel):
    id:int
    name:str
    email:str

class User_Update(BaseModel):
    name:str
    email:str