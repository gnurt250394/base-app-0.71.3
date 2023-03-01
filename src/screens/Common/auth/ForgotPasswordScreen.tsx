import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {FORGOT_PASSWORD_FORM_SCHEMA, LOGIN_FORM_SCHEMA} from './Constant';
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
} from 'apollo/query/ApiAuth';
import {useMutation} from '@apollo/client';
import ButtonSelect from 'elements/Buttons/ButtonSelect';
interface TypeProps {
  id: number;
  name: string;
  type: string;
  isSelected?: boolean;
}
const ForgotPasswordScreen = ({
  navigation,
  route,
  ...props
}: BaseNavigationProps<MainParamList, Routes.ForgotPasswordScreen>) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [listType, setListType] = useState<TypeProps[]>([
    {id: 1, name: 'Địa chỉ email', type: 'email', isSelected: true},
    {id: 2, name: 'Tên đăng nhập', type: 'username'},
    {id: 3, name: 'Số điện thoại', type: 'phone'},
  ]);
  const [label, setLabel] = useState<string>(
    listType.find(e => e.isSelected)?.name || '',
  );
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [isSave, setIsSave] = React.useState(userProfile?.userLogin?.isSave);
  const dispatch = useDispatch();
  const [onPress, {loading, data, error}] = useMutation(FORGOT_PASSWORD_QUERY);
  React.useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);
  React.useEffect(() => {
    if (data?.forgotPass?.success) {
      navigation.navigate(Routes.VerifyCodeScreen, {
        type: values.type,
        value: values.username,
      });
    }
  }, [data]);
  const onSubmit = () => {
    const {username, type} = values;
    onPress({
      variables: {
        user: {
          [type]: username,
        },
      },
    });
  };
  const {handleChange, handleSubmit, values, errors, touched, setFieldValue} =
    useFormik({
      initialValues: {
        username: '',
        type: listType.find(e => e.isSelected)?.type || '',
      },
      validationSchema: FORGOT_PASSWORD_FORM_SCHEMA,
      onSubmit,
    });

  const onRegister = () => {
    navigation.navigate(Routes.RegisterScreen);
  };
  const onSelectType = (item: TypeProps) => () => {
    let arr = [...listType];
    arr.forEach(e => {
      if (e.id == item.id) {
        e.isSelected = true;
      } else {
        e.isSelected = false;
      }
    });
    setListType(arr);
    setFieldValue('type', item.type);
    setLabel(item.name);
  };
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
            <Text size={12} lineHeight={18} color={colors.text} center>
              💡 Chỉ cần lựa chọn 1 trong 3 phương thức bên dưới để nhận mã khôi
              phục tài khoản của bạn.
            </Text>
          </View>
          {listType.map((item, index) => {
            return (
              <ButtonSelect
                marginTop={10}
                onPress={onSelectType(item)}
                label={item.name}
                isSelected={item.isSelected}
              />
            );
          })}
          <InputApp
            placeholder={''}
            errors={errors}
            touched={touched}
            name={'username'}
            marginTop={15}
            value={values.username}
            onChangeText={handleChange('username')}
            title={label}
            styleInput={{
              textTransform: 'lowercase',
            }}
          />

          <ButtonText
            title={'Gửi yêu cầu'}
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

export default ForgotPasswordScreen;

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
