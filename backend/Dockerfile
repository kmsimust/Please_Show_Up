FROM python:3.12.4

WORKDIR /app

RUN  apt-get update && apt-get install -y curl

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . .
