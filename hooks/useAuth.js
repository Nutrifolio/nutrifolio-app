import { useContext } from 'react';
import AuthContext from '../auth/authContext';
import AuthStorage from '../auth/storage';
import UserContext from '../auth/userContext';

const useAuth = () => {
    const { accessToken, setAccessToken } = useContext(AuthContext);
    const { setProducts } = useContext(UserContext);

    const logIn = (accessToken) => {
        setAccessToken(accessToken);
        AuthStorage.storeToken(accessToken);
    };

    const logOut = () => {
        setProducts({ favorites: [], recents: [] });
        setAccessToken(null);
        AuthStorage.removeToken();
    };

    return { accessToken, logIn, logOut };
};

export default useAuth;
