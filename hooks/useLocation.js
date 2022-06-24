import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLocation = async () => {
        try {
            setLoading(true);
            // Ask location permissions
            let { granted } =
                await Location.requestForegroundPermissionsAsync();
            if (!granted) {
                Alert.alert(
                    'Location Access Required',
                    'Location permission is necessary for nearby search.',
                    [
                        {
                            text: 'OK',
                            onPress: () => BackHandler.exitApp(),
                        },
                    ],
                );
                return;
            }
            // Get user location
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync({});
            setLoading(false);
            setLocation({ latitude, longitude });
        } catch (e) {
            console.warn(e);
            Alert.alert(
                'Location Access Required',
                'Location permission is necessary for nearby search.',
                [
                    {
                        text: 'Enable Location Tracking',
                        onPress: () => {
                            Location.enableNetworkProviderAsync();
                        },
                    },
                ],
            );
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { location, loading };
};

export default useLocation;
