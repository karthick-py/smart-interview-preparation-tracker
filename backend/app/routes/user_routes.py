# Import APIRouter
from fastapi import APIRouter
from app.schemas.user_schema import User_Register, User_Response, User_Details, Single_User, User_Update
from app.database import get_connection #import database connection
router=APIRouter()

@router.post("/register", response_model=User_Response)
def register_user(user:User_Register):

    connection=get_connection() # database connection
    cursor=connection.cursor()  # act as pipeline

# sql query to insert user
    query="""
        INSERT INTO users(name, email, password)
        VALUES (%s, %s, %s)
        """
    values=(
        user.name,
        user.email,
        user.password
    )
    cursor.execute(query, values)  # execute sql query
    connection.commit()   # save changes permanently
    cursor.close()  # close cursor
    connection.close()   # close database connection

    return{
        "name":user.name,
        "email":user.email
        }

# get all users
@router.get("/users", response_model=list[User_Details])
def get_user():

    connection=get_connection()
    cursor=connection.cursor()
    query="SELECT * FROM users"  # sql query to get all users
    cursor.execute(query)
    users=cursor.fetchall()  # get all rows from users table
    cursor.close()
    connection.close()
    return users

# get single user by id
@router.get("/user/{id}", response_model=Single_User)
def get_single_user(id:int):
    connection=get_connection()
    cursor=connection.cursor()
# sql query to get one user
    query="SELECT * FROM users WHERE id=%s"
# execute sql query
    cursor.execute(query, (id,))
# get one user
    user=cursor.fetchone()
    cursor.close()  # close cursor
    connection.close()  # close database connection
    return user

# update user
@router.put("/user/{id}")
def update_user(id:int, user:User_Update):
    connection=get_connection()
    cursor=connection.cursor()
# sql query to update user
    query="""
        UPDATE users
        SET name=%s, email=%s
        WHERE id=%s
        """
# value for update query
    values=(
        user.name,
        user.email,
        id
    )
    cursor.execute(query,values)  #execute update query
    connection.commit()
    cursor.close()
    connection.close()
    return{
        "id":id,
        "name":user.name,
        "email":user.email
    }

# delete user
@router.delete("/user/{id}")
def delete_user(id:int):
    # return{
    #     "message":f"User {id} deleted successfully"
    # }
    connection=get_connection()
    cursor=connection.cursor()
# sql query to delete user
    query="DELETE FROM users WHERE id=%s"
#execute delete query
    cursor.execute(query,(id,))
    connection.commit()
    cursor.close()
    connection.close()
    return{
        "message":f"user {id} deleted successfully"
    }
