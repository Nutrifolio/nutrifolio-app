import endpoints from './endpoints';

const getFavorites = async (accessToken) =>
    fetch(endpoints.FAVORITES, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json());

const createFavorite = async (body, accessToken) =>
    fetch(endpoints.FAVORITES, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json()) // Remember to update state.favorites
        .catch((err) => err.json());

const deleteFavorite = async (product_id, accessToken) =>
    fetch(`${endpoints.FAVORITES}/${product_id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json()) // Remember to filter state.favorites
        .catch((err) => err.json());

const getRecents = async (accessToken) =>
    fetch(endpoints.RECENTS, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json());

const createRecent = async (body, accessToken) =>
    fetch(endpoints.RECENTS, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json()) // Remember to update state.recents
        .catch((err) => err.json());

const filterProducts = async (body) =>
    fetch(endpoints.FILTER, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .catch((err) => err.json());

export {
    createFavorite,
    createRecent,
    deleteFavorite,
    filterProducts,
    getFavorites,
    getRecents,
};
