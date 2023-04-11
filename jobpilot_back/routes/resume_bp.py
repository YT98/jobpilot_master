from flask import Blueprint, jsonify, request
import controllers.resume_controller as resume_controller


resume_bp = Blueprint('resume_bp', __name__)


@resume_bp.route('/create', methods=['POST'])
def create_resume():
    account_id = request.json.get('accountId')
    resume_name = request.json.get('resumeName')
    job_title = request.json.get('jobTitle')
    return jsonify({
        'message': 'success',
        'resumeId': resume_controller.create_resume(account_id, resume_name, job_title)
    })


@resume_bp.route('/all/<account_id>', methods=['GET'])
def get_account_resumes(account_id):
    resume_controller.get_account_resumes(account_id)
    return jsonify({
        'message': 'success',
        'resumes': resume_controller.get_account_resumes(account_id)
    })


@resume_bp.route('/<resume_id>', methods=['GET'])
def get_resume(resume_id):
    resume_controller.get_resume(resume_id)
    return jsonify({
        'message': 'success',
        'resume': resume_controller.get_resume(resume_id)
    })


@resume_bp.route('/update/<resume_id>', methods=['POST'])
def update_resume(resume_id):
    resume_name = request.json.get('resumeName')
    job_title = request.json.get('jobTitle')
    job_posting_id = request.json.get('jobPostingId')
    print(job_posting_id)
    return jsonify({
        'message': 'success',
        'resume': resume_controller.update_resume(resume_id, resume_name, job_title, job_posting_id)
    })


@resume_bp.route('/contact/<resume_id>', methods=['GET'])
def get_resume_contact_information(resume_id):
    resume_controller.get_resume_contact_information(resume_id)
    return jsonify({
        'message': 'success',
        'resumeContactInformation': resume_controller.get_resume_contact_information(resume_id)
    })


@resume_bp.route('/contact', methods=['POST'])
def update_resume_contact_information():
    resume_id = request.json.get('resumeId')
    phone_number = request.json.get('phoneNumber')
    email = request.json.get('email')
    city = request.json.get('city')
    region = request.json.get('region')
    country = request.json.get('country')
    resume_contact_information = resume_controller.update_resume_contact_information(
            resume_id=resume_id,
            phone_number=phone_number,
            email=email,
            city=city,
            region=region,
            country=country
        )
    print(resume_contact_information)
    return jsonify({
        'message': 'success',
        'resumeContactInformation': resume_contact_information
    })


@resume_bp.route('/contact-links', methods=['POST'])
def update_resume_contact_links():
    resume_contact_information_id = request.json.get('resumeContactInformationId')
    links = request.json.get('links')
    return jsonify({
        'message': 'success',
        'resumeContactLinks': resume_controller.update_resume_contact_links(
            resume_contact_information_id=resume_contact_information_id,
            links=links
        )
    })


@resume_bp.route('/work-experiences/<resume_id>', methods=['GET'])
def get_resume_work_experience(resume_id):
    resume_controller.get_resume_work_experience(resume_id)
    return jsonify({
        'message': 'success',
        'resumeWorkExperience': resume_controller.get_resume_work_experiences(resume_id)
    })


@resume_bp.route('/projects/<resume_id>', methods=['GET'])
def get_resume_project(resume_id):
    resume_controller.get_resume_projects(resume_id)
    return jsonify({
        'message': 'success',
        'resumeProject': resume_controller.get_resume_projects(resume_id)
    })


@resume_bp.route('/educations/<resume_id>', methods=['GET'])
def get_resume_education(resume_id):
    resume_controller.get_resume_educations(resume_id)
    return jsonify({
        'message': 'success',
        'resumeEducation': resume_controller.get_resume_educations(resume_id)
    })


@resume_bp.route('/skills/<resume_id>', methods=['GET'])
def get_resume_skill(resume_id):
    resume_controller.get_resume_skills(resume_id)
    return jsonify({
        'message': 'success',
        'resumeSkill': resume_controller.get_resume_skills(resume_id)
    })


@resume_bp.route('/languages/<resume_id>', methods=['GET'])
def get_resume_language(resume_id):
    resume_controller.get_resume_languages(resume_id)
    return jsonify({
        'message': 'success',
        'resumeLanguage': resume_controller.get_resume_languages(resume_id)
    })


@resume_bp.route('/certifications/<resume_id>', methods=['GET'])
def get_resume_certification(resume_id):
    resume_controller.get_resume_certifications(resume_id)
    return jsonify({
        'message': 'success',
        'resumeCertification': resume_controller.get_resume_certifications(resume_id)
    })


@resume_bp.route('/involvments/<resume_id>', methods=['GET'])
def get_resume_involvement(resume_id):
    resume_controller.get_resume_involvements(resume_id)
    return jsonify({
        'message': 'success',
        'resumeInvolvement': resume_controller.get_resume_involvements(resume_id)
    })


@resume_bp.route('/summary/<resume_id>', methods=['GET'])
def get_resume_summary(resume_id):
    resume_controller.get_resume_summary(resume_id)
    return jsonify({
        'message': 'success',
        'resumeSummary': resume_controller.get_resume_summary(resume_id)
    })


@resume_bp.route('/complete/<resume_id>', methods=['GET'])
def get_complete_resume(resume_id):
    complete_resume = resume_controller.get_complete_resume(resume_id)
    if complete_resume is None:
        return jsonify({
            'message': 'error',
            'resumeComplete': None
        }), 404
    return jsonify({
        'message': 'success',
        'resumeComplete': complete_resume
    }), 200
