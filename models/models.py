from extensions import db
from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID


def get_uuid():
    return uuid4().hex


class Veiculos(db.Model):
    __tablename__ = 'veiculos'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100))
    marca = db.Column(db.String(100))
    modelo = db.Column(db.String(100))
    valor = db.Column(db.Float, default=0)

    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'marca': self.marca,
            'modelo': self.modelo,
            'valor': self.valor
        }


class Usuarios(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(UUID(as_uuid=True), primary_key=True, nullable=False, default=get_uuid)
    nome = db.Column(db.String(150), unique=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)
