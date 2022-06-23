import endpoints from './endpoints';

const getStore = async (storeId) =>
    fetch(`${endpoints.STORES}/${storeId}`)
        .then((response) => response.json())
        .catch((err) => err.json().detail);

const searchStore = async (q, lat, lng, distance = 5) =>
    fetch(
        `${endpoints.SEARCH}?q=${q}&lat=${lat}&lng=${lng}&distance=${distance}`,
    )
        .then((response) => response.json().stores)
        .catch((err) => err.json().detail);

export { getStore, searchStore };
