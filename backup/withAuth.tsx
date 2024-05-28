// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import jwtDecode, { JwtPayload } from 'jwt-decode';
//
// interface DecodedToken extends JwtPayload {
//     exp: number;
// }
//
// const withAuth = (WrappedComponent: React.ComponentType, redirectPath: string = '/dashboard') => {
//     return (props: any) => {
//         const router = useRouter();
//         const [loading, setLoading] = useState(true);
//
//         useEffect(() => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setLoading(false);
//                 return;
//             }
//
//             try {
//                 const decodedToken = jwtDecode<DecodedToken>(token);
//                 const currentTime = Date.now() / 1000;
//                 if (decodedToken.exp < currentTime) {
//                     localStorage.removeItem('token');
//                     router.push('/login');
//                 } else {
//                     router.push(redirectPath);
//                 }
//             } catch (error) {
//                 localStorage.removeItem('token');
//                 router.push('/login');
//             }
//         }, [router, redirectPath]);
//
//         if (loading) {
//             return <div>Loading...</div>;
//         }
//
//         return <WrappedComponent {...props} />;
//     };
// };
//
// export default withAuth;
