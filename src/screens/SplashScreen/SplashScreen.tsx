import {Routes} from 'configs';
import {BaseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {reset} from 'navigation/service/RootNavigation';
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import images from 'res/images';
import Theme from 'res/style/Theme';

const SplashScreen = ({}: BaseNavigationProps<
  MainParamList,
  Routes.SplashScreen
>) => {
  useEffect(() => {
    setTimeout(() => {
      reset(Routes.MainTab);
    }, 2000);
  }, []);
  return (
    <View style={[Theme.flex1, Theme.center]}>
      <Image source={images.ic_logo_app} />
    </View>
  );
};

export default SplashScreen;
