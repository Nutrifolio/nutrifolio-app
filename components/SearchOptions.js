import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import FillableIconButton from '../components/buttons/FillableIconButton';
import colors from '../styles/colors';
import NutriTextInput from './NutriTextInput';

const SearchOptions = () => {
    const [pressed, setPressed] = useState('none');

    const handlePress = (button) => {
        setPressed(button);
    };

    return (
        <View style={styles.container}>
            <NutriTextInput
                iconName='magnify'
                placeholder='Search Nearby Stores'
                style={styles.searchBar}
            />
            <View style={styles.buttonContainer}>
                <FillableIconButton
                    text='Filter'
                    icon='filter-outline'
                    pressed={pressed === 'filter'}
                    onPress={() => setPressed('filter')}
                />
                <FillableIconButton
                    text='Liked'
                    icon='heart-outline'
                    pressed={pressed === 'liked'}
                    onPress={() => handlePress('liked')}
                />
                <FillableIconButton
                    text='Recent'
                    icon='clock-outline'
                    pressed={pressed === 'recent'}
                    onPress={() => handlePress('recent')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchBar: {
        borderRadius: 40,
        paddingVertical: 5,
        backgroundColor: colors.lightGrey,
        flexDirection: 'row',
        fontSize: 16,
        marginBottom: 10,
    },
});

export default SearchOptions;
