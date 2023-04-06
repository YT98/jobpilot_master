import { useRouter } from 'next/router';

const CompleteProfileUploadResume = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center">
            <div className="prose p-10">
                <h1> Welcome to <span className="text-blue-500">JobPilot</span> </h1>
                <p className="text-gray-500 border-l-2 pl-4">
                    In order to assist you in finding a job, we require additional information about you, such as your educational background and
                    previous work experiences. You have the option to upload your current resume, 
                    and we will make an effort to extract all the relevant details. 
                    Alternatively, you may choose to skip this step and move forward with manually 
                    filling out the fields in the subsequent stages.
                </p>
                <form>
                    <input 
                        className="file-input file-input-bordered" type="file" name="resume" id="resume"
                        accept=".pdf"
                    />
                    <label className="label">
                        <span className="label-text">We can only handle .pdf files at the moment.</span>
                    </label>
                </form>
                <button 
                    className="btn btn-outline mt-10 mr-5"
                    onClick={() => router.push("/complete-profile/")}
                >SKIP</button>
                <button className="btn btn-outline mt-10 btn-disabled">UPLOAD</button>
            </div>
        </div>
    )
};

export default CompleteProfileUploadResume;