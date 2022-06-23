import endpoints from './endpoints';

const signup = async (body) =>
    fetch(endpoints.REGISTER, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json());

const login = async (body) => {
    const formBody = Object.keys(body)
        .map(
            (key) =>
                encodeURIComponent(key) + '=' + encodeURIComponent(body[key]),
        )
        .join('&');
    return fetch(endpoints.LOGIN, {
        method: 'POST',
        body: formBody,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json());
};

const getUser = async (userId, accessToken) =>
    fetch(`${endpoints.USERS}/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json());

export { signup, login, getUser };
