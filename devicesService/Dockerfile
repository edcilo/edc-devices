FROM python:3.10-alpine

RUN apk update \
    && apk add --no-cache \
        build-base \
        postgresql-dev	\
        python3-dev

WORKDIR /app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

RUN touch /var/log/cron.log
COPY ./devicescron /etc/cron.d/devicescron
RUN chmod 0644 /etc/cron.d/devicescron
RUN /usr/bin/crontab /etc/cron.d/devicescron

COPY . .
RUN pip install -e .

RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]
