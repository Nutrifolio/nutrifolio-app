import propTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, Modal, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import NutriButtonIcon from '../components/buttons/NutriButtonIcon';
import TextButton from './buttons/TextButton';
import NutriText from './NutriText';

const FilterModal = (props) => {
    const modalTitle = 'Filters';

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={props.visible}
            onRequestClose={props.toggleModal}
        >
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.modalView}>
                    <View style={styles.header}>
                        <TextButton
                            text='Clear'
                            textStyle={styles.headerButton}
                            onPress={() => {}}
                        />
                        <NutriText style={styles.headerTitle}>
                            {modalTitle}
                        </NutriText>
                        <TextButton
                            text='Done'
                            textStyle={styles.headerButton}
                            onPress={() => {}}
                        />
                    </View>
                    <NutriButtonIcon
                        icon='plus'
                        text='Categories'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Distance'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Price'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Calories'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Protein'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Carbohydrates'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Fats'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                    <NutriButtonIcon
                        icon='plus'
                        text='Sort By'
                        style={styles.filter}
                        containerStyle={styles.filterContainer}
                        onPress={() => {}}
                    />
                </View>
            </ScrollView>
        </Modal>
    );
};

FilterModal.propTypes = {
    visible: propTypes.bool,
    toggleModal: propTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '20%',
    },
    contentContainer: {
        flexGrow: 1,
    },
    modalView: {
        flex: 1,
        backgroundColor: colors.white,
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    headerButton: {
        fontSize: 16,
        color: colors.black,
    },
    headerTitle: {
        fontSize: 16,
        color: colors.black,
        fontWeight: 'bold',
    },
    filterContainer: {
        backgroundColor: colors.lightGrey,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    filter: {
        fontSize: 18,
        color: colors.black,
    },
});

export default FilterModal;
