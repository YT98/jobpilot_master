from flask import Blueprint, jsonify, request
import json
import time

from app import db
from models.JobPosting import JobPosting, JobPostingSkills
from models.User import User, UserSkills
from models.Skill import Skill
from gpt.gpt import ask_gpt
from gpt.prompts import EXTRACT_JOB_POSTING_INFORMATION_PROMPT

job_posting_bp = Blueprint('job_posting_bp', __name__)

@job_posting_bp.route('/user/<user_id>', methods=['GET'])
def get_all_user_job_postings(user_id):
    job_postings = JobPosting.query.filter_by(user_id=user_id).all()
    return jsonify(job_postings)

@job_posting_bp.route('/<job_posting_id>', methods=['GET'])
def get_job_posting(job_posting_id):
    job_posting = JobPosting.query.filter_by(id=job_posting_id).first()
    return jsonify(job_posting)

@job_posting_bp.route('/extract', methods=['POST'])
def extract_job_posting():
    data = request.get_json()
    user_id = data['userId']
    description = data['description']

    # ask to extract information
    prompt = EXTRACT_JOB_POSTING_INFORMATION_PROMPT + description
    print("asking gpt to extract information from job posting...")
    # TODO: handle errors
    response = ask_gpt(prompt, max_tokens=2000)
    
    job_posting_info = json.loads(response)

    return {
        "message": "success",
        "jobPosting": job_posting_info
    }

@job_posting_bp.route('/fake-extract', methods=['POST'])
def fake_extract_job_posting():
    time.sleep(2)

    return {
        "message": "success",
        "jobPosting": {
            "title": "Software Engineer",
            "companyName": "Google",
            "location": "Mountain View, CA",
            "skills": ["Python", "Java", "C++"],
            "description": "description",
            "qualifications": {
                "education": "Bachelor's degree in Computer Science or related field",
                "experience": "3+ years of experience in software development"
            }
        }
    }

@job_posting_bp.route('/create', methods=['POST'])
def create_job_posting():
    data = request.get_json()
    user_id = data['userId']
    job_posting_info = data['jobPosting']

    job_posting = JobPosting(
        title=job_posting_info['title'],
        company_name=job_posting_info['companyName'],
        location=job_posting_info['location'],
        description=job_posting_info['description'],
        education_qualification=job_posting_info['qualifications']['education'],
        experience_qualification=job_posting_info['qualifications']['experience'],
        user_id=user_id
    )

    db.session.add(job_posting)
    db.session.commit()
    db.session.refresh(job_posting)


    print(job_posting_info['skills'])
    for skill_name in job_posting_info['skills']:
        skill = Skill.query.filter_by(name=skill_name).first()
        if skill is None:
            skill = Skill(name=skill_name)
            db.session.add(skill)
            db.session.commit()
            db.session.refresh(skill)
        job_posting_skill = JobPostingSkills(job_posting_id=job_posting.id, skill_id=skill.id)
        db.session.add(job_posting_skill)

    db.session.commit()

    return {
        "message": "success",
        "jobPostingId": job_posting.id
    }

@job_posting_bp.route('/fake-create', methods=['POST'])
def fake_create_job_posting():

    time.sleep(2)

    return {
        "message": "success",
        "jobPostingId": 1
    }

@job_posting_bp.route('/job_posting_skills/get_by_job_posting_id/<job_posting_id>', methods=['GET'])
def get_job_posting_skills_by_job_posting_id(job_posting_id):
    job_posting_skills = JobPostingSkills.query.filter_by(job_posting_id=job_posting_id).all()
    return jsonify(job_posting_skills)

@job_posting_bp.route('/qualification-comparison/<job_posting_id>', methods=['GET'])
def get_qualification_comparison(job_posting_id):

    return jsonify({
        "jobPostingEducationQualification": "Bachelor's degree in Computer Science or related field",
        "userHighestEducation": "Bachelor's degree in Computer Science or related field",
        "isUserEducationQualified": True,
        "jobPostingExperienceQualification": "3+ years of experience in software development",
        "userYearsExperience": 3,
        "isUserExperienceQualified": True
    })

@job_posting_bp.route('/skills-comparison/<job_posting_id>', methods=['GET'])
def get_skills_comparison(job_posting_id):
    job_posting = JobPosting.query.filter_by(id=job_posting_id).first()
    job_posting_skills = JobPostingSkills.query.filter_by(job_posting_id=job_posting_id).all()
    user_skills = UserSkills.query.filter_by(user_id=job_posting.user_id).all()

    all_job_posting_skills = []
    job_posting_skills_posessed_by_user = []
    job_posting_skills_not_posessed_by_user = []

    for job_posting_skill in job_posting_skills:
        print(job_posting_skill.skill_id)
        skill = Skill.query.filter_by(id=job_posting_skill.skill_id).first()
        all_job_posting_skills.append(skill.name)
        posessed = False
        for user_skill in user_skills:
            if user_skill.skill_id == skill.id:
                posessed = True
        if posessed:
            job_posting_skills_posessed_by_user.append(skill.name)
        else:
            job_posting_skills_not_posessed_by_user.append(skill.name)

    print(all_job_posting_skills)
    print(job_posting_skills_posessed_by_user)
    print(job_posting_skills_not_posessed_by_user)


    return jsonify({
        'message': 'success',
        "jobPostingSkills": all_job_posting_skills,
        "jobPostingSkillsPosessedByUser": job_posting_skills_posessed_by_user,
        "jobPostingSkillsNotPosessedByUser": job_posting_skills_not_posessed_by_user,
    })

@job_posting_bp.route('/fake-skills-comparison/<job_posting_id>', methods=['GET'])
def fake_get_skills_comparison(job_posting_id):
    return jsonify({
        "jobPostingSkills": ["Python", "Node", "React", "Express", "MongoDB", "SQL"],
        "jobPostingSkillsPosessedByUser": ["Python", "Node", "React", "MongoDB", "SQL"],
        "jobPostingSkillsNotPosessedByUser": ["Express"],
    })
