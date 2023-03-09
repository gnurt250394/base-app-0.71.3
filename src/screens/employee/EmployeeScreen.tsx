import React, {useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import ButtonText from 'elements/Buttons/ButtonText';
import Theme from 'res/style/Theme';
import colors from 'res/colors';
import TextInput from 'elements/TextInput';
import images from 'res/images';
import Image from 'elements/Image';
import keyExtractor from 'utils/keyExtractor';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import Routes from 'configs/Routes';

interface EmployeeScreenProps {}

const EmployeeScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [data, setData] = useState([
    {
      name: 'Nguyễn Văn A',
      dob: '01/01/1999',
      avatar:
        'https://images2.content-hci.com/commimg/myhotcourses/blog/post/myhc_94265_255px.jpg',
    },
    {
      name: 'Nguyễn Văn B',
      dob: '01/01/1999',
      avatar:
        'https://indochinapost.com/wp-content/uploads/chuyen-phat-nhanh-tnt-di-anh.jpg',
    },
    {
      name: 'Nguyễn Văn C',
      dob: '01/01/1999',
      avatar:
        'https://indochinapost.com/wp-content/uploads/chuyen-phat-nhanh-tnt-di-anh.jpg',
    },
  ]);
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          Theme.center,
          {
            backgroundColor: colors.secondary,
            marginTop: 10,
            borderRadius: 10,
            padding: 15,
          },
        ]}>
        <Image
          source={{uri: item.avatar}}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
        />
        <Text marginTop={10} semiBold={true}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const onCreateEmployee = () => {
    props.navigation.navigate(Routes.CreateEmployeeScreen);
  };
  return (
    <Container hideBackButton={true} style={styles.container}>
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <View style={[Theme.flexRowSpace]}>
          <Text>Nhân viên</Text>
          <ButtonText
            onPress={onCreateEmployee}
            backgroundColor={colors.primary}
            titleColor={colors.White}
            style={{
              paddingHorizontal: 20,
              borderRadius: 30,
            }}
            textProps={{
              bold: true,
            }}
            title={'Thêm nhân viên'}
          />
        </View>
        <TextInput
          placeholder={'Tìm kiếm'}
          isShowIconLeft={true}
          value={''}
          style={Theme.mt15}
          editable={true}
          iconLeft={<Image source={images.ic_search} />}
        />
        <View style={Theme.flex1}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    </Container>
  );
};

export default EmployeeScreen;

const styles = StyleSheet.create({
  container: {},
});
