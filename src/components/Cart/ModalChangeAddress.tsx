import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import Text from 'elements/Text';
import {useFormik} from 'formik';
import {RootReducer} from 'middlewares/reducers';
import * as React from 'react';
import {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {Address} from 'res/type/Home';
import scale from 'utils/scale';
import FormAddress from './FormAddress';
import {SCHEMA_ERROR_ADDRESS} from './ValidateInfoAccount';
interface ModalChangeAddressProps {
  close: () => void;
  onSubmit: (item: Address) => void;
  addressChange?: Address;
}

interface PaymentMethodProps {
  name: string;
  isSelected?: boolean;
  id: number;
}
const ModalChangeAddress = (props: ModalChangeAddressProps) => {
  const onSubmit = () => {
    onClose();
    props.onSubmit && props.onSubmit(values as Address);
  };
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const address = useMemo(
    () =>
      props.addressChange
        ? props.addressChange
        : (userProfile.user?.address || []).find(e => e?.isDefault),
    [props.addressChange, userProfile.user?.address],
  );
  const {errors, values, setFieldValue, handleChange, touched, handleSubmit} =
    useFormik({
      initialValues: {
        cityId: address?.cityId || '',
        cityName: address?.cityName || '',
        districtId: address?.districtId || '',
        districtName: address?.districtName || '',
        street: address?.street || '',
        wardId: address?.wardId || '',
        wardName: address?.wardName || '',
        isDefault: true,
      },
      validationSchema: SCHEMA_ERROR_ADDRESS,
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
          Thay đổi địa chỉ nhận hàng
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      <View
        style={{
          paddingTop: scale(18),
          paddingHorizontal: scale(14),
        }}>
        <FormAddress
          isEdit={true}
          errors={errors}
          values={values}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          touched={touched}
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

export default ModalChangeAddress;

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
