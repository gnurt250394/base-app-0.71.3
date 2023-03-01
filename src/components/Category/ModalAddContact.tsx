import {useMutation} from '@apollo/client';
import {ADD_INFO_CUSTOMER_CATEGORY} from 'apollo/query/ApiCategory';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {useFormik} from 'formik';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {HotDealsItemProp} from 'res/type/Home';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
import {SCHEMA_ERROR_ADD_INFO_CUSTOMER} from './ValidateCategory';
interface ModalAddContactProps {
  close: () => void;
  product: HotDealsItemProp;
}

const ModalAddContact = (props: ModalAddContactProps) => {
  const [onPress, {data, error}] = useMutation(ADD_INFO_CUSTOMER_CATEGORY);
  const onSubmit = () => {
    onPress({
      variables: {
        advertisementProductCustomerContact: {
          productId: props?.product?.id,
          name: values.name,
          phone: values.phone,
          email: values.email,
          note: values.note,
        },
      },
    });
  };
  React.useEffect(() => {
    if (error?.message) {
      snackbarUtils.show(error.message, 'danger');
      return;
    }
    if (data?.createAdvertisementProductCustomerContact?.success) {
      onClose();
    }
  }, [data, error]);
  const {errors, values, handleChange, touched, handleSubmit} = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      note: '',
    },
    validationSchema: SCHEMA_ERROR_ADD_INFO_CUSTOMER,
    onSubmit,
  });
  const onClose = () => {
    props.close && props.close();
  };
  return (
    <View style={styles.container}>
      <View
        style={[
          Theme.flexRowSpace,
          {
            borderBottomColor: colors.border,
            borderBottomWidth: 1,
            paddingVertical: 15,
            paddingHorizontal: 15,
          },
        ]}>
        <View style={{width: 20}} />
        <Text size={16} lineHeight={26} semiBold color={colors.text} center>
          Thông tin khách hàng
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      <View
        style={{
          paddingTop: scale(18),
          paddingHorizontal: scale(14),
        }}>
        <InputApp
          placeholder="Nhập tên khách hàng"
          isRequired
          errors={errors}
          touched={touched}
          onChangeText={handleChange('name')}
          name="name"
          value={values.name}
          title="Tên khách hàng"
        />
        <InputApp
          placeholder="Nhập số điện thoại"
          marginTop={10}
          isRequired
          errors={errors}
          touched={touched}
          value={values.phone}
          onChangeText={handleChange('phone')}
          name="phone"
          title="Số điện thoại"
        />
        <InputApp
          placeholder="Nhập địa chỉ email"
          marginTop={10}
          isRequired
          errors={errors}
          touched={touched}
          name="email"
          onChangeText={handleChange('email')}
          value={values.email}
          title="Địa chỉ email"
        />
        <InputApp
          placeholder="Nhập ghi chú"
          isRequired
          errors={errors}
          onChangeText={handleChange('note')}
          touched={touched}
          value={values.note}
          name="note"
          marginTop={10}
          title="Ghi chú"
        />
        <ButtonText
          title={'Xác nhận'}
          backgroundColor={colors.primary}
          style={{marginTop: 20}}
          titleColor={colors.White}
          height={58}
          onPress={handleSubmit}
          textProps={{semiBold: true, size: 16, lineHeight: 26}}
        />
      </View>
    </View>
  );
};

export default ModalAddContact;

const styles = StyleSheet.create({
  containerGuide: {
    padding: 15,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    marginBottom: 17,
  },
  container: {
    backgroundColor: colors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 30,
  },
});
