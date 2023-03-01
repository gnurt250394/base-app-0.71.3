import {useTheme} from 'configs/ChangeTheme';
import Text from 'elements/Text';
import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import Image from 'elements/Image';
import images from 'res/images';
import PaymentMethodSuggest from 'screens/Colaborator/Cart/PaymentMethodSuggest';
import CustomMenu from 'components/Menu/CustomMenu';
import {AdOrderFee} from 'res/type/Cart';

export interface ChoiceProps {
  [key: string]: any;

  id: number;
  name: string;
  color?: string;
}

interface SelectOptionsProps {
  choices: ChoiceProps[];
  choice?: ChoiceProps;
  onPressItem: (item: ChoiceProps) => void;
  fee: AdOrderFee;
  shippingFee?: number;
}

const SelectOptions = memo(
  ({choices, choice, onPressItem, shippingFee, fee}: SelectOptionsProps) => {
    const {theme} = useTheme();
    return (
      <View style={[]}>
        {choices &&
          choices.map((item, index) => {
            const onPress = () => {
              onPressItem && onPressItem(item);
            };
            return (
              <TouchableOpacity
                key={item.id.toString()}
                activeOpacity={0.54}
                style={[Theme.flexRow, styles.selectItem]}
                {...{onPress}}>
                <View
                  style={[
                    styles.containerSelected,
                    choice?.id == item.id
                      ? {
                          borderColor: colors.primary,
                        }
                      : {borderColor: colors.inactive},
                  ]}>
                  {choice?.id == item.id && <View style={styles.Selected} />}
                </View>
                <Text
                  color={item.color && item.color}
                  size={15}
                  lineHeight={18}
                  marginLeft={10}
                  style={Theme.flex1}
                  semiBold>
                  {item.name}
                </Text>
                <CustomMenu
                  popover
                  onSelected={() => {}}
                  placement="bottom"
                  MenuSelectOption={<Image source={images.ic_help} />}
                  customOption={
                    <PaymentMethodSuggest
                      type={item?.id}
                      fee={fee}
                      shippingFee={shippingFee || 0}
                    />
                  }
                />
              </TouchableOpacity>
            );
          })}
      </View>
    );
  },
);

export default SelectOptions;

const styles = StyleSheet.create({
  containerSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    ...Theme.center,
  },
  Selected: {
    height: 14,
    width: 14,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.White,
    justifyContent: 'center',
  },
  selectItem: {
    height: 50,
    alignItems: 'flex-start',
  },
  topBorder: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomBorder: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
