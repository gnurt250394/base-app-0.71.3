import {LOGIN_QUERY} from 'apollo/query/ApiAuth';
import {ApolloError, useMutation} from '@apollo/client';
import {UserProfile} from 'res/type/Auth';
import {FormResult, useForm} from 'hooks/useForm';
import {FormikProps, useFormik} from 'formik';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from 'middlewares/reducers';
import snackbarUtils from 'utils/snackbar-utils';
import {reset} from 'navigation/service/RootNavigation';
import Routes from 'configs/Routes';
import {onLogin, onSaveLogin} from 'middlewares/actions/auth/actionLogin';
import {LOGIN_FORM_SCHEMA} from 'screens/Common/auth/Constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainParamList} from 'navigation/service/NavigationParams';
import useNotification from 'screens/Common/notification/useNotification';

export interface LoginForm {
  identify: string;
  password: string;
  remember_me: boolean;
}
interface UserForm {
  user: LoginForm;
}

interface Response {
  login: {
    role: any;
    user: UserProfile;
    success: boolean;
    token: string;
  };
}
interface Result<Values> extends FormikProps<Values> {
  loading: boolean;
  data?: Response | null;
  error?: ApolloError;
  onSave: () => void;
  onRegister: () => void;
  onFogotPass: () => void;
}

const useLogin = (): Result<LoginForm> => {
  const {checkPermission} = useNotification();

  const [onPressLogin, {loading, data, error}] = useMutation<
    Response,
    UserForm
  >(LOGIN_QUERY, {
    onCompleted: response => {
      if (response?.login?.success) {
        // snackbarUtils.show('Đăng nhập thành công', 'success');
        reset(Routes.MainTab);
        checkPermission();
        dispatch(
          onSaveLogin(values.identify, values.password, values.remember_me),
        );
        dispatch(
          onLogin(
            response?.login?.user,
            response.login?.token,
            response?.login?.role?.name,
          ),
        );
      }
    },
  });

  const navigation =
    useNavigation<NavigationProp<MainParamList, Routes.LoginScreen>>();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);
  const onSubmit = () => {
    const {identify, password, remember_me} = values;
    onPressLogin({
      variables: {
        user: {
          identify,
          password,
          remember_me,
        },
      },
    });
  };
  const {handleChange, handleSubmit, values, setFieldValue, ...formik} =
    useFormik<LoginForm>({
      initialValues: {
        identify: '',
        password: '',
        remember_me: userProfile?.userLogin?.isSave || false,
      },
      validationSchema: LOGIN_FORM_SCHEMA,
      onSubmit,
    });

  useEffect(() => {
    if (userProfile?.userLogin?.isSave) {
      setFieldValue('identify', userProfile?.userLogin?.username);
      setFieldValue('password', userProfile?.userLogin?.password);
    }
  }, [userProfile?.userLogin]);
  const onFogotPass = () => {
    navigation.navigate(Routes.ForgotPasswordScreen);
  };
  const onRegister = () => {
    navigation.navigate(Routes.RegisterScreen);
  };
  const onSave = () => {
    setFieldValue('remember_me', !values.remember_me);
  };

  return {
    values,
    data,
    error,
    loading,
    handleChange,
    handleSubmit,
    onSave,
    onRegister,
    onFogotPass,
    setFieldValue,
    ...formik,
  };
};
export default useLogin;
