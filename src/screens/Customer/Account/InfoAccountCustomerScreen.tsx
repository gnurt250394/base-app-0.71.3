import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import * as React from 'react';
import {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, Animated} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';
import {useFormik} from 'formik';
import {SCHEMA_ERROR_INFO_ACCOUNT} from './ValidateInfoAccount';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ModalRegisterColaborator from 'components/Account/ModalRegisterColaborator';
import useModalAnimation from 'hooks/useModalAnimation';
import {useSelector} from 'react-redux';
import {RootReducer} from 'middlewares/reducers';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ScrollWrapper from 'components/Scroll/ScrollWrapper';
import {useMutation} from '@apollo/client';
import {UPDATE_USER_QUERY} from 'apollo/query/ApiProfile';
import snackbarUtils from 'utils/snackbar-utils';
import Menu from 'components/Menu/Menu';
import CustomMenu from 'components/Menu/CustomMenu';
import {width} from 'configs/Const';
import FormAddress from 'components/Account/FormAddress';
import {Address} from 'res/type/Home';
import useModalWithKeyboard from 'hooks/useModalWithKeyboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface InfoAccountCustomerScreenProps {}
interface SubmitParam {
  email: string;
  address: Address[];
  fullName: string;
  phone: string;
  username: string;
  avatar: string;
  id: string;
}
const InfoAccountCustomerScreen = (props: InfoAccountCustomerScreenProps) => {
  const {visible, open, close, translateY} = useModalWithKeyboard();

  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [onPress, {data, error, loading}] = useMutation(UPDATE_USER_QUERY);
  const onSubmit = () => {
    const {
      cityId,
      cityName,
      street,
      districtId,
      districtName,
      username,
      phone,
      email,
      fullName,
      wardId,
      wardName,
    } = values;
    let param: SubmitParam = {
      avatar: userProfile.user?.avatar || '',
      email,
      fullName,
      id: userProfile.user?.id || '',
      phone,
      username,
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
    onPress({
      variables: {
        user: param,
      },
    });
  };
  const [isEdit, setIsEdit] = useState(false);
  const address = useMemo(
    () => (userProfile.user?.address || []).find(e => e?.isDefault),
    [userProfile],
  );
  React.useEffect(() => {
    if (data?.updateUser?.success) {
      snackbarUtils.show('Cập nhật thông tin thành công', 'success');
      setIsEdit(false);
    }
  }, [data]);
  React.useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error?.message, 'danger');
    }
  }, [error]);
  console.log('address: ', address);
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setSubmitting,
    isSubmitting,
    isValidating,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: userProfile?.user?.username || '',
      fullName: userProfile?.user?.fullName || '',
      email: userProfile?.user?.email || '',
      phone: userProfile?.user?.phone || '',
      cityId: address?.cityId || '',
      cityName: address?.cityName || '',
      districtId: address?.districtId || '',
      districtName: address?.districtName || '',
      street: address?.street || '',
      wardId: address?.wardId || '',
      wardName: address?.wardName || '',
    },
    validationSchema: SCHEMA_ERROR_INFO_ACCOUNT,
    onSubmit,
  });
  return (
    <Container
      hideButtonRight
      title="Thông tin tài khoản"
      buttonRight={
        !isEdit && (
          <ButtonIcon onPress={() => setIsEdit(true)} icon={images.ic_edit} />
        )
      }>
      <ScrollWrapper
        formik={{
          setSubmitting,
          isSubmitting,
          isValidating,
          errors,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View
          style={[
            Theme.flexRowSpace,
            styles.containerHeader,
            !!isEdit && {opacity: 0.5},
          ]}>
          <Text semiBold size={14} lineHeight={24} color={colors.White}>
            Bạn muốn trở thành CTV?
          </Text>
          <ButtonText
            style={{height: 40, paddingHorizontal: 20, borderRadius: 8}}
            title="Đăng ký"
            onPress={open}
            disabled={isEdit}
            titleColor={colors.primary}
            backgroundColor={colors.White}
            textProps={{size: 14, lineHeight: 24, semiBold: true}}
          />
        </View>
        <View style={{paddingTop: 16}}>
          <InputApp
            value={values.username}
            onChangeText={handleChange('username')}
            name={'username'}
            touched={touched}
            errors={errors}
            editable={false}
            title={'Tên đăng nhập'}
            placeholder={'Nhập tên đăng nhập'}
          />
          <InputApp
            onChangeText={handleChange('fullName')}
            editable={isEdit}
            name={'fullName'}
            touched={touched}
            errors={errors}
            value={values.fullName}
            title={'Tên đầy đủ'}
            placeholder={'Nhập tên đầy đủ'}
            marginTop={10}
          />
          <InputApp
            onChangeText={handleChange('email')}
            editable={isEdit}
            name={'email'}
            title={'Email'}
            touched={touched}
            errors={errors}
            value={values.email}
            placeholder={'Nhập email'}
            marginTop={10}
          />
          <InputApp
            onChangeText={handleChange('phone')}
            editable={isEdit}
            name={'phone'}
            value={values.phone}
            touched={touched}
            errors={errors}
            title={'Số điện thoại'}
            placeholder={'Nhập số điện thoại'}
            marginTop={10}
          />
          <FormAddress
            errors={errors}
            values={values}
            isEdit={isEdit}
            touched={touched}
            setFieldValue={setFieldValue}
            handleChange={handleChange}
          />
        </View>
        {!!isEdit && (
          <View
            style={[
              Theme.flexRow,
              {marginBottom: getBottomSpace(), paddingTop: scale(30)},
            ]}>
            <ButtonText
              title={'Hủy'}
              textProps={{semiBold: true, size: 16, lineHeight: 26}}
              onPress={() => {
                resetForm();
                setIsEdit(false);
              }}
              style={styles.buttonCancle}
            />
            <ButtonText
              title={'Lưu thay đổi'}
              textProps={{semiBold: true, size: 16, lineHeight: 26}}
              backgroundColor={colors.primary}
              titleColor={colors.White}
              marginLeft={10}
              onPress={handleSubmit}
              style={styles.buttonSave}
            />
          </View>
        )}
      </ScrollWrapper>
      <ModalBottom
        isVisibleModal={visible}
        onCloseModal={close}
        scrollEnabled={true}>
        <ModalRegisterColaborator close={close} />
      </ModalBottom>
    </Container>
  );
};

export default InfoAccountCustomerScreen;

const styles = StyleSheet.create({
  buttonSave: {
    flex: 1,
    height: 58,
  },
  buttonCancle: {
    borderColor: colors.primary,
    flex: 1,
    height: 58,
  },
  containerHeader: {
    backgroundColor: colors.primary,
    paddingVertical: scale(20),
    paddingHorizontal: scale(18),
    borderRadius: 8,
  },
  container: {
    padding: 16,
  },
});
