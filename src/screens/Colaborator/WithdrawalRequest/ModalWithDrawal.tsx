import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {CREATE_COMPLAIN} from 'apollo/query/ApiOrder';
import {CREATE_WALLET} from 'apollo/query/ApiWallet';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {useFormik} from 'formik';
import {RootReducer} from 'middlewares/reducers';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import strings from 'res/strings';
import Theme from 'res/style/Theme';
import {Wallet} from 'res/type/Wallet';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
import * as Yup from 'yup';
interface ModalWithDrawalProps {
  close: () => void;
  dataDetail: Wallet;
}

const ModalWithDrawal = (props: ModalWithDrawalProps) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const bank = React.useMemo(() => {
    if (userProfile.user?.bank?.length) {
      return userProfile.user?.bank[0];
    }
  }, [userProfile.user?.bank]);
  const [onPress, {data: res, error}] = useMutation(CREATE_WALLET);

  const {handleSubmit, handleChange, values, touched, errors, setFieldError} =
    useFormik({
      initialValues: {
        keyword: '',
      },
      validationSchema: Yup.object().shape({
        keyword: Yup.number().required(strings.warningInputRequired),
      }),
      onSubmit: values =>
        onPress({
          variables: {
            withdrawalRequest: {
              amount: Number(values.keyword),
              bankAccountId: bank?.bankAccountId,
              bankAccountName: bank?.bankAccountName,
              bankName: bank?.bankName,
              userId: userProfile?.user?.id,
            },
          },
        }),
    });
  useEffect(() => {
    if (res?.createWithdrawalRequest?.success) {
      setIsSuccess(true);
    }
    console.log('error?.message: ', error?.message);
    if (error?.message && typeof error?.message === 'string') {
      setFieldError('keyword', error?.message);
    }
  }, [res, error]);
  const onClose = () => {
    props.close && props.close();
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
          {isSuccess ? 'Thành công' : 'Tạo yêu cầu rút tiền'}
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      {isSuccess ? (
        <View style={styles.container}>
          <View
            style={{
              padding: 30,
              backgroundColor: colors.pinkOpacity,
              alignSelf: 'center',
              borderRadius: 1000,
              marginTop: scale(60),
            }}>
            <Image source={images.ic_wallet_success} />
          </View>
          <Text
            size={16}
            lineHeight={26}
            color={colors.gray}
            center
            style={{paddingHorizontal: scale(40)}}>
            Chúc mừng. Yêu cầu rút tiền đã được gửi. Vui lòng chờ
          </Text>
          <ButtonText
            onPress={props.close}
            title={'Đóng'}
            style={styles.buttonClose}
          />
        </View>
      ) : (
        <View
          style={{
            paddingTop: scale(18),
            paddingHorizontal: scale(14),
          }}>
          <View
            style={[
              Theme.flexRowSpace,
              {
                paddingBottom: 16,
              },
            ]}>
            <Text>Số tiền có thể rút:</Text>
            <Text>
              {(
                props.dataDetail?.totalBalance - props.dataDetail?.withdrew
              )?.formatPrice()}
              đ
            </Text>
          </View>
          <InputApp
            title="Số tiền muốn rút"
            isRequired
            onChangeText={handleChange('keyword')}
            value={values.keyword}
            errors={errors}
            touched={touched}
            name={'keyword'}
          />
          <View
            style={{
              backgroundColor: colors.lightGray,
              borderRadius: 8,
              padding: 16,
              marginTop: 16,
            }}>
            <View
              style={[
                Theme.flexRowSpace,
                {
                  paddingBottom: 16,
                  marginBottom: 16,
                  borderBottomColor: colors.border,
                  borderBottomWidth: 1,
                },
              ]}>
              <Text>Thông tin ngân hàng</Text>
              <Image source={images.ic_edit_customer} />
            </View>
            <View style={[Theme.flexRowSpace]}>
              <Text>Ngân hàng:</Text>
              <Text>{bank?.bankName}</Text>
            </View>
            <View style={[Theme.flexRowSpace, {paddingVertical: 5}]}>
              <Text>Số tài khoản:</Text>
              <Text>{bank?.bankAccountId}</Text>
            </View>
            <View style={[Theme.flexRowSpace]}>
              <Text>Tên chủ tài khoản:</Text>
              <Text>{bank?.bankAccountName}</Text>
            </View>
          </View>
          <ButtonBorder
            title={'Gửi yêu cầu'}
            backgroundColor={colors.primary}
            style={{marginTop: 20}}
            height={58}
            onPress={handleSubmit}
            textProps={{
              semiBold: true,
              size: 16,
              lineHeight: 26,
              color: colors.White,
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ModalWithDrawal;

const styles = StyleSheet.create({
  buttonClose: {
    borderColor: colors.primary,
    height: scale(58),
    marginHorizontal: 14,
    marginTop: scale(69),
  },
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
