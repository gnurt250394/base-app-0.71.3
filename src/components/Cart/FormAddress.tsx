import {AddressType} from 'common/Constants';
import DropdownComponent from 'components/Dropdown';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import {FormikErrors, FormikTouched, FormikValues} from 'formik';
import apis from 'network/apis';
import AddressApi from 'network/apis/address/AddressApi';
import {AddressResponse} from 'network/apis/address/AddressResponse';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';

interface FormAddressProps {
  isEdit?: boolean;
  errors?: FormikErrors<FormikValues>;
  touched?: FormikTouched<FormikValues>;
  values: FormikValues;
  name?: string;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<FormikErrors<FormikValues>> | Promise<void>;
}

interface AddressProps {
  value: string;
  label: string;
}
const FormAddress = ({
  isEdit,
  errors,
  touched,
  values,
  handleChange,
  setFieldValue,
}: FormAddressProps) => {
  const [provinces, setProvinces] = useState<AddressProps[]>([]);
  const [districts, setDistricts] = useState<AddressProps[]>([]);
  const [communes, setCommunes] = useState<AddressProps[]>([]);
  const getProvince = async () => {
    try {
      let res = await AddressApi.getAddress<AddressResponse>({
        endpoint: apis.path.address,
      });
      if (res?.data?.data?.length) {
        let data = res?.data?.data.map(e => ({label: e.name, value: e.id}));
        setProvinces(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getProvince();
  }, []);
  useEffect(() => {
    const getDistrict = async () => {
      try {
        let res = await AddressApi.getAddress<AddressResponse>({
          endpoint: apis.path.address,
          'params[type]': AddressType.DISTRICT,
          'params[parent_id]': values.cityId,
        });

        if (res?.data?.data?.length) {
          let data = res?.data?.data.map(e => ({label: e.name, value: e.id}));
          setDistricts(data);
        }
      } catch (error) {}
    };
    if (values.cityId) {
      getDistrict();
    }
  }, [values.cityId]);
  useEffect(() => {
    const getCommune = async () => {
      try {
        let res = await AddressApi.getAddress<AddressResponse>({
          endpoint: apis.path.address,
          'params[type]': AddressType.WARD,
          'params[parent_id]': values.districtId,
        });

        if (res?.data?.data?.length) {
          let data = res?.data?.data.map(e => ({label: e.name, value: e.id}));
          setCommunes(data);
        }
      } catch (error) {}
    };
    if (values.districtId) {
      getCommune();
    }
  }, [values.districtId]);

  return (
    <View style={styles.container}>
      <DropdownComponent
        style={styles.dropdown}
        data={provinces}
        renderDropdown={() => {
          return (
            <InputApp
              editable={false}
              name={'cityId'}
              title={'Tỉnh / Thành Phố'}
              touched={touched}
              icon={<Image source={images.ic_dropdown} />}
              isShowIcon
              isRequired
              errors={errors}
              value={values.cityName}
              placeholder={'Nhập tỉnh / Thành Phố'}
              marginTop={10}
            />
          );
        }}
        labelField="label"
        activeColor={colors.TiffanyBlueOpacity}
        valueField="value"
        value={values.cityId}
        onChange={item => {
          setFieldValue('cityId', item.value);
          setFieldValue('cityName', item.label);
          setFieldValue('districtId', '');
          setFieldValue('districtName', '');
          setFieldValue('wardId', '');
          setFieldValue('wardName', '');
        }}
      />
      <DropdownComponent
        style={styles.dropdown}
        data={districts}
        renderDropdown={() => {
          return (
            <InputApp
              editable={false}
              icon={<Image source={images.ic_dropdown} />}
              isShowIcon
              name={'districtId'}
              isRequired
              touched={touched}
              errors={errors}
              value={values.districtName}
              title={'Quận / Huyện'}
              placeholder={'Nhập quận / Huyện'}
              marginTop={10}
            />
          );
        }}
        labelField="label"
        disable={!values.cityId}
        activeColor={colors.TiffanyBlueOpacity}
        valueField="value"
        value={values.districtId}
        onChange={item => {
          setFieldValue('districtId', item.value);
          setFieldValue('districtName', item.label);
          setFieldValue('wardId', '');
          setFieldValue('wardName', '');
        }}
      />
      <DropdownComponent
        style={styles.dropdown}
        disable={!values.districtId}
        data={communes}
        renderDropdown={() => {
          return (
            <InputApp
              value={values.wardName}
              editable={false}
              icon={<Image source={images.ic_dropdown} />}
              isRequired
              isShowIcon
              name={'wardId'}
              touched={touched}
              errors={errors}
              title={'Xã / Phường'}
              marginTop={10}
              placeholder={'Nhập xã / Phường'}
            />
          );
        }}
        labelField="label"
        activeColor={colors.TiffanyBlueOpacity}
        valueField="value"
        value={values.wardId}
        onChange={item => {
          setFieldValue('wardId', item.value);
          setFieldValue('wardName', item.label);
        }}
      />
      <InputApp
        onChangeText={handleChange('street')}
        editable={isEdit}
        name={'street'}
        isRequired
        value={values.street}
        touched={touched}
        errors={errors}
        title={'Địa chỉ chi tiết'}
        placeholder={'Nhập địa chỉ chi tiết'}
        marginTop={10}
      />
    </View>
  );
};

export default FormAddress;

const styles = StyleSheet.create({
  container: {},
  dropdown: {},
  dropdown2: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 20,
    padding: 8,
  },
  icon: {
    marginRight: 5,
    width: 18,
    height: 18,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});
