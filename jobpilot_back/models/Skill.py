from dataclasses import dataclass
from py_ts_interfaces import Interface

from app import db


@dataclass
class Skill(db.Model, Interface):
    id: int
    name: str

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
