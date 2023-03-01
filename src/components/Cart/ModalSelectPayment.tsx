import {useMutation} from '@apollo/client';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {MAKE_PAYMENT, REFRESS_INFO_PAYMENT} from 'apollo/query/ApiCart';
import {Routes} from 'configs';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonSelect from 'elements/Buttons/ButtonSelect';
import Image from 'elements/Image';
import Text from 'elements/Text';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {InfoVA} from 'res/type/Cart';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
import {hideLoading, showLoading} from 'components/Loading/LoadingComponent';

interface ModalInfoPaymentProps {
  close: () => void;
  id: string;
  paymentMethod?: any;
}

interface PaymentMethodProps {
  name: string;
  isSelected?: boolean;
  id: number;
  type: 'MOMO' | 'VA';
}

const ModalSelectPayment = (props: ModalInfoPaymentProps) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [listPaymentMethod, setListPaymentMethod] = useState<
    PaymentMethodProps[]
  >([
    {id: 1, name: 'Ví momo', type: 'MOMO'},
    {id: 2, name: 'Chuyển khoản ngân hàng', type: 'VA', isSelected: true},
  ]);
  const [paymentMethod, setPaymentMethod] = useState<
    PaymentMethodProps | undefined
  >(listPaymentMethod?.find(e => e.isSelected));
  const [onPress, {data: res}] = useMutation(MAKE_PAYMENT);
  const onSelect = (item: PaymentMethodProps) => () => {
    let arr = [...listPaymentMethod];
    setPaymentMethod(item);
    arr.forEach(e => {
      if (e.id == item.id) {
        e.isSelected = true;
      } else {
        e.isSelected = false;
      }
    });
    setListPaymentMethod(arr);
  };
  const onClose = () => {
    props.close && props.close();
  };

  const onContinue = async () => {
    setIsSuccess(true);
    let res = await onPress({
      variables: {
        order: {
          isCustomerBearShippingFee:
            !!props?.paymentMethod?.isCustomerBearShippingFee,
          isCustomerPaid: !!props?.paymentMethod?.isCustomerPaid,
        },
        method: paymentMethod?.type,
        redirectUrl: 'payment://order',
      },
    });
    if (res?.data?.makePayment?.success) {
      setIsSuccess(false);
      onClose();
      switch (res?.data?.makePayment?.result?.method) {
        case 'VA':
          navigation.replace(Routes.PaymentSuccessScreen, {
            id: res?.data?.makePayment?.result?.id,
          });
          break;
        case 'MOMO':
          console.log(
            '-> res?.data?.makePayment?.result?.detail?.deeplink',
            res?.data?.makePayment?.result?.detail?.deeplink,
          );
          if (!res?.data?.makePayment?.result?.detail?.deeplink) {
            snackbarUtils.show('Thanh toán không thành công', 'danger');
          } else {
            Linking.openURL(res?.data?.makePayment?.result?.detail?.deeplink);
          }
          break;
      }
    } else {
      console.log('-> res', res);
      setIsSuccess(false);
      onClose();

      snackbarUtils.show(res?.errors?.[0]?.message || '', 'danger');
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          Theme.flexRowSpace,
          {
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            paddingVertical: 15,
            paddingHorizontal: 15,
          },
        ]}>
        <View style={{width: 20}} />
        <Text size={16} lineHeight={26} semiBold color={colors.text} center>
          Thông tin thanh toán
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      <View
        style={{
          paddingTop: scale(18),
          paddingHorizontal: scale(14),
        }}>
        {listPaymentMethod.map((item, index) => (
          <ButtonSelect
            label={item.name}
            marginBottom={10}
            key={index}
            onPress={onSelect(item)}
            isSelected={item.isSelected}
          />
        ))}

        <ButtonBorder
          title={'Tiếp tục'}
          borderColor={colors.primary}
          style={{marginTop: 20}}
          height={58}
          loading={isSuccess}
          onPress={onContinue}
          textProps={{semiBold: true, size: 16, lineHeight: 26}}
        />
      </View>
    </View>
  );
};

export default ModalSelectPayment;

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
  },
});
