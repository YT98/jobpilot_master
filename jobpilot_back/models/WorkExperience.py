from dataclasses import dataclass

from app import db

@dataclass
class WorkExperience(db.Model):
    id: int
    profile_id: int
    company_name: str
    title: str
    start_date: str
    end_date: str
    description: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    company_name = db.Column(db.String(255), nullable=True)
    title = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.String(255), nullable=True)
    end_date = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)


@dataclass
class WorkExperienceSkill(db.Model):
    id: int
    work_experience_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    work_experience_id = db.Column(db.Integer, db.ForeignKey('work_experience.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
    