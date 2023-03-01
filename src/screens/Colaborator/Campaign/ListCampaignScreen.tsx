import useCampain from 'apollo/logic/campain/useCampain';
import useStatusCampain from 'apollo/logic/campain/useStatusCampain';
import {Routes} from 'configs';
import ButtonIcon from 'elements/Buttons/ButtonIcon';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import moment from 'moment';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {MissionCampain} from 'res/type/Campain';
import keyExtractor from 'utils/keyExtractor';
import {statusColor, statusMission} from './DetailCampainScreen';

interface ListCampaignScreenProps {}

const ListCampaignScreen = (
  props: BaseNavigationProps<MainParamList, Routes.ListCampaignScreen>,
) => {
  const {data} = useCampain();
  const {data: dataCampain} = useStatusCampain(
    data?.missions?.result?.docs?.map(e => e.id) || [],
  );

  const onDetail = (item: MissionCampain, isEdit: boolean) => () =>
    props.navigation.navigate(Routes.DetailCampainScreen, {
      item: item,
      isEdit,
    });
  const _renderItem: ListRenderItem<MissionCampain> = ({item, index}) => {
    let campain = dataCampain?.getMissionClaims.result.docs.find(
      e => e.missionId == item.id,
    );
    return (
      <View style={styles.containerItem}>
        <View style={[Theme.flexRowSpace, styles.borderBottom]}>
          <Text size={14} semiBold lineHeight={18}>
            {item.name}
          </Text>
          <View
            style={{
              backgroundColor: statusColor[campain?.status || 'PENDING'] + 20,
              padding: 5,
              borderRadius: 4,
              paddingHorizontal: 7,
            }}>
            <Text size={12} color={statusColor[campain?.status || 'PENDING']}>
              {statusMission[campain?.status || '']}
            </Text>
          </View>
        </View>
        <View style={[Theme.flexRowSpace]}>
          <Text size={12} lineHeight={18} semiBold>
            Thời gian tham gia:
          </Text>
          <Text size={12} lineHeight={18} color={colors.dark}>
            {moment(item.startDate).format('DD/MM/YYYY')} -{' '}
            {moment(item.endDate).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={[Theme.flexRowSpace, styles.borderBottom]}>
          <Text size={12} lineHeight={18} semiBold>
            Thưởng:
          </Text>
          <Text size={12} lineHeight={18} color={colors.dark}>
            {item.bonus.formatPrice()} đ
          </Text>
        </View>

        <View style={[Theme.flexRowRight]}>
          <ButtonIcon onPress={onDetail(item, false)} icon={images.ic_eye} />
          {(campain?.status == 'PENDING' || !campain) && (
            <ButtonIcon
              onPress={onDetail(item, true)}
              icon={images.ic_edit_customer}
            />
          )}
        </View>
      </View>
    );
  };
  return (
    <Container title="Chiến dịch">
      <FlatList
        data={data?.missions?.result?.docs}
        keyExtractor={keyExtractor}
        renderItem={_renderItem}
      />
    </Container>
  );
};

export default ListCampaignScreen;

const styles = StyleSheet.create({
  containerItem: {
    padding: 16,
    margin: 10,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
  },
  borderBottom: {
    marginTop: 8,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 10,
  },
  container: {},
});
