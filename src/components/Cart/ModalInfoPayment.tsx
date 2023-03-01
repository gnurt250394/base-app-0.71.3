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
import {InfoVA, PaymentMethod} from 'res/type/Cart';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
import {hideLoading, showLoading} from 'components/Loading/LoadingComponent';
import useCheckPayment from 'apollo/logic/cart/useCheckPayment';
import {useSelector} from 'hooks/useSelector';
import {METHOD} from 'res/type/Enums';

interface ModalInfoPaymentProps {
  close: () => void;
  id: string;
}

interface PaymentMethodProps {
  id: number;
}

const ModalInfoPayment = (props: ModalInfoPaymentProps) => {
  const onClose = () => {
    props.close && props.close();
  };
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const {data} = useCheckPayment(props?.id);
  const enums = useSelector(state => state.enums.enums);
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const [listPaymentMethod, setListPaymentMethod] = useState<
    PaymentMethodProps[]
  >([]);
  useEffect(() => {
    let list: any = Object.keys(enums?.PAYMENT?.METHOD_TRANSLATE || {}).map(
      key => ({
        name: enums?.PAYMENT?.METHOD_TRANSLATE[key as keyof METHOD],
        id: key,
        isSelected: data?.checkPayment?.result?.method == key,
      }),
    );
    setPaymentMethod(data?.checkPayment?.result?.method);
    setListPaymentMethod(list);
  }, [data?.checkPayment?.result?.method, enums]);
  const onSelect = (item: PaymentMethodProps) => () => {
    let arr = [...listPaymentMethod];
    arr.forEach(e => {
      if (e.id == item.id) {
        e.isSelected = true;
      } else {
        e.isSelected = false;
      }
    });
    setPaymentMethod(item.id);
    setListPaymentMethod(arr);
  };
  const [onPress, {data: res}] = useMutation(MAKE_PAYMENT);
  const onContinue = async () => {
    setIsSuccess(true);
    let res = await onPress({
      variables: {
        payment: {
          id: props.id,
        },
        method: paymentMethod,
        redirectUrl: 'payment://order',
      },
    });
    if (res?.data?.makePayment?.success) {
      setIsSuccess(false);
      onClose();
      switch (res?.data?.makePayment?.result?.method) {
        case 'VA':
          break;
        case 'MOMO':
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
  const onCopy = (value: string) => () => {
    Clipboard.setString(value);
    snackbarUtils.show('Sao chép thành công', 'success');
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
        {paymentMethod == 'VA' && (
          <>
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
            <View style={[Theme.flexRowSpace, {marginBottom: 13}]}>
              <Text medium size={12} lineHeight={18} color={colors.dark}>
                Loại thanh toán:
              </Text>
              <Text size={12} lineHeight={18} color={colors.dark}>
                {
                  enums?.PAYMENT?.METHOD_TRANSLATE[
                    data?.checkPayment?.result?.method
                  ]
                }
              </Text>
            </View>
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
          </>
        )}
        <ButtonBorder
          title={'Đổi phương thức thanh toán'}
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

export default ModalInfoPayment;

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
