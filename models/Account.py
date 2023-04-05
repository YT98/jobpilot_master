from dataclasses import dataclass

from app import db

@dataclass
class Account(db.Model):
    id: int
    email: str
    password: str
    first_name: str
    last_name: str
    invitation_code_id: str
    profile_id: int

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    invitation_code_id = db.Column(db.Integer, db.ForeignKey('invitation_code.id'), nullable=False)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)