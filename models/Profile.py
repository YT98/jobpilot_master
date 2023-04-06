from dataclasses import dataclass

from app import db

@dataclass
class Profile(db.Model):
    id: int
    email: str
    first_name: str
    last_name: str
    phone_number: str

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=True)
    last_name = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(255), nullable=True)

@dataclass
class ProfileSkills(db.Model):
    id: int
    profile_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)

@dataclass
class ProfileLanguages(db.Model):
    id: int
    profile_id: int
    language_id: int
    proficiency: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'), nullable=False)
    proficiency = db.Column(db.String(255), nullable=True)

@dataclass
class ProfileLinks(db.Model):
    id: int
    profile_id: int
    type: str
    url: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)