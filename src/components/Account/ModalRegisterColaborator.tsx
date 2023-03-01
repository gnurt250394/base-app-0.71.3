import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import * as React from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';
import {useFormik} from 'formik';
import RegisterColaboratorSuccess from './RegisterColaboratorSuccess';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from 'middlewares/reducers';
import {SCHEMA_ERROR_REGISTER_CTV} from 'screens/Customer/Account/ValidateInfoAccount';
import {useMutation} from '@apollo/client';
import {REQUEST_WHOLE_SALE} from 'apollo/query/ApiProfile';
import snackbarUtils from 'utils/snackbar-utils';

interface ModalRegisterColaboratorProps {
  close: () => void;
}

const ModalRegisterColaborator = (props: ModalRegisterColaboratorProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [onPress, {data, error}] = useMutation(REQUEST_WHOLE_SALE);
  React.useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const onSubmit = () => {
    // props?.close && props?.close();
    onPress({
      variables: {
        user: {
          bank: [
            {
              bankAccountId: values.bankAccountId,
              bankAccountName: values.bankAccountName,
              bankName: values.bankName,
              isDefault: true,
            },
          ],
          id: userProfile?.user?.id,

          referrerPhone: values.referrerPhone,
        },
      },
    });
  };

  React.useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error?.message, 'danger');
    } else if (data?.requestWholeSale.success) {
      snackbarUtils.show('Đăng ký thành công', 'success');
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setIsSuccess(true);
    }
  }, [data, error]);

  const bank = React.useMemo(() => {
    let b = userProfile.user?.bank.find(e => e.isDefault);
    return b;
  }, [userProfile.user?.bank]);
  const {values, touched, errors, handleChange, handleSubmit} = useFormik({
    initialValues: {
      bankName: bank?.bankName || '',
      bankAccountName: bank?.bankAccountName || '',
      bankAccountId: bank?.bankAccountId || '',
      referrerPhone: userProfile?.user?.referrerPhone || '',
    },
    validationSchema: SCHEMA_ERROR_REGISTER_CTV,
    onSubmit,
  });
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
          Đăng ký làm cộng tác viên
        </Text>
        <ButtonIcon onPress={props.close} icon={images.ic_close} />
      </View>
      {isSuccess ? (
        <RegisterColaboratorSuccess close={props.close} />
      ) : (
        <View style={styles.containerInput}>
          <InputApp
            value={values.bankName}
            onChangeText={handleChange('bankName')}
            editable={!userProfile?.user?.isRequestingWholeSale}
            name={'bankName'}
            isRequired
            touched={touched}
            errors={errors}
            title={'Tên ngân hàng'}
            placeholder={'Nhập tên ngân hàng'}
          />
          <InputApp
            onChangeText={handleChange('bankAccountName')}
            isRequired
            editable={!userProfile?.user?.isRequestingWholeSale}
            name={'bankAccountName'}
            touched={touched}
            errors={errors}
            value={values.bankAccountName}
            title={'Tên chủ tài khoản'}
            placeholder={'Nhập tên chủ tài khoản'}
            marginTop={10}
          />
          <InputApp
            onChangeText={handleChange('bankAccountId')}
            isRequired
            editable={!userProfile?.user?.isRequestingWholeSale}
            name={'bankAccountId'}
            title={'Số tài khoản'}
            touched={touched}
            errors={errors}
            value={values.bankAccountId}
            placeholder={'Nhập số tài khoản'}
            marginTop={10}
          />
          <InputApp
            onChangeText={handleChange('referrerPhone')}
            name={'referrerPhone'}
            value={values.referrerPhone}
            editable={!userProfile?.user?.isRequestingWholeSale}
            touched={touched}
            errors={errors}
            maxLength={10}
            title={'Số điện thoại người giới thiệu'}
            placeholder={'Nhập số điện thoại người giới thiệu'}
            marginTop={10}
          />
          <ButtonText
            title={
              userProfile?.user?.isRequestingWholeSale
                ? 'Đang chờ xét duyệt'
                : 'Xác nhận'
            }
            disabled={!!userProfile?.user?.isRequestingWholeSale}
            onPress={handleSubmit}
            backgroundColor={
              userProfile?.user?.isRequestingWholeSale
                ? colors.primary + '50'
                : colors.primary
            }
            style={{height: scale(58), marginTop: 20}}
            titleColor={colors.White}
            textProps={{semiBold: true, size: 16, lineHeight: 26}}
          />
        </View>
      )}
    </View>
  );
};

export default ModalRegisterColaborator;

const styles = StyleSheet.create({
  containerInput: {
    paddingTop: 15,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 14,
  },
  container: {
    backgroundColor: colors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
});
