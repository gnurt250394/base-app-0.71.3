import IframeRenderer from '@native-html/iframe-plugin';
import useContentCampain from 'apollo/logic/campain/useContentCampain';
import useDetailCampain from 'apollo/logic/campain/useDetailCampain';
import useStatusCampain from 'apollo/logic/campain/useStatusCampain';
import useSubmitCampain from 'apollo/logic/campain/useSubmitCampain';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ModalSelect from 'components/ModalSelect';
import {Routes} from 'configs';
import {width} from 'configs/Const';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import useImagePicker from 'hooks/useImagePicker';
import useModalAnimation from 'hooks/useModalAnimation';
import moment from 'moment';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HTML from 'react-native-render-html';
import {WebView} from 'react-native-webview';
import colors from 'res/colors';
import images from 'res/images';
import {alterChildren} from 'utils/other-utils';
interface DetailCampainScreenProps {}
const renderers = {
  iframe: IframeRenderer,
};
const tagsStyles = {
  iframe: {
    opacity: 0.99,
  },
  // If you are using @native-html/table-plugin
  table: {
    opacity: 0.99,
  },
};

export const statusMission = {
  PENDING: 'Chờ xác nhận',
  APPROVED: 'Hoàn thành',
  REJECTED: 'Từ chối',
  ['']: 'Sẵn sàng',
};
export const statusColor = {
  PENDING: colors.warning,
  REJECTED: colors.error,
  APPROVED: colors.borderFocus,
};
export const menuOptions = [
  {
    id: 0,
    name: 'Take a Photo',
  },
  {
    id: 1,
    name: 'From Photos',
  },
];
const DetailCampainScreen = (
  props: BaseNavigationProps<MainParamList, Routes.DetailCampainScreen>,
) => {
  const [visible, open, close] = useModalAnimation();
  const {onChooseCamera, onChoosePicker} = useImagePicker();
  const {data} = useContentCampain(props.route.params.item.id);
  console.log('data: ', data);
  const {data: dataCampain} = useStatusCampain([props.route.params.item.id]);
  const detailCampain =
    dataCampain?.getMissionClaims?.result?.docs[
      dataCampain?.getMissionClaims?.result?.docs?.length - 1
    ];
  const {
    handleSubmit,
    errors,
    touched,
    handleChange,
    onUpload,
    values,
    setFieldValue,
  } = useSubmitCampain(data?.getMission?.result?.id || '', detailCampain);

  const onSelect = async (item: any) => {
    try {
      let res: ImageOrVideo | undefined;
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
      console.log('res: ', res);
      onUpload(res);
    } catch (error) {}
  };
  const onRemoveImage = () => {
    setFieldValue('images', []);
  };
  return (
    <Container
      title={props?.route?.params?.item?.name}
      style={{
        padding: 15,
      }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {!!dataCampain?.getMissionClaims.result.docs?.length && (
          <View>
            <Text size={16} lineHeight={26}>
              Trạng thái:
            </Text>
            <View
              style={[
                {
                  backgroundColor:
                    statusColor[detailCampain?.status || 'PENDING'] + '20',
                },
                styles.containerStatus,
              ]}>
              <Text
                size={12}
                lineHeight={18}
                color={statusColor[detailCampain?.status || 'PENDING']}>
                {statusMission[detailCampain?.status || '']}
              </Text>
            </View>
          </View>
        )}
        <Text size={16} marginTop={20} lineHeight={26}>
          Tên chiến dịch:
        </Text>
        <Text size={16} semiBold marginTop={4} lineHeight={26}>
          {props?.route?.params?.item?.name}
        </Text>
        <Text size={16} marginTop={20} lineHeight={26}>
          Thời gian diễn ra:
        </Text>
        <Text size={16} semiBold marginTop={4} lineHeight={26}>
          {moment(props?.route?.params?.item?.startDate).format('DD/MM/YYYY')} -{' '}
          {moment(props?.route?.params?.item?.endDate).format('DD/MM/YYYY')}
        </Text>
        <Text size={16} marginTop={20} lineHeight={26}>
          Thưởng:
        </Text>
        <Text size={16} semiBold marginTop={4} lineHeight={26}>
          {props?.route?.params?.item?.bonus.formatPrice()} đ
        </Text>
        <Text size={16} marginTop={20} lineHeight={26}>
          Nội dung:
        </Text>
        {data?.getMission.result.description ? (
          <HTML
            renderers={renderers}
            WebView={WebView}
            alterDOMChildren={alterChildren}
            source={{
              html: data?.getMission.result.description,
            }}
            ignoredStyles={['width']}
            contentWidth={width - 20}
            defaultWebViewProps={{}}
            renderersProps={{
              iframe: {
                scalesPageToFit: false,
                webViewProps: {
                  allowsFullScreen: true,
                },
              },
            }}
            tagsStyles={tagsStyles}
          />
        ) : null}

        {props.route.params.isEdit ? (
          <View>
            <InputApp
              placeholder="Link xác nhận"
              title="Link xác nhận"
              value={values.link}
              onChangeText={handleChange('link')}
              errors={errors}
              touched={touched}
              name="link"
            />
            {!!values.images?.length && (
              <View>
                <Image
                  source={{uri: values.images[0]}}
                  style={{
                    height: 200,
                    width: '100%',
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                  isPreview
                  index={0}
                  data={[{uri: values.images[0]}]}
                />
                <TouchableOpacity
                  onPress={onRemoveImage}
                  style={styles.buttonClose}>
                  <Image
                    source={images.ic_close}
                    style={{height: 30, width: 30}}
                  />
                </TouchableOpacity>
              </View>
            )}
            <ButtonIconText
              icon={images.ic_upload}
              title={'Upload ảnh'}
              onPress={open}
              borderColor={colors.primary}
              style={{marginTop: 20}}
            />
            <ButtonText
              title={'Chia sẻ link sác nhận'}
              backgroundColor={colors.primary}
              titleColor={colors.White}
              onPress={handleSubmit}
              textProps={{semiBold: true}}
              disabled={!values.images?.length && !values.link}
              style={{marginTop: 20}}
            />
          </View>
        ) : (
          <View>
            <Text size={16} marginTop={20} lineHeight={26}>
              Link xác nhận:
            </Text>
            <Text size={16} semiBold marginTop={8} lineHeight={24}>
              {detailCampain?.link}
            </Text>
            {!!detailCampain?.images?.length && (
              <View>
                <Text size={16} marginTop={20} lineHeight={26}>
                  Ảnh xác nhận:
                </Text>
                <Image
                  source={{
                    uri: detailCampain?.images?.[0],
                  }}
                  style={{
                    height: 200,
                    width: '100%',
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                  isPreview
                  index={0}
                  data={[{uri: detailCampain?.images?.[0]}]}
                />
              </View>
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
      <ModalBottom isVisibleModal={visible} onCloseModal={close}>
        <ModalSelect
          choices={menuOptions}
          close={close}
          onPressItem={onSelect}
        />
      </ModalBottom>
    </Container>
  );
};

export default DetailCampainScreen;

const styles = StyleSheet.create({
  buttonClose: {
    position: 'absolute',
    top: 15,
    right: 5,
    backgroundColor: colors.White,
    borderRadius: 30,
  },
  containerStatus: {
    paddingVertical: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 7,
  },
  container: {},
});
