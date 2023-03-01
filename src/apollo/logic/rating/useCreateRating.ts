import {ApolloError, useMutation} from '@apollo/client';
import {UserProfile} from 'res/type/Auth';
import {FormikProps, useFormik} from 'formik';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootReducer} from 'middlewares/reducers';
import snackbarUtils from 'utils/snackbar-utils';
import Routes from 'configs/Routes';
import {LOGIN_FORM_SCHEMA} from 'screens/Common/auth/Constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainParamList} from 'navigation/service/NavigationParams';
import {createProductRating} from 'apollo/query/ApiRating';
import {AdOrderDetail} from 'res/type/Cart';
import {RATING_FORM_SCHEMA} from 'apollo/logic/rating/validate';
import {RatingType} from 'res/type/Rating';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ProfileApi from 'network/apis/profile/ProfileApi';
import {Platform} from 'react-native';

export interface FormBody {
  rating: number;
  message: string;
  images: string[];
  displayName: string;
  userId: string;
  productId: string;
  orderId: string;
}
interface Form {
  productRating: FormBody;
}

interface Response {
  createProductRating: {
    role: any;
    result: RatingType;
    success: boolean;
    token: string;
  };
}
interface Result<Values> extends FormikProps<Values> {
  loading: boolean;
  data?: Response | null;
  error?: ApolloError;
  onUpload: (file?: ImageOrVideo) => void;
}

const useCreateRating = (detail?: AdOrderDetail): Result<FormBody> => {
  const [onPress, {loading, data, error}] = useMutation<Response, Form>(
    createProductRating,
    {
      onCompleted: response => {
        if (response?.createProductRating?.success) {
          snackbarUtils.show('Đã gửi đánh giá', 'success');
          navigation.goBack();
        }
      },
    },
  );

  const navigation =
    useNavigation<NavigationProp<MainParamList, Routes.LoginScreen>>();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);
  const onUpload = async (files?: ImageOrVideo[]) => {
    try {
      let list = files?.map(file => {
        const form: any[] = [];
        form.push({
          name: 'userId',
          data: String(userProfile.user?.id),
        });
        form.push({
          name: 'type',
          data: String('productRating'),
        });
        form.push({
          name: 'file',
          filename: file?.filename || file?.path.split('/').pop(),
          type: file?.mime,
          data:
            Platform.OS === 'ios'
              ? `RNFetchBlob-${decodeURI(file.sourceURL || '')}`
              : RNFetchBlob.wrap((file.path || '').replace('file:///', '')),
        });
        return ProfileApi.uploadImageCampain(form);
      });
      let result = await Promise.all(list);
      console.log('-> result', result);
      let dataLink = result.map(e => e.data.link);
      // if (res.status == ResponseCode.SUCCESS) {
      setFieldValue('images', dataLink);
      // }
    } catch (e) {
      console.log('-> e', e);
    }
  };

  const onSubmit = () => {
    onPress({
      variables: {
        productRating: values,
      },
    });
  };
  const {handleChange, handleSubmit, values, setFieldValue, ...formik} =
    useFormik<FormBody>({
      initialValues: {
        rating: 5,
        message: '',
        images: [],
        displayName: userProfile?.user?.fullName || '',
        userId: userProfile?.user?.id || '',
        productId: detail?.product?.id || '',
        orderId: detail?.orderId || '',
      },
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
    onUpload,
    ...formik,
  };
};
export default useCreateRating;
