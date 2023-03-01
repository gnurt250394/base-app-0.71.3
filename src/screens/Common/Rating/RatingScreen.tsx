import React, {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Container from 'elements/Layout/Container';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {useQuery} from '@apollo/client';
import {GET_DETAIL_ORDER} from 'apollo/query/ApiOrder';
import {Routes} from 'configs';
import Text from 'elements/Text';
import {Rating} from 'react-native-ratings';
import TextInput from 'elements/TextInput';
import useCreateRating from 'apollo/logic/rating/useCreateRating';
import ButtonText from 'elements/Buttons/ButtonText';
import colors from 'res/colors';
import ModalBottom from 'components/ModalBase/ModalBottom';
import ModalSelect from 'components/ModalSelect';
import {menuOptions} from 'screens/Colaborator/Campaign/DetailCampainScreen';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import useModalAnimation from 'hooks/useModalAnimation';
import useImagePicker from 'hooks/useImagePicker';
import ButtonIconText from 'elements/Buttons/ButtonIconText';
import images from 'res/images';
import Image from 'elements/Image';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';

interface RatingScreenProps {}

const RatingScreen = (
  props: BaseNavigationProps<MainParamList, Routes.RatingScreen>,
) => {
  const {handleSubmit, handleChange, values, onUpload, setFieldValue} =
    useCreateRating(props.route.params.item);
  const [visible, open, close] = useModalAnimation();
  const {onChooseCamera, onChoosePicker} = useImagePicker();
  const onSelect = async (item: any) => {
    try {
      let res: ImageOrVideo | undefined;
      switch (item.id) {
        case 0:
          res = await onChooseCamera();
          break;
        case 1:
          res = await onChoosePicker(true);
          break;

        default:
          break;
      }
      onUpload(res);
    } catch (error) {}
  };
  const onRemoveImage = (index: number) => () => {
    let data = [...values.images];
    data.splice(index, 1);
    setFieldValue('images', data);
  };
  return (
    <Container>
      <ScrollView>
        <View style={styles.container}>
          <Text
            center={true}
            bold={true}
            size={23}
            lineHeight={28}
            marginBottom={20}>
            Đánh giá sản phẩm
          </Text>
          <Text semiBold={true} center={true} marginBottom={20}>
            {props.route.params.item?.product?.name}
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={45}
            startingValue={values.rating}
            onFinishRating={(e: number) => setFieldValue('rating', e)}
            style={{marginBottom: 20}}
          />
          <TextInput
            onChangeText={handleChange('message')}
            value={values?.message}
            editable={true}
            style={{maxHeight: 300, minHeight: 100}}
            placeholder={'Nhận xét của bạn về sản phẩm...'}
            multiline={true}
          />
          <ButtonIconText
            icon={images.ic_upload}
            title={'Tải ảnh lên'}
            onPress={open}
          />
          <View style={[Theme.flexRow, Theme.flex1, {flexWrap: 'wrap'}]}>
            {!!values?.images?.length &&
              values.images.map((item, index) => {
                return (
                  <View
                    style={{marginRight: 10, marginTop: 10}}
                    key={index.toString()}>
                    <TouchableOpacity
                      onPress={onRemoveImage(index)}
                      style={styles.buttonClose}>
                      <Image
                        source={images.ic_close}
                        style={styles.iconClose}
                      />
                    </TouchableOpacity>
                    <Image
                      isPreview={true}
                      data={values?.images.map(e => ({uri: e})) || []}
                      source={{uri: item}}
                      style={styles.iconPreview}
                    />
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.container}>
        <ButtonText
          title={'Đánh giá'}
          onPress={handleSubmit}
          backgroundColor={colors.primary}
          titleColor={colors.White}
          style={{marginTop: 20}}
          textProps={{
            semiBold: true,
          }}
        />
      </View>
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

export default RatingScreen;

const styles = StyleSheet.create({
  iconPreview: {
    height: scale(100),
    width: scale(100),
    borderRadius: 4,
  },
  iconClose: {
    height: 20,
    width: 20,
  },
  buttonClose: {
    position: 'absolute',
    zIndex: 999,
    right: 3,
    top: 3,
    padding: 3,
    backgroundColor: colors.White,
    borderRadius: 20,
  },
  container: {
    padding: 20,
  },
});
