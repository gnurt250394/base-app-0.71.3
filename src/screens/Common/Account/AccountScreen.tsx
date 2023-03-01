import {useMutation} from '@apollo/client';
import {CHECK_AUTH_QUERY, LOGOUT_QUERY} from 'apollo/query/ApiAuth';
import ItemAccount from 'components/Account/ItemAccount';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ModalSelect from 'components/ModalSelect';
import {Constants, Routes} from 'configs';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import Image from 'elements/Image';
import Text from 'elements/Text';
import useImagePicker from 'hooks/useImagePicker';
import useModalAnimation from 'hooks/useModalAnimation';
import {onLogout, onSaveDataUser} from 'middlewares/actions/auth/actionLogin';
import {RootReducer} from 'middlewares/reducers';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {reset} from 'navigation/service/RootNavigation';
import ProfileApi from 'network/apis/profile/ProfileApi';
import * as React from 'react';
import {useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from 'react-native';
import CodePush from 'react-native-code-push';
import {useDispatch, useSelector} from 'react-redux';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';
import snackbarUtils from 'utils/snackbar-utils';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {getFileName} from 'utils/other-utils';
import {onRemoveCountCart} from 'middlewares/actions/cart/actionCart';
import {client, useNetwork} from 'apollo/NetworkProvider';
import ResponseCode from 'network/ResponseCode';
import {REQUEST_UPDATE_USER} from 'apollo/query/ApiProfile';

const menuOptions = [
  {
    id: 0,
    name: 'Take a Photo',
  },
  {
    id: 1,
    name: 'From Photos',
  },
];

interface AccountScreenProps {}

const AccountScreen = (props: BaseNavigationProps<MainParamList>) => {
  const [visible, open, close] = useModalAnimation();
  const [avatar, setAvatar] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {onChooseCamera, onChoosePicker} = useImagePicker();
  const dispatch = useDispatch();
  const onNavigate = (routeName: string, params?: any) => () => {
    props.navigation.navigate(routeName, params);
  };
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  console.log('-> userProfile', userProfile);
  const cart = useSelector((state: RootReducer) => state.cart);
  const [appVersion, setAppVersion] = React.useState('');
  const [appLabel, setAppLabel] = React.useState('');
  const [onPress, {data, error, loading}] = useMutation(LOGOUT_QUERY);
  const [onPressUpdateUser] = useMutation(REQUEST_UPDATE_USER);
  React.useEffect(() => {
    if (error) {
      snackbarUtils.show(error.message, 'danger');
    }
  }, [error]);

  function getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING).then(
      metadata => {
        if (metadata) {
          setAppVersion(metadata.appVersion);
          setAppLabel(metadata.label);
        }
      },
      error => {},
    );
  }

  const checkAuth = async () => {
    try {
      let dataAuth = await client.query({
        query: CHECK_AUTH_QUERY,
        variables: {
          input: {
            token: userProfile?.loginToken,
          },
        },
      });
      console.log('dataAuth: ', dataAuth);

      if (dataAuth?.data?.checkAuth?.success) {
        dispatch(
          onSaveDataUser(
            dataAuth?.data?.checkAuth?.user,
            dataAuth?.data?.checkAuth?.token,
            dataAuth?.data?.checkAuth?.role?.name,
          ),
        );
      } else {
        props.navigation.navigate(Routes.LoginScreen);
      }
    } catch (error) {}
  };
  const onRefress = () => {
    checkAuth();
  };
  React.useEffect(() => {
    getUpdateMetadata();
  }, []);
  const _onLogout = () => {
    onPress();
    reset(Routes.LoginScreen);
    dispatch(onLogout());
    dispatch(onRemoveCountCart());
  };
  const onSelect = async (item: any) => {
    try {
      let res: ImageOrVideo;
      switch (item.id) {
        case 0:
          res = await onChooseCamera();
          break;
        case 1:
          res = await onChoosePicker();
          break;

        default:
          break;
      }
      if (res) {
        onUpload(res);
      }
    } catch (error) {}
  };
  const onUpload = async (file: ImageOrVideo) => {
    console.log('-> file', file);
    try {
      const form: any[] = [];
      form.push({
        name: 'userId',
        data: String(userProfile.user?.id),
      });
      form.push({
        name: 'type',
        data: String('user'),
      });
      form.push({
        name: 'file',
        filename: file?.filename || file?.path.split('/').pop(),
        type: file?.mime,
        data:
          Platform.OS === 'ios'
            ? `RNFetchBlob-${decodeURI(file.sourceURL || '')}`
            : RNFetchBlob.wrap((file.path || '').replace('file:///', '')),
      });
      let res = await ProfileApi.uploadAvatar(form);
      console.log('-> res', res);
      if (res.status == ResponseCode.SUCCESS) {
        onPressUpdateUser({
          variables: {
            user: {
              address: userProfile.user?.address.map(e => ({
                cityId: e.cityId,
                districtId: e.districtId,
                wardId: e.wardId,
                isDefault: e.isDefault,
                cityName: e.cityName,
                districtName: e.districtName,
                wardName: e.wardName,
                street: e.street,
              })),
              id: userProfile.user?.id,
              fullName: userProfile.user?.fullName,
              email: userProfile.user?.email,
              phone: userProfile.user?.phone,
              avatar: res.data.link,
            },
          },
        });
      }
    } catch (error) {}
  };
  const renderCustomer = () => {
    return (
      <View style={Theme.flex1}>
        <ItemAccount
          onPress={onNavigate(Routes.InfoAccountScreen)}
          icon={images.ic_info_account}
          label={'Thông tin tài khoản'}
        />
        <ItemAccount
          // onPress={onNavigate(Routes.OrderScreen)}
          icon={images.ic_order}
          label={'Sản phẩm đã xem'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.OrderScreen)}
          icon={images.ic_order}
          label={'Đơn hàng'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.CartScreen)}
          icon={images.ic_cart}
          label={'Giỏ hàng'}
          count={cart?.adOrderCount}
        />
        <ItemAccount
          onPress={onNavigate(Routes.ChangePasswordOldScreen)}
          icon={images.ic_change_password}
          label={'Đổi mật khẩu'}
        />
      </View>
    );
  };
  const renderColaborator = () => {
    return (
      <View style={Theme.flex1}>
        <ItemAccount
          onPress={onNavigate(Routes.InfoAccountScreen)}
          icon={images.ic_info_account}
          label={'Thông tin tài khoản'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.CartScreen)}
          icon={images.ic_cart}
          count={cart?.adOrderCount}
          label={'Giỏ hàng'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.OrderScreen)}
          icon={images.ic_order}
          label={'Đơn hàng'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.WithDrawalRequestScreen)}
          icon={images.ic_dollar}
          label={'Yêu cầu rút tiền'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.ListCustomerScreen, {
            isEdit: true,
          })}
          icon={images.ic_guest}
          label={'Thông tin khách hàng'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.CartScreen)}
          icon={images.ic_guest}
          label={'Chính sách cộng tác viên'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.ChangePasswordOldScreen)}
          icon={images.ic_change_password}
          label={'Đổi mật khẩu'}
        />
        <ItemAccount
          onPress={onNavigate(Routes.ListCampaignScreen)}
          icon={images.ic_campain}
          label={'Chiến dịch'}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={images.bg_account} style={[styles.oval]}>
        <View
          style={[
            Theme.flexRowSpace,
            {flex: 1, paddingTop: 20, paddingHorizontal: 15},
          ]}>
          <View>
            <Text size={14} lineHeight={24} semiBold color={colors.White}>
              Xin chào 👋
            </Text>
            <Text
              size={18}
              lineHeight={28}
              semiBold
              color={colors.White}
              ucfirst
              marginTop={5}>
              {userProfile?.user?.fullName}
            </Text>
            <View style={styles.containerRole}>
              <Text size={12} lineHeight={18} medium>
                {userProfile?.user?.isWholeSale
                  ? 'Cộng tác viên'
                  : 'Thành viên'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={open}>
            <Image
              source={
                userProfile?.user?.avatar
                  ? {uri: userProfile?.user?.avatar}
                  : images.ic_user
              }
              style={{
                width: scale(60),
                height: scale(60),
                borderRadius: scale(30),
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // bounces={false}
        refreshControl={
          <RefreshControl onRefresh={onRefress} refreshing={refreshing} />
        }
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[Theme.flex1, {padding: 16, paddingTop: 23}]}>
          {!userProfile?.user?.isWholeSale && renderCustomer()}
          {!!userProfile?.user?.isWholeSale && renderColaborator()}
          {!!appVersion && (
            <Text center size={12} marginBottom={10}>
              Codepush Version :{' '}
              <Text semiBold>
                {appVersion}
                {appLabel}
              </Text>
            </Text>
          )}
          <ButtonIconText
            icon={images.ic_logout}
            title={'Đăng xuất'}
            onPress={_onLogout}
            backgroundColor={colors.White}
            borderColor={colors.primary}
            textProps={{semiBold: true, size: 16, lineHeight: 26}}
          />
        </View>
      </ScrollView>
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalSelect
          choices={menuOptions}
          close={close}
          onPressItem={onSelect}
        />
      </ModalBottom>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  containerRole: {
    backgroundColor: colors.White,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 8,
  },
  container: {backgroundColor: colors.secondary, flex: 1},
  oval: {height: scale(226), width: '100%'},
});
