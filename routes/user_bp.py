import os
from flask import Blueprint, jsonify, request
import textract
import json

from app import db
from gpt.gpt import ask_gpt
from gpt.prompts import EXTRACT_RESUME_INFORMATION_PROMPT
from models.User import User, UserSkills, UserLanguages
from models.Education import Education
from models.WorkExperience import WorkExperience
from models.Skill import Skill
from models.Language import Language

SECRET_KEY = os.getenv('SECRET_KEY')
user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/<user_id>/personal_info', methods=['GET'])
def personal_info(user_id):
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        'email': user.email,
        'firstName': user.first_name,
        'lastName': user.last_name,
        'phone_number': user.phone_number,
        'linkedin': user.linkedin_url,
        'github': user.github_url,
        'website': user.website_url,
    })

@user_bp.route('/<user_id>/personal_info', methods=['POST'])
def update_personal_info(user_id):
    user = User.query.filter_by(id=user_id).first()
    user.first_name = request.json.get('firstName')
    user.last_name = request.json.get('lastName')
    user.phone_number = request.json.get('phone_number')
    user.linkedin_url = request.json.get('linkedin_url')
    user.github_url = request.json.get('github_url')
    user.website_url = request.json.get('website_url')
    db.session.commit()
    return jsonify({'message': 'success'})

@user_bp.route('/<user_id>/skills', methods=['GET'])
def get_skills(user_id):
    user_skills = UserSkills.query.filter_by(user_id=user_id).all()
    skills = []
    for user_skill in user_skills:
        skill = Skill.query.filter_by(id=user_skill.skill_id).first()
        skills.append({
            'id': skill.id,
            'name': skill.name
        })
    return jsonify(skills)

@user_bp.route('/<user_id>/work_experience', methods=['GET'])
def get_work_experience(user_id):
    work_experience = WorkExperience.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': experience.id,
        'company_name': experience.company_name,
        'title': experience.title,
        'start_date': experience.start_date,
        'end_date': experience.end_date,
        'description': experience.description
    } for experience in work_experience])

@user_bp.route('/<user_id>/education', methods=['GET'])
def get_education(user_id):
    education = Education.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': education.id,
        'school_name': education.school_name,
        'degree': education.degree,
        'start_date': education.start_date,
        'end_date': education.end_date,
        'description': education.description
    } for education in education])

@user_bp.route('/<user_id>/resume', methods=['POST'])
def upload_resume(user_id):
    user = User.query.filter_by(id=user_id).first()
    
    # TODO: catch error if no resume is uploaded
    resume = request.files['resume']
    # save resume locally
    with open('resume.pdf', 'wb') as f:
        f.write(resume.read())
    # extract text from resume
    print('extracting text from resume...')
    text = textract.process('resume.pdf')
    
    # ask gpt to extract information
    prompt = EXTRACT_RESUME_INFORMATION_PROMPT + text.decode('utf-8')
    print('asking gpt to extract information from resume...')
    # TODO: catch errors
    gpt_answer = ask_gpt(prompt, max_tokens=2000)
    resume_info = json.loads(gpt_answer)
    
    # delete resume
    os.remove('resume.pdf')

    # clear user's personal information
    user.phone_number = None
    user.linkedin_url = None
    user.github_url = None
    user.website_url = None
    db.session.commit()

    # update user's personal information
    user.first_name = resume_info['personalInformation']['firstName']
    user.last_name = resume_info['personalInformation']['lastName']
    user.phone_number = resume_info['personalInformation']['phoneNumber']
    if resume_info['personalInformation']['linkedIn'] != None:
        user.linkedin_url = resume_info['personalInformation']['linkedIn']
    if resume_info['personalInformation']['github'] != None:
        user.github_url = resume_info['personalInformation']['github']
    if resume_info['personalInformation']['website'] != None:
        user.website_url = resume_info['personalInformation']['website']
    db.session.commit()

    # clear user's skills
    user_skills = UserSkills.query.filter_by(user_id=user_id).all()
    for user_skill in user_skills:
        db.session.delete(user_skill)
        db.session.commit()
    # update user's skills
    for resume_skill in resume_info['skills']:
        skill = Skill.query.filter_by(name=resume_skill).first()
        if skill is None:
            skill = Skill(name=resume_skill)
            db.session.add(skill)
            db.session.commit()
        user_skill = UserSkills(user_id=user_id, skill_id=skill.id)
        db.session.add(user_skill)
        db.session.commit()

    # clear user's languages
    user_languages = UserLanguages.query.filter_by(user_id=user_id).all()
    for user_language in user_languages:
        db.session.delete(user_language)
        db.session.commit()
    # update user's languages
    for resume_language in resume_info['languages']:
        language = Language.query.filter_by(name=resume_language).first()
        if language is None:
            language = Language(name=resume_language)
            db.session.add(language)
            db.session.commit()
        user_language = UserLanguages(user_id=user_id, language_id=language.id)
        db.session.add(user_language)
        db.session.commit()
    
    # clear user's education
    educations = Education.query.filter_by(user_id=user_id).all()
    for education in educations:
        db.session.delete(education)
        db.session.commit()
    # update user's education
    for education in resume_info['education']:
        education = Education(
            user_id=user_id,
            school_name=education['school_name'],
            degree=education['degree'],
            start_date=education['startDate'],
            end_date=education['endDate'],
            description=education['description']
        )
        db.session.add(education)
        db.session.commit()

    # clear user's experience
    experiences = WorkExperience.query.filter_by(user_id=user_id).all()
    for experience in experiences:
        db.session.delete(experience)
        db.session.commit()           
    # update user's experience
    for experience in resume_info['workExperience']:
        experience = WorkExperience(
            user_id=user_id,
            company_name=experience['company_name'],
            title=experience['title'],
            start_date=experience['startDate'],
            end_date=experience['endDate'],
            description=experience['description']
        )
        db.session.add(experience)
        db.session.commit()

    return jsonify({
        'message': 'success'
    })