from utils.return_model_camelcase import return_model_properties_camelcase
from models.Resume import Resume, ResumeContactInformation, ResumeContactInformationLinks, \
    ResumeWorkExperience, ResumeProject, ResumeEducation, ResumeSkill, ResumeLanguage, \
    ResumeCertification, ResumeSummary, ResumeInvolvement
from models.Skill import Skill
from models.Language import Language
from app import db

# TODO: Write tests for this


def create_resume(account_id, resume_name, job_title):
    resume = Resume(account_id=account_id, resume_name=resume_name, job_title=job_title)
    db.session.add(resume)
    db.session.commit()
    return resume.id


def get_account_resumes(account_id):
    resumes = Resume.query.filter_by(account_id=account_id).all()
    resumes_camel_case = [return_model_properties_camelcase(resume) for resume in resumes]
    return resumes_camel_case


def get_resume(resume_id):
    resume = Resume.query.filter_by(id=resume_id).first()
    if resume is None:
        return None
    resume_camel_case = return_model_properties_camelcase(resume)
    return resume_camel_case


def update_resume(resume_id, resume_name, job_title, job_posting_id):
    resume = Resume.query.filter_by(id=resume_id).first()
    if resume is None:
        return None
    resume.resume_name = resume_name
    resume.job_title = job_title
    resume.job_posting_id = job_posting_id
    db.session.commit()
    db.session.refresh(resume)
    resume_camel_case = return_model_properties_camelcase(resume)
    return resume_camel_case


def get_resume_contact_information(resume_id):
    resume_contact_information = ResumeContactInformation.query.filter_by(resume_id=resume_id).first()
    if resume_contact_information is None:
        return None
    resume_contact_information_camel_case = return_model_properties_camelcase(resume_contact_information)

    resume_contact_information_links = ResumeContactInformationLinks.query.filter_by(
        resume_contact_information_id=resume_contact_information.id).all()
    resume_contact_information_links_camel_case = [
        return_model_properties_camelcase(link) for link in resume_contact_information_links]

    resume_contact_information_camel_case['links'] = resume_contact_information_links_camel_case

    return resume_contact_information_camel_case


def get_resume_work_experiences(resume_id):
    resume_work_experience = ResumeWorkExperience.query.filter_by(resume_id=resume_id).all()
    resume_work_experience_camel_case = [
        return_model_properties_camelcase(work_experience) for work_experience in resume_work_experience]
    return resume_work_experience_camel_case


def get_resume_projects(resume_id):
    resume_projects = ResumeProject.query.filter_by(resume_id=resume_id).all()
    resume_projects_camel_case = [return_model_properties_camelcase(project) for project in resume_projects]
    return resume_projects_camel_case


def get_resume_educations(resume_id):
    resume_educations = ResumeEducation.query.filter_by(resume_id=resume_id).all()
    resume_educations_camel_case = [return_model_properties_camelcase(education) for education in resume_educations]
    return resume_educations_camel_case


def get_resume_skills(resume_id):
    resume_skills = ResumeSkill.query.filter_by(resume_id=resume_id).all()
    resume_skills_names = [Skill.query.filter_by(id=resume_skill.skill_id).first() for resume_skill in resume_skills]
    return resume_skills_names


def get_resume_languages(resume_id):
    resume_languages = ResumeLanguage.query.filter_by(resume_id=resume_id).all()
    resume_languages_names = [
        Language.query.filter_by(id=resume_language.language_id).first() for resume_language in
        resume_languages]
    return resume_languages_names


def get_resume_involvements(resume_id):
    resume_involvements = ResumeInvolvement.query.filter_by(resume_id=resume_id).all()
    resume_involvements_camel_case = [
        return_model_properties_camelcase(involvement) for involvement in
        resume_involvements]
    return resume_involvements_camel_case


def get_resume_certifications(resume_id):
    resume_certifications = ResumeCertification.query.filter_by(resume_id=resume_id).all()
    resume_certifications_camel_case = [
        return_model_properties_camelcase(certification) for certification in
        resume_certifications]
    return resume_certifications_camel_case


def get_resume_summary(resume_id):
    resume_summary = ResumeSummary.query.filter_by(resume_id=resume_id).first()
    if resume_summary is None:
        return None
    resume_summary_camel_case = return_model_properties_camelcase(resume_summary)
    return resume_summary_camel_case


def get_complete_resume(resume_id):
    resume = get_resume(resume_id)
    if resume is None:
        return None
    return {
        'resume': resume,
        'contact': get_resume_contact_information(resume_id),
        'work_experiences': get_resume_work_experiences(resume_id),
        'projects': get_resume_projects(resume_id),
        'educations': get_resume_educations(resume_id),
        'skills': get_resume_skills(resume_id),
        'languages': get_resume_languages(resume_id),
        'involvements': get_resume_involvements(resume_id),
        'certifications': get_resume_certifications(resume_id),
        'summary': get_resume_summary(resume_id)
    }
