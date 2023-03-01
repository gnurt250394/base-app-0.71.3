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
import {GET_SHIPPING} from 'apollo/query/ApiCart';
import {AdOrder} from 'res/type/Cart';
import {Address} from 'res/type/Home';
import {UserCustomerPaginate} from 'res/type/Customer';

export interface Order {
  id: string;
  deliveryLocation?: Address;
  userCustomerId?: string;
}
interface UserForm {
  order: Order;
}

interface Response {
  response: {
    success: boolean;
    message: string;
    result: AdOrder;
  };
}
interface Result<Values> {
  loading: boolean;
  data?: Response | null;
  error?: ApolloError;
}

const useGetShipping = (
  adOrder: AdOrder,
  customer: UserCustomerPaginate,
  isCheck: boolean,
  count?: number,
): Result<Order> => {
  const [onPress, {loading, data, error}] = useMutation<Response, UserForm>(
    GET_SHIPPING,
  );

  const navigation =
    useNavigation<NavigationProp<MainParamList, Routes.LoginScreen>>();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);

  useEffect(() => {
    if (adOrder?.id) {
      let param: Order = {
        id: adOrder?.id,
      };

      let address = customer?.address?.find(e => e.isDefault);

      // TODO
      if (isCheck) {
        let addressUser = userProfile?.user?.address?.find(e => e.isDefault);
        param.deliveryLocation = {
          cityName: addressUser?.cityName || '',
          districtName: addressUser?.districtName || '',
          isDefault: true,
          cityId: addressUser?.cityId || 0,
          districtId: addressUser?.districtId || 0,
          wardId: addressUser?.wardId || 0,
          street: addressUser?.street || '',
          wardName: addressUser?.wardName || '',
        };
      } else if (customer?.id) {
        param.userCustomerId = customer?.id;
      }
      console.log('-> param', param);
      if (param.userCustomerId || param.deliveryLocation) {
        onPress({
          variables: {
            order: param,
          },
        });
      }
    }
  }, [customer, isCheck, count]);

  console.log('-> count', count);
  return {
    data,
    error,
    loading,
  };
};
export default useGetShipping;
