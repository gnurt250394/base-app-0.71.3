import {useQuery} from '@apollo/client';
import {GET_WALLET} from 'apollo/query/ApiWallet';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ButtonText from 'elements/Buttons/ButtonText';
import Text from 'elements/Text';
import useModalAnimation from 'hooks/useModalAnimation';
import {RootReducer} from 'middlewares/reducers';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import {Wallet} from 'res/type/Wallet';
import scale from 'utils/scale';
import ModalWithDrawal from './ModalWithDrawal';

interface WithDrawalScreenProps {}

const WithDrawalScreen = (props: WithDrawalScreenProps) => {
  const [visible, open, close] = useModalAnimation();
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const {data} = useQuery(GET_WALLET, {
    variables: {
      wallet: {
        userId: userProfile.user?.id,
      },
    },
  });
  const detail: Wallet = React.useMemo(() => {
    if (data?.getWallet?.success) {
      return data?.getWallet?.result;
    }
  }, [data?.getWallet]);
  if (!data?.getWallet?.success) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={[Theme.flexRowSpace]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Tiền vốn:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.capital?.formatPrice()}đ
        </Text>
      </View>
      <View style={[Theme.flexRowSpace, {paddingTop: 16}]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Lợi nhuận bán hàng:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.saleProfit?.formatPrice()}đ
        </Text>
      </View>
      <View style={[Theme.flexRowSpace]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Hoa hồng giới thiệu thành viên:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.referralCommision?.formatPrice()}đ
        </Text>
      </View>

      <View style={[Theme.flexRowSpace]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Thưởng nhiệm vụ:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.missionBonus?.formatPrice()}đ
        </Text>
      </View>
      <View style={[Theme.flexRowSpace]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Tiếp thị sản phẩm:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.affiliateBonus?.formatPrice()}đ
        </Text>
      </View>

      <View style={[Theme.flexRowSpace, {paddingTop: 16}]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Tổng lợi nhuận:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.totalBalance?.formatPrice()}đ
        </Text>
      </View>
      <View style={[Theme.flexRowSpace, styles.line]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Đã rút:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {detail?.withdrew?.formatPrice()}đ
        </Text>
      </View>
      <View style={[Theme.flexRowSpace, {paddingTop: 16, paddingBottom: 16}]}>
        <View style={[styles.groupText]}>
          <Text size={16} lineHeight={26}>
            Số tiền có thể rút:
          </Text>
        </View>
        <Text size={16} semiBold lineHeight={26}>
          {(detail?.totalBalance - detail?.withdrew)?.formatPrice()}đ
        </Text>
      </View>

      <ButtonText
        title="Rút tiền"
        backgroundColor={colors.primary}
        onPress={open}
        textProps={{
          size: 16,
          semiBold: true,
          color: colors.White,
          lineHeight: 26,
        }}
      />
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalWithDrawal close={close} dataDetail={detail} />
      </ModalBottom>
    </View>
  );
};

export default WithDrawalScreen;

const styles = StyleSheet.create({
  line: {
    paddingVertical: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  groupText: {paddingRight: 20, flex: 1},
  container: {flex: 1},
});
