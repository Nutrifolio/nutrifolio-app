import { useState } from 'react';

const useApi = (apiFunc) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        const response = await apiFunc(...args);
        const data = await response.json();
        setLoading(false);
        if (!response.ok) {
            if (data) {
                setError(data.detail);
            } else {
                setError('An unexpected error occured. Try again later.');
            }
        } else {
            setData(data);
        }
        return response;
    };

    return { data, error, loading, request };
};

export default useApi;
