import endpoints from './endpoints';

const signup = async (body) =>
    fetch(endpoints.REGISTER, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json().access_token)
        .catch((err) => err.json().detail);

const login = async (body) =>
    fetch(endpoints.LOGIN, {
        method: 'POST',
        body: new URLSearchParams({
            username: body.username,
            password: body.password,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
        .then((response) => response.json().access_token)
        .catch((err) => err.json().detail);

const getUser = async (userId, accessToken) =>
    fetch(`${endpoints.USERS}/${userId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json().detail);

export { signup, login, getUser };
