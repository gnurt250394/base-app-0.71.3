import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import Image from 'elements/Image';
import images from 'res/images';
import useCheckPayment from 'apollo/logic/cart/useCheckPayment';
import {
  BaseNavigationProps,
  BaseUseNavigationProps,
} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {Routes} from 'configs';
import Text from 'elements/Text';
import Clipboard from '@react-native-community/clipboard';
import snackbarUtils from 'utils/snackbar-utils';
import Container from 'elements/Layout/Container';
import moment from 'moment';
import ButtonText from 'elements/Buttons/ButtonText';
import {useNavigation} from '@react-navigation/native';

interface PaymentSuccessScreenProps {}

const PaymentSuccessScreen = (
  props: BaseNavigationProps<MainParamList, Routes.PaymentSuccessScreen>,
) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const [state, setState] = useState();
  const {data} = useCheckPayment(props.route.params?.id);

  const onCopy = (value: string) => () => {
    Clipboard.setString(value);
    snackbarUtils.show('Sao chép thành công', 'success');
  };
  return (
    <Container>
      <View style={styles.container}>
        <View style={Theme.flex1}>
          <Text
            center={true}
            semiBold={true}
            size={20}
            lineHeight={32}
            marginBottom={20}>
            Thông tin thanh toán
          </Text>

          <View style={styles.containerGuide}>
            <Text size={14} lineHeight={24} color={colors.text}>
              👉 Vui lòng chuyển tiền vào tài khoản bên dưới để hoàn tất quá
              trình thanh toán.
            </Text>
          </View>
          <View style={[Theme.flexRowSpace, {marginBottom: 13}]}>
            <Text medium size={12} lineHeight={18} color={colors.dark}>
              Ngân hàng:
            </Text>
            <Text size={12} lineHeight={18} color={colors.dark}>
              {data?.checkPayment?.result?.detail?.bank_name}
            </Text>
          </View>
          <View style={[Theme.flexRowSpace, {marginBottom: 13}]}>
            <Text medium size={12} lineHeight={18} color={colors.dark}>
              Số tài khoản:
            </Text>
            <TouchableOpacity
              onPress={onCopy(data?.checkPayment?.result?.detail?.account_no)}
              style={[Theme.flexRow]}>
              <Text
                size={12}
                lineHeight={18}
                marginRight={10}
                color={colors.dark}>
                {data?.checkPayment?.result?.detail?.account_no}
              </Text>
              <Image source={images.ic_copy} />
            </TouchableOpacity>
          </View>
          <View style={[Theme.flexRowSpace, {marginBottom: 13}]}>
            <Text medium size={12} lineHeight={18} color={colors.dark}>
              Tên chủ tài khoản:
            </Text>
            <Text size={12} lineHeight={18} color={colors.dark}>
              {data?.checkPayment?.result?.detail?.account_name}
            </Text>
          </View>
          {/*<View style={[Theme.flexRowSpace, {marginBottom: 13}]}>*/}
          {/*  <Text medium size={12} lineHeight={18} color={colors.dark}>*/}
          {/*    Loại thanh toán:*/}
          {/*  </Text>*/}
          {/*  <Text size={12} lineHeight={18} color={colors.dark}>*/}
          {/*    {data?.checkPayment?.result?.method}*/}
          {/*  </Text>*/}
          {/*</View>*/}
          <View style={[Theme.flexRowSpace, {marginBottom: 13}]}>
            <Text medium size={12} lineHeight={18} color={colors.dark}>
              Số tiền thanh toán:
            </Text>
            <TouchableOpacity
              onPress={onCopy(
                String(data?.checkPayment?.result?.detail?.amount || 0),
              )}
              style={[Theme.flexRow]}>
              <Text
                size={12}
                lineHeight={18}
                marginRight={10}
                semiBold
                color={colors.dark}>
                {data?.checkPayment?.result?.detail?.amount?.formatPrice()}đ
              </Text>
              <Image source={images.ic_copy} />
            </TouchableOpacity>
          </View>
        </View>

        <ButtonText
          textProps={{
            semiBold: true,
          }}
          onPress={() => navigation.replace(Routes.OrderScreen)}
          title={'Đến đơn hàng'}
          backgroundColor={colors.primary}
          titleColor={colors.White}
        />
      </View>
    </Container>
  );
};

export default PaymentSuccessScreen;

const styles = StyleSheet.create({
  containerGuide: {
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginBottom: 17,
  },
  container: {
    backgroundColor: colors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flex: 1,
  },
});
