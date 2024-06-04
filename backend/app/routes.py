from flask import Blueprint, request, jsonify
from .models import User, Credential
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from . import db, bcrypt
from flask_cors import cross_origin

auth_bp = Blueprint('auth', __name__)
credentials_bp = Blueprint('credentials', __name__)

@auth_bp.route('/signup', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

@credentials_bp.route('/', methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
@jwt_required()
def manage_credentials():
    user_id = get_jwt_identity()
    if request.method == 'POST':
        data = request.get_json()
        new_credential = Credential(user_id=user_id, website=data['website'], username=data['username'], password=data['password'])
        db.session.add(new_credential)
        db.session.commit()
        return jsonify({'message': 'Credential added successfully'}), 201
    elif request.method == 'GET':
        credentials = Credential.query.filter_by(user_id=user_id).all()
        credentials_list = [{'id': cred.id, 'website': cred.website, 'username': cred.username, 'password': cred.password} for cred in credentials]
        return jsonify(credentials_list), 200
