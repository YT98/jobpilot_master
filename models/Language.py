from dataclasses import dataclass

from app import db

@dataclass
class Language(db.Model):
    id: int
    name: str
    proficiency: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    proficiency = db.Column(db.String(255), nullable=False)