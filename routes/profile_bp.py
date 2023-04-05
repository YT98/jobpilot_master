import os
from flask import Blueprint, jsonify, request
import textract
import json

from app import db
from gpt.gpt import ask_gpt
from gpt.prompts import EXTRACT_RESUME_INFORMATION_PROMPT
from models.Profile import Profile, ProfileSkills, ProfileLanguages
from models.Education import Education
from models.WorkExperience import WorkExperience
from models.Skill import Skill
from models.Language import Language

SECRET_KEY = os.getenv('SECRET_KEY')
profile_bp = Blueprint('profile_bp', __name__)

# TODO: Add protection to all routes

@profile_bp.route('/personal-information/<profile_id>', methods=['GET'])
def personal_info(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    return jsonify({
        'email': profile.email,
        'firstName': profile.first_name,
        'lastName': profile.last_name,
        'phone_number': profile.phone_number,
        'linkedin': profile.linkedin_url,
        'github': profile.github_url,
        'website': profile.website_url,
    })

@profile_bp.route('/personal-information/<profile_id>', methods=['POST'])
def update_personal_info(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    profile.first_name = request.json.get('firstName')
    profile.last_name = request.json.get('lastName')
    profile.phone_number = request.json.get('phone_number')
    profile.linkedin_url = request.json.get('linkedin_url')
    profile.github_url = request.json.get('github_url')
    profile.website_url = request.json.get('website_url')
    db.session.commit()
    return jsonify({'message': 'success'})

@profile_bp.route('/skills/<profile_id>', methods=['GET'])
def get_skills(profile_id):
    profile_skills = ProfileSkills.query.filter_by(profile_id=profile_id).all()
    skills = []
    for profile_skill in profile_skills:
        skill = Skill.query.filter_by(id=profile_skill.skill_id).first()
        skills.append({
            'id': skill.id,
            'name': skill.name
        })
    return jsonify(skills)

@profile_bp.route('/work-experience/<profile_id>', methods=['GET'])
def get_work_experience(profile_id):
    work_experience = WorkExperience.query.filter_by(profile_id=profile_id).all()
    return jsonify([{
        'id': experience.id,
        'company_name': experience.company_name,
        'title': experience.title,
        'start_date': experience.start_date,
        'end_date': experience.end_date,
        'description': experience.description
    } for experience in work_experience])

@profile_bp.route('/education/<profile_id>', methods=['GET'])
def get_education(profile_id):
    education = Education.query.filter_by(profile_id=profile_id).all()
    return jsonify([{
        'id': education.id,
        'school_name': education.school_name,
        'degree': education.degree,
        'start_date': education.start_date,
        'end_date': education.end_date,
        'description': education.description
    } for education in education])

@profile_bp.route('/resume/<profile_id>', methods=['POST'])
def upload_resume(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    
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

    # clear profile's personal information
    profile.phone_number = None
    profile.linkedin_url = None
    profile.github_url = None
    profile.website_url = None
    db.session.commit()

    # update profile's personal information
    profile.first_name = resume_info['personalInformation']['firstName']
    profile.last_name = resume_info['personalInformation']['lastName']
    profile.phone_number = resume_info['personalInformation']['phoneNumber']
    if resume_info['personalInformation']['linkedIn'] != None:
        profile.linkedin_url = resume_info['personalInformation']['linkedIn']
    if resume_info['personalInformation']['github'] != None:
        profile.github_url = resume_info['personalInformation']['github']
    if resume_info['personalInformation']['website'] != None:
        profile.website_url = resume_info['personalInformation']['website']
    db.session.commit()

    # clear profile's skills
    profile_skills = ProfileSkills.query.filter_by(profile_id=profile_id).all()
    for profile_skill in profile_skills:
        db.session.delete(profile_skill)
        db.session.commit()
    # update profile's skills
    for resume_skill in resume_info['skills']:
        skill = Skill.query.filter_by(name=resume_skill).first()
        if skill is None:
            skill = Skill(name=resume_skill)
            db.session.add(skill)
            db.session.commit()
        profile_skill = ProfileSkills(profile_id=profile_id, skill_id=skill.id)
        db.session.add(profile_skill)
        db.session.commit()

    # clear profile's languages
    profile_languages = ProfileLanguages.query.filter_by(profile_id=profile_id).all()
    for profile_language in profile_languages:
        db.session.delete(profile_language)
        db.session.commit()
    # update profile's languages
    for resume_language in resume_info['languages']:
        language = Language.query.filter_by(name=resume_language).first()
        if language is None:
            language = Language(name=resume_language)
            db.session.add(language)
            db.session.commit()
        profile_language = ProfileLanguages(profile_id=profile_id, language_id=language.id)
        db.session.add(profile_language)
        db.session.commit()
    
    # clear profile's education
    educations = Education.query.filter_by(profile_id=profile_id).all()
    for education in educations:
        db.session.delete(education)
        db.session.commit()
    # update profile's education
    for education in resume_info['education']:
        education = Education(
            profile_id=profile_id,
            school_name=education['school_name'],
            degree=education['degree'],
            start_date=education['startDate'],
            end_date=education['endDate'],
            description=education['description']
        )
        db.session.add(education)
        db.session.commit()

    # clear profile's experience
    experiences = WorkExperience.query.filter_by(profile_id=profile_id).all()
    for experience in experiences:
        db.session.delete(experience)
        db.session.commit()           
    # update profile's experience
    for experience in resume_info['workExperience']:
        experience = WorkExperience(
            profile_id=profile_id,
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