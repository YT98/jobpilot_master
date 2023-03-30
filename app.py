import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from gpt.gpt import init_openai

db = SQLAlchemy()
migrate = Migrate()

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Set up the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate.init_app(app, db)

from routes.job_posting_bp import job_posting_bp
app.register_blueprint(job_posting_bp, url_prefix='/job_posting')

init_openai()