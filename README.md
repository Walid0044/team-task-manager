# Team Task Manager 🚀

A full-stack web application for team collaboration and task management built with React, Node.js, Express, and PostgreSQL.

## 🎯 Features

### Authentication & Security
- User registration and login
- Session-based authentication with Passport.js
- Password hashing with bcrypt
- Protected routes and API endpoints

### Team Management
- Create and manage teams
- Team membership system
- Role-based permissions (owner/member)

### Task Management
- Create, read, update, and delete tasks
- Assign tasks to team members
- Priority levels (High, Medium, Low)
- Status tracking (Pending, In Progress, Completed)
- Due date tracking

### User Interface
- Responsive design with Tailwind CSS
- Modern and clean dashboard
- Real-time task updates
- Intuitive team and task management

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Knex.js** - SQL query builder
- **Passport.js** - Authentication
- **Express Session** - Session management

### Security
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure
team-task-manager/
├── backend/
│ ├── src/
│ │ ├── config/ # Passport and session config
│ │ ├── middleware/ # Authentication middleware
│ │ ├── models/ # Database models
│ │ ├── routes/ # API routes (auth, teams, tasks)
│ │ └── utils/ # Utility functions
│ ├── migrations/ # Database migrations
│ ├── knexfile.js # Knex configuration
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── contexts/ # React contexts (Auth)
│ │ ├── services/ # API services
│ │ └── utils/ # Utility functions
│ └── package.json
└── README.md

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Walid0044/team-task-manager.git
   cd team-task-manager
   Backend Setup
bash

cd backend
npm install

# Create .env file
echo "PORT=5000
NODE_ENV=development
SESSION_SECRET=your-super-secret-key-change-in-production
DATABASE_URL=postgresql://username:password@localhost:5432/team_task_manager" > .env

# Run migrations
npx knex migrate:latest

# Start backend server
npm run dev

Frontend Setup
bash

cd frontend
npm install
npm run dev

    Access the Application

        Frontend: http://localhost:5173

        Backend API: http://localhost:5000

🔌 API Endpoints
Authentication

    POST /api/auth/register - User registration

    POST /api/auth/login - User login

    POST /api/auth/logout - User logout

    GET /api/auth/status - Check authentication status

Teams

    GET /api/teams - Get user's teams

    POST /api/teams - Create new team

    GET /api/teams/:id/members - Get team members

Tasks

    GET /api/tasks - Get user's tasks

    POST /api/tasks - Create new task

    PUT /api/tasks/:id - Update task

    DELETE /api/tasks/:id - Delete task

🎨 UI Components

    Login/Register - Authentication forms

    Dashboard - Main application interface

    TeamList - Team management and creation

    TaskList - Task management with status updates

👨‍💻 Author

Walid

    GitHub: @Walid0044
    
🙏 Acknowledgments

    React team for the amazing framework

    Vite team for the fast build tool

    Tailwind CSS for the utility-first CSS framework

    Express.js team for the robust backend framework


    
