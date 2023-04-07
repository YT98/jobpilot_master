from dataclasses import dataclass
from py_ts_interfaces import Interface

from app import db


@dataclass
class Education(db.Model, Interface):
    id: int
    profile_id: int
    school_name: str
    location: str
    degree: str
    major_or_area_of_study: str
    currently_attending: bool
    start_date: str
    end_date: str
    description: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    school_name = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=True)
    degree = db.Column(db.String(255), nullable=True)
    major_or_area_of_study = db.Column(db.String(255), nullable=True)
    currently_attending = db.Column(db.Boolean, nullable=True)
    start_date = db.Column(db.String(255), nullable=True)
    end_date = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
