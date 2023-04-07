from dataclasses import dataclass
import datetime
from py_ts_interfaces import Interface

from app import db


@dataclass
class WorkExperience(db.Model, Interface):
    id: int
    profile_id: int
    company_name: str
    location: str
    currently_working: bool
    title: str
    start_date: datetime.date
    end_date: datetime.date
    description: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    currently_working = db.Column(db.Boolean, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=True)
    description = db.Column(db.Text, nullable=True)


@dataclass
class WorkExperienceSkill(db.Model, Interface):
    id: int
    work_experience_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    work_experience_id = db.Column(db.Integer, db.ForeignKey('work_experience.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
