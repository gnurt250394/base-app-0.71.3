import {ApolloError, useMutation} from '@apollo/client';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {REGISTER_QUERY} from 'apollo/query/ApiAuth';
import Routes from 'configs/Routes';
import {FormikProps, useFormik} from 'formik';
import {onLogin} from 'middlewares/actions/auth/actionLogin';
import {RootReducer} from 'middlewares/reducers';
import {MainParamList} from 'navigation/service/NavigationParams';
import {reset} from 'navigation/service/RootNavigation';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {UserProfile} from 'res/type/Auth';
import {Address} from 'res/type/Home';
import {REGISTER_FORM_SCHEMA} from 'screens/Common/auth/Constant';
import snackbarUtils from 'utils/snackbar-utils';
interface SubmitParam {
  email: string;
  address: Address[];
  fullName: string;
  phone: string;
  username: string;
  password: string;
}
export interface RegisterForm {
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  cityId: string;
  cityName: string;
  districtId: string;
  districtName: string;
  street: string;
  wardId: string;
  wardName: string;
}
interface UserForm {
  user: SubmitParam;
}

interface Response {
  register: {
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
}

const useRegister = () => {
  const [onPressRegister, {loading, data, error}] = useMutation<
    Response,
    UserForm
  >(REGISTER_QUERY, {
    onCompleted: response => {
      if (response?.register?.success) {
        snackbarUtils.show('Đăng ký thành công', 'success');
        reset(Routes.MainTab);
        dispatch(
          onLogin(
            response?.register?.user,
            response?.register?.token,
            response?.register?.role?.name,
          ),
        );
      }
    },
  });

  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);
  const onSubmit = () => {
    const {
      cityId,
      cityName,
      street,
      districtId,
      districtName,
      username,
      phone,
      password,
      email,
      fullName,
      wardId,
      wardName,
    } = values;
    let param: SubmitParam = {
      email,
      fullName,
      phone,
      username,
      password,
      address: [],
    };
    if (cityId && districtId && wardId) {
      param.address = [
        {
          cityId: Number(cityId),
          cityName,
          street,
          districtId: Number(districtId),
          districtName,
          isDefault: true,
          wardId: Number(wardId),
          wardName,
        },
      ];
    }
    onPressRegister({
      variables: {
        user: param,
      },
    });
  };
  const {handleChange, handleSubmit, values, setFieldValue, ...formik} =
    useFormik<RegisterForm>({
      initialValues: {
        username: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        cityId: '',
        cityName: '',
        districtId: '',
        districtName: '',
        street: '',
        wardId: '',
        wardName: '',
      },
      validationSchema: REGISTER_FORM_SCHEMA,
      onSubmit,
    });

  return {
    values,
    data,
    error,
    loading,
    handleChange,
    handleSubmit,
    setFieldValue,
    ...formik,
  };
};

export default useRegister;
