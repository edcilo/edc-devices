FROM python:3.9-alpine

RUN apk update \
    && apk add --no-cache \
        build-base \
        postgresql-dev	\
        python3-dev

WORKDIR /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN pip install -e .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
