@echo off
cd seed-bead-shop-client
start cmd /k "npm run dev"
cd ..
cd server
call .\.venv\Scripts\activate
start cmd /k "python app.py"