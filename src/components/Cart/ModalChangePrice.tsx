import {useMutation} from '@apollo/client';
import {UPDATE_CART} from 'apollo/query/ApiCart';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {useFormik} from 'formik';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import strings from 'res/strings';
import Theme from 'res/style/Theme';
import {CartCategoryProps} from 'res/type/Cart';
import scale from 'utils/scale';
import * as Yup from 'yup';
interface ModalChangePriceProps {
  close: () => void;
  product: CartCategoryProps;
}

const ModalChangePrice = (props: ModalChangePriceProps) => {
  const [onPress, {data: res}] = useMutation(UPDATE_CART);
  useEffect(() => {
    if (res?.updateAdCart?.success) {
      onClose();
    }
  }, [res]);
  const {handleSubmit, errors, touched, values, handleChange, setFieldValue} =
    useFormik({
      validationSchema: Yup.object().shape({
        keyword: Yup.number()
          .required(strings.warningInputRequired)
          .min(
            props?.product?.product.priceWholeSale,
            `Vui lòng nhập giá trị bán ra lớn hơn ${props?.product?.product?.priceWholeSale?.formatPrice()}đ để đảm bảo lợi nhuận`,
          ),
      }),
      enableReinitialize: true,
      initialValues: {
        keyword:
          String(props?.product?.feeResale || props?.product?.product.price) ||
          '',
      },
      onSubmit: values => {
        onPress({
          variables: {
            input: {
              feeResale: Number(values.keyword),
              id: props?.product?.id,
            },
          },
        });
      },
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
          Giá bán cho khách
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      <View
        style={{
          paddingTop: scale(18),
          paddingHorizontal: scale(14),
        }}>
        <Text>{props.product?.product?.name}</Text>
        <InputApp
          title="Giá bán cho khách (vnđ)"
          onChangeText={handleChange('keyword')}
          keyboardType="numeric"
          value={values.keyword}
          name="keyword"
          errors={errors}
          touched={touched}
        />
        <ButtonBorder
          title={'Xác nhận'}
          backgroundColor={colors.primary}
          style={{marginTop: 20}}
          height={58}
          onPress={handleSubmit}
          textProps={{
            semiBold: true,
            size: 16,
            lineHeight: 26,
            color: colors.White,
          }}
        />
      </View>
    </View>
  );
};

export default ModalChangePrice;

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
