@REM DISCLAIMER: This is just an example and should not be run!

@REM ------------------------------------------------------------------------
@REM This is just to prevent unpredictable outcomes if someone actually runs this file
@REM It doesn't have anything to do with the actual code
@echo off
echo This executable should not be run, rather open it in a code editor!
pause
exit
@REM ------------------------------------------------------------------------
@REM ------------------------------------------------------------------------




@echo off

echo Your Projects:
echo 1. Project One
echo 2. Project Two
echo 3. Project Three

echo.

@echo off
set /p PROJECT="Select a Project to open: "

echo You selected: %PROJECT%

if %PROJECT% GTR 3 (
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

RootDirectory:
@REM Example "C:", "B:", "A:" with colons and without the quotes in order to switch to the root directory first before running the next piece of code

cd "RootDirectory:/yourFiles/projectFolder"

if %PROJECT%==1 node index.js project_one
if %PROJECT%==2 node index.js project_two
if %PROJECT%==3 node index.js project_three

echo.
pause