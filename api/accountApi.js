import endpoints from './endpoints';

const signup = async (body) =>
    fetch(endpoints.REGISTER, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    });

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
    });
};

const getUser = async (accessToken) =>
    fetch(endpoints.USER, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

export { signup, login, getUser };
