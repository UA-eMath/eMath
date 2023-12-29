# eMath: Empowering Educational Interaction

eMath is a comprehensive system designed to empower professors and students in the creation and exploration of educational content. Professors can effortlessly author books within the platform, incorporating a variety of links such as references to other books in the database, links to webpages, links to modules for illustration and exploration, as well as quiz questions. This flexible environment fosters interactive learning experiences.

### Key Features

- Book Creation: Professors can seamlessly create and customize educational books with multimedia elements, modules for exploration.
- Versatile Links: Insert references to other books within the database, link to external webpages, and seamlessly integrate tools for instant formative feedback.
- Mathematics Notation: Handled by `MathJax`, providing the option for global and local use of `\newcommands`. This enables authors to simplify data entry for presentation. In addition, it enables the author to develop a semantic markup system for math notation. In the latter case, mouse over on a math notation triggers a little hint window which explains the meaning of the notation.
- User Roles: Users, classified as professors, teaching assistants, students, or testers, are assigned distinct roles during creation. These roles dictate access levels and available features.
- Role-Based Experience: Tailored homepages and feature accessibility based on user roles ensure a personalized and intuitive experience for professors and students.

### Usage

1. Professor Role

- Create and edit books.
- Manage links and content.
- Potentially moderate user-generated content.

2. Student Role

- Access and read books.
- Follow links and engage with educational content.

3. Teaching Assistant Role

- Modify specific books
- Same as Student role
  
4. Tester

- Test features


## Development Goals

1. Database Migration: migrate the eMath system from a flat XML-DB to a proper DB backend, and to adapt the content presentation system to this new backend.

2. Content Authoring Web Interface: create a web interface for content authors. Using this interface, content authors should be able to easily edit existing content, as well as create new content.

## Getting Started

1. Database(postgresql):

   - Install

     `sudo apt update`

     `sudo apt install postgresql postgresql-contrib`

   - Setup user

     enter postgresql shell: `sudo -i -u postgres` then `psql` (if not work, try `psql postgres`)

     ```
     CREATE DATABASE emathdb;
     CREATE USER admin WITH PASSWORD 'admin1234';
     GRANT ALL PRIVILEGES ON DATABASE emathdb TO admin;
     ```

   - Useful commands

     - drop table

       ```
       DROP DATABASE emathdb;
       ```

     - exit
       `\q` then `exit`

     - export database

       ```
       pg_dump -U admin emathdb > emathdump.pgsql
       ```

     - (optional) to get some sample data,
       run `psql emathdb < emathdb.sql` to restore data from sql file.

2. Backend(Django):

   #### Prerequisites:

   python 3.7.x
   pip3

   #### setup virtual environment

   ```
    python3 -m venv venv
    source venv/bin/activate
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

3. Frontend(React):

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

## Google OAuth Integration

eMath offers the convenience of logging in through both traditional username/password credentials and Google accounts. To enable Google OAuth integration, follow these steps:

1. Create Google OAuth Credentials:
   
- Follow the instruction [here](https://developers.google.com/fit/android/get-api-key)

2. Update Settings:

- Open the `settings.py` file in the eMath backend codebase.
- Locate the variables `GOOGLE_OAUTH2_CLIENT_ID` and `GOOGLE_OAUTH2_SECRET`.
- Update these variables with the corresponding values from your Google OAuth credentials.

- Open the `credentials.js` file in the eMath frontend codebase.
- Locate the variables `OAuthClient`.
- Update the object with the corresponding values from your Google OAuth credentials.
