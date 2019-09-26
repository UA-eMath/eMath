# Use an official Python runtime as a parent image
FROM python:3.7

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /eMath

# Install Python dependencies
COPY requirements.txt /eMath/eMath
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Add the rest of the code
COPY . /eMath

# Make port 8000 available for the app
EXPOSE 8000

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
