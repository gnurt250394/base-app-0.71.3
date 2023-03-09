import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
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
import EmployeeApi from 'network/apis/employee/EmployeeApi';
import ResponseCode from 'network/ResponseCode';
import {UserProfile} from 'res/type/Auth';

interface EmployeeScreenProps {
  data: UserProfile[];
}

const EmployeeScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [data, setData] = useState<UserProfile[]>([]);

  const getData = async () => {
    let res = await EmployeeApi.getEmployees<EmployeeScreenProps>({
      page: 0,
      size: 10,
    });
    console.log('-> res', res);
    if (res.status == ResponseCode.SUCCESS) {
      setData(res.data?.data || []);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const renderItem: ListRenderItem<UserProfile> = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          Theme.center,
          {
            backgroundColor: colors.secondary,
            marginBottom: 10,
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
        <View style={[Theme.flex1, Theme.pt20]}>
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
