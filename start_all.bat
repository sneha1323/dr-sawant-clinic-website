@echo off
echo ====================================================
echo Starting Dr Sawant's Advanced Homeopathic Clinic App
echo ====================================================
start "Clinic Backend API" cmd /k "run_backend.bat"
start "Clinic Web Frontend" cmd /k "run_frontend.bat"
echo Applications launching in separate command windows!
