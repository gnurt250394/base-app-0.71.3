import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface CustomTabProps {}

const CustomTab = (props: CustomTabProps) => {
  return (
    <View style={styles.container}>
      <Text>CustomTab</Text>
    </View>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  container: {},
});
