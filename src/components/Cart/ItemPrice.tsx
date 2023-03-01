import {View} from 'react-native';
import Theme from 'res/style/Theme';
import Text from 'elements/Text';
import colors from 'res/colors';
import * as React from 'react';

interface ItemPriceParams {
  label: string;
  value?: string | number;
  type?: 'money' | 'normal';
  sufix?: string;
}

const ItemPrice = (props: ItemPriceParams) => {
  const formatValue = () => {
    switch (props.type) {
      case 'money':
        return props?.value?.formatPrice();
      default:
        return props.value || '';
    }
  };
  return (
    <View style={[Theme.flexRowSpace, {paddingBottom: 10}]}>
      <Text size={14} lineHeight={24} semiBold color={colors.text}>
        {props.label}
      </Text>
      <Text size={16} lineHeight={26} semiBold color={colors.text}>
        {formatValue()}
        {props?.sufix}
      </Text>
    </View>
  );
};
export default ItemPrice;
