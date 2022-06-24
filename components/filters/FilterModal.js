import propTypes from 'prop-types';
import React, { useState } from 'react';
import { View, ScrollView, Modal, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import FilterHeader from '../components/FilterHeader';
import TextButton from '../buttons/TextButton';
import NutriText from '../NutriText';
import NutriSlider from './NutriSlider';
import FillableIconButton from '../buttons/FillableIconButton';

const checkboxes = {
    Vegan: false,
    Vegetarian: false,
    'Gluten Free': false,
    'Lactose Free': false,
    'Sugar Free': false,
    Pescatarian: false,
};

const sortBy = ['Price', 'Distance', 'Calories', 'Protein'];

// To anyone who reads this ... I'm sorry
const FilterModal = (props) => {
    const [headerPressed, setHeaderPressed] = useState('none');
    const [categories, setCategories] = useState(checkboxes);
    const [distance, setDistance] = useState([0]);
    const [price, setPrice] = useState([0, 5]);
    const [calories, setCalories] = useState([0, 100]);
    const [protein, setProtein] = useState([0, 100]);
    const [carbs, setCarbs] = useState([0, 100]);
    const [fats, setFats] = useState([0, 100]);
    const [sort, setSort] = useState('');

    const setFilter = (filterName) => {
        if (headerPressed === filterName) {
            setHeaderPressed('none');
        } else {
            setHeaderPressed(filterName);
        }
    };

    const handleCategoryPress = (name) => {
        let categoriesCopy = { ...categories };
        categoriesCopy[name] = !categories[name];
        setCategories(categoriesCopy);
    };

    const pressedSort = (sortName) => {
        if (sort === sortName) {
            setSort('');
        } else {
            setSort(sortName);
        }
    };

    const handleClear = () => {
        let checkboxesCopy = { ...checkboxes };
        Object.keys(checkboxes).forEach((box) => (checkboxesCopy[box] = false));

        setHeaderPressed('none');
        setCategories(checkboxesCopy);
        setDistance([0]);
        setPrice([0, 5]);
        setCalories([0, 100]);
        setProtein([0, 100]);
        setCarbs([0, 100]);
        setSort('');
    };

    const handleDone = () => {
        let ordering;
        if (sort === 'Protein') {
            ordering = 'DESC';
        } else {
            ordering = 'ASC';
        }

        let reqBody = {
            max_dist: distance[0],
            min_price: price[0],
            max_price: price[1],
            min_calories: calories[0],
            max_calories: calories[1],
            min_protein: protein[0],
            max_protein: protein[1],
            min_carbs: carbs[0],
            max_carbs: carbs[1],
            min_fat: fats[0],
            max_at: fats[1],
            sort_by: sort,
            ordering: ordering,
        };

        props.onSubmit(reqBody);
    };

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
                            onPress={() => handleClear()}
                        />
                        <NutriText style={styles.headerTitle}>
                            {modalTitle}
                        </NutriText>
                        <TextButton
                            text='Done'
                            textStyle={styles.headerButton}
                            onPress={() => handleDone()}
                        />
                    </View>
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'categories'}
                        text='Categories'
                        onPress={() => setFilter('categories')}
                    />
                    {headerPressed === 'categories' && (
                        <View>
                            {Object.keys(checkboxes).map((title) => (
                                <FillableIconButton
                                    text={title}
                                    key={title}
                                    icon={'checkbox-blank-outline'}
                                    iconFilled={'checkbox-marked'}
                                    pressed={categories[title]}
                                    onPress={() => handleCategoryPress(title)}
                                />
                            ))}
                        </View>
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'distance'}
                        text='Distance'
                        onPress={() => setFilter('distance')}
                    />
                    {headerPressed === 'distance' && (
                        <NutriSlider
                            max={100}
                            suffix={'km'}
                            onValuesChange={(newValue) => setDistance(newValue)}
                            value={distance}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'price'}
                        text='Price'
                        onPress={() => setFilter('price')}
                    />
                    {headerPressed === 'price' && (
                        <NutriSlider
                            max={50}
                            suffix={'€'}
                            onValuesChange={(newValue) => setPrice(newValue)}
                            value={price}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'calories'}
                        text='Calories'
                        onPress={() => setFilter('calories')}
                    />
                    {headerPressed === 'calories' && (
                        <NutriSlider
                            max={1000}
                            suffix={'kcal'}
                            onValuesChange={(newValue) => setCalories(newValue)}
                            value={calories}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'protein'}
                        text='Protein'
                        onPress={() => setFilter('protein')}
                    />
                    {headerPressed === 'protein' && (
                        <NutriSlider
                            max={400}
                            suffix={'g'}
                            onValuesChange={(newValue) => setProtein(newValue)}
                            value={protein}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'carbs'}
                        text='Carbohydrates'
                        onPress={() => setFilter('carbs')}
                    />
                    {headerPressed === 'carbs' && (
                        <NutriSlider
                            max={600}
                            suffix={'g'}
                            onValuesChange={(newValue) => setCarbs(newValue)}
                            value={carbs}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'fats'}
                        text='Fats'
                        onPress={() => setFilter('fats')}
                    />
                    {headerPressed === 'fats' && (
                        <NutriSlider
                            max={300}
                            suffix={'g'}
                            onValuesChange={(newValue) => setFats(newValue)}
                            value={fats}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={headerPressed === 'sort'}
                        text='Sort By'
                        onPress={() => setFilter('sort')}
                    />
                    {headerPressed === 'sort' && (
                        <View>
                            {sortBy.map((by) => (
                                <FillableIconButton
                                    text={by}
                                    key={by}
                                    icon={'checkbox-blank-circle-outline'}
                                    iconFilled={'checkbox-marked-circle'}
                                    pressed={sort === by}
                                    onPress={() => pressedSort(by)}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </Modal>
    );
};

FilterModal.propTypes = {
    visible: propTypes.bool.isRequired,
    toggleModal: propTypes.func.isRequired,
    onSubmit: propTypes.func.isRequired,
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
});

export default FilterModal;
