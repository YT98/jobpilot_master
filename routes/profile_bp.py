import os
from flask import Blueprint, jsonify, request
import textract
import json

from app import db
from gpt.gpt import ask_gpt
from gpt.prompts import EXTRACT_RESUME_INFORMATION_PROMPT
from models.Profile import Profile, ProfileSkills, ProfileLanguages, ProfileLinks
from models.Education import Education
from models.WorkExperience import WorkExperience, WorkExperienceSkill
from models.Skill import Skill
from models.Language import Language

SECRET_KEY = os.getenv('SECRET_KEY')
profile_bp = Blueprint('profile_bp', __name__)

# TODO: Add protection to all routes

@profile_bp.route('/<profile_id>', methods=['GET'])
def get_profile(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    profile_links = ProfileLinks.query.filter_by(profile_id=profile_id).all()
    educations = Education.query.filter_by(profile_id=profile_id).all()

    profile_languages = ProfileLanguages.query.filter_by(profile_id=profile_id).all()
    language_names = []
    for profile_language in profile_languages:
        language = Language.query.filter_by(id=profile_language.language_id).first()
        language_names.append(language.name)

    profile_skills = ProfileSkills.query.filter_by(profile_id=profile_id).all()
    skill_names = []
    for profile_skill in profile_skills:
        skill = Skill.query.filter_by(id=profile_skill.skill_id).first()
        skill_names.append(skill.name)
    
    work_experiences = WorkExperience.query.filter_by(profile_id=profile_id).all()
    work_experience_list = []
    for work_experience in work_experiences:
        work_experience_skill_names = []
        work_experience_skills = WorkExperienceSkill.query.filter_by(work_experience_id=work_experience.id).all()
        for skill in work_experience_skills:
            name = Skill.query.filter_by(id=skill.skill_id).first().name
            work_experience_skill_names.append(name)

        work_experience_list.append({
            'companyName': work_experience.company_name,
            'jobTitle': work_experience.title,
            'startDate': work_experience.start_date,
            'endDate': work_experience.end_date,
            'description': work_experience.description,
            'skills': work_experience_skill_names
        })
        

    return jsonify({
        'id': profile.id,
        'email': profile.email,
        'firstName': profile.first_name,
        'lastName': profile.last_name,
        'phoneNumber': profile.phone_number,
        'links': profile_links,
        'workExperiences': work_experience_list,
        'educations': educations,
        'skills': skill_names,
        'languages': language_names,
    })

# Submit complete profile
@profile_bp.route('/<profile_id>', methods=['POST'])
def update_profile(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()

    # Personal Information
    profile.first_name = request.json.get('firstName')
    profile.last_name = request.json.get('lastName')
    profile.phone_number = request.json.get('phone_number')
    profile.email = request.json.get('email')
    current_links = ProfileLinks.query.filter_by(profile_id=profile_id).all()
    for link in current_links:
        db.session.delete(link)
    request_links = request.json.get('links')
    for link in request_links:
        new_link = ProfileLinks(
            profile_id=profile_id,
            type=link.get('type'),
            url=link.get('url')
        )
        db.session.add(new_link)

    # Work Experience
    current_work_experiences = WorkExperience.query.filter_by(profile_id=profile_id).all()
    for work_experience in current_work_experiences:
        db.session.delete(work_experience)
    request_work_experiences = request.json.get('workExperiences')
    for work_experience in request_work_experiences:
        new_work_experience = WorkExperience(
            profile_id=profile_id,
            company_name=work_experience.get('companyName'),
            title=work_experience.get('jobTitle'),
            start_date=work_experience.get('startDate'),
            end_date=work_experience.get('endDate'),
            description=work_experience.get('description')
        )
        db.session.add(new_work_experience)
        db.session.commit()
        db.session.refresh(new_work_experience)
        for skill_name in work_experience.get('skills'):
            skill = Skill.query.filter_by(name=skill_name).first()
            if not skill:
                skill = Skill(name=skill_name)
                db.session.add(skill)
                db.session.commit()
                db.session.refresh(skill)
            new_work_experience_skill = WorkExperienceSkill(
                work_experience_id=new_work_experience.id,
                skill_id=skill.id
            )
            db.session.add(new_work_experience_skill)

    # Education
    current_educations = Education.query.filter_by(profile_id=profile_id).all()
    for education in current_educations:
        db.session.delete(education)
    request_educations = request.json.get('educations')
    for education in request_educations:
        new_education = Education(
            profile_id=profile_id,
            school_name=education.get('schoolName'),
            degree=education.get('degree'),
            start_date=education.get('startDate'),
            end_date=education.get('endDate'),
            description=education.get('description')
        )
        db.session.add(new_education)

    # Skills
    current_skills = ProfileSkills.query.filter_by(profile_id=profile_id).all()
    for skill in current_skills:
        db.session.delete(skill)
    request_skills = request.json.get('skills')
    for skill_name in request_skills:
        skill = Skill.query.filter_by(name=skill_name).first()
        if not skill:
            skill = Skill(name=skill_name)
            db.session.add(skill)
        new_profile_skill = ProfileSkills(
            profile_id=profile_id,
            skill_id=skill.id
        )
        db.session.add(new_profile_skill)
        
    # Languages
    current_languages = ProfileLanguages.query.filter_by(profile_id=profile_id).all()
    for language in current_languages:
        db.session.delete(language)
    request_languages = request.json.get('languages')
    for language_name in request_languages:
        language = Language.query.filter_by(name=language_name).first()
        if not language:
            language = Language(name=language_name)
            db.session.add(language)
            db.session.commit()
            db.session.refresh(language)
        new_profile_language = ProfileLanguages(
            profile_id=profile_id,
            language_id=language.id
        )
        db.session.add(new_profile_language)
    
    db.session.commit()
    return jsonify({'message': 'success'})

@profile_bp.route('/personal-information/<profile_id>', methods=['GET'])
def personal_info(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    profile_links = ProfileLinks.query.filter_by(profile_id=profile_id).all()
    return jsonify({
        'email': profile.email,
        'firstName': profile.first_name,
        'lastName': profile.last_name,
        'phone_number': profile.phone_number,
        'links': profile_links
    })

@profile_bp.route('/personal-information/<profile_id>', methods=['POST'])
def update_personal_info(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    profile.first_name = request.json.get('firstName')
    profile.last_name = request.json.get('lastName')
    profile.phone_number = request.json.get('phone_number')
    profile.email = request.json.get('email')
    current_links = ProfileLinks.query.filter_by(profile_id=profile_id).all()
    for link in current_links:
        db.session.delete(link)

    request_links = request.json.get('links')
    for link in request_links:
        new_link = ProfileLinks(
            profile_id=profile_id,
            type=link.get('type'),
            url=link.get('url')
        )
        db.session.add(new_link)
    
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
    #  TODO - Add skills to work experience
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
    db.session.commit()

    # update profile's personal information
    profile.first_name = resume_info['personalInformation']['firstName']
    profile.last_name = resume_info['personalInformation']['lastName']
    profile.phone_number = resume_info['personalInformation']['phoneNumber']
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
        # TODO - add skills to work experience
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