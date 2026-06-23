from fastapi import APIRouter
from app.database import get_connection

from app.schemas.interview_schema import (
    Interview_Create,
    Interview_Response,
    Interview_Details,
    Single_Interview,
    Interview_Update
)

router = APIRouter()

@router.post("/interviews", response_model=Interview_Response)
def create_interview(interview: Interview_Create):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
    INSERT INTO interviews
    (company_name, role, interview_date, status)
    VALUES (%s, %s, %s, %s)
    """

    values = (
        interview.company_name,
        interview.role,
        interview.interview_date,
        interview.status
    )

    cursor.execute(query, values)
    connection.commit()

    interview_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return {
        "id": interview_id,
        "company_name": interview.company_name,
        "role": interview.role,
        "interview_date": interview.interview_date,
        "status": interview.status
    }

@router.get("/interviews", response_model=list[Interview_Details])
def get_interviews():

    connection = get_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM interviews"

    cursor.execute(query)

    interviews = cursor.fetchall()

    cursor.close()
    connection.close()

    return interviews

@router.get("/interview/{id}", response_model=Single_Interview)
def get_single_interview(id: int):

    connection = get_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM interviews WHERE id=%s"

    cursor.execute(query, (id,))

    interview = cursor.fetchone()

    cursor.close()
    connection.close()

    return interview

@router.put("/interview/{id}")
def update_interview(
    id: int,
    interview: Interview_Update
):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
    UPDATE interviews
    SET company_name=%s,
        role=%s,
        interview_date=%s,
        status=%s
    WHERE id=%s
    """

    values = (
        interview.company_name,
        interview.role,
        interview.interview_date,
        interview.status,
        id
    )

    cursor.execute(query, values)

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "id": id,
        "company_name": interview.company_name,
        "role": interview.role,
        "interview_date": interview.interview_date,
        "status": interview.status
    }

@router.delete("/interview/{id}")
def delete_interview(id: int):

    connection = get_connection()
    cursor = connection.cursor()

    query = "DELETE FROM interviews WHERE id=%s"

    cursor.execute(query, (id,))

    connection.commit()

    cursor.close()
    connection.close()

    return {
        "message": f"Interview {id} deleted successfully"
    }

@router.get("/dashboard")
def dashboard_counts():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) AS total FROM users")
    total_users = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM questions")
    total_questions = cursor.fetchone()["total"]

    cursor.execute("SELECT COUNT(*) AS total FROM interviews")
    total_interviews = cursor.fetchone()["total"]

    cursor.close()
    connection.close()

    return {
        "total_users": total_users,
        "total_questions": total_questions,
        "total_interviews": total_interviews
    }