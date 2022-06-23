import React, { useState } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Screen from '../components/Screen';
import FillableIconButton from '../components/buttons/FillableIconButton';
import colors from '../styles/colors';
import FilterModal from '../components/FilterModal';
import NutriTextInput from '../components/NutriTextInput';

const SearchScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [pressed, setPressed] = useState('none');

    // XXX Not allowing inline styles leads to this
    let opacityStyle = { opacity: 1 };
    modalVisible ? (opacityStyle.opacity = 0.3) : (opacityStyle.opacity = 1);

    const handleToggleFilter = () => {
        if (pressed !== 'filter') {
            setPressed('filter');
            setModalVisible(!modalVisible);
        } else {
            setPressed('none');
        }
    };

    const handleToggleLiked = () => {
        if (pressed !== 'liked') {
            setPressed('liked');
        } else {
            setPressed('none');
        }
    };

    const handleToggleRecent = () => {
        if (pressed !== 'recent') {
            setPressed('recent');
        } else {
            setPressed('none');
        }
    };

    return (
        <Screen>
            <View
                style={{
                    ...styles.container,
                    ...opacityStyle,
                }}
            >
                <View style={styles.searchOptions}>
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
                            onPress={handleToggleFilter}
                        />
                        <FillableIconButton
                            text='Liked'
                            icon='heart-outline'
                            pressed={pressed === 'liked'}
                            onPress={handleToggleLiked}
                        />
                        <FillableIconButton
                            text='Recent'
                            icon='clock-outline'
                            pressed={pressed === 'recent'}
                            onPress={handleToggleRecent}
                        />
                    </View>
                </View>

                <FilterModal
                    toggleModal={() => handleToggleFilter()}
                    visible={modalVisible}
                />
                <Image
                    source={require('../assets/no_results.png')}
                    style={styles.image}
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    searchOptions: {
        width: '100%',
    },
    searchBar: {
        borderRadius: 40,
        paddingVertical: 5,
        backgroundColor: colors.lightGrey,
        flexDirection: 'row',
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
});

export default SearchScreen;
