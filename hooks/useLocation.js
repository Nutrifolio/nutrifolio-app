import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

// TODO Improve User Interaction and prompt enabling location tracking

const useLocation = () => {
    const [location, setLocation] = useState(null);

    const getLocation = async () => {
        try {
            // Ask for location permissions
            let { granted } =
                await Location.requestForegroundPermissionsAsync();
            if (!granted) {
                Alert.alert(
                    'Location Access Required',
                    'Location tracking permission is necessary for nearby search.',
                    [
                        {
                            text: 'Exit',
                            onPress: () => BackHandler.exitApp(),
                        },
                    ],
                );
                return;
            }
            // Get user location
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            setLocation({ latitude, longitude });
        } catch (e) {
            console.warn(e);
            Alert.alert(
                'Location Access Required',
                'Location tracking is necessary for nearby search.',
                [
                    {
                        text: 'Exit',
                        onPress: () => BackHandler.exitApp(),
                    },
                ],
            );
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return { location };
};

export default useLocation;
