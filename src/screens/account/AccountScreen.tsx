import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Container from "elements/Layout/Container";

interface AccountScreenProps {
}

const AccountScreen = (props: AccountScreenProps) => {
    const [state, setState] = useState();
    return (
        <Container style={styles.container}>
            <Text>
                AccountScreen
            </Text>
        </Container>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {},
});
