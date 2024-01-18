from datetime import timedelta


class Config:
    SECRET_KEY = '123456790'
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class LocalConfig(Config):
    AMBIENTE = 'Local'
    DEBUG = True
    PORT = 5000
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres@localhost:5432/veiculos'
    CORS_HEADERS = 'Content-Type'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
