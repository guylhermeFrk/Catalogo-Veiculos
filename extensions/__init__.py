from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(session_options={
    'expire_on_commit': False
})

bcrypt = Bcrypt()
cors = CORS()
jwt = JWTManager()
migrate = Migrate()