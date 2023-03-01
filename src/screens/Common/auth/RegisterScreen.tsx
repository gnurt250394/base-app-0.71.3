import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {LOGIN_FORM_SCHEMA, REGISTER_FORM_SCHEMA} from './Constant';
import colors from 'res/colors';
import sizes from 'res/sizes';
import strings from 'res/strings';
import {LocalizationContext} from 'assets/languages/Translations';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
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
import TextInput from 'elements/TextInput';
import ScrollWrapper from 'components/Scroll/ScrollWrapper';
import {REGISTER_QUERY} from 'apollo/query/ApiAuth';
import {useMutation} from '@apollo/client';
import {reset} from 'navigation/service/RootNavigation';
import {onLogin} from 'middlewares/actions/auth/actionLogin';
import FormAddress from 'components/Account/FormAddress';
import {Address} from 'res/type/Home';
import useRegister from 'apollo/logic/auth/useRegister';

const RegisterScreen = ({
  navigation,
  route,
}: BaseNavigationProps<MainParamList, Routes.RegisterScreen>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    isValidating,
    setSubmitting,
    setFieldValue,
    loading,
  } = useRegister();
  const _onLogin = () => {
    navigation.navigate(Routes.LoginScreen);
  };

  return (
    <Container hideHeader={true}>
      <ScrollWrapper
        formik={{
          isSubmitting,
          isValidating,
          errors,
          setSubmitting,
        }}
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
            Đăng ký
          </Text>
          <InputApp
            placeholder={'Nhập tên đăng nhập'}
            errors={errors}
            touched={touched}
            isRequired
            name={'username'}
            value={values.username}
            onChangeText={handleChange('username')}
            title={'Tên đăng nhập'}
          />
          <InputApp
            placeholder={'Độ dài mật khẩu ít nhất 6 ký tự'}
            name={'password'}
            isRequired
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
          <InputApp
            placeholder={'Nhập họ và tên'}
            isRequired
            name={'fullName'}
            marginTop={10}
            errors={errors}
            value={values.fullName}
            touched={touched}
            onChangeText={handleChange('fullName')}
            title={'Họ và tên'}
          />
          <InputApp
            placeholder={'Nhập địa chỉ email'}
            isRequired
            name={'email'}
            marginTop={10}
            errors={errors}
            value={values.email}
            touched={touched}
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            title={'Địa chỉ email'}
          />
          <InputApp
            placeholder={'Nhập số điện thoại'}
            name={'phone'}
            isRequired
            marginTop={10}
            errors={errors}
            maxLength={10}
            value={values.phone}
            touched={touched}
            onChangeText={handleChange('phone')}
            title={'Số điện thoại'}
          />
          <FormAddress
            errors={errors}
            values={values}
            isEdit={true}
            touched={touched}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
          />
          <ButtonText
            title={'Đăng ký'}
            style={styles.buttonLogin}
            onPress={handleSubmit}
            backgroundColor={colors.primary}
            titleColor={colors.White}
            isLoading={loading}
            textProps={{size: 16, lineHeight: 26, semiBold: true}}
          />
        </View>
        <ButtonText
          title={'Đăng nhập'}
          style={styles.buttonRegister}
          titleColor={colors.dark}
          textProps={{semiBold: true, size: 14, lineHeight: 24}}
          onPress={_onLogin}
        />
      </ScrollWrapper>
    </Container>
  );
};

export default RegisterScreen;

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
