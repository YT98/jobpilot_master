from dataclasses import dataclass

from app import db

@dataclass
class InvitationCode(db.Model):
    id: int
    code: str
    used: bool

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(255), nullable=False)
    used = db.Column(db.Boolean, nullable=False, default=False)