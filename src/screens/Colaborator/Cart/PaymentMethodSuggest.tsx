import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {ChoiceProps} from 'components/SelectOptions';
import colors from 'res/colors';
import {AdOrderFee} from 'res/type/Cart';
import Text from 'elements/Text';

interface PaymentMethodSuggestProps {
  type: any;
  fee: AdOrderFee;
  shippingFee?: number;
}

const PaymentMethodSuggest = (props: PaymentMethodSuggestProps) => {
  const [state, setState] = useState();
  console.log('-> props', props);
  const renderContent = () => {
    switch (props?.type) {
      case 1:
        return (
          <View style={styles.containerTextHelp}>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Thu trước của khách{' '}
              {(
                props?.fee?.resaleTotal + props?.fee?.shippingFee || 0
              ).formatPrice()}
              đ
            </Text>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Giữ lại tiền lời{' '}
              {(props?.fee?.resaleTotal - props?.fee?.subTotal).formatPrice()}đ
            </Text>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Thanh toán lại cho chúng tôi{' '}
              {(props?.fee?.total + props?.fee?.shippingFee).formatPrice()}đ
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.containerTextHelp}>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Chịu phí vận chuyển {(props?.fee?.shippingFee).formatPrice()}đ
            </Text>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Thanh toán trước cho chúng tôi{' '}
              {(props?.fee?.total + props?.fee?.shippingFee).formatPrice()}đ
            </Text>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Có thể rút {(props?.fee?.resaleTotal).formatPrice()}đ sau khi
              khách nhận hàng
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.containerTextHelp}>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Không chịu phí vận chuyển
            </Text>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Thanh toán trước cho chúng tôi {(props?.fee?.total).formatPrice()}
              đ
            </Text>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              Có thể rút {(props?.fee?.resaleTotal).formatPrice()}đ sau khi
              khách nhận hàng
            </Text>
          </View>
        );
      default:
        return (
          <View style={styles.containerTextHelp}>
            <Text
              size={12}
              lineHeight={18}
              marginBottom={4}
              color={colors.White}>
              {props?.shippingFee}
            </Text>
          </View>
        );
    }
  };
  return (
    <View style={styles.container}>
      <Text size={16} lineHeight={18} marginLeft={10} color={colors.White}>
        Bạn sẽ:
      </Text>
      {renderContent()}
    </View>
  );
};

export default PaymentMethodSuggest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    paddingTop: 10,
  },
  containerTextHelp: {
    padding: 10,
    borderRadius: 4,
  },
});
