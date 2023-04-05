import os
from flask import Blueprint, jsonify, request
from auth.auth import create_jwt_token

from app import db
from models.Profile import Profile
from models.Account import Account
from models.InvitationCode import InvitationCode

SECRET_KEY = os.getenv('SECRET_KEY')
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    # Verify profile credentials
    email = request.json.get('email')
    password = request.json.get('password')

    profile = Profile.query.filter_by(email=email).first()
    if profile is None:
        return jsonify({'error': 'Invalid credentials'}), 401
    if profile.password != password:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Create JWT token
    token = create_jwt_token(profile)

    return jsonify({
        'token': token,
        'profile': {
            'id': profile.id,
            'email': profile.email,
            'firstName': profile.first_name,
            'lastName': profile.last_name
        }
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    email = request.json.get('email')
    password = request.json.get('password')
    first_name = request.json.get('firstName')
    last_name = request.json.get('lastName')
    invitation_code = request.json.get('invitationCode')

    # Check if any fields are missing
    if email is None or password is None or first_name is None or last_name is None or invitation_code is None:
        return jsonify({'error': 'Missing fields'}), 400

    # Check if email is already in use
    account = Account.query.filter_by(email=email).first()
    if account is not None:
        return jsonify({'error': 'Email is already in use'}), 400
    
    # Check if invitation code is valid
    invitation_code = InvitationCode.query.filter_by(code=invitation_code).first()
    if invitation_code is None or invitation_code.used:
        return jsonify({'error': 'Invalid invitation code'}), 400
    
    # Create account
    account = Account(email=email, password=password, first_name=first_name, last_name=last_name, invitation_code_id=invitation_code.id)
    db.session.add(account)
    db.session.commit()

    # Set invitation code as used
    invitation_code.used = True
    db.session.commit()

    # Create JWT token
    token = create_jwt_token(account)

    return jsonify({
        'message': 'success',
        'token': token,
    })
