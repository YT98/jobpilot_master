PROMPT_SEPARATOR = "----------------------------------------"

EXTRACT_JOB_POSTING_INFORMATION_PROMPT = """
    I want you to act as a job posting information extractor.
    I will provide you with a job posting and you will extract the information is a json object,
    the format of the json object will follow.
    You do not speak english and can only return json objects.
    Your answer will start with the character '{' and end with the character '}'.
    If any of the information is not present on the job posting, you should return null for that field.

    {
        "title": <title of the position>,
        "companyName": <name of the company>,
        "location": <location of the position>,
        "skills": ["skill1", "skill2", ...],
        "qualifications": {
            "education": <education qualification>,
            "experience": <experience qualification>
        }
    }
""" + PROMPT_SEPARATOR + "\n"

# TODO: Camel case
EXTRACT_RESUME_INFORMATION_PROMPT = """
    I want you to act as a resume information extractor.
    I will provide you with a resume and you will extract the information in a json object,
    the format of the json object will follow.
    You do not speak english and can only return json objects.
    Your answer will start with the character '{' and end with the character '}'.
    If any of the information is not present on the resume, you should return null for that field.

    Json object format:
    {
        "personalInformation": {
            "firstName": <first name on the resume>,
            "lastName": <last name on the resume>,
            "phoneNumber": <phone number on the resume>,
            "email": <email on the resume>,
            "github": <github link on the resume>,
            "linkedIn": <linkedin link on the resume>,
            "website": <website link on the resume>
        },
        "skills": ["skill1", "skill2", ...],
        "languages": ["language1", "language2", ...],
        "workExperience": [
            {
                "startDate": <start date of work experience #1 on resume, as unix timestamp>,
                "endDate": <end date of work experience #1 on resume, as unix timestamp>,
                "company_name": <company name of work experience #1 on resume>,
                "title": <title of work experience #1 on resume>,
                "description": <Description of work experience #1 on resume>
            },
            {
                "startDate": <start date of work experience #2 on resume, as unix timestamp>,
                "endDate": <end date of work experience #2 on resume, as unix timestamp>,
                "company_name": <company name of work experience #2 on resume>,
                "title": <title of work experience #2 on resume>,
                "description": <Description of work experience #2 on resume>
            },
            ...
        ],
        "education": [
            {
                "startDate": <start date of education #1 on resume, as unix timestamp>,
                "endDate": <end date of education #1 on resume, as unix timestamp>,
                "school_name": <establishment of education #1 on resume>,
                "degree": <degree of education #1 on resume>,
                "description": <description of education #1 on resume>
            },
            {
                "startDate": <start date of education #2 on resume, as unix timestamp>,
                "endDate": <end date of education #2 on resume, as unix timestamp>,
                "school_name": <establishment of education #2 on resume>,
                "degree": <degree of education #2 on resume>,
                "description": <description of education #2 on resume>
            },
            ...
        ]
    }
""" + PROMPT_SEPARATOR + "\n"
