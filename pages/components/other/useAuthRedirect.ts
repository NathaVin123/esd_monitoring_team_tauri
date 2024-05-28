import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    exp: number;
}

const useAuthRedirect = () => {
    const router = useRouter();

    const [state, setState] = useState<boolean>(false);


    useEffect(() => {
        const token = localStorage.getItem('token');


        console.log('Token:', token);
        if (!token) {
            console.log('Not have token');
            router.replace('/login');
            return;
        }

        try {
            const decodedToken = jwtDecode<DecodedToken>(token);
            console.log('Decoded Token:', decodedToken);

            const currentTime = Date.now() / 1000;
            console.log('Token Expiration Time:', decodedToken.exp);
            console.log('Current Time:', currentTime);

            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                router.replace('/login');
                setState(false)
            } else {
                router.replace('/dashboard');
                setState(true);
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
            router.replace('/login');
        }
    }, [router]);

    return state;
};

export default useAuthRedirect;
