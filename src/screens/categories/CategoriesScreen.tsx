import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Container from "elements/Layout/Container";

interface CategoriesScreenProps {
}

const CategoriesScreen = (props: CategoriesScreenProps) => {
    const [state, setState] = useState();
    return (
        <Container>
        <View style={styles.container}>
            <Text>
                CategoriesScreen
            </Text>
        </View>

        </Container>
    );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
    container: {},
});
