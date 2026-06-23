from pydantic import BaseModel
from datetime import date

class Interview_Create(BaseModel):
    company_name: str
    role: str
    interview_date: date
    status: str


class Interview_Response(BaseModel):
    id: int
    company_name: str
    role: str
    interview_date: date
    status: str


class Interview_Details(BaseModel):
    id: int
    company_name: str
    role: str
    interview_date: date
    status: str


class Single_Interview(BaseModel):
    id: int
    company_name: str
    role: str
    interview_date: date
    status: str


class Interview_Update(BaseModel):
    company_name: str
    role: str
    interview_date: date
    status: str