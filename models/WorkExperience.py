from dataclasses import dataclass

from app import db

@dataclass
class WorkExperience(db.Model):
    id: int
    company_name: str
    title: str
    start_date: str
    end_date: str
    description: str

    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.String(255), nullable=False)
    end_date = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    