import endpoints from './endpoints';

const getStore = async (storeId) => fetch(`${endpoints.STORES}/${storeId}`);

const searchStore = async (q, lat, lng, distance = 5) =>
    fetch(
        `${endpoints.SEARCH}?q=${q}&lat=${lat}&lng=${lng}&distance=${distance}`,
    );

export { getStore, searchStore };
