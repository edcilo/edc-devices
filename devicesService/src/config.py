import os

config = {
    "app": {
        "name": os.getenv("APP_NAME", "app"),
        "env": os.getenv("APP_ENV", "development"),
        "version": os.getenv("APP_VERSION", "1.0.0"),
    },
    "db": {
        "host": os.getenv("DB_HOST", "localhost"),
        "port": os.getenv("DB_PORT", "5432"),
        "name": os.getenv("DB_NAME", "devices"),
        "user": os.getenv("DB_USER", "postgres"),
        "password": os.getenv("DB_PASS", "postgres"),
    },
}
