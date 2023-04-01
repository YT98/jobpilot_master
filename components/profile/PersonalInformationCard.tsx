import { AppContext } from "../../contexts/AppContext";
import { useContext, useEffect } from "react";
import DashboardCard from "../DashboardCard";
import { useState } from "react";

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
                const response = await fetch(`http://localhost:5000/user/${userId}/personal_info`);
                const data = await response.json();
                setState({...state, ...data});
            }
            fetchPersonalInformation();
        }
    }, [appState.loading]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/user/${userId}/personal_info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    phone_number: state.phone_number,
                    linkedin: state.linkedin,
                    github: state.github,
                    website: state.website,
                }),
            });
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
            // TODO: Fix type error
            // TODO: Inform the user that the information was not updated
            setState({...state, error: error.message});
        }
    };


  return (
    <DashboardCard>
            <p className="text-gray-600 mb-4 font-bold">Personal Information</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" 
                        placeholder="First Name"
                        value={state.firstName}
                        onChange={(event) => setState({...state, firstName: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" 
                        placeholder="Last Name"
                        value={state.lastName}
                        onChange={(event) => setState({...state, lastName: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" 
                        placeholder="Email"
                        value={state.email}
                        onChange={(event) => setState({...state, email: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Phone Number
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                        placeholder="Phone Number"
                        value={state.phone_number}
                        onChange={(event) => setState({...state, phone_number: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        LinkedIn
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                        placeholder="LinkedIn"
                        value={state.linkedin}
                        onChange={(event) => setState({...state, linkedin: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        GitHub
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                        placeholder="Github"
                        value={state.github}
                        onChange={(event) => setState({...state, github: event.target.value})}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Website
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" 
                        placeholder="Website"
                        value={state.website}
                        onChange={(event) => setState({...state, website: event.target.value})}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </DashboardCard>
  );
};

export default PersonalInformationCard;
