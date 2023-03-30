from flask import request, jsonify

from models import db, JobPosting, JobPostingSkills, Skill

def init_routes(app):
    @app.route('/job_posting/get_all', methods=['GET'])
    def get_all_job_postings():
        job_postings = JobPosting.query.all()
        return jsonify(job_postings)

    @app.route('/job_posting/add', methods=['POST'])
    def add_job_posting():
        data = request.get_json()

        job_posting = JobPosting(
            title=data['title'],
            description=data['description'],
            company_name=data['company_name']
        )

        db.session.add(job_posting)
        db.session.commit()
        db.session.refresh(job_posting)

        for skill_name in data['skills']:
            skill = Skill.query.filter_by(name=skill_name).first()
            if skill is None:
                skill = Skill(name=skill_name)
                db.session.add(skill)
                db.session.commit()

            job_posting_skill = JobPostingSkills(
                job_posting_id = job_posting.id,
                skill_id = skill.id
            )

            db.session.add(job_posting_skill)


        db.session.commit()
        return "job_posting added"