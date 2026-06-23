from fastapi import APIRouter
from app.schemas.question_schema import(
    Question_Create, 
    Question_Response, 
    Single_Question, 
    Question_Update,
    Question_Details
    )
from app.database import get_connection

router=APIRouter()

@router.post("/questions", response_model=Question_Response)
def create_question(question:Question_Create):
    # return{
    #     "question": question.question,
    #     "topic": question.topic,
    #     "difficulty": question.difficulty
    # }
    connection=get_connection()
    cursor=connection.cursor()
    query="""
        INSERT INTO questions(question, answer, topic, difficulty)
        VALUES (%s,%s,%s,%s)
        """
    values=(
        question.question,
        question.answer,
        question.topic,
        question.difficulty
    )        
    cursor.execute(query, values)
    connection.commit()
    question_id=cursor.lastrowid  # get inserted question id
    cursor.close()
    connection.close()
    return{
        "id": question_id,
        "question": question.question,
        "topic": question.topic,
        "difficulty":question.difficulty
    }

@router.get("/questions", response_model=list[Question_Details])
def get_questions():
    connection=get_connection()
    cursor=connection.cursor()
    query="SELECT * FROM questions"
    cursor.execute(query)
    questions=cursor.fetchall()
    cursor.close()
    connection.close()
    return questions

@router.get("/question/{id}", response_model=Single_Question)
def get_single_question(id:int):
    # return{
    #     "id": id,
    #     "question": "Sample question",
    #     "topic": "Python",
    #     "difficulty": "Easy"
    # }
    connection=get_connection()
    cursor=connection.cursor()
    query="SELECT * FROM questions WHERE id=%s"
    cursor.execute(query, (id,))
    question=cursor.fetchone()
    cursor.close()
    connection.close()
    return question

@router.put("/question/{id}")
def update_question(id:int, question: Question_Update):
    # return{
    #     "id": id,
    #     "question": question.question,
    #     "topic": question.topic,
    #     "difficulty": question.difficulty    
    #     }
    connection=get_connection()
    cursor=connection.cursor()
    query="""
    UPDATE questions
    SET question=%s,
        answer=%s,
        topic=%s,
        difficulty=%s
    WHERE id=%s    
    """
    values=(
        question.question,
        question.answer,
        question.topic,
        question.difficulty,
        id
    )
    cursor.execute(query, values)
    connection.commit()
    cursor.close()
    connection.close()
    return {
        "id": id,
        "question": question.question,
        "topic": question.topic,
        "difficulty": question.difficulty
    }

@router.delete("/question/{id}")
def delete_questions(id:int):
    # return{
    #     "message": f"Question {id} deleted successfully"
    # }
    connection=get_connection()
    cursor=connection.cursor()
    query="DELETE FROM questions WHERE id=%s"
    cursor.execute(query, (id,))
    connection.commit()
    cursor.close()
    connection.close()
    return{
        "message": f"Question {id} deleted successfully"
    }