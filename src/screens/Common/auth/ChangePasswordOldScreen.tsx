import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {
  CHANGE_PASS_FORM_SCHEMA,
  CHANGE_PASS_OLD_FORM_SCHEMA,
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
  CHANGE_PASSWORD_OLD,
  CHANGE_PASS_QUERY,
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
const ChangePasswordOldScreen = ({
  navigation,
  route,
  ...props
}: BaseNavigationProps<MainParamList, Routes.ChangePasswordOldScreen>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = React.useState(true);
  const [secureTextEntry3, setSecureTextEntry3] = React.useState(true);
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [onPress, {loading, data, error}] = useMutation(CHANGE_PASSWORD_OLD);
  React.useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);
  React.useEffect(() => {
    if (data?.changePass?.success) {
      snackbarUtils.show('Đổi mật khẩu thành công', 'success');
      navigation.navigate(Routes.MainTab);
    }
  }, [data]);
  const onSubmit = () => {
    const {confirmPass, newPass, oldPass} = values;
    onPress({
      variables: {
        user: {
          oldPass,
          id: userProfile.user?.id,
          newPass,
          confirmPass,
        },
      },
    });
  };
  const {handleChange, handleSubmit, values, errors, touched, setFieldValue} =
    useFormik({
      initialValues: {
        oldPass: '',
        newPass: '',
        confirmPass: '',
      },
      validationSchema: CHANGE_PASS_OLD_FORM_SCHEMA,
      onSubmit,
    });

  return (
    <Container hideButtonRight title="Đổi mật khẩu">
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
        <View style={styles.containerInput}>
          {/* <View
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
          </View> */}
          <InputApp
            placeholder={'******'}
            errors={errors}
            touched={touched}
            name={'oldPass'}
            marginTop={15}
            secureTextEntry={secureTextEntry3}
            iconPress={() => setSecureTextEntry3(!secureTextEntry3)}
            icon={<Image source={images.ic_eye} />}
            isShowIcon
            value={values.oldPass}
            onChangeText={handleChange('oldPass')}
            title={'Mật khẩu cũ'}
          />
          <InputApp
            placeholder={'******'}
            errors={errors}
            touched={touched}
            name={'newPass'}
            marginTop={15}
            secureTextEntry={secureTextEntry}
            iconPress={() => setSecureTextEntry(!secureTextEntry)}
            icon={<Image source={images.ic_eye} />}
            isShowIcon
            value={values.newPass}
            onChangeText={handleChange('newPass')}
            title={'Mật khẩu mới'}
          />
          <InputApp
            placeholder={'******'}
            errors={errors}
            touched={touched}
            name={'confirmPass'}
            marginTop={15}
            secureTextEntry={secureTextEntry2}
            iconPress={() => setSecureTextEntry2(!secureTextEntry2)}
            icon={<Image source={images.ic_eye} />}
            isShowIcon
            value={values.confirmPass}
            onChangeText={handleChange('confirmPass')}
            title={'Nhập lại mật khẩu'}
          />
        </View>
        <View style={[Theme.flexRow]}>
          <ButtonText
            title={'Hủy'}
            style={[
              styles.buttonLogin,
              {borderColor: colors.primary, borderWidth: 1, marginRight: 10},
            ]}
            onPress={() => navigation.goBack()}
            isLoading={loading}
            backgroundColor={colors.White}
            titleColor={colors.text}
            textProps={{size: 16, lineHeight: 26, semiBold: true}}
          />
          <ButtonText
            title={'Lưu thay đổi'}
            style={styles.buttonLogin}
            onPress={handleSubmit}
            isLoading={loading}
            backgroundColor={colors.primary}
            titleColor={colors.White}
            textProps={{size: 16, lineHeight: 26, semiBold: true}}
          />
        </View>
      </ScrollView>
    </Container>
  );
};

export default ChangePasswordOldScreen;

const styles = StyleSheet.create({
  buttonRegister: {
    paddingBottom: getBottomSpace() + 20,
  },
  buttonLogin: {
    height: scale(58),
    marginHorizontal: sizes._20sdp,
    flex: 1,
  },
  containerInput: {
    padding: sizes._20sdp,
    flex: 1,
  },
});
