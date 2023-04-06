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
import controllers.profile_controller as profile_controller

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
    profile_controller.update_profile_personal_information(
        profile_id=profile_id,
        first_name=request.json.get('firstName'),
        last_name=request.json.get('lastName'),
        phone_number=request.json.get('phoneNumber'),
        email=request.json.get('email')
    )
    profile_controller.update_profile_links(
        profile_id=profile_id,
        links=request.json.get('links')
    )
    profile_controller.update_profile_work_experience(
        profile_id=profile_id,
        work_experiences=request.json.get('workExperiences')
    )
    profile_controller.update_profile_education(
        profile_id=profile_id,
        educations=request.json.get('educations')
    )
    profile_controller.update_profile_skills(
        profile_id=profile_id,
        skills=request.json.get('skills')
    )
    profile_controller.update_profile_languages(
        profile_id=profile_id,
        languages=request.json.get('languages')
    )

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

    # Read resume
    # TODO: catch error if no resume is uploaded
    resume = request.files['resume']
    # save resume locally
    with open('resume.pdf', 'wb') as f:
        f.write(resume.read())
    # extract text from resume
    print('extracting text from resume...')
    text = textract.process('resume.pdf')

    # Information extraction
    prompt = EXTRACT_RESUME_INFORMATION_PROMPT + text.decode('utf-8')
    print('asking gpt to extract information from resume...')
    # TODO: catch errors
    gpt_answer = ask_gpt(prompt, max_tokens=2000)
    resume_info = json.loads(gpt_answer)

    # Delete resume
    os.remove('resume.pdf')

    # Update profile
    profile_controller.update_profile_personal_information(
        profile_id=profile_id,
        first_name=resume_info.get('personalInformation').get('firstName'),
        last_name=resume_info.get('personalInformation').get('lastName'),
        phone_number=resume_info.get('personalInformation').get('phoneNumber')
    )
    profile_controller.update_profile_skills(
        profile_id=profile_id,
        skills=resume_info.get('skills')
    )
    profile_controller.update_profile_languages(
        profile_id=profile_id,
        languages=resume_info.get('languages')
    )
    profile_controller.update_profile_education(
        profile_id=profile_id,
        education=resume_info.get('education')
    )
    profile_controller.update_profile_work_experience(
        profile_id=profile_id,
        work_experience=resume_info.get('workExperience')
    )

    # TODO: Error handling
    return jsonify({
        'message': 'success'
    })
