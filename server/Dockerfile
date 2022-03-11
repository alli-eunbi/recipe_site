FROM python:3

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx
RUN apt-get install 'ffmpeg'\
    'libsm6'\
    'libxext6'  -y

RUN pip install gunicorn

COPY . .

EXPOSE 5000

CMD [ "gunicorn", "app:app", "-b", "0.0.0.0:5000", "--timeout", "300" ]
