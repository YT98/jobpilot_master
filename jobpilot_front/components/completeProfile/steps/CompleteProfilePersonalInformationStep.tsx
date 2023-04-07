import { Profile, ProfileLink } from "../../../types/dbModels";

interface CompleteProfilePersonalInformationStepProps {
    profile: Profile;
    setProfile: (profile: Profile) => void;
    profileLinks: ProfileLink[];
    setProfileLinks: (profileLinks: ProfileLink[]) => void;
}

const CompleteProfilePersonalInformationStep = ({profile, setProfile, profileLinks, setProfileLinks }: CompleteProfilePersonalInformationStepProps) => {

    const handleAddSocialMediaLink = () => {
        profileLinks.push({
            type: "LinkedIn",
            url: ""
        });
        setProfileLinks([...profileLinks]);
    }

    const handleRemoveSocialMediaLink = (index: number) => {
        profileLinks.splice(index, 1);
        setProfileLinks([...profileLinks]);
    }

    const socialMediaLinks = profileLinks.map((profileLink, index) => {
        return (
            <div key={index} className="flex flex-row rounded-lg border border-gray-300 mt-3 first-of-type:mt-0">
                <select 
                    className="input flex-grow"
                    value={profileLink.type}
                    onChange={(e) => {
                        profileLink.type = e.target.value;
                        setProfileLinks({
                            ...profileLinks
                        })
                    }}
                >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Behance">Behance</option>
                    <option value="Dribbble">Dribbble</option>
                    <option value="Other">Other</option>
                </select>
                <input 
                    type="text" placeholder="URL" className="input flex-grow ml-2 rounded-none border-0 border-l border-gray-300 bg-transparent"
                    value={profileLink.url}
                    onChange={(e) => {
                        profileLink.url = e.target.value;
                        setProfileLinks([...profileLinks])
                    }}
                />
                <div className="flex flex-col justify-center">
                    <span 
                        className="ml-2 mr-3 cursor-pointer hover:text-gray-600 text-gray-400"
                        onClick={() => {handleRemoveSocialMediaLink(index)}}
                    >
                            &#10005;
                    </span>
                </div>
            </div>
        )
    });

    return (
        <div>
            <h1 className="mb-5"> Step 1: Personal Information </h1>
            <p className="text-gray-500 border-l-2 pl-4"> Please fill in your personal information in the fields below so we can better assist you. 
                Your information will be kept confidential and will only be used for the purpose of providing you with the best possible service.
                <br/> <span className="text-gray-400">* indicates required</span>
            </p>
                
            <div>
                <div className="flex flex-row">
                    <div className="flex flex-col flex-grow">
                        <label className="label mt-3">
                            <span className="label-text">First Name *</span>
                        </label>
                        <input 
                            type="text" placeholder="First Name" className="input input-bordered mr-3" 
                            value={profile.firstName}
                            onChange={(e) => {setProfile({...profile, firstName: e.target.value})}}    
                        />
                    </div>
                    <div className="flex flex-col flex-grow">
                        <label className="label mt-3">
                            <span className="label-text">Last Name *</span>
                        </label>
                        <input 
                            type="text" placeholder="Last Name" className="input input-bordered" 
                            value={profile.lastName}
                            onChange={(e) => {setProfile({...profile, lastName: e.target.value})}}
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="label mt-3">
                        <span className="label-text">Email *</span>
                    </label>
                    <input 
                        type="email" placeholder="Email" className="input input-bordered" 
                        value={profile.email}
                        onChange={(e) => {setProfile({...profile, email: e.target.value})}}    
                    />

                    <label className="label mt-3">
                        <span className="label-text">Phone Number *</span>
                    </label>
                    <input 
                        type="tel" placeholder="Phone Number" className="input input-bordered" 
                        value={profile.phoneNumber}
                        onChange={(e) => {setProfile({...profile, phoneNumber: e.target.value})}}
                    />

                </div>
                <p className="mt-8 text-gray-500 border-l-2 pl-4"> 
                    If you would like to include social media or portfolio links on your resume, please feel free to add them below. 
                    While it's not mandatory, including these links can help showcase your skills and experience to potential employers.
                    Be sure to double-check that the links are correct and up-to-date!
                </p>
                <div className="flex flex-col">
                    {socialMediaLinks}
                    <button 
                        onClick={handleAddSocialMediaLink}
                        className="btn btn-outline border-gray-300 text-gray-400 mt-3 hover:bg-transparent hover:text-black"
                    > 
                        + Add Link 
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CompleteProfilePersonalInformationStep;