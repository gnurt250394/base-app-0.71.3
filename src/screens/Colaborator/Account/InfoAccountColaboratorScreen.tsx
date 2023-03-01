import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import * as React from 'react';
import {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';
import {useFormik} from 'formik';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ModalRegisterColaborator from 'components/Account/ModalRegisterColaborator';
import useModalAnimation from 'hooks/useModalAnimation';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {SCHEMA_ERROR_INFO_ACCOUNT} from './ValidateInfoAccount';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import {useSelector} from 'react-redux';
import {RootReducer} from 'middlewares/reducers';
import FormAddress from 'components/Account/FormAddress';
import {useMutation} from '@apollo/client';
import {UPDATE_USER_QUERY} from 'apollo/query/ApiProfile';
import {Address} from 'res/type/Home';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface InfoAccountColaboratorScreenProps {}
interface SubmitParam {
  email: string;
  address: Address[];
  fullName: string;
  phone: string;
  username: string;
  avatar: string;
  id: string;
}
const InfoAccountColaboratorScreen = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [visible, open, close] = useModalAnimation();
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
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const bank = useMemo(() => {
    let bank = userProfile?.user?.bank.find(e => e.isDefault);
    return bank;
  }, [userProfile]);

  const address = useMemo(
    () => (userProfile.user?.address || []).find(e => e?.isDefault),
    [userProfile],
  );
  const {
    values,
    touched,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      username: userProfile?.user?.username || '',
      fullName: userProfile?.user?.fullName || '',
      email: userProfile?.user?.email || '',
      phone: userProfile?.user?.phone || '',
      bankName: bank?.bankName || '',
      bankAccountName: bank?.bankAccountName || '',
      bankNumber: bank?.bankAccountId || '',
      referrerPhone: userProfile?.user?.referrerPhone || '',
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
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={[Theme.flexRowSpace, styles.containerHeader]}>
          <Text semiBold size={14} lineHeight={24} color={colors.primary}>
            🎉 Bạn đang là cộng tác viên
          </Text>
        </View>
        <View style={{paddingTop: 16}}>
          <Text
            size={18}
            lineHeight={28}
            semiBold
            color={colors.text}
            marginBottom={10}
            marginTop={7}>
            Thông tin tài khoản
          </Text>
          <InputApp
            value={values.username}
            onChangeText={handleChange('username')}
            editable={false}
            name={'username'}
            touched={touched}
            errors={errors}
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
          <Text
            size={18}
            lineHeight={28}
            semiBold
            color={colors.text}
            marginBottom={10}
            marginTop={12}>
            Thông tin ngân hàng
          </Text>
          <InputApp
            value={values.bankName}
            onChangeText={handleChange('bankName')}
            editable={isEdit}
            name={'bankName'}
            isRequired
            touched={touched}
            errors={errors}
            title={'Tên ngân hàng'}
            placeholder={'Nhập tên ngân hàng'}
          />
          <InputApp
            onChangeText={handleChange('bankAccountName')}
            isRequired
            name={'bankAccountName'}
            editable={isEdit}
            touched={touched}
            errors={errors}
            value={values.bankAccountName}
            title={'Tên chủ tài khoản'}
            placeholder={'Nhập tên chủ tài khoản'}
            marginTop={10}
          />
          <InputApp
            onChangeText={handleChange('bankNumber')}
            editable={isEdit}
            isRequired
            name={'bankNumber'}
            title={'Số tài khoản'}
            touched={touched}
            errors={errors}
            value={values.bankNumber}
            placeholder={'Nhập số tài khoản'}
            marginTop={10}
          />
          <InputApp
            onChangeText={handleChange('referrerPhone')}
            editable={isEdit}
            name={'referrerPhone'}
            value={values.referrerPhone}
            touched={touched}
            errors={errors}
            title={'Số điện thoại người giới thiệu'}
            placeholder={'Nhập số điện thoại người giới thiệu'}
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
      </KeyboardAwareScrollView>
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalRegisterColaborator close={close} />
      </ModalBottom>
    </Container>
  );
};

export default InfoAccountColaboratorScreen;

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
    backgroundColor: colors.pinkOpacity,
    paddingVertical: scale(20),
    paddingHorizontal: scale(18),
    borderRadius: 8,
  },
  container: {
    padding: 16,
  },
});
