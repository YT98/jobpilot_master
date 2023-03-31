import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../contexts/AppContext';
import { useContext } from 'react';

interface SignInState {
  email: string;
  password: string;
  error: string | null;
}

const SignIn: React.FC = () => {
	const router = useRouter();
    const [state, setState] = React.useState<SignInState>({
        email: '',
        password: '',
        error: null,
    });
	// TODO: Fix type error
	const { appState, appDispatch } = useContext(AppContext);

	// If the user is already logged in, redirect to the dashboard
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            router.push('/dashboard');
        }
    }, []);


    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, email: event.target.value });
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, password: event.target.value });
    };

	// Handle the form submission
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/user/login', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				email: state.email,
				password: state.password,
				}),
			});
			// If the response is not ok, throw an error
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}
			const data = await response.json();
			// Store the token in session storage
			sessionStorage.setItem('token', data.token);
			// 
			appDispatch({ type: 'LOGIN', payload: data.user });
			console.log(data.user)
			// Redirect to the dashboard
			router.push('/dashboard');
		} catch (error) {
			// TODO: Fix type error
			// If there is an error, set the error state
			console.log(error)
			setState({ ...state, error: error.message });
		}
	};

  return (
	<div className="bg-sky-100 grid h-screen place-items-center">
		<div className="w-full max-w-xs">
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
				<h1 className="block text-gray-700 text-lg font-bold mb-2"> Sign In </h1>
				<div className="mb-4">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
						Email
					</label>
					<input 
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						type="email"
						id="email"
						value={state.email}
						onChange={handleEmailChange}
					/>
				</div>
				<div className="mb-6">
					<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
						Password
					</label>
					<input 
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
						type="password"
						id="password"
						value={state.password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className="flex items-center justify-between">
					<button 
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
						type="submit"
					>
						Sign In
					</button>
					<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
						Forgot Password?
					</a>
				</div>
			</form>
			<p className="text-center text-gray-500 text-xs">
				&copy;2023 []. All rights reserved.
			</p>
		</div>
	</div>
  );
};

export default SignIn;
