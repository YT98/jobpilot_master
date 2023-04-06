import os
import jwt
from flask import request, jsonify
from datetime import datetime, timedelta
from functools import wraps

from app import app
from models.Account import Account

SECRET_KEY = os.getenv('SECRET_KEY')


def create_jwt_token(account):
    payload = {
        'email': account.email,
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token


# Decorator function to protect routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        # Check if token is in request headers
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split()[1]

        # Return error if token is not found
        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            # Decode token and get account information
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_account = Account.query.filter_by(email=data['email']).first()
        except Exception as e:
            app.logger.error(e)
            return jsonify({'error': 'Invalid token'}), 401

        # Return protected route with current account
        return f(current_account, *args, **kwargs)

    return decorated
