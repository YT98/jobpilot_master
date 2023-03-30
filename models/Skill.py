from dataclasses import dataclass

from app import db

@dataclass
class Skill(db.Model):
    id: int
    name: str
    soft_skill: bool
    hard_skill: bool

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    soft_skill = db.Column(db.Boolean, nullable=True)
    hard_skill = db.Column(db.Boolean, nullable=True)