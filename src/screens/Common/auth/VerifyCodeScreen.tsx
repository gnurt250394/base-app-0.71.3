import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {
  FORGOT_PASSWORD_FORM_SCHEMA,
  LOGIN_FORM_SCHEMA,
  VERIFY_CODE_FORM_SCHEMA,
} from './Constant';
import colors from 'res/colors';
import sizes from 'res/sizes';
import strings from 'res/strings';
import {LocalizationContext} from 'assets/languages/Translations';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import AuthApi from 'network/apis/auth/AuthApi';
import ResponseCode from 'network/ResponseCode';
import snackbarUtils from 'utils/snackbar-utils';
import ModalOtp from 'components/ModalOtp';
import {useMemo, useState} from 'react';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {Routes} from 'configs';
import Container from 'elements/Layout/Container';
import InputApp from 'elements/InputApp';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import images from 'res/images';
import {HEADER_HEIGHT} from 'configs/Const';
import Text from 'elements/Text';
import scale from 'utils/scale';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Theme from 'res/style/Theme';
import {RootReducer} from 'middlewares/reducers';
import {onLogin, onSaveLogin} from 'middlewares/actions/auth/actionLogin';
import {reset} from 'navigation/service/RootNavigation';
import {
  FORGOT_PASSWORD_QUERY,
  LOGIN_QUERY,
  useLogin,
  VERIFY_CODE_QUERY,
} from 'apollo/query/ApiAuth';
import {useMutation} from '@apollo/client';
import ButtonSelect from 'elements/Buttons/ButtonSelect';
interface TypeProps {
  id: number;
  name: string;
  type: string;
  isSelected?: boolean;
}
const VerifyCodeScreen = ({
  navigation,
  route,
  ...props
}: BaseNavigationProps<MainParamList, Routes.VerifyCodeScreen>) => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [onPress, {loading, data, error}] = useMutation(VERIFY_CODE_QUERY);
  React.useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);
  React.useEffect(() => {
    if (data?.verifyResetPassToken?.success) {
      navigation.navigate(Routes.ChangePasswordScreen, {
        username: data?.verifyResetPassToken?.result?.username,
        code: values.code,
      });
    }
  }, [data]);
  const onSubmit = () => {
    const {code} = values;
    onPress({
      variables: {
        user: {
          resetPasswordToken: code,
        },
      },
    });
  };
  const [onPressReSend, {data: dataResend, error: errorResend}] = useMutation(
    FORGOT_PASSWORD_QUERY,
  );
  React.useEffect(() => {
    if (errorResend?.message) {
      snackbarUtils.show(errorResend.message, 'danger');
    }
  }, [error]);
  React.useEffect(() => {
    if (dataResend?.forgotPass?.success) {
    }
  }, [dataResend]);
  const onResend = () => {
    onPressReSend({
      variables: {
        user: {
          [route.params.type]: route.params.value,
        },
      },
    });
  };
  const {handleChange, handleSubmit, values, errors, touched, setFieldValue} =
    useFormik({
      initialValues: {
        code: '',
      },
      validationSchema: VERIFY_CODE_FORM_SCHEMA,
      onSubmit,
    });

  return (
    <Container hideHeader={true}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: sizes._statusbar_height + 15,
        }}>
        <Image source={images.ic_logo_app} style={{alignSelf: 'center'}} />
        <View style={styles.containerInput}>
          <Text
            size={22}
            lineHeight={28}
            semiBold
            color={colors.dark}
            marginBottom={20}
            center>
            Quên mật khấu
          </Text>
          <View
            style={{
              backgroundColor: colors.tipOpacity,
              padding: 10,
              borderRadius: 8,
              marginTop: 13,
            }}>
            <Text size={12} lineHeight={18} color={colors.text}>
              💡 Gửi yêu cầu đặt lại mật khẩu thành công, vui lòng kiểm tra hộp
              thư email.
            </Text>
          </View>
          <InputApp
            placeholder={'QA12312376'}
            errors={errors}
            touched={touched}
            name={'code'}
            marginTop={15}
            value={values.code}
            onChangeText={handleChange('code')}
            title={'Mã xác thực'}
          />

          <ButtonText
            title={'Xác nhận'}
            style={styles.buttonLogin}
            onPress={handleSubmit}
            isLoading={loading}
            backgroundColor={colors.primary}
            titleColor={colors.White}
            textProps={{size: 16, lineHeight: 26, semiBold: true}}
          />
          <View
            style={[
              Theme.flexRow,
              {alignSelf: 'center', marginTop: scale(32)},
            ]}>
            <Text size={14} lineHeight={24}>
              Chưa nhận được mã?
            </Text>
            <ButtonText
              title={'Gửi lại'}
              titleColor={colors.primary}
              marginLeft={3}
              onPress={onResend}
              textProps={{size: 14, lineHeight: 24, semiBold: true}}
            />
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default VerifyCodeScreen;

const styles = StyleSheet.create({
  buttonRegister: {
    paddingBottom: getBottomSpace() + 20,
  },
  buttonLogin: {
    height: scale(58),
    marginTop: scale(28),
  },
  containerInput: {
    padding: sizes._20sdp,
    borderRadius: sizes._10sdp,
    paddingTop: scale(59),
    flex: 1,
  },
});
