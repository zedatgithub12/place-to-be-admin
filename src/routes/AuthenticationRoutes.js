import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <AuthLogin />,
    children: [
        {
            path: '/pages/login/login',
            element: <AuthLogin />
        },
        {
            path: '/pages/register/register',
            element: <AuthRegister />
        }
    ]
};

export default AuthenticationRoutes;
