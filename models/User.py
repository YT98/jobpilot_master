from dataclasses import dataclass

from app import db

@dataclass
class User(db.Model):
    id: int
    email: str
    password: str
    first_name: str
    last_name: str
    phone_number: str
    linkedin_url: str
    github_url: str
    website_url: str

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=True)
    last_name = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(255), nullable=True)
    linkedin_url = db.Column(db.String(255), nullable=True)
    github_url = db.Column(db.String(255), nullable=True)
    website_url = db.Column(db.String(255), nullable=True)

@dataclass
class UserSkills(db.Model):
    id: int
    user_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)

@dataclass
class UserLanguages(db.Model):
    id: int
    user_id: int
    language_id: int

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'), nullable=False)

@dataclass
class UserEducation(db.Model):
    id: int
    user_id: int
    education_id: int

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    education_id = db.Column(db.Integer, db.ForeignKey('education.id'), nullable=False)

@dataclass
class UserWorkExperience(db.Model):
    id: int
    user_id: int
    work_experience_id: int

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    work_experience_id = db.Column(db.Integer, db.ForeignKey('work_experience.id'), nullable=False)