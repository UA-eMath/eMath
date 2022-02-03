#!/bin/bash
source venv/bin/activate
cd eMath/deploy/
chmod +x predeploy.sh && ./predeploy.sh
python3 deployMe/manage.py runserver 0:8000 & 
echo "Project has started!"