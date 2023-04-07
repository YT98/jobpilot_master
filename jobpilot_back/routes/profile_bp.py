import os
from flask import Blueprint, jsonify, request
import textract
import json

from app import db
from gpt.gpt import ask_gpt
from gpt.prompts import EXTRACT_RESUME_INFORMATION_PROMPT
from models.Profile import Profile, ProfileSkill, ProfileLanguage, ProfileLink
from models.Education import Education
from models.Skill import Skill
from models.Language import Language
import controllers.profile_controller as profile_controller

SECRET_KEY = os.getenv('SECRET_KEY')
profile_bp = Blueprint('profile_bp', __name__)
# TODO: Add protection to all routes


@profile_bp.route('/<profile_id>', methods=['GET'])
def get_profile(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    educations = Education.query.filter_by(profile_id=profile_id).all()

    profile_languages = ProfileLanguage.query.filter_by(profile_id=profile_id).all()
    language_names = []
    for profile_language in profile_languages:
        language = Language.query.filter_by(id=profile_language.language_id).first()
        language_names.append(language.name)

    profile_skills = ProfileSkill.query.filter_by(profile_id=profile_id).all()
    skill_names = []
    for profile_skill in profile_skills:
        skill = Skill.query.filter_by(id=profile_skill.skill_id).first()
        skill_names.append(skill.name)

    return jsonify({
        'id': profile.id,
        'email': profile.email,
        'firstName': profile.first_name,
        'lastName': profile.last_name,
        'phoneNumber': profile.phone_number,
        'educations': educations,
        'skills': skill_names,
        'languages': language_names,
    })


@profile_bp.route('/links/<profile_id>', methods=['GET'])
def get_links(profile_id):
    return jsonify({
        'message': 'success',
        'links': profile_controller.get_links(profile_id)
    })


@profile_bp.route('/work-experiences/<profile_id>', methods=['GET'])
def get_work_experiences(profile_id):
    work_experiences_with_skills = profile_controller.get_work_experiences_with_skills(profile_id)
    work_experiences_with_skills_camel_case = []
    for work_experience_with_skills in work_experiences_with_skills:
        work_experiences_with_skills_camel_case.append({
            'id': work_experience_with_skills['id'],
            'title': work_experience_with_skills['title'],
            'companyName': work_experience_with_skills['company_name'],
            'location': work_experience_with_skills['location'],
            'startDate': work_experience_with_skills['start_date'],
            'endDate': work_experience_with_skills['end_date'],
            'currentlyWorking': work_experience_with_skills['currently_working'],
            'description': work_experience_with_skills['description'],
            'skills': work_experience_with_skills['skills']
        })

    return jsonify({
        'message': 'success',
        'workExperiences': work_experiences_with_skills_camel_case
    })


@profile_bp.route('/educations/<profile_id>', methods=['GET'])
def get_educations(profile_id):
    educations = profile_controller.get_educations(profile_id)
    educations_camel_case = []
    for education in educations:
        educations_camel_case.append({
            'id': education.id,
            'schoolName': education.school_name,
            'location': education.location,
            'degree': education.degree,
            'majorOrAreaOfStudy': education.major_or_area_of_study,
            'currentlyAttending': education.currently_attending,
            'startDate': education.start_date,
            'endDate': education.end_date,
            'description': education.description
        })
    return jsonify({
        'message': 'success',
        'educations': educations_camel_case
    })


@profile_bp.route('/personal-information/<profile_id>', methods=['POST'])
def update_personal_info(profile_id):
    profile = Profile.query.filter_by(id=profile_id).first()
    profile.first_name = request.json.get('firstName')
    profile.last_name = request.json.get('lastName')
    profile.phone_number = request.json.get('phone_number')
    profile.email = request.json.get('email')
    current_links = ProfileLink.query.filter_by(profile_id=profile_id).all()
    for link in current_links:
        db.session.delete(link)

    request_links = request.json.get('links')
    for link in request_links:
        new_link = ProfileLink(
            profile_id=profile_id,
            type=link.get('type'),
            url=link.get('url')
        )
        db.session.add(new_link)

    db.session.commit()
    return jsonify({'message': 'success'})


@profile_bp.route('/skills/<profile_id>', methods=['GET'])
def get_skills(profile_id):
    return jsonify({
        'message': 'success',
        'skills': profile_controller.get_skills(profile_id)
    })


# Submit complete profile
@profile_bp.route('/<profile_id>', methods=['POST'])
def update_profile(profile_id):
    profile_controller.update_profile(
        profile_id=profile_id,
        first_name=request.json.get('firstName'),
        last_name=request.json.get('lastName'),
        phone_number=request.json.get('phoneNumber'),
        email=request.json.get('email')
    )
    profile_controller.update_profile_links(
        profile_id=profile_id,
        links=request.json.get('profileLinks')
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


@profile_bp.route('/languages/<profile_id>', methods=['GET'])
def get_languages(profile_id):
    return jsonify({
        'message': 'success',
        'languages': profile_controller.get_languages(profile_id)
    })


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
    profile_controller.update_profile(
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
