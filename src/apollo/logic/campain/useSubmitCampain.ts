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
import {CREATE_CAMPAIN, UPDATE_CAMPAIN} from 'apollo/query/ApiCampain';
import {MissionClaims, TypeMission} from 'res/type/Campain';
import {FormCreateOrUpdateCampain} from './validate';
import ProfileApi from 'network/apis/profile/ProfileApi';
import RNFetchBlob from 'rn-fetch-blob';
import {getFileName} from 'utils/other-utils';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import ResponseCode from 'network/ResponseCode';
import {Platform} from 'react-native';
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
export interface CampainForm {
  content: string;
  id?: string;
  link: string;
  missionId: string;
  status?: string;
  userId: string;
  images: string[];
}
interface UserForm {
  missionClaim: CampainForm;
}

interface Response {
  createMissionClaim: {
    result: {
      id: string;
      missionId: string;
      status: TypeMission;
    };
    success: boolean;
  };
  updateMissionClaim: {
    result: {
      id: string;
      missionId: string;
      status: TypeMission;
    };
    success: boolean;
  };
}
interface Result<Values> extends FormikProps<Values> {
  loading: boolean;
  data?: Response | null;
  error?: ApolloError;
  onUpload: (file?: ImageOrVideo) => void;
}

const useSubmitCampain = (
  missionId: string,
  detailCampain: MissionClaims | undefined,
): Result<CampainForm> => {
  const isUpdate = detailCampain?.id;
  const [onPressLogin, {loading, data, error}] = useMutation<
    Response,
    UserForm
  >(isUpdate ? UPDATE_CAMPAIN : CREATE_CAMPAIN, {
    onCompleted: response => {
      if (response?.createMissionClaim?.success) {
        snackbarUtils.show('Gửi thành công', 'success');
        navigation.goBack();
      } else if (response?.updateMissionClaim?.success) {
        snackbarUtils.show('Cập nhật thành công', 'success');
        navigation.goBack();
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
    const {content, id, images, link, missionId, status, userId} = values;
    let params: CampainForm = {id, content, images, link, missionId, userId};
    if (content) {
      params.content = content;
    }
    if (status) {
      params.status = status;
    }
    onPressLogin({
      variables: {
        missionClaim: params,
      },
    });
  };
  const {handleChange, handleSubmit, values, setFieldValue, ...formik} =
    useFormik<CampainForm>({
      initialValues: {
        content: detailCampain?.content || '',
        id: detailCampain?.id,
        images: detailCampain?.images || [],
        link: detailCampain?.link || '',
        missionId: missionId,
        status: detailCampain?.status || '',
        userId: userProfile.user?.id || '',
      },
      enableReinitialize: true,
      validationSchema: FormCreateOrUpdateCampain,
      onSubmit,
    });

  const onUpload = async (file?: ImageOrVideo) => {
    const form: any[] = [];
    form.push({
      name: 'userId',
      data: String(userProfile.user?.id),
    });
    form.push({
      name: 'type',
      data: String('missionClaim'),
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
    let res = await ProfileApi.uploadImageCampain(form);
    if (res.status == ResponseCode.SUCCESS) {
      setFieldValue('images', [res.data.link]);
    }
  };

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
export default useSubmitCampain;
