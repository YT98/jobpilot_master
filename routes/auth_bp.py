import os
from flask import Blueprint, jsonify, request
from auth.auth import create_jwt_token

from app import db
from models.User import User

SECRET_KEY = os.getenv('SECRET_KEY')
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    # Verify user credentials
    email = request.json.get('email')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'Invalid credentials'}), 401
    if user.password != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Create JWT token
    token = create_jwt_token(user)

    return jsonify({
        'token': token,
        'user': {
            'id': user.id,
            'email': user.email,
            'firstName': user.first_name,
            'lastName': user.last_name
        }
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User(email=email, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'success'})