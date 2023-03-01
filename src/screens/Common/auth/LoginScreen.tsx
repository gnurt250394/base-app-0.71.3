import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {LOGIN_FORM_SCHEMA} from './Constant';
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
import {useMemo} from 'react';
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
import {LOGIN_QUERY} from 'apollo/query/ApiAuth';
import {useMutation} from '@apollo/client';
import useLogin from 'apollo/logic/auth/useLogin';
const LoginScreen = ({
  navigation,
  route,
  ...props
}: BaseNavigationProps<MainParamList, Routes.LoginScreen>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const {
    errors,
    touched,
    values,
    handleChange,
    onSave,
    onRegister,
    onFogotPass,
    handleSubmit,
    loading,
  } = useLogin();
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
            Đăng nhập
          </Text>
          <InputApp
            placeholder={'Nhập tên đăng nhập'}
            errors={errors}
            touched={touched}
            name={'identify'}
            value={values.identify}
            onChangeText={handleChange('identify')}
            title={'Số điện thoại, email hoặc tên đăng nhập'}
          />
          <InputApp
            placeholder={strings.password}
            name={'password'}
            marginTop={10}
            errors={errors}
            value={values.password}
            touched={touched}
            onChangeText={handleChange('password')}
            secureTextEntry={secureTextEntry}
            iconPress={() => setSecureTextEntry(!secureTextEntry)}
            icon={<Image source={images.ic_eye} />}
            isShowIcon
            title={strings.password}
          />
          <View style={[Theme.flexRowSpace, {marginTop: 10}]}>
            <TouchableOpacity onPress={onSave} style={[Theme.flexRow]}>
              <Image
                source={
                  values.remember_me ? images.ic_checked : images.ic_uncheck
                }
              />
              <Text marginLeft={8}>Lưu đăng nhập</Text>
            </TouchableOpacity>
            <ButtonText onPress={onFogotPass} title="Quên mật khẩu?" />
          </View>
          <ButtonText
            title={strings.login}
            style={styles.buttonLogin}
            onPress={handleSubmit}
            isLoading={loading}
            backgroundColor={colors.primary}
            titleColor={colors.White}
            textProps={{size: 16, lineHeight: 26, semiBold: true}}
          />
        </View>
        <ButtonText
          title={strings.register}
          style={styles.buttonRegister}
          titleColor={colors.dark}
          textProps={{semiBold: true, size: 14, lineHeight: 24}}
          onPress={onRegister}
        />
      </ScrollView>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  buttonRegister: {
    paddingBottom: 20,
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
