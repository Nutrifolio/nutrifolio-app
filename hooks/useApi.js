import { useState } from 'react';

const useApi = (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        try {
            setLoading(true);
            const response = await apiFunc(...args);
            const json = await response.json();
            if (!response.ok) {
                if (json) {
                    if (Array.isArray(json)) {
                        setError(json.detail[0]);
                    } else {
                        setError(json.detail);
                    }
                } else {
                    setError('An unexpected error occured. Try again later.');
                }
            } else {
                setData(json);
            }
            setLoading(false);
            return response;
        } catch (error) {
            console.error(error);
        }
    };
    return { data, error, loading, request };
};

export default useApi;
