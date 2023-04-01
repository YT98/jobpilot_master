PROMPT_SEPARATOR = "----------------------------------------"
COMPANY_NAME_PROMPT = "\n" + PROMPT_SEPARATOR + "\n" + "Company name: \n"
JOB_TITLE_PROMPT = "\n" + PROMPT_SEPARATOR + "\n" + "Job title: \n"
SKILLS_PROMPT = "\n" + PROMPT_SEPARATOR + "\n" + "Give me a list of the skills required for the above job. Do not use full sentences, only use keywords. Return the list as comma-separated list like so: \"skill1, skill2, ..., skilln\" \n"

EXTRACT_RESUME_INFORMATION_PROMPT = """
    I want you to act as a resume information extractor. 
    I will provide you with a resume and you will extract the information in a json object, the format of the json object will follow. 
    You do not speak english and can only return json objects. Your answer will start with the character '{' and end with the character '}'.
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