const state = {
  access_token: null,
  user: null,
  favorites: [],
  recents: [],
};

const baseURL = "http://localhost:8000";

/*const signup = async (body) => {
  try {
    const response = await fetch(`${baseURL}/signup`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    state.access_token = responseData.access_token;
  } catch (error) {
    console.log(error.message);
  }
};

const body = {
  first_name: "John",
  last_name: "Papadatos",
  email: "papajohn777777@gmail.com",
  password: "secretpassword",
  conf_password: "secretpassword",
};

signup(body);*/

////////////////////////////////////////////////////////////////////

/*const login = async (body) => {
  try {
    const response = await fetch(`${baseURL}/login`, {
      method: "POST",
      body: new URLSearchParams({
        username: body.username,
        password: body.password,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    state.access_token = responseData.access_token;
  } catch (error) {
    console.log(error.message);
  }
};

const body = {
  username: "papajohn777777@gmail.com",
  password: "secretpassword",
};

login(body);*/

////////////////////////////////////////////////////////////////////

/*const getUser = async (user_id) => {
  try {
    const response = await fetch(`${baseURL}/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${state.access_token}`,
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    state.user = responseData;
  } catch (error) {
    console.log(error.message);
  }
};

getUser(55);*/

////////////////////////////////////////////////////////////////////

/*const getStore = async (store_id) => {
  try {
    const response = await fetch(`${baseURL}/stores/${store_id}`);

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    const store = responseData;
  } catch (error) {
    console.log(error.message);
  }
};

getStore(1);*/

////////////////////////////////////////////////////////////////////

/*const searchStore = async (q, lat, lng, distance = 5) => {
  try {
    const response = await fetch(
      `${baseURL}/search?q=${q}&lat=${lat}&lng=${lng}&distance=${distance}`
    );

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    const stores = responseData.stores;
  } catch (error) {
    console.log(error.message);
  }
};

searchStore("star", 38, 23.8);*/

////////////////////////////////////////////////////////////////////

/*const getProduct = async (product_id) => {
  try {
    const response = await fetch(`${baseURL}/products/${product_id}`);

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    const product = responseData;
  } catch (error) {
    console.log(error.message);
  }
};

getProduct(1);*/

////////////////////////////////////////////////////////////////////

/*const getFavorites = async () => {
  try {
    const response = await fetch(`${baseURL}/favorites`, {
      headers: {
        Authorization: `Bearer ${state.access_token}`,
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    state.favorites = responseData.favorites;
  } catch (error) {
    console.log(error.message);
  }
};

getFavorites();*/

////////////////////////////////////////////////////////////////////

/*const createFavorite = async (body) => {
  try {
    const response = await fetch(`${baseURL}/favorites`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${state.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    state.favorites = [...state.favorites, responseData];
  } catch (error) {
    console.log(error.message);
  }
};

const body = {
  product_id: 7,
};

createFavorite(body);*/

////////////////////////////////////////////////////////////////////

/*const deleteFavorite = async (product_id) => {
  try {
    const response = await fetch(`${baseURL}/favorites/${product_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${state.access_token}`,
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    state.favorites = state.favorites.filter(
      (favorite) => favorite.id != product_id
    );
  } catch (error) {
    console.log(error.message);
  }
};

deleteFavorite(7);*/

////////////////////////////////////////////////////////////////////

/*const getRecents = async () => {
  try {
    const response = await fetch(`${baseURL}/recents`, {
      headers: {
        Authorization: `Bearer ${state.access_token}`,
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    state.recents = responseData.recents;
  } catch (error) {
    console.log(error.message);
  }
};

getRecents();*/

////////////////////////////////////////////////////////////////////

/*const createRecent = async (body) => {
  try {
    const response = await fetch(`${baseURL}/recents`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${state.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    if (!state.recents.some((p) => p.id === responseData.id)) {
      state.recents = [...state.recents, responseData];
    }
  } catch (error) {
    console.log(error.message);
  }
};

const body = {
  product_id: 9,
};

createRecent(body);*/

////////////////////////////////////////////////////////////////////

/*const filterProducts = async (body) => {
  try {
    const response = await fetch(`${baseURL}/filter`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const responseError = await response.json();
      const errorMessage = responseError.detail;
      throw new Error(errorMessage);
    }

    const responseData = await response.json();

    const products = responseData.products;
  } catch (error) {
    console.log(error.message);
  }
};

const body = {
  lat: 38,
  lng: 23.8,
  // categories: ["string"],
  max_dist: 10,
  min_price: 0,
  max_price: 10,
  min_calories: 0,
  max_calories: 1000,
  min_protein: 0,
  max_protein: 50,
  min_carbs: 0,
  max_carbs: 80,
  min_fat: 0,
  max_fat: 30,
  sort_by: "price",
  ordering: "ASC",
};

filterProducts(body);*/
