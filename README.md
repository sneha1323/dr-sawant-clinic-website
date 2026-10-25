# Dr Sawant’s Advanced Homeopathic Clinic Web Application

A full-stack medical clinic application built with **React, TailwindCSS, CRACO, FastAPI, and MongoDB**.

## Features

- **Homeopathic & Aesthetic Services**: Interactive service tabs for Homeopathic Care, Skin Treatments, Hair Restoration, and FDA-Approved Laser Therapies.
- **Appointment Booking System**: Interactive modal form to schedule appointments, syncing directly with the FastAPI backend, local storage backup, and direct WhatsApp notification link generation.
- **Responsive Doctor Profile & Details**: Highlight qualifications (MD(Hom), BHMS, P.G.P.D.C) and 4-step patient treatment journey.
- **Mobile Sticky Action Bar**: Instant Call, WhatsApp, and Booking buttons optimized for mobile users.
- **Robust Backend API**: FastAPI server supporting appointments, contact inquiries, health status, and MongoDB integration with offline fallback handling.

---

## Quick Start (One-Click Launch)

Double-click `start_all.bat` in `d:\sawant\app` to launch both Backend and Frontend servers automatically!

Alternatively, you can run them manually:

### 1. Run Backend Server

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn server:app --reload --port 8000
```

Backend will be available at: `http://localhost:8000`  
API Docs: `http://localhost:8000/docs`

### 2. Run Frontend Web App

```bash
cd frontend
yarn install
yarn start
```

Frontend app will open automatically at: `http://localhost:3000`

---

## Project Structure

```
app/
├── backend/
│   ├── server.py             # FastAPI Server & Routes
│   ├── requirements.txt      # Python Dependencies
│   └── .env                  # Backend Environment Variables
├── frontend/
│   ├── craco.config.js       # CRACO Webpack Alias Config
│   ├── public/
│   │   └── index.html        # HTML Template with Google Fonts
│   ├── src/
│   │   ├── App.js            # Main React Application & UI
│   │   ├── index.css         # Tailwind & Custom Styling
│   │   └── constants/
│   │       └── testIds.js    # Interactive Element Test IDs
│   ├── package.json          # Node Dependencies
│   └── tailwind.config.js    # Tailwind Configuration
├── run_backend.bat           # Backend launcher batch file
├── run_frontend.bat          # Frontend launcher batch file
└── start_all.bat             # Full stack launcher batch file
```
