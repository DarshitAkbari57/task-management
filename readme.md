# Project Management Tool

A MERN stack-based Project Management Tool that allows users to manage tasks. The application provides features like task creation and reporting functionality.

---

## Features

### Frontend
- **Dashboard Overview**: Displays recent tasks.
- **Task and Project Management**: Create, manage tasks with due dates and statuses.
- **Task Prioritization**: Sort and filter tasks by priority, due date, and assigned user.

### Backend
- **API for Task Management**: CRUD operations for projects and tasks with features to assign users and update statuses.
- **Time Log API**: Endpoints for starting/stopping timers and manual time entry.
- **Database Management**: Stores data for projects, tasks, and time logs.

---

## Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ORM
- **Deployment**: Local development setup (can be extended to a hosting platform)

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm or Yarn
- MongoDB (local instance or Atlas)
- Git

### Steps to Run Locally

- **Clone the Repository**:
  ```bash
  git clone https://github.com/DarshitAkbari57/task-management
  cd task-management


- **Setup and run Frontend**:
cd frontend
npm install
REACT_APP_API_BASE_URL=http://localhost:8080/api
npm run dev
http://localhost:3000


- **Setup and run Backend**:
cd backend
npm install
npm start 

update env for backend according to .env.sample

http://localhost:8080



