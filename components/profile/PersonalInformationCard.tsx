import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect } from "react";
import UICard from "../UICard";
import { useState } from "react";
import { profileRoutes } from "../../config/routes";
import protectedRequest from "../../utils/protectedRequest";

interface PersonalInformationState {
    firstName: string;
    lastName: string;
    email: string;
    phone_number: string;
    linkedin: string;
    github: string;
    website: string;
    error: string;
}

const PersonalInformationCard = () => {
    const { appState } = useContext(AppContext);
    const userId = appState.user ? appState.user.id : '';
    const [state, setState] = useState<PersonalInformationState>({
        firstName: '',
        lastName: '',
        email: '',
        phone_number: '',
        linkedin: '',
        github: '',
        website: '',
        error: ''
    });
    
    useEffect(() => {
        if (!appState.loading) {
            const fetchPersonalInformation = async () => {
                const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + profileRoutes.personalInformation + `/${userId}`);
                const data = await response.json();
                setState({...state, ...data});
            }
            fetchPersonalInformation();
        }
    }, [appState.loading]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await protectedRequest(profileRoutes.personalInformation + `/${userId}`, 'POST', JSON.stringify({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                phone_number: state.phone_number,
                linkedin: state.linkedin,
                github: state.github,
                website: state.website,
            }));
            // TODO: Inform the user that the information was not updated
            // If the response is not ok, throw an error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            // TODO: Inform the user that the information was updated
            const data = await response.json();
            setState({...state, ...data});
        } catch (error) {
            
            // TODO: Inform the user that the information was not updated
            let errorMessage = 'Something went wrong';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            setState({...state, error: errorMessage});
        }
    };


  return (
    <UICard>
        <div className="card-header prose p-5">
            <h2>Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="w-1/2 p-5">
                <div className="mb-4">
                    <label className="label" htmlFor="firstName">
                        <span className="label-text">First Name</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="firstName"
                        type="text" 
                        placeholder="First Name"
                        value={state.firstName || ''}
                        onChange={(event) => setState({...state, firstName: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="label" htmlFor="lastName">
                        <span className="label-text">Last Name</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="lastName" 
                        type="text" 
                        placeholder="Last Name"
                        value={state.lastName || ''}
                        onChange={(event) => setState({...state, lastName: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="label" htmlFor="email">
                        <span className="label-text">Email</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="email" 
                        type="text" 
                        placeholder="Email"
                        value={state.email || ''}
                        onChange={(event) => setState({...state, email: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="label" htmlFor="phone-number">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="phone-number" 
                        type="text" 
                        placeholder="Phone Number"
                        value={state.phone_number || ''}
                        onChange={(event) => setState({...state, phone_number: event.target.value})}
                    />
                </div>
            </div>

            <div className="w-1/2 p-5">
                <div className="mb-4">
                    <label className="label" htmlFor="linkedin">
                        <span className="label-text">LinkedIn</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="password" 
                        type="text" 
                        placeholder="LinkedIn"
                        value={state.linkedin || ''}
                        onChange={(event) => setState({...state, linkedin: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="label" htmlFor="github">
                        <span className="label-text">Github</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="github" 
                        type="text" 
                        placeholder="Github"
                        value={state.github || ''}
                        onChange={(event) => setState({...state, github: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="label" htmlFor="website">
                        <span className="label-text">Website</span>
                    </label>
                    <input 
                        className="input input-bordered w-full" 
                        id="website" 
                        type="text" 
                        placeholder="Website"
                        value={state.website || ''}
                        onChange={(event) => setState({...state, website: event.target.value})}
                    />
                </div>
            </div>

            <div className="w-full p-5">
                <button 
                    className="btn btn-outline" 
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    </UICard>
  );
};

export default PersonalInformationCard;
