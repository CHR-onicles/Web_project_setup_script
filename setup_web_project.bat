@echo off

echo Your Projects:
echo 1. Cause
echo 2. Adkasa
echo 3. Polymorph
echo 4. MZPEM

echo.

@echo off
set /p PROJECT="Select a Project to open: "
:: /A is for working with numbers

echo You selected: %PROJECT%

if %PROJECT% GTR 4 (
    echo Invalid choice!
    pause
    exit
)

if %PROJECT% LSS 1 (
    echo Invalid choice!
    pause
    exit
)

@echo off
A:

cd "A:/A_SOURCE/Local/Web Dev/R HEMI/Web_project_setup_node"

if %PROJECT%==1 node index.js cause
if %PROJECT%==2 node index.js adkasa
if %PROJECT%==3 node index.js polymorph
if %PROJECT%==4 node index.js mzpem

echo.
@REM pause