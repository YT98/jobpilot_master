from app import db
from models.Profile import Profile, ProfileLinks
from models.WorkExperience import WorkExperience, WorkExperienceSkill
from models.Skill import Skill
from models.Education import Education
# TODO: Rename ProfileSkills to ProfileSkill
# TODO: Rename ProfileLanguages to ProfileLanguage
from models.Profile import ProfileSkills, ProfileLanguages
from models.Language import Language


def update_profile_personal_information(
        profile_id: str, first_name: str, last_name: str, phone_number: str, email: str) -> None:
    profile = Profile.query.get(profile_id)
    profile.first_name = first_name
    profile.last_name = last_name
    profile.phone_number = phone_number
    profile.email = email
    db.session.commit()


def update_profile_links(profile_id, links):
    # TODO: Instead of deleting all links and adding new ones, only update the ones that have changed
    current_links = ProfileLinks.query.filter_by(profile_id=profile_id).all()
    for link in current_links:
        db.session.delete(link)
    for link in links:
        new_link = ProfileLinks(
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
            # TODO Rename title to jobTitle or the other way around
            title=work_experience.get('jobTitle'),
            start_date=work_experience.get('startDate'),
            end_date=work_experience.get('endDate'),
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
            # TODO Rename school_name to institution name or the other way around
            school_name=education.get('institutionName'),
            # TODO: Rename degree to degreeType or the other way around
            degree=education.get('degreeType'),
            start_date=education.get('startDate'),
            end_date=education.get('endDate'),
            description=education.get('description'),
        )
        db.session.add(new_education)

    db.session.commit()


def update_profile_skills(profile_id, skills):
    current_profile_skills = ProfileSkills.query.filter_by(profile_id=profile_id).all()
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
        new_profile_skill = ProfileSkills(
            profile_id=profile_id,
            skill_id=skill.id
        )
        db.session.add(new_profile_skill)

    db.session.commit()


def update_profile_languages(profile_id, languages):
    current_profile_languages = ProfileLanguages.query.filter_by(profile_id=profile_id).all()
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
        new_profile_language = ProfileLanguages(
            profile_id=profile_id,
            language_id=language.id
        )
        db.session.add(new_profile_language)

    db.session.commit()
