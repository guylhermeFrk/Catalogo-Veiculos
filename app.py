from datetime import timedelta, timezone, datetime
from extensions import db, migrate, cors, bcrypt, jwt

from flask import Flask, jsonify, request
from flask_jwt_extended import (
    create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies,
    jwt_required
)


app = Flask(__name__)


def build_app():
    app = Flask(__name__)
    app.config.from_object('extensions.config.LocalConfig')

    migrate.init_app(app, db)
    cors.init_app(app, suports_credentials=True)

    bcrypt.init_app(app)
    jwt.init_app(app)

    db.app = app
    db.init_app(app)

    return app


app = build_app()


@app.route('/login-token/', methods=['POST'])
def cria_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    usuario = db.session.query(Usuarios).filter_by(email=email).first()
    if usuario is None:
        return jsonify(error='Email ou senha inválidos'), 401

    if not bcrypt.check_password_hash(usuario.password, password):
        return jsonify(error='Não autorizado!'), 401

    access_token = create_access_token(identity=email)

    return jsonify(email=email, access_token=access_token)


@app.route('/sign-up/', methods=['POST'])
def sign_up():
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']

    usuario_existe = db.session.query(Usuarios).filter_by(email=email).first() is not None
    if usuario_existe:
        return jsonify(error='Email já cadastrado'), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    novo_usuario = Usuarios()
    novo_usuario.nome = name
    novo_usuario.email = email
    novo_usuario.password = hashed_password

    db.session.add(novo_usuario)
    db.session.commit()

    return jsonify(id=novo_usuario.id, email=novo_usuario.email)


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()['exp']
        now = datetime.now(timezone.utc)

        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data['access_token'] = access_token

        return response
    except (RuntimeError, KeyError):
        # caso não haja um jwt válido, retorna a resposta original
        return response


@app.route('/logout/', methods=['POST'])
def logout():
    response = jsonify(message='Deslogado com sucesso!')
    unset_jwt_cookies(response)

    return response


@app.route('/veiculos/', methods=['GET'])
def veiculos():
    veiculos = db.session.query(Veiculos).order_by(Veiculos.valor.desc()).all()
    veiculos_data = [veiculo.serialize() for veiculo in veiculos]

    return jsonify(veiculos_data=veiculos_data)


@app.route('/detalhes-veiculo/<int:id>/', methods=['GET'])
def detalhes_veiculo(id):
    veiculo = db.session.query(Veiculos).filter_by(id=id).first()
    if veiculo:
        veiculo_data = veiculo.serialize()
        return jsonify(veiculo_data=veiculo_data)
    else:
        return jsonify(error='Veículo não encontrado'), 404


@app.route('/novo-veiculo/', methods=['POST'])
def novo_veiculo():
    veiculo = Veiculos()
    veiculo.nome = request.json['nome']
    veiculo.marca = request.json['marca']
    veiculo.modelo = request.json['modelo']
    veiculo.valor = request.json['valor']

    db.session.add(veiculo)
    db.session.commit()

    veiculo_data = veiculo.serialize()

    return jsonify(veiculo_data=veiculo_data)


@app.route('/atualiza-veiculo/<int:id>/', methods=['PUT'])
def atualiza_veiculo(id):
    veiculo = db.session.query(Veiculos).filter_by(id=id).first()
    veiculo.nome = request.json['nome']
    veiculo.marca = request.json['marca']
    veiculo.modelo = request.json['modelo']
    veiculo.valor = request.json['valor']

    db.session.commit()

    veiculo_data = veiculo.serialize()

    return jsonify(veiculo_data=veiculo_data)


@app.route('/deleta-veiculo/<int:id>/', methods=['DELETE'])
def deleta_veiculo(id):
    veiculo = db.session.query(Veiculos).filter_by(id=id).first()

    db.session.delete(veiculo)
    db.session.commit()

    return jsonify(message=f'Veículo {veiculo.nome} deletado com sucesso!')


from models.models import Veiculos, Usuarios


if __name__ == '__main__':
    app.run(debug=True)
