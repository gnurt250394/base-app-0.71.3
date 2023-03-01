import {useMutation} from '@apollo/client';
import {CREATE_CUSTOMER, UPDATE_CUSTOMER} from 'apollo/query/ApiCustomer';
import {REQUEST_WHOLE_SALE} from 'apollo/query/ApiProfile';
import FormAddress from 'components/Cart/FormAddress';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {useFormik} from 'formik';
import {RootReducer} from 'middlewares/reducers';
import * as React from 'react';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {UserCustomerPaginate} from 'res/type/Customer';
import {Address} from 'res/type/Home';
import scale from 'utils/scale';
import {SCHEMA_ERROR_ADD_CUSTOMER} from './ValidateCustomer';

interface ModalEditCustomerProps {
  close: () => void;
  isEdit?: boolean;
  customer?: UserCustomerPaginate;
}
interface SubmitParam {
  email: string;
  address: Address[];
  name: string;
  phone: string;
  userId: string;
  id?: string;
}
const ModalEditCustomer = (props: ModalEditCustomerProps) => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);

  const [onPress, {data, error}] = useMutation(
    props?.isEdit ? UPDATE_CUSTOMER : CREATE_CUSTOMER,
  );
  const onSubmit = () => {
    // props?.close && props?.close();
    let param: SubmitParam = {
      email: values?.email,
      name: values?.name,
      phone: values?.phone,
      address: [],
      userId: userProfile?.user?.id || '',
    };
    if (props.customer?.id) {
      param.id = props.customer?.id;
    }
    if (values.cityId && values.districtId && values.wardId) {
      param.address = [
        {
          cityId: Number(values.cityId),
          cityName: values.cityName,
          street: values.street,
          districtId: Number(values.districtId),
          districtName: values.districtName,
          isDefault: true,
          wardId: Number(values.wardId),
          wardName: values.wardName,
        },
      ];
    }
    onPress({
      variables: {
        customer: param,
      },
    });
  };

  React.useEffect(() => {
    if (data?.createCustomer?.success || data?.updateCustomer?.success) {
      props.close();
    }
  }, [data]);
  let address = React.useMemo(() => {
    if (!props.customer?.address) {
      return null;
    }
    let add = props.customer?.address.find(e => e.isDefault);
    return add;
  }, [props.customer?.address]);
  const {values, touched, errors, handleChange, handleSubmit, setFieldValue} =
    useFormik({
      initialValues: {
        name: props.customer?.name || '',
        phone: props.customer?.phone || '',
        email: props.customer?.email || '',

        cityId: address?.cityId || '',
        cityName: address?.cityName || '',
        districtId: address?.districtId || '',
        districtName: address?.districtName || '',
        street: address?.street || '',
        wardId: address?.wardId || '',
        wardName: address?.wardName || '',
        isDefault: true,
      },
      validationSchema: SCHEMA_ERROR_ADD_CUSTOMER,
      onSubmit: onSubmit,
    });
  return (
    <View style={styles.container}>
      <View style={[Theme.flexRowSpace, styles.container2]}>
        <View style={{width: 20}} />
        <Text size={16} lineHeight={26} semiBold color={colors.text} center>
          {props?.isEdit ? 'Sửa thông tin khách hàng' : 'Thêm khách hàng'}
        </Text>
        <ButtonIcon onPress={props.close} icon={images.ic_close} />
      </View>
      <View style={styles.containerInput}>
        <InputApp
          value={values.name}
          onChangeText={handleChange('name')}
          name={'name'}
          isRequired
          touched={touched}
          errors={errors}
          title={'Tên khách hàng'}
          placeholder={'Nhập tên khách hàng'}
        />
        <FormAddress
          isEdit={true}
          errors={errors}
          values={values}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          touched={touched}
        />
        <InputApp
          onChangeText={handleChange('phone')}
          name={'phone'}
          value={values.phone}
          touched={touched}
          errors={errors}
          maxLength={10}
          isRequired
          title={'Số điện thoại'}
          placeholder={'Nhập số điện thoại'}
          marginTop={10}
        />
        <InputApp
          onChangeText={handleChange('email')}
          name={'email'}
          value={values.email}
          touched={touched}
          errors={errors}
          title={'Email khách hàng'}
          placeholder={'Nhập email khách hàng'}
          marginTop={10}
        />
        <ButtonText
          title={props?.isEdit ? 'Lưu' : 'Xác nhận'}
          onPress={handleSubmit}
          backgroundColor={colors.primary}
          style={{height: scale(58), marginTop: 20}}
          titleColor={colors.White}
          textProps={{semiBold: true, size: 16, lineHeight: 26}}
        />
      </View>
    </View>
  );
};

export default ModalEditCustomer;

const styles = StyleSheet.create({
  container2: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  containerInput: {
    paddingTop: 15,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 14,
  },
  container: {
    backgroundColor: colors.White,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
});
