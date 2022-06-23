import * as SecureStore from 'expo-secure-store';

const key = 'accessToken';

const storeToken = async (accessToken) => {
    try {
        await SecureStore.setItemAsync(key, accessToken);
    } catch (error) {
        console.log('Error storing the auth token', error);
    }
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log('Error getting the access token', error);
    }
};

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log('Error removing the access token', error);
    }
};

export default { storeToken, getToken, removeToken };
