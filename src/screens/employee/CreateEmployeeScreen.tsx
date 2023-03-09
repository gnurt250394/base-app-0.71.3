import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import InputApp from 'elements/InputApp';

interface CreateEmployeeScreenProps {}

const CreateEmployeeScreen = (props: CreateEmployeeScreenProps) => {
  const [state, setState] = useState();
  return (
    <Container title={'Thêm nhân viên'} style={styles.container}>
      <View>
        <InputApp title={'a aa'} placeholder={'Họ và tên'} />
      </View>
    </Container>
  );
};

export default CreateEmployeeScreen;

const styles = StyleSheet.create({
  container: {},
});
