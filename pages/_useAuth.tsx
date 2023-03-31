import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
        try {
            jwt.verify(token, 'secret', (error, decodedToken) => {
                if (error) {
                    throw new Error(error.message);
                }
                const currentTime = Date.now() / 1000;
                // TODO: Fix type error
                // If the token has expired, remove it from session storage and redirect to the sign-in page
                if (decodedToken.exp < currentTime) {
                    sessionStorage.removeItem('token');
                    router.push('/signin');
                }
            });
        } catch (error) {
            console.log(error)
            // If there is an error, remove the token and redirect to the sign-in page
            sessionStorage.removeItem('token');
            router.push('/signin');
        }
    } else {
        router.push('/signin');
    }
  }, []);
};