import colors from '../../styles/colors';
import propTypes from 'prop-types';
import React from 'react';
import routes from '../../navigation/routes';
import StoreCard from './StoreCard';
import { StyleSheet, FlatList, View } from 'react-native';

const StoreList = (props) => (
    <FlatList
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        data={props.data}
        onRefresh={props.onRefresh}
        refreshing={props.refreshing}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <StoreCard
                key={item.id}
                name={item.name}
                distance={item.distance}
                location={item.location}
                logo_url={item.logo_url}
                onPress={() =>
                    props.navigation.navigate(routes.STORE, {
                        id: item.id,
                    })
                }
            />
        )}
    />
);

StoreList.propTypes = {
    data: propTypes.array.isRequired,
    navigation: propTypes.object.isRequired,
    onRefresh: propTypes.func,
    refreshing: propTypes.bool,
};

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: colors.grey,
        borderBottomWidth: 0.2,
    },
});

export default StoreList;
