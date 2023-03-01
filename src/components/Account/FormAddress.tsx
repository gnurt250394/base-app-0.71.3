import {AddressType} from 'common/Constants';
import CustomMenu from 'components/Menu/CustomMenu';
import {width} from 'configs/Const';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {FormikErrors, FormikTouched, FormikValues} from 'formik';
import apis from 'network/apis';
import AddressApi from 'network/apis/address/AddressApi';
import {AddressResponse} from 'network/apis/address/AddressResponse';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import scale from 'utils/scale';

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
  ) => void;
}

interface AddressProps {
  value: string;
  id: string;
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
        let data = res?.data?.data.map(e => ({value: e.name, id: e.id}));
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
          let data = res?.data?.data.map(e => ({value: e.name, id: e.id}));
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
          let data = res?.data?.data.map(e => ({value: e.name, id: e.id}));
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
      <Text
        size={18}
        lineHeight={28}
        semiBold
        color={colors.text}
        marginTop={12}>
        Thông tin địa chỉ
      </Text>
      <CustomMenu
        popover
        onSelected={(item, _index) => {
          setFieldValue('cityId', item.id);
          setFieldValue('cityName', item.value);
          setFieldValue('districtId', '');
          setFieldValue('districtName', '');
          setFieldValue('wardId', '');
          setFieldValue('wardName', '');
        }}
        disabled={!isEdit}
        optionsContainerStyle={{
          width: width - scale(18) * 2,
          backgroundColor: colors.lightGray,
        }}
        MenuSelectOption={
          <InputApp
            editable={false}
            name={'cityId'}
            title={'Tỉnh / Thành Phố'}
            touched={touched}
            icon={<Image source={images.ic_dropdown} />}
            isShowIcon
            errors={errors}
            value={values.cityName}
            placeholder={'Nhập tỉnh / Thành Phố'}
            marginTop={10}
          />
        }
        options={provinces}
      />
      <CustomMenu
        popover
        onSelected={(item, _index) => {
          setFieldValue('districtId', item.id);
          setFieldValue('districtName', item.value);
          setFieldValue('wardId', '');
          setFieldValue('wardName', '');
        }}
        disabled={!isEdit || !values.cityId}
        optionsContainerStyle={{
          width: width - scale(18) * 2,
          backgroundColor: colors.lightGray,
        }}
        MenuSelectOption={
          <InputApp
            editable={false}
            icon={<Image source={images.ic_dropdown} />}
            isShowIcon
            name={'districtId'}
            touched={touched}
            errors={errors}
            value={values.districtName}
            title={'Quận / Huyện'}
            placeholder={'Nhập quận / Huyện'}
            marginTop={10}
          />
        }
        options={districts}
      />
      <CustomMenu
        popover
        onSelected={(item, _index) => {
          setFieldValue('wardId', item.id);
          setFieldValue('wardName', item.value);
        }}
        placement="top"
        disabled={!isEdit || !values.districtId}
        optionsContainerStyle={{
          width: width - scale(18) * 2,
          backgroundColor: colors.lightGray,
        }}
        MenuSelectOption={
          <InputApp
            value={values.wardName}
            editable={false}
            icon={<Image source={images.ic_dropdown} />}
            isShowIcon
            name={'wardId'}
            touched={touched}
            errors={errors}
            title={'Xã / Phường'}
            marginTop={10}
            placeholder={'Nhập xã / Phường'}
          />
        }
        options={communes}
      />
      <InputApp
        onChangeText={handleChange('street')}
        editable={isEdit}
        name={'street'}
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
});
