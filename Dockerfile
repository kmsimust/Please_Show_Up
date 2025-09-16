FROM python:3.12.4

ENV PYTHONUNBUFFERED 1

WORKDIR /app

RUN  apt-get update && apt-get install -y curl

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY ./backend/requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
#