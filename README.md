# Smart Interview Preparation Tracker

A full-stack web application built using **Python, FastAPI, React.js, and MySQL** to help users efficiently manage interview preparation, technical questions, and interview schedules through a modern web interface.

---

## Features

- User Registration and Management
- Interview Question Management
- Interview Schedule Management
- RESTful CRUD APIs using FastAPI
- Responsive React.js Frontend
- MySQL Database Integration
- Request Validation using Pydantic
- API Testing using Postman
- Modular Backend Architecture
- Dashboard for Interview Tracking

---

## Tech Stack

### Backend
- Python
- FastAPI
- MySQL
- PyMySQL
- Pydantic
- Uvicorn
- python-dotenv

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Tools
- Git
- GitHub
- Postman
- Visual Studio Code

---

## Project Structure

```
smart-interview-preparation-tracker/
│
├── backend/
│   ├── routers/
│   ├── schemas/
│   ├── database/
│   ├── services/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Modules

### User Management
- Register User
- View Users
- Update User
- Delete User

### Question Management
- Add Questions
- View Questions
- Update Questions
- Delete Questions

### Interview Management
- Schedule Interviews
- View Interviews
- Update Interview Details
- Delete Interviews

### Dashboard
- Summary of interview preparation activities

---

## Installation

### Clone Repository

```bash
git clone https://github.com/karthick-py/smart-interview-preparation-tracker.git
```

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

---

## Database

- MySQL
- CRUD Operations
- Relational Database Design

---

## API Testing

All REST APIs were tested using **Postman**.

---

## Future Enhancements

- JWT Authentication
- Login & Authorization
- Search & Filtering
- Progress Analytics
- Email Notifications
- Interview Reminder System
- AI-powered Interview Assistance

---

## Author

**Karthick P**

Python Backend Developer

GitHub:
https://github.com/karthick-py