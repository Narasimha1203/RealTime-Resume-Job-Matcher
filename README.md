Real-Time AI Resume Job Matcher

A real-time web application that analyzes a user's resume and matches it with live job opportunities using real job data from the Adzuna Jobs API.

🚀 Live Demo

Frontend: https://real-time-resume-job-matcher.vercel.app/

Backend API: https://realtime-resume-job-matcher-1.onrender.com

📌 Project Overview

The Real-Time AI Resume Job Matcher helps job seekers discover relevant job opportunities based on the skills and experience present in their resume.

The application:

Accepts PDF and DOCX resumes
Extracts resume text and skills
Extracts education, experience, projects, and certifications
Searches real-time job listings
Matches resume skills with job requirements
Calculates an estimated match percentage
Shows matching skills
Shows missing skills
Provides an explanation for the match
Provides real application links
✨ Features
Resume Analysis
PDF resume parsing
DOCX resume parsing
Skill extraction
Education extraction
Experience extraction
Project extraction
Certification extraction
Real-Time Job Search
Uses the Adzuna Jobs API
Searches real job listings
Supports job search keywords
Supports location-based searches
Filters older job listings
Provides original job application links
Explainable Job Matching

For each job, the system provides:

Estimated match percentage
Matching skills
Missing skills
Additional resume skills
Job relevance
Matching explanation
Match score breakdown
Data quality information
Job Applications

Each job includes an actual application link so users can continue to the original job listing.

🏗️ System Architecture
                User
                  |
                  v
          React Frontend
             (Vercel)
                  |
                  | Resume Upload
                  v
         FastAPI Backend
            (Render)
                  |
      +-----------+-----------+
      |                       |
      v                       v
Resume Parser           Adzuna API
      |                       |
      v                       v
Skill Extraction       Real Job Listings
      |                       |
      +-----------+-----------+
                  |
                  v
          Matching Engine
                  |
                  v
    Explainable Job Results
                  |
                  v
         Real Apply Links
🛠️ Technologies Used
Frontend
React
JavaScript
CSS
Vite
Backend
Python
FastAPI
Uvicorn
Resume Processing
PyPDF
python-docx
Job Data
Adzuna Jobs API
Matching
Scikit-learn
TF-IDF
Rule-based skill matching
Semantic similarity
Deployment
Vercel
Render
GitHub
📂 Project Structure

RealTime_Resume_Job_Matcher/

├── backend/

│ ├── main.py

│ └── requirements.txt

├── frontend/

│ ├── src/

│ ├── package.json

│ └── ...

├── .gitignore

└── README.md

⚙️ Local Setup
1. Clone the repository

git clone https://github.com/Narasimha1203/RealTime-Resume-Job-Matcher.git

cd RealTime-Resume-Job-Matcher

2. Create a Python virtual environment

python -m venv venv

.\venv\Scripts\Activate.ps1

3. Install backend dependencies

cd backend

pip install -r requirements.txt

4. Configure environment variables

Create:

backend/.env

Add:

ADZUNA_APP_ID=your_app_id

ADZUNA_APP_KEY=your_app_key

Never upload the .env file or actual API credentials to GitHub.

5. Start the backend

python -m uvicorn main:app --reload

Backend:

http://127.0.0.1:8000

6. Start the frontend

Open another terminal:

cd frontend

npm install

npm run dev

Frontend:

http://localhost:5173

🔐 Security

API credentials are stored using environment variables.

The following should never be committed to GitHub:

.env

venv/

node_modules/

The .gitignore file is used to prevent sensitive and unnecessary files from being uploaded.

🎯 Why This Project Is Different

This project is designed around real-world functionality rather than static or fake job data.

Real Resume
↓
Resume Processing
↓
Real Job API
↓
Job Matching
↓
Explainable Results
↓
Real Application Link

The system uses live job listings and provides transparent matching information instead of claiming perfect or 100% matching accuracy.

🔮 Future Improvements
User authentication
PostgreSQL database
Saved jobs
Application tracking
Personalized recommendations
Resume improvement suggestions
Job alerts
User dashboards
Advanced NLP models
Job recommendation history
👨‍💻 Author

Narasimha

B.Tech Computer Science Engineering