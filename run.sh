#!/bin/bash
source venv/bin/activate
cd frontend
yarn start & python3 ../backend/manage.py runserver & 
echo "Project has started!"