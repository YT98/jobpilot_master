from dataclasses import dataclass

from app import db

@dataclass
class JobPosting(db.Model):
    id: int
    title: str
    description: str
    company_name: str
    date_posted: str

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    date_posted = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    # TODO
    # mentions_education = db.Column(db.Boolean, nullable=False)
    # education_level = db.Column(db.String(255), nullable=True)
    # mentions_years_experience = db.Column(db.Boolean, nullable=False)
    # years_experience = db.Column(db.Integer, nullable=True)

@dataclass
class JobPostingSkills(db.Model):
    id: int
    job_posting_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    job_posting_id = db.Column(db.Integer, db.ForeignKey('job_posting.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)