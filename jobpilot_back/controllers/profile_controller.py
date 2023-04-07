from datetime import datetime
from app import db
from models.Profile import Profile, ProfileLink
from models.WorkExperience import WorkExperience, WorkExperienceSkill
from models.Skill import Skill
from models.Education import Education
from models.Profile import ProfileSkill, ProfileLanguage
from models.Language import Language


def update_profile(profile_id: str, first_name: str, last_name: str, phone_number: str, email: str) -> None:
    profile = Profile.query.get(profile_id)
    profile.first_name = first_name
    profile.last_name = last_name
    profile.phone_number = phone_number
    profile.email = email
    db.session.commit()


def update_profile_links(profile_id, links):
    # TODO: Instead of deleting all links and adding new ones, only update the ones that have changed
    current_links = ProfileLink.query.filter_by(profile_id=profile_id).all()
    for link in current_links:
        db.session.delete(link)
    for link in links:
        new_link = ProfileLink(
            profile_id=profile_id,
            type=link.get('type'),
            url=link.get('url')
        )
        db.session.add(new_link)
    db.session.commit()


def update_profile_work_experience(profile_id, work_experiences):
    # TODO: Instead of deleting all work experiences and adding new ones, only update the ones that have changed
    current_work_experiences = WorkExperience.query.filter_by(profile_id=profile_id).all()
    for work_experience in current_work_experiences:
        # delete work experience skills
        work_experience_skills = WorkExperienceSkill.query.filter_by(work_experience_id=work_experience.id).all()
        for skill in work_experience_skills:
            db.session.delete(skill)
            db.session.commit()
        # delete work experience
        db.session.delete(work_experience)
        db.session.commit()

    for work_experience in work_experiences:
        new_work_experience = WorkExperience(
            profile_id=profile_id,
            company_name=work_experience.get('companyName'),
            title=work_experience.get('title'),
            location=work_experience.get('location'),
            currently_working=work_experience.get('currentlyWorking'),
            start_date=datetime.strptime(work_experience.get('startDate'), '%Y-%m'),
            end_date=datetime.strptime(work_experience.get('endDate'), '%Y-%m')
            if not work_experience.get('currentlyWorking') else None,
            description=work_experience.get('description'),
        )
        db.session.add(new_work_experience)
        db.session.commit()
        db.session.refresh(new_work_experience)
        # TODO: Move this to a separate function
        for skill in work_experience.get('skills'):
            skill = Skill.query.filter_by(name=skill).first()
            if skill is None:
                skill = Skill(name=skill)
                db.session.add(skill)
                db.session.commit()
                db.session.refresh(skill)
            work_experience_skill = WorkExperienceSkill(
                work_experience_id=new_work_experience.id,
                skill_id=skill.id)
            db.session.add(work_experience_skill)

    db.session.commit()


def update_profile_education(profile_id, educations):
    # TODO: Instead of deleting all educations and adding new ones, only update the ones that have changed
    current_educations = Education.query.filter_by(profile_id=profile_id).all()
    for education in current_educations:
        db.session.delete(education)

    for education in educations:
        new_education = Education(
            profile_id=profile_id,
            school_name=education.get('schoolName'),
            degree=education.get('degree'),
            location=education.get('location'),
            major_or_area_of_study=education.get('majorOrAreaOfStudy'),
            currently_attending=education.get('currentlyAttending'),
            start_date=datetime.strptime(education.get('startDate'), '%Y-%m'),
            end_date=datetime.strptime(education.get('endDate'), '%Y-%m') if not education.get('currentlyAttending') else None,
            description=education.get('description'),
        )
        db.session.add(new_education)

    db.session.commit()


def update_profile_skills(profile_id, skills):
    current_profile_skills = ProfileSkill.query.filter_by(profile_id=profile_id).all()
    for skill in current_profile_skills:
        db.session.delete(skill)
        db.session.commit()

    for skill_name in skills:
        skill = Skill.query.filter_by(name=skill_name).first()
        if skill is None:
            # TODO: Move skill creation to a separate function
            skill = Skill(name=skill_name)
            db.session.add(skill)
            db.session.commit()
            db.session.refresh(skill)
        new_profile_skill = ProfileSkill(
            profile_id=profile_id,
            skill_id=skill.id
        )
        db.session.add(new_profile_skill)

    db.session.commit()


def update_profile_languages(profile_id, languages):
    current_profile_languages = ProfileLanguage.query.filter_by(profile_id=profile_id).all()
    for language in current_profile_languages:
        db.session.delete(language)
        db.session.commit()

    for language_name in languages:
        language = Language.query.filter_by(name=language_name).first()
        if language is None:
            language = Language(name=language_name)
            db.session.add(language)
            db.session.commit()
            db.session.refresh(language)
        new_profile_language = ProfileLanguage(
            profile_id=profile_id,
            language_id=language.id
        )
        db.session.add(new_profile_language)

    db.session.commit()


def get_links(profile_id):
    links = ProfileLink.query.filter_by(profile_id=profile_id).all()
    return links


def get_work_experience_skills(work_experience_id):
    work_experience_skills = WorkExperienceSkill.query.filter_by(work_experience_id=work_experience_id).all()
    work_experience_skills_names = [
        Skill.query.filter_by(id=work_experience_skill.skill_id).first().name
        for work_experience_skill in work_experience_skills
        ]
    return work_experience_skills_names


def get_work_experiences_with_skills(profile_id):
    work_experiences_with_skills = []
    work_experiences = WorkExperience.query.filter_by(profile_id=profile_id).all()
    for work_experience in work_experiences:
        work_experiences_with_skills.append({
            'id': work_experience.id,
            'company_name': work_experience.company_name,
            'title': work_experience.title,
            'start_date': datetime.strftime(work_experience.start_date, "%Y-%m"),
            'location': work_experience.location,
            'currently_working': work_experience.currently_working,
            'end_date': datetime.strftime(work_experience.end_date, "%Y-%m")
            if not work_experience.currently_working else None,
            'description': work_experience.description,
            'skills': get_work_experience_skills(work_experience.id)
        })
    return work_experiences_with_skills


def get_educations(profile_id):
    educations = Education.query.filter_by(profile_id=profile_id).all()
    return educations


def get_skills(profile_id):
    profile_skills = ProfileSkill.query.filter_by(profile_id=profile_id).all()
    skills = [
        Skill.query.filter_by(id=profile_skill.skill_id).first().name
        for profile_skill in profile_skills
        ]
    return skills


def get_languages(profile_id):
    profile_languages = ProfileLanguage.query.filter_by(profile_id=profile_id).all()
    languages = [
        Language.query.filter_by(id=profile_language.language_id).first().name
        for profile_language in profile_languages
        ]
    return languages
