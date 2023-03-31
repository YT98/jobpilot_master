import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from session storage
    sessionStorage.removeItem('token');
    // Redirect to the sign-in page
    router.push('/signin');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
