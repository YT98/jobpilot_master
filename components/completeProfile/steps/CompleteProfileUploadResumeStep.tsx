const CompleteProfileUploadResumeStep = () => {
    return (
        <div>
            <div className="prose p-10">
                <h1> Step 1 : Upload Resume </h1>
                <p> Welcome to JobPilot! <br/>
                    In order to assist you in finding a job, we require additional information about you, such as your educational background and
                    previous work experiences. You have the option to upload your current resume, 
                    and we will make an effort to extract all the relevant details. 
                    Alternatively, you may choose to skip this step and move forward with manually 
                    filling out the fields in the subsequent stages.
                </p>
                <form>
                    <input className="file-input file-input-bordered" type="file" name="resume" id="resume" />
                    <label className="label">
                        <span className="label-text">We can only handle .pdf files at the moment.</span>
                    </label>
                </form>
                <button className="btn btn-outline mt-10 mr-5">SKIP</button>
                <button className="btn btn-outline mt-10 btn-disabled">NEXT</button>
            </div>
        </div>
    )
};

export default CompleteProfileUploadResumeStep;