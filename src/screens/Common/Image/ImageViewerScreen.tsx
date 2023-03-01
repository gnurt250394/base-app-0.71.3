import {Routes} from 'configs';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Theme from 'res/style/Theme';

const HIT_SLOP = {top: 16, left: 16, bottom: 16, right: 16};
const ImageViewerScreen = (
  props: BaseNavigationProps<MainParamList, Routes.ImageViewerScreen>,
) => {
  const data = props.route.params.data;
  console.log('data: ', data);
  const index = props.route.params.index;
  console.log('index: ', index);
  const onRequestClose = () => {
    console.log('props: ', props);
    props.navigation.goBack();
  };
  return (
    <View style={Theme.flex1}>
      <ImageView
        images={data}
        imageIndex={index}
        visible={true}
        doubleTapToZoomEnabled={true}
        onRequestClose={onRequestClose}
      />
    </View>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  root: {},
  closeButton: {
    marginRight: 8,
    marginTop: 8,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    backgroundColor: '#00000077',
  },
  closeText: {
    lineHeight: 25,
    fontSize: 25,
    paddingTop: 2,
    textAlign: 'center',
    color: '#FFF',
    includeFontPadding: false,
  },
});
