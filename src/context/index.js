import { useMemo } from 'react';

export const AppContext = () => {
    authContext = useMemo(
        () => ({
            SignIn: async (status, users) => {
                if (status === 'Signed') {
                    sessionStorage.setItem('user', JSON.stringify(users));
                    sessionStorage.setItem('token', JSON.stringify(users.fname));

                    setLoged(true);
                } else {
                    setLoged(false);
                }
            },

            SignOut: async (status) => {
                if (status === 'Signout') {
                    sessionStorage.clear();

                    setLoged(false);
                }
                {
                    setLoged(false);
                }
            },

            getToken: async () => {
                const tokenString = sessionStorage.getItem('token');
                const userToken = JSON.parse(tokenString);
                return userToken;
            },

            getUser: async () => {
                const userString = sessionStorage.getItem('user');
                const userDetails = JSON.parse(userString);
                return userDetails;
            }
        }),
        []
    );
    return authContext;
};
