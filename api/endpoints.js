const baseURL = 'https://nutrifolio-api.herokuapp.com';

export default Object.freeze({
    REGISTER: `${baseURL}/signup`,
    LOGIN: `${baseURL}/login`,
    USER: `${baseURL}/user_info`,
    STORES: `${baseURL}/stores`,
    SEARCH: `${baseURL}/search`,
    PRODUCTS: `${baseURL}/products`,
    FAVORITES: `${baseURL}/favorites`,
    RECENTS: `${baseURL}/recents`,
    FILTER: `${baseURL}/filter`,
});
