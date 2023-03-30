import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_migrate import Migrate

from models import db, JobPosting
from routes.routes import init_routes
from gpt.gpt import init_openai

app = Flask(__name__)

# Load environment variables from .env file
load_dotenv()

# Set up the database connection
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
init_routes(app)
init_openai()

if __name__ == '__main__':
    app.run(debug=True)