from dataclasses import dataclass
from py_ts_interfaces import Interface
from app import db


@dataclass
class Resume(db.Model, Interface):
    id: int
    account_id: int
    resume_name: str
    job_title: str
    job_posting_id: int

    id = db.Column(db.Integer, primary_key=True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=False)
    resume_name = db.Column(db.String(255), nullable=False)
    job_title = db.Column(db.String(255), nullable=False)
    job_posting_id = db.Column(db.Integer, db.ForeignKey('job_posting.id'), nullable=True)


@dataclass
class ResumeContactInformation(db.Model, Interface):
    id: int
    resume_id: int
    email: str
    phone_number: str
    city: str
    region: str
    country: str

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    email = db.Column(db.String(255), nullable=True)
    phone_number = db.Column(db.String(255), nullable=True)
    city = db.Column(db.String(255), nullable=True)
    region = db.Column(db.String(255), nullable=True)
    country = db.Column(db.String(255), nullable=True)


@dataclass
class ResumeContactInformationLinks(db.Model, Interface):
    id: int
    resume_contact_information_id: int
    type: str
    url: str

    id = db.Column(db.Integer, primary_key=True)
    resume_contact_information_id = db.Column(db.Integer, db.ForeignKey('resume_contact_information.id'), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)


@dataclass
class ResumeWorkExperience(db.Model, Interface):
    id: int
    resume_id: int
    role: str
    company: str
    start_date: str
    end_date: str
    currently_working: bool
    location: str
    description: str

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    company = db.Column(db.String(255), nullable=False)
    start_date = db.Column(db.String(255), nullable=False)
    end_date = db.Column(db.String(255), nullable=True)
    currently_working = db.Column(db.Boolean, nullable=False)
    location = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=True)


@dataclass
class ResumeProject(db.Model, Interface):
    id: int
    resume_work_experience_id: int
    title: str
    organization: str
    start_date: str
    end_date: str
    currently_working: bool
    description: str

    id = db.Column(db.Integer, primary_key=True)
    resume_work_experience_id = db.Column(db.Integer, db.ForeignKey('resume_work_experience.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    organization = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.String(255), nullable=False)
    end_date = db.Column(db.String(255), nullable=True)
    currently_working = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(255), nullable=True)


@dataclass
class ResumeEducation(db.Model, Interface):
    id: int
    resume_id: int
    degree: str
    school: str
    location: str
    start_date: str
    end_date: str
    currently_attending: bool
    description: str

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    degree = db.Column(db.String(255), nullable=False)
    school = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.String(255), nullable=False)
    end_date = db.Column(db.String(255), nullable=True)
    currently_attending = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(255), nullable=True)


@dataclass
class ResumeCertification(db.Model, Interface):
    id: int
    resume_id: int
    certification_name: str
    issuing_organization: str
    date: str
    description: str

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    certification_name = db.Column(db.String(255), nullable=False)
    issuing_organization = db.Column(db.String(255), nullable=True)
    date = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)


@dataclass
class ResumeInvolvement(db.Model, Interface):
    id: int
    resume_id: int
    role: str
    organization: str
    start_date: str
    end_date: str
    currently_involved: bool
    description: str

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    organization = db.Column(db.String(255), nullable=True)
    start_date = db.Column(db.String(255), nullable=False)
    end_date = db.Column(db.String(255), nullable=True)
    currently_involved = db.Column(db.Boolean, nullable=False)
    description = db.Column(db.String(255), nullable=True)


@dataclass
class ResumeSkill(db.Model, Interface):
    id: int
    resume_id: int
    skill_id: int

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=False)


@dataclass
class ResumeLanguage(db.Model, Interface):
    id: int
    resume_id: int
    language_id: int

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    language_id = db.Column(db.Integer, db.ForeignKey('language.id'), nullable=False)


@dataclass
class ResumeSummary(db.Model, Interface):
    id: int
    resume_id: int
    summary: str

    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey('resume.id'), nullable=False)
    summary = db.Column(db.String(255), nullable=False)
