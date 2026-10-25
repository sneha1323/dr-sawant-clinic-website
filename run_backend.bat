@echo off
echo Starting Dr Sawant's Clinic Backend...
cd /d "%~dp0backend"

REM Use the project virtual environment directly so we don't depend on the
REM system "python" (which may be missing/broken). The venv already contains
REM fastapi, uvicorn, motor, etc.
if not exist ".venv\Scripts\python.exe" (
    echo Creating Python virtual environment...
    uv venv --seed .venv
)

REM Install dependencies only if fastapi is missing (skips a slow reinstall).
".venv\Scripts\python.exe" -c "import fastapi" 2>nul
if errorlevel 1 (
    echo Installing dependencies...
    ".venv\Scripts\python.exe" -m pip install -r requirements.txt
)

echo Starting FastAPI server at http://localhost:8000 ...
".venv\Scripts\python.exe" -m uvicorn server:app --reload --port 8000
pause
