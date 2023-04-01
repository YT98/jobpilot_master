import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from gpt.gpt import init_openai

db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__)
if (os.getenv('FLASK_ENV') == 'development'):
    CORS(app)

# Load environment variables from .env file
load_dotenv()

# Set up the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate.init_app(app, db)

from routes.job_posting_bp import job_posting_bp
app.register_blueprint(job_posting_bp, url_prefix='/job_posting')

from routes.user_bp import user_bp
app.register_blueprint(user_bp, url_prefix='/user')

from routes.auth_bp import auth_bp
app.register_blueprint(auth_bp, url_prefix='/auth')

init_openai()