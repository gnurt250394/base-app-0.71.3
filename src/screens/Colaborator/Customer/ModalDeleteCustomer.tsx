import {useMutation} from '@apollo/client';
import {DELETE_CUSTOMER} from 'apollo/query/ApiCustomer';
import {REQUEST_WHOLE_SALE} from 'apollo/query/ApiProfile';
import FormAddress from 'components/Cart/FormAddress';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
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
import scale from 'utils/scale';
import {SCHEMA_ERROR_ADD_CUSTOMER} from './ValidateCustomer';

interface ModalDeleteCustomerProps {
  close: () => void;
  isEdit?: boolean;
  customer?: UserCustomerPaginate;
}

const ModalDeleteCustomer = (props: ModalDeleteCustomerProps) => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const [onPress, {data, error}] = useMutation(DELETE_CUSTOMER);
  const onRemove = () => {
    onPress({
      variables: {
        ids: {
          userId: userProfile?.user?.id,
          id: props.customer?.id || '',
        },
      },
    });
  };
  React.useEffect(() => {
    if (data?.deleteCustomer?.success) {
      props.close();
    }
  }, [data]);
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
          Xóa khách hàng
        </Text>
        <ButtonIcon onPress={props.close} icon={images.ic_close} />
      </View>
      <View style={styles.containerInput}>
        <View
          style={{
            backgroundColor: colors.primary + '20',
            alignSelf: 'center',
            padding: 30,
            borderRadius: 100,
            marginTop: scale(60),
          }}>
          <Image source={images.ic_delete} />
        </View>
        <Text
          size={16}
          lineHeight={26}
          color={colors.gray}
          center
          style={{paddingHorizontal: 30}}
          marginTop={20}
          marginBottom={60}>
          Bạn có thực sự muốn xoá khách hàng này?
        </Text>
        <View style={[Theme.flexRowSpaceAround]}>
          <ButtonText
            title={'Không'}
            onPress={props.close}
            style={styles.no}
            titleColor={colors.text}
            textProps={{semiBold: true, size: 16, lineHeight: 26}}
          />
          <ButtonText
            title={'Xóa'}
            onPress={onRemove}
            backgroundColor={colors.primary}
            style={styles.yes}
            titleColor={colors.White}
            textProps={{semiBold: true, size: 16, lineHeight: 26}}
          />
        </View>
      </View>
    </View>
  );
};

export default ModalDeleteCustomer;

const styles = StyleSheet.create({
  yes: {
    height: scale(58),
    marginTop: 20,
    width: '47%',
  },
  no: {
    height: scale(58),
    marginTop: 20,
    width: '47%',
    borderColor: colors.primary,
    borderWidth: 1,
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
