@echo off
echo Starting Dr Sawant's Clinic Frontend...
cd /d "%~dp0frontend"

REM npm + npx ship with Node; this runs the local craco (in node_modules),
REM so a global "yarn" install is not required.
if not exist "node_modules" (
    echo Installing node dependencies...
    call npm install
)

echo Launching React Web Application...
call npx --yes craco start
pause
