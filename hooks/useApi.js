import { useState } from 'react';

const useApi = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        apiFunc(...args)
            .then((data) => setData(data))
            .catch((err) => setError(err));
        setLoading(false);
    };

    return { data, error, loading, request };
};

export default useApi;
