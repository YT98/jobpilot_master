from dataclasses import dataclass
from py_ts_interfaces import Interface

from app import db


@dataclass
class JobPosting(db.Model, Interface):
    id: int
    profile_id: int
    title: str
    location: str
    description: str
    company_name: str
    date_posted: str
    experience_qualification: str
    education_qualification: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    date_posted = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    experience_qualification = db.Column(db.Text, nullable=True)
    education_qualification = db.Column(db.Text, nullable=True)


@dataclass
class JobPostingSkill(db.Model, Interface):
    id: int
    job_posting_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    job_posting_id = db.Column(db.Integer, db.ForeignKey('job_posting.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)
