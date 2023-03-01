import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Text from 'elements/Text';
import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {UserCustomerPaginate} from 'res/type/Customer';

interface ItemCustomerProps {
  item: UserCustomerPaginate;
  onPressEdit: () => void;
  onPressView: () => void;
  onPressDelete: () => void;
  index: number;
  onSelectCustomer: () => void;
  isEdit?: boolean;
  isSelected?: boolean;
}

const ItemCustomer = ({
  item,
  onPressEdit,
  onPressView,
  onPressDelete,
  index,
  onSelectCustomer,
  isEdit,
  isSelected,
}: ItemCustomerProps) => {
  let address = item?.address?.find(e => e.isDefault);
  return (
    <TouchableOpacity
      disabled={isEdit}
      onPress={onSelectCustomer}
      style={[
        styles.container,
        !!isSelected && {borderColor: colors.borderFocus, borderWidth: 1},
      ]}>
      <View style={[Theme.flexRowSpace, styles.containerAddress]}>
        <Text size={14} lineHeight={18} medium color={colors.text}>
          {`#${index + 1}`}
        </Text>
        <Text size={14} lineHeight={18} semiBold color={colors.text}>
          {item?.name}
        </Text>
      </View>
      <View
        style={[
          Theme.flexRowSpace,
          {
            marginBottom: 12,
          },
        ]}>
        <Text size={12} lineHeight={18} medium color={colors.dark}>
          Địa chỉ:
        </Text>
        <Text size={12} lineHeight={18} color={colors.dark}>
          {address?.street}
        </Text>
      </View>
      <View
        style={[
          Theme.flexRowSpace,
          {
            marginBottom: 12,
          },
        ]}>
        <Text size={12} lineHeight={18} medium color={colors.dark}>
          Tỉnh / Thành phố:
        </Text>
        <Text size={12} lineHeight={18} color={colors.dark}>
          {address?.cityName}
        </Text>
      </View>
      <View
        style={[
          Theme.flexRowSpace,
          {
            marginBottom: 12,
          },
        ]}>
        <Text size={12} lineHeight={18} medium color={colors.dark}>
          Quận / Huyện:
        </Text>
        <Text size={12} lineHeight={18} color={colors.dark}>
          {address?.districtName}
        </Text>
      </View>
      <View
        style={[
          Theme.flexRowSpace,
          {
            marginBottom: 12,
          },
        ]}>
        <Text size={12} lineHeight={18} medium color={colors.dark}>
          Xã / Phường:
        </Text>
        <Text size={12} lineHeight={18} color={colors.dark}>
          {address?.wardName}
        </Text>
      </View>
      <View style={[Theme.flexRowSpace]}>
        <Text size={12} lineHeight={18} medium color={colors.dark}>
          Số điện thoại:
        </Text>
        <Text size={12} lineHeight={18} color={colors.dark}>
          {item?.phone.formatPhoneNumber()}
        </Text>
      </View>
      {!!isEdit && (
        <View style={[Theme.flexRow, styles.containerEdit]}>
          <ButtonIcon
            onPress={onPressView}
            icon={images.ic_eye}
            marginRight={10}
          />
          <ButtonIcon
            onPress={onPressEdit}
            icon={images.ic_edit_customer}
            marginRight={10}
          />
          <ButtonIcon onPress={onPressDelete} icon={images.ic_trash} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ItemCustomer;

const styles = StyleSheet.create({
  containerEdit: {
    justifyContent: 'flex-end',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  container: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  containerAddress: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 12,
  },
});
