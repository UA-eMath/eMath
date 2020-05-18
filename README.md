# eMath
new eMath system

## Intro
The project has two major components:

- The first component is to migrate the eMath system from a flat XML-DB to a proper DB backend, and to adapt the content presentation system to this new backend.

- The second component is to create a web interface for content authors. Using this interface, content authors should be able to easily edit existing content, as well as create new content.

## Getting started

1. clone this project:
   * cd to ` some dir ` 
   * `git clone https://github.com/wooloba/eMath.git` 
  
2. set up database(postgresql):
   * install
   
      `sudo apt update`
   
      `sudo apt install postgresql postgresql-contrib`
   
   * setup
   
   enter postgresql shell: `sudo -i -u postgres` then `psql`
   ```
   CREATE DATABASE emathdb;
   CREATE USER username WITH PASSWORD 'password'; (should be same as in django setting "backend/eMath/settings.py")
   GRANT ALL PRIVILEGES ON DATABASE emathdb TO username;
   ```
   * exit
   `\q` then `exit`
   
   * (optional) to get some sample data, 
    run `psql emathdb < emathdb.sql` to restore data from sql file.
   
3. Backend(Django):
     #### Prerequisites:
     
     python 3.7.x
     
     pip3
     
     #### setup virtual environment
     
     ```
      python3 -m venv emath
      source emath/bin/activate
     ```
     to deactivate simply do `deactivate`
     
     #### install packages
     
     ```
     cd eMath/backend/
     pip3 install -r requirements.txt
     
     ```
     
     #### apply database:
     ```
     python manage.py makemigrations
     python manage.py migrate
     ```
     
     #### run
     python manage.py runserver 
     
     #### Django admin site
     create a admin account:
     python manage.py createsuperuser
     
4. Frontend(React):

     #### Prerequisites:
 
     nvm node version management (optional)
     
     #### install packages
     ```
     sudo apt install nodejs
     sudo apt install npm
     sudo apt install yarn
     
     cd eMath/frontend
     yarn add 
     ```
     
     
     #### Run
     
     ```
     yarn start
     ```
     
     
     
     
     
        
        
   
