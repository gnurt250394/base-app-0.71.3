import Text from 'elements/Text';
import moment from 'moment';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {WithdrawalRequest} from 'res/type/Wallet';
import {getColor} from 'utils/other-utils';

interface ItemHistoryWithDrawalProps {
  item: WithdrawalRequest;
}

const ItemHistoryWithDrawal = ({item}: ItemHistoryWithDrawalProps) => {
  return (
    <View style={styles.containerItem}>
      <View
        style={[
          styles.containerStatus,
          {
            backgroundColor: getColor(item.status, true),
          },
        ]}>
        <Text size={12} lineHeight={18} color={getColor(item.status)}>
          {item.status}
        </Text>
      </View>
      <View style={[Theme.flexRowSpace, styles.containerDate]}>
        <Text size={14} lineHeight={18} color={colors.dark} medium />
        <Text size={12} lineHeight={18}>
          {moment(item.createdAt).format('HH:mm DD/MM/YYYY')}
        </Text>
      </View>
      <View style={[Theme.flexRowSpace, {alignItems: 'flex-start'}]}>
        <Text size={12} lineHeight={18} color={colors.dark} medium>
          Tài khoản nhận tiền:
        </Text>
        <View>
          <Text size={12} lineHeight={18} right>
            {item.bankName}
          </Text>
          <Text size={12} lineHeight={18} right>
            {item.bankAccountId}
          </Text>
          <Text size={12} lineHeight={18} right>
            {item.bankAccountName}
          </Text>
        </View>
      </View>
      <View style={[Theme.flexRowSpace]}>
        <Text size={12} lineHeight={18} color={colors.dark} medium>
          Số tiền:
        </Text>
        <Text size={12} lineHeight={18}>
          {item?.amount?.formatPrice()}đ
        </Text>
      </View>
    </View>
  );
};

export default ItemHistoryWithDrawal;

const styles = StyleSheet.create({
  containerDate: {
    paddingVertical: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  containerStatus: {
    borderRadius: 4,
    padding: 4,
    alignSelf: 'flex-start',
  },
  containerItem: {
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  container: {},
});
