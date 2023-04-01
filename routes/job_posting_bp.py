from flask import Blueprint, jsonify, request
import json

from app import db
from models.JobPosting import JobPosting, JobPostingSkills
from models.Skill import Skill
from gpt.gpt import ask_gpt
from gpt.prompts import EXTRACT_JOB_POSTING_INFORMATION_PROMPT

job_posting_bp = Blueprint('job_posting_bp', __name__)

@job_posting_bp.route('/get-all/<user_id>', methods=['GET'])
def get_all_job_postings(user_id):
    job_postings = JobPosting.query.filter_by(user_id=user_id).all()
    return jsonify(job_postings)

@job_posting_bp.route('/create', methods=['POST'])
def create_job_posting():
    data = request.get_json()
    user_id = data['userId']
    description = data['description']

    # ask to extract information
    prompt = EXTRACT_JOB_POSTING_INFORMATION_PROMPT + description
    print("asking gpt to extract information from job posting...")
    # TODO: handle errors
    response = ask_gpt(prompt, max_tokens=2000)
    
    job_posting_info = json.loads(response)

    job_posting = JobPosting(
        title=job_posting_info['title'],
        company_name=job_posting_info['companyName'],
        description=description,
        user_id=user_id
    )

    # TODO: Add skills

    db.session.add(job_posting)
    db.session.commit()
    db.session.refresh(job_posting)

    return {"message": "success"}

@job_posting_bp.route('/job_posting_skills/get_by_job_posting_id/<job_posting_id>', methods=['GET'])
def get_job_posting_skills_by_job_posting_id(job_posting_id):
    job_posting_skills = JobPostingSkills.query.filter_by(job_posting_id=job_posting_id).all()
    return jsonify(job_posting_skills)