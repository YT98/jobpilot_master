from dataclasses import dataclass
from py_ts_interfaces import Interface

from app import db


@dataclass
class Education(db.Model, Interface):
    id: int
    profile_id: int
    school_name: str
    degree: str
    start_date: str
    end_date: str
    description: str

    id = db.Column(db.Integer, primary_key=True)
    profile_id = db.Column(db.Integer, db.ForeignKey('profile.id'), nullable=False)
    school_name = db.Column(db.String(255), nullable=True)
    degree = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.String(255), nullable=True)
    end_date = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
