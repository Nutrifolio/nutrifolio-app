import { useContext } from 'react';
import AuthContext from '../auth/context';
import AuthStorage from '../auth/storage';

const useAuth = () => {
    const { accessToken, setAccessToken } = useContext(AuthContext);

    const logIn = (accessToken) => {
        setAccessToken(accessToken);
        AuthStorage.storeToken(accessToken);
    };

    const logOut = () => {
        setAccessToken(null);
        AuthStorage.removeToken();
    };

    return { accessToken, logIn, logOut };
};

export default useAuth;
