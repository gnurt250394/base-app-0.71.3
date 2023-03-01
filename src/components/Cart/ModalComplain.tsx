import {useMutation} from '@apollo/client';
import Clipboard from '@react-native-community/clipboard';
import {useNavigation} from '@react-navigation/native';
import {REFRESS_INFO_PAYMENT} from 'apollo/query/ApiCart';
import {CREATE_COMPLAIN} from 'apollo/query/ApiOrder';
import {Routes} from 'configs';
import {height} from 'configs/Const';
import ButtonBorder from 'elements/Buttons/ButtonBorder';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import ButtonSelect from 'elements/Buttons/ButtonSelect';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Text from 'elements/Text';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  ListRenderItem,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {AllOrders, InfoVA, OrderComplain} from 'res/type/Cart';
import keyExtractor from 'utils/keyExtractor';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
interface ModalComplainProps {
  close: () => void;
  dataDetail: AllOrders;
  id: string;
}

const ModalComplain = (props: ModalComplainProps) => {
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const [keyword, setKeyword] = useState<string>('');
  const [onPress, {data: res}] = useMutation(CREATE_COMPLAIN, {
    variables: {
      order: {
        complainNote: keyword,
        id: props.id,
      },
    },
  });
  useEffect(() => {
    if (res?.createUserAdOrderComplain?.success) {
      onClose();
    }
  }, [res]);
  const onClose = () => {
    props.close && props.close();
  };
  const _renderItem: ListRenderItem<OrderComplain> = ({item, index}) => {
    return (
      <View style={{paddingBottom: 20}}>
        <Text marginBottom={5}>
          Trạng thái:{' '}
          <Text color={colors.borderFocus}>
            {item.isResolved ? 'Đã giải quyết' : 'Đang chờ giải quyết'}
          </Text>
        </Text>
        <Text marginBottom={5}>Nội dung: {item.complainNote}</Text>
        <Text>
          Phản hồi: {item.resolveNote ? item.resolveNote : 'Đang chờ...'}
        </Text>
      </View>
    );
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
          Khiếu nại đơn hàng
        </Text>
        <ButtonIcon onPress={onClose} icon={images.ic_close} />
      </View>
      <View
        style={{
          paddingTop: scale(18),
          paddingHorizontal: scale(14),
        }}>
        <View style={{maxHeight: height / 3}}>
          <FlatList
            data={props.dataDetail?.complains}
            renderItem={_renderItem}
            keyExtractor={keyExtractor}
          />
        </View>
        <InputApp
          title="Nhập nội dung"
          isRequired
          multiline
          onBlur={Keyboard.dismiss}
          onChangeText={setKeyword}
          value={keyword}
        />
        <ButtonBorder
          title={'Xác nhận'}
          backgroundColor={colors.primary}
          style={{marginTop: 20}}
          height={58}
          onPress={onPress}
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

export default ModalComplain;

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
