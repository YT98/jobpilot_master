import ResumePageContainer from "../../../components/resumes/[id]/ResumePageContainer";
import { useEffect, useState, useContext } from "react";
import { ResumeContactInformationLink } from "../../../types/dbModelsExtended";
import { ResumeContext } from "../../../contexts/ResumeContext";
import protectedRequest from "../../../utils/protectedRequest";
import { resumeRoutes } from "../../../config/routes";

interface ResumeContactState {
    id: number;
    resumeId: number;
    email: string;
    phoneNumber: string;
    city: string;
    region: string;
    country: string;
    loading: boolean;
}

const ResumeContact = () => {
    const { resumeState, resumeDispatch } = useContext(ResumeContext);

    const [state, setState] = useState<ResumeContactState>({
        id: 0,
        resumeId: 0,
        email: "",
        phoneNumber: "",
        city: "",
        region: "",
        country: "",
        loading: true
    });

    const [resumeLinks, setResumeLinks] = useState<ResumeContactInformationLink[]>([]);

    useEffect(() => {
        if (resumeState.contact) {
            setState({
                ...state,
                id: resumeState.contact.id,
                resumeId: resumeState.contact.resumeId,
                email: resumeState.contact.email,
                phoneNumber: resumeState.contact.phoneNumber,
                city: resumeState.contact.city,
                region: resumeState.contact.region,
                country: resumeState.contact.country,
                loading: resumeState.loading
            });
        }
    }, [resumeState.contact]);

    useEffect(() => {
        if (resumeState.contactLinks) {
            setResumeLinks(resumeState.contactLinks);
        }
    }, [resumeState.contactLinks]);

    const handleSubmit = async () => {
        try {
            if (!state.email || !state.phoneNumber || !state.city || !state.region || !state.country) return;
            // TODO: Validate inputs
            const resumeResponse = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactInformation, "POST", JSON.stringify({
                id: state.id,
                resumeId: state.resumeId,
                email: state.email,
                phoneNumber: state.phoneNumber,
                city: state.city,
                region: state.region,
                country: state.country
            }));
            const resumeData = await resumeResponse.json();
            resumeDispatch({type: "SET_CONTACT", payload: resumeData.resumeContactInformation});
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }

        try {
            const linksResponse = await protectedRequest(process.env.NEXT_PUBLIC_BASE_URL + resumeRoutes.updateContactLinks, "POST", JSON.stringify({
                resumeContactInformationId: state.id,
                links: resumeLinks
            }));
            const linksData = await linksResponse.json();
            console.log(linksData)
            resumeDispatch({type: "SET_CONTACT_LINKS", payload: linksData.links});
        } catch (error) {
            // TODO: Handle error
            console.log(error);
        }
    }

    const handleRemoveSocialMediaLink = (index: number) => {
        resumeLinks.splice(index, 1);
        setState({...state});
    }

    const handleAddSocialMediaLink = () => {
        resumeLinks.push({
            type: "LinkedIn",
            url: ""
        });
        setState({...state});
    }

    const socialMediaLinks = resumeLinks.map((profileLink, index) => {
        return (
            <div key={index} className="flex flex-row rounded-lg border border-gray-300 mt-3 first-of-type:mt-0">
                <select
                    className="input flex-grow"
                    value={profileLink.type}
                    id={`type-input-${index}`}
                    onChange={(e) => {
                        resumeLinks[index].type = e.target.value;
                        setState({...state})
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
                        resumeLinks[index].url = e.target.value;
                        setState({...state})
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

    if (state.loading) {
        return <ResumePageContainer><div id="resume-contact-container-loading"> Loading... </div></ResumePageContainer>
    } else {
    return (
        <ResumePageContainer>
            <div id="resume-contact-container">
                <div className="w-1/2 prose mb-5 pr-10">
                    <p className="text-gray-500 border-l-2 pl-4"> Please fill in your personal information in the fields below so we can better assist you.
                        Your information will be kept confidential and will only be used for the purpose of providing you with the best possible service.
                        <br/> <span className="text-gray-400">* indicates required</span>
                    </p>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2 mr-5">
                        <label className="uppercase text-sm font-bold pb-1"> Email </label>
                        <input
                            id="resume-email-input"
                            className="input input-bordered mb-5" type="text"
                            defaultValue={state.email}
                            onChange={(e) => { setState({...state, email: e.target.value}) }}
                        />
                    </div>
                    <div className="flex flex-col w-1/2 ml-5">
                        <label className="uppercase text-sm font-bold pb-1"> Phone Number </label>
                        <input
                            id="resume-phone-number-input"
                            className="input input-bordered mb-5" type="text"
                            defaultValue={state.phoneNumber}
                            onChange={(e) => { setState({...state, phoneNumber: e.target.value}) }}
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2 mr-5">
                        <label className="uppercase text-sm font-bold pb-1"> City </label>
                        <input
                            id="resume-city-input"
                            className="input input-bordered mb-5" type="text"
                            defaultValue={state.city}
                            onChange={(e) => { setState({...state, city: e.target.value}) }}
                        />
                    </div>
                    <div className="flex flex-col w-1/2 ml-5">
                        <label className="uppercase text-sm font-bold pb-1"> Region </label>
                        <input
                            id="resume-region-input"
                            className="input input-bordered mb-5" type="text"
                            defaultValue={state.region}
                            onChange={(e) => { setState({...state, region: e.target.value}) }}
                        />
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/2 pr-5">
                        <label className="uppercase text-sm font-bold pb-1"> Country </label>
                        <input
                            id="resume-country-input"
                            className="input input-bordered mb-5" type="text"
                            defaultValue={state.country}
                            onChange={(e) => { setState({...state, country: e.target.value}) }}
                        />
                    </div>
                </div>



                <div className="w-1/2 mb-8 pr-5">

                    <p className="mt-8 text-gray-500 border-l-2 pl-4 mb-5">
                        If you would like to include social media or portfolio links on your resume, please add them below.
                        While it's not mandatory, including these links can help showcase your skills and experience to potential employers.
                        Be sure to double-check that the links are correct and up-to-date!
                    </p>

                    <div className="flex flex-col" id="resume-contact-links">
                        {socialMediaLinks}
                        <button
                            id="resume-add-link-button"
                            onClick={handleAddSocialMediaLink}
                            className="btn btn-outline border-gray-300 text-gray-400 mt-3 hover:bg-transparent hover:text-black"
                        >
                            + Add Link
                        </button>
                    </div>
                </div>






                <button
                    onClick={handleSubmit}
                    id="contact-submit-button"
                    className="btn btn-outline"
                >
                    SAVE
                </button>
            </div>
        </ResumePageContainer>
    )
    }
}

export default ResumeContact;