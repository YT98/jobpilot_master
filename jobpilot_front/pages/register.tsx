import { useRouter } from 'next/router';
import { authRoutes } from '../config/routes';
import { AppContext } from '../contexts/AppContext';
import { useState, useContext } from 'react';

interface RegisterState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    invitationCode: string;
    error: string | null;
}

const Register = () => {
    const router = useRouter();

    const [state, setState] = useState<RegisterState>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        invitationCode: '',
        error: null,
    });

    const { appState, appDispatch } = useContext(AppContext);

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + authRoutes.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    password: state.password,
                    invitationCode: state.invitationCode,
                }),
            });
            // If the response is not ok, throw an error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            const data = await response.json();
            // Store the token in session storage
            // sessionStorage.setItem('token', data.token);
            // Store the user in the app context
            // appDispatch({ type: 'LOGIN', payload: data.user });
            // Redirect to the complete profile page
            router.push('/complete-profile/upload-resume');
        } catch (error) {
            let errorMessage = 'Something went wrong. Please try again.';
			if (error instanceof Error) {
				errorMessage = error.message;
			}
            setState({ ...state, error: errorMessage });
        }
    };

    return (
        <div className="flex h-full">
            <div className="w-2/5 bg-blue-500 hidden lg:flex prose flex-col justify-center">
                <h1 className="text-white text-center"> JobPilot </h1>
            </div>
            <div className="w-full lg:w-3/5 flex justify-center">
                <div className="prose p-10 flex flex-col justify-center">
                    <h2> Register </h2>
                    <form onSubmit={handleRegister}>
                        <div className="flex flex-row">
                            <div className="flex flex-col flex-grow">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input 
                                    type="text" placeholder="First Name" className="input input-bordered mr-3" 
                                    onChange={(event) => setState({ ...state, firstName: event.target.value })}
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text" placeholder="Last Name" className="input input-bordered"
                                    onChange={(event) => setState({ ...state, lastName: event.target.value })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email" placeholder="Email" className="input input-bordered"
                                onChange={(event) => setState({ ...state, email: event.target.value })}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" placeholder="Password" className="input input-bordered"
                                onChange={(event) => setState({ ...state, password: event.target.value })}    
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="label">
                                <span className="label-text">Invitation Code</span>
                            </label>
                            <input 
                                type="text" placeholder="Invitation Code" className="input input-bordered"
                                onChange={(event) => setState({ ...state, invitationCode: event.target.value })}
                            />
                        </div>
                        <button className="btn btn-outline mt-10" type="submit">REGISTER</button>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default Register;