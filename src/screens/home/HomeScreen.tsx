import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Container from "elements/Layout/Container";

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const [state, setState] = useState();
  return (
    <Container style={styles.container}>
      <Text>HomeScreen</Text>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
