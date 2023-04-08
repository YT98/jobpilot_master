from flask import Blueprint, jsonify
import controllers.resume_controller as resume_controller


resume_bp = Blueprint('resume_bp', __name__)


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


@resume_bp.route('/contact-information/<resume_id>', methods=['GET'])
def get_resume_contact_information(resume_id):
    resume_controller.get_resume_contact_information(resume_id)
    return jsonify({
        'message': 'success',
        'resumeContactInformation': resume_controller.get_resume_contact_information(resume_id)
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
    resume_controller.get_resume_project(resume_id)
    return jsonify({
        'message': 'success',
        'resumeProject': resume_controller.get_resume_projects(resume_id)
    })


@resume_bp.route('/educations/<resume_id>', methods=['GET'])
def get_resume_education(resume_id):
    resume_controller.get_resume_education(resume_id)
    return jsonify({
        'message': 'success',
        'resumeEducation': resume_controller.get_resume_educations(resume_id)
    })


@resume_bp.route('/skills/<resume_id>', methods=['GET'])
def get_resume_skill(resume_id):
    resume_controller.get_resume_skill(resume_id)
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
    resume_controller.get_resume_certification(resume_id)
    return jsonify({
        'message': 'success',
        'resumeCertification': resume_controller.get_resume_certifications(resume_id)
    })


@resume_bp.route('/involvments/<resume_id>', methods=['GET'])
def get_resume_involvement(resume_id):
    resume_controller.get_resume_involvement(resume_id)
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
