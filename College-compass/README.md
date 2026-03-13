# College Compass 🧭

A smart, lightweight campus navigation system for Alliance University. Built with React, Node.js, Express, and MongoDB.

![College Compass](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Database Setup](#database-setup)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Team](#team)

## ✨ Features

- **Quick Search**: Find classrooms, labs, offices, and facilities instantly
- **Faculty Directory**: Locate professors and their office locations
- **Offline Support**: Works without internet connectivity
- **Responsive Design**: Mobile-friendly interface
- **Low Resource Usage**: No AR/GPS required, minimal battery consumption
- **Privacy-Focused**: No location tracking or camera access
- **Scalable**: Easy to implement in other institutions

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with custom animations

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## 📁 Project Structure

```
college-compass/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.css
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── Faculty.jsx
│   │   │   └── About.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── models/           # MongoDB models
│   │   ├── Location.js
│   │   └── Faculty.js
│   ├── routes/           # API routes
│   │   ├── locations.js
│   │   └── faculty.js
│   ├── server.js         # Main server file
│   ├── seed.js           # Database seeding script
│   ├── .env.example      # Environment variables template
│   └── package.json
│
├── .gitignore
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use **MongoDB Atlas** (cloud database) - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **VS Code** (recommended) - [Download](https://code.visualstudio.com/)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd college-compass
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

## 💻 Running Locally

### Option 1: Using Local MongoDB

1. **Start MongoDB** (if installed locally):
```bash
# On macOS/Linux
mongod

# On Windows (run as administrator)
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

2. **Setup Environment Variables**:
```bash
cd server
cp .env.example .env
# Edit .env and use: MONGODB_URI=mongodb://localhost:27017/college_compass
```

3. **Seed the Database** (first time only):
```bash
cd server
node seed.js
```

4. **Start the Backend Server**:
```bash
cd server
npm run dev
# Server will run on http://localhost:5000
```

5. **Start the Frontend** (in a new terminal):
```bash
cd client
npm run dev
# Frontend will run on http://localhost:3000
```

### Option 2: Using MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Setup Environment Variables**:
```bash
cd server
cp .env.example .env
# Edit .env and add your MongoDB Atlas connection string:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/college_compass
```

3. **Follow steps 3-5 from Option 1**

## 🗄️ Database Setup

### Seed Sample Data
The project includes a seed script with sample locations and faculty data:

```bash
cd server
node seed.js
```

This will populate your database with:
- 10 sample locations (labs, classrooms, offices, etc.)
- 8 sample faculty members

### Add Your Own Data
You can add data through:
1. **API endpoints** (see API Documentation below)
2. **MongoDB Compass** (GUI tool)
3. **Direct MongoDB operations**

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy Frontend**:
```bash
cd client
vercel
# Follow the prompts
# Make sure to set the build command to: npm run build
# And output directory to: dist
```

3. **Configure Environment**:
   - In Vercel dashboard, add environment variable:
   - `VITE_API_URL` = your backend URL

### Backend Deployment (Render)

1. **Create account** on [Render](https://render.com)

2. **Create New Web Service**:
   - Connect your GitHub repository
   - Select `server` directory
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `NODE_ENV` = production

### Alternative: Deploy Both on Railway

1. **Create account** on [Railway](https://railway.app)
2. **Deploy from GitHub**
3. Configure separate services for frontend and backend
4. Add environment variables

## 📚 API Documentation

### Locations API

#### Get all locations
```
GET /api/locations
```

#### Get location by ID
```
GET /api/locations/:id
```

#### Search locations
```
GET /api/locations/search/:query
```

#### Create location
```
POST /api/locations
Body: {
  "name": "string",
  "type": "Classroom|Lab|Office|Library|Cafeteria|Auditorium|Sports|Other",
  "building": "string",
  "floor": "string",
  "description": "string",
  "capacity": number,
  "amenities": ["string"]
}
```

### Faculty API

#### Get all faculty
```
GET /api/faculty
```

#### Get faculty by ID
```
GET /api/faculty/:id
```

#### Get faculty by department
```
GET /api/faculty/department/:dept
```

#### Create faculty
```
POST /api/faculty
Body: {
  "name": "string",
  "designation": "string",
  "department": "string",
  "office": "string",
  "email": "string",
  "phone": "string",
  "specialization": ["string"],
  "officeHours": "string"
}
```

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `client/src/index.css`:
```css
:root {
  --primary: #1a1a2e;
  --secondary: #16213e;
  --accent: #0f3460;
  --highlight: #e94560;
  /* ... */
}
```

### Adding New Features
1. Frontend: Add new components in `client/src/components/`
2. Backend: Add new routes in `server/routes/`
3. Database: Add new models in `server/models/`

## 👥 Team

**Design Project-1 Team**

- **Animesh Sharma** - 2023BCSE07AED048
- **Abhishek Maurya** - 2023BCSE07AED024
- **Shreyas S U** - 2023BCSE07AED045

**Mentor:** Mr. Sumit Kumar

**Institution:** Alliance University

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env`
- For Atlas, whitelist your IP address
- Verify network connectivity

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is created for educational purposes as part of the Design Project-1 course at Alliance University.

## 🙏 Acknowledgments

- Alliance University for providing the opportunity
- Our mentor Mr. Sumit Kumar for guidance
- Open source community for the amazing tools

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Contact the team members
- Reach out to the mentor

---

**Made with ❤️ by Alliance University Students**
