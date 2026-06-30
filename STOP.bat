@echo off
REM Script untuk menghentikan semua server

echo.
echo Menghentikan Backend Server...
taskkill /FI "WINDOWTITLE eq Backend Server*" /T /F

echo Menghentikan Frontend Server...
taskkill /FI "WINDOWTITLE eq Frontend Server*" /T /F

echo.
echo ✓ Semua server telah dihentikan
echo.

pause
