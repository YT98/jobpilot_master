from models.JobPosting import JobPosting
from utils.return_model_camelcase import return_model_properties_camelcase


def get_all_job_postings(account_id):
    job_postings = JobPosting.query.filter_by(account_id=account_id).all()
    job_postings_camelcase = [return_model_properties_camelcase(job_posting) for job_posting in job_postings]
    return job_postings_camelcase
