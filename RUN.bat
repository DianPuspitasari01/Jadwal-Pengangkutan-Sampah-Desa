@echo off
REM Script untuk menjalankan Sistem Manajemen Pengangkutan Sampah

echo.
echo ================================================
echo Sistem Manajemen Pengangkutan Sampah
echo ================================================
echo.
echo Memulai Backend Server...
echo.

start "Backend Server" cmd /c "cd /d c:\tugas pak mujib\backend && npm start"

timeout /t 3

echo Memulai Frontend Server...
echo.

start "Frontend Server" cmd /c "cd /d c:\tugas pak mujib\frontend && npm run dev"

echo.
echo ================================================
echo ✓ Aplikasi sedang dimulai...
echo.
echo Backend  : http://localhost:5000
echo Frontend : http://localhost:3000
echo.
echo Silakan buka browser dan akses: http://localhost:3000
echo.
echo Data Login:
echo   Admin  : admin / admin123
echo   Warga  : budi / budi123
echo.
echo ================================================
echo.

pause
