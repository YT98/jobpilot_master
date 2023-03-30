from flask import Blueprint, jsonify, request

from app import db
from models.JobPosting import JobPosting, JobPostingSkills
from models.Skill import Skill
from gpt.gpt import ask_gpt
from gpt.prompts import COMPANY_NAME_PROMPT, JOB_TITLE_PROMPT, SKILLS_PROMPT

job_posting_bp = Blueprint('job_posting_bp', __name__)

@job_posting_bp.route('/get_all', methods=['GET'])
def get_all_job_postings():
    job_postings = JobPosting.query.all()
    return jsonify(job_postings)

@job_posting_bp.route('/add', methods=['POST'])
def add_job_posting():
    data = request.get_data().decode('utf-8')

    title = ask_gpt(data + JOB_TITLE_PROMPT, max_tokens=100, stop=["\n"])
    company_name = ask_gpt(data + COMPANY_NAME_PROMPT, max_tokens=100, stop=["\n"])
    skills = ask_gpt(data + SKILLS_PROMPT, max_tokens=1000).split(", ")

    job_posting = JobPosting(
        title=title,
        company_name=company_name,
        description=data
    )

    db.session.add(job_posting)
    db.session.commit()
    db.session.refresh(job_posting)

    for skill_name in skills:
        skill = Skill.query.filter_by(name=skill_name).first()
        if skill is None:
            skill = Skill(name=skill_name)
            db.session.add(skill)
            db.session.commit()

        job_posting_skill = JobPostingSkills(
            job_posting_id = job_posting.id,
            skill_id = skill.id
        )

        db.session.add(job_posting_skill)

    db.session.commit()
    return job_posting

@job_posting_bp.route('/job_posting_skills/get_by_job_posting_id/<job_posting_id>', methods=['GET'])
def get_job_posting_skills_by_job_posting_id(job_posting_id):
    job_posting_skills = JobPostingSkills.query.filter_by(job_posting_id=job_posting_id).all()
    return jsonify(job_posting_skills)