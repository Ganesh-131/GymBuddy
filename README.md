# GymBuddy
📌 Overview

Gym Buddy is a full-stack fitness web application that helps users track workouts and perform exercises using AI-based posture detection and rep counting.

The system uses:

Frontend: React
Backend: Node.js + Express.js
Database: MongoDB
AI Engine: MediaPipe + OpenCV
🚀 Features
🔐 Authentication
User Registration
User Login
Secure credential storage
🏋️ Workout System
Select exercise (e.g., bicep curls)
Start workout session
Automatic rep counting
🤖 AI-Based Rep Counter
Real-time body tracking using camera
Detects joint movement
Counts reps using angle-based logic
Voice feedback during exercise
📊 Dashboard
View workout history
Track reps performed
Exercise-wise data
🔄 Real-Time Integration
Python AI communicates with backend
Backend streams rep count to frontend
Live updates on workout page
🧠 How It Works
Frontend (React)
      ↓
Backend (Node + Express)
      ↓
Python AI Script (MediaPipe + OpenCV)
      ↓
Camera → Pose Detection → Rep Count
      ↓
Backend → Frontend (Live Updates)
📁 Project Structure
GymBuddy/
│
├── gym-frontend/        # React App
│   ├── src/pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Dashboard.js
│   │   └── Workout.js
│
├── gym-backend/         # Node + Express API
│   ├── server.js
│   ├── models/
│
├── ai/                  # AI Module
│   └── pose.py
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-link>
cd GymBuddy
2️⃣ Backend Setup
cd gym-backend
npm install
node server.js
3️⃣ Frontend Setup
cd gym-frontend
npm install
npm start
4️⃣ AI Setup (Python)
pip install opencv-python mediapipe pyttsx3

Run AI:

python pose.py
🧪 Usage
Register/Login
Go to Dashboard
Select Workout
Click Start AI Workout
Camera opens
Perform exercise
Reps update automatically
Stop workout to save
👥 Team Structure
Role	Responsibility
Lead (You)	AI + Integration + Testing
Member 2	Backend + Database
Member 3	Frontend + UI
🔮 Future Enhancements
Add more exercises (Squats, Pushups)
Posture correction feedback
JWT Authentication
User-specific dashboards
Diet chatbot
Streak tracking system
🎯 Tech Stack Summary
Frontend: React
Backend: Node.js, Express
Database: MongoDB
AI: MediaPipe, OpenCV
Language: JavaScript, Python
💡 Key Highlight

This project demonstrates:

Full-stack development
Real-time system integration
AI-based computer vision
Practical fitness application
📜 License

This project is for educational purposes.
