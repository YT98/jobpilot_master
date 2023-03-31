import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

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
	  // Redirect to the dashboard
	  router.push('/dashboard');
    } catch (error) {
		// TODO: Fix type error
		// If there is an error, set the error state
        setState({ ...state, error: error.message });
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={handlePasswordChange}
          />
        </div>
        <p>{state.error}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignIn;
