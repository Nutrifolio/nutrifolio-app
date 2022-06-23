import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

const useLocation = () => {
    const [location, setLocation] = useState(null);

    const getLocation = async () => {
        try {
            // Ask location permissions
            let { granted } =
                await Location.requestForegroundPermissionsAsync();
            if (!granted) return;

            // Get user location
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({});

            setLocation({ latitude, longitude });
        } catch (e) {
            console.warn(e);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return location;
};

export default useLocation;
