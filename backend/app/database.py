# import pymysql
import pymysql
# used to read values from .env file
import os
# import .env function
from dotenv import load_dotenv
# load .env file
load_dotenv()

def get_connection():
    try:
        connection=pymysql.connect(
            host=os.getenv("DB_HOST"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Database connected successfully")

        return connection
    except Exception as e:
        print("Database Connection Failed")
        print(f"error: {e}")
    # Test database connection
# connection=get_connection()
# if connection:
#     connection.close()
#     print("Connection Closed")