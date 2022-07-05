import propTypes from 'prop-types';
import React, { useState } from 'react';
import { View, ScrollView, Modal, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import FilterHeader from './FilterHeader';
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

const initFilters = {
    categories: false,
    distance: false,
    price: false,
    calories: false,
    protein: false,
    carbs: false,
    fats: false,
    sort: false,
};

const sortBy = ['price', 'distance', 'calories', 'protein'];

// To anyone who reads this ... I'm sorry
const FilterModal = (props) => {
    const [filters, setFilters] = useState(initFilters);
    const [categories, setCategories] = useState(checkboxes);
    const [distance, setDistance] = useState([50]);
    const [price, setPrice] = useState([0, 5]);
    const [calories, setCalories] = useState([0, 300]);
    const [protein, setProtein] = useState([0, 100]);
    const [carbs, setCarbs] = useState([0, 100]);
    const [fats, setFats] = useState([0, 100]);
    const [sort, setSort] = useState('');

    const handleCategoryPress = (name) => {
        let categoriesCopy = { ...categories };
        categoriesCopy[name] = !categories[name];
        setCategories(categoriesCopy);
    };

    const handleSortPress = (sortName) => {
        if (sort === sortName) {
            setSort('');
        } else {
            setSort(sortName);
        }
    };

    const handleClear = () => {
        let checkboxesCopy = { ...checkboxes };
        Object.keys(checkboxes).forEach((box) => (checkboxesCopy[box] = false));

        setFilters(initFilters);
        setCategories(checkboxesCopy);
        setDistance([50]);
        setPrice([0, 5]);
        setCalories([0, 300]);
        setProtein([0, 100]);
        setCarbs([0, 100]);
        setFats([0, 100]);
        setSort('');
    };

    const handleDone = () => {
        let ordering;
        if (sort === 'protein') {
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
            max_fat: fats[1],
            sort_by: sort,
            ordering: ordering,
        };

        if (sort.length === 0) {
            delete reqBody.sort_by;
            delete reqBody.ordering;
        }

        let acceptedCategories = Object.keys(categories).filter(
            (x) => categories[x],
        );

        if (acceptedCategories.length > 0)
            reqBody.categories = acceptedCategories;

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
                        headerPressed={filters.categories}
                        text='Categories'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                categories: !filters.categories,
                            })
                        }
                    />
                    {filters.categories && (
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
                        headerPressed={filters.distance}
                        text='Distance'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                distance: !filters.distance,
                            })
                        }
                    />
                    {filters.distance && (
                        <NutriSlider
                            max={100}
                            suffix={'km'}
                            onValuesChange={(newValue) => setDistance(newValue)}
                            value={distance}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={filters.distance}
                        text='Price'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                price: !filters.price,
                            })
                        }
                    />
                    {filters.price && (
                        <NutriSlider
                            max={50}
                            suffix={'€'}
                            onValuesChange={(newValue) => setPrice(newValue)}
                            value={price}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={filters.calories}
                        text='Calories'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                calories: !filters.calories,
                            })
                        }
                    />
                    {filters.calories && (
                        <NutriSlider
                            max={3000}
                            suffix={'kcal'}
                            onValuesChange={(newValue) => setCalories(newValue)}
                            value={calories}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={filters.protein}
                        text='Protein'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                protein: !filters.protein,
                            })
                        }
                    />
                    {filters.protein && (
                        <NutriSlider
                            max={1000}
                            suffix={'g'}
                            onValuesChange={(newValue) => setProtein(newValue)}
                            value={protein}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={filters.carbs}
                        text='Carbohydrates'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                carbs: !filters.carbs,
                            })
                        }
                    />
                    {filters.carbs && (
                        <NutriSlider
                            max={1000}
                            suffix={'g'}
                            onValuesChange={(newValue) => setCarbs(newValue)}
                            value={carbs}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={filters.fats}
                        text='Fats'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                fats: !filters.fats,
                            })
                        }
                    />
                    {filters.fats && (
                        <NutriSlider
                            max={1000}
                            suffix={'g'}
                            onValuesChange={(newValue) => setFats(newValue)}
                            value={fats}
                        />
                    )}
                    <FilterHeader
                        icon='plus'
                        headerPressed={filters.sort}
                        text='Sort By'
                        onPress={() =>
                            setFilters({
                                ...filters,
                                sort: !filters.sort,
                            })
                        }
                    />
                    {filters.sort && (
                        <View>
                            {sortBy.map((by) => (
                                <FillableIconButton
                                    text={
                                        by.charAt(0).toUpperCase() + by.slice(1)
                                    }
                                    key={by}
                                    icon={'checkbox-blank-circle-outline'}
                                    iconFilled={'checkbox-marked-circle'}
                                    pressed={sort === by}
                                    onPress={() => handleSortPress(by)}
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
