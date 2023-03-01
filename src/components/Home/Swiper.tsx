import React from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
// import PagerView from 'react-native-swiper';
import {useNavigation} from '@react-navigation/core';
import useSwiper from 'apollo/logic/home/useSwiper';
import {Routes} from 'configs';
import {RootReducer} from 'middlewares/reducers';
import {BaseUseNavigationProps} from 'navigation/BaseNavigationProps';
import {MainParamList} from 'navigation/service/NavigationParams';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {useSelector} from 'react-redux';
import colors from 'res/colors';
import {getSlug} from 'utils/other-utils';
import scale from 'utils/scale';
import SwiperItem from './SwiperItem';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export default function Swiper() {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  const {data} = useSwiper();
  const ONBOARDING = data?.getBanners?.result?.docs || [];
  const navigation = useNavigation<BaseUseNavigationProps<MainParamList>>();
  const width = Dimensions.get('window').width;
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, ONBOARDING.length];
  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, ONBOARDING.length * width],
  });

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        },
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View style={styles.container}>
      <AnimatedPagerView
        ref={ref}
        style={styles.PagerView}
        onPageScroll={onPageScroll}>
        {ONBOARDING.map((i, index) => (
          <SwiperItem
            {...i}
            key={index.toString()}
            onPress={() => {
              if (userProfile?.user?.isWholeSale) {
                navigation.navigate(Routes.DetailCategoryColaboratorScreen, {
                  slug: getSlug(i.url),
                });
              } else {
                navigation.navigate(Routes.DetailCategoryScreen, {
                  slug: getSlug(i.url),
                });
              }
            }}
            isFirstItem={index === 0}
            isLastItem={index === ONBOARDING.length - 1}
          />
        ))}
      </AnimatedPagerView>
      <View style={styles.dotsContainer}>
        <ExpandingDot
          data={ONBOARDING}
          expandingDotWidth={20}
          //@ts-ignore
          scrollX={scrollX}
          activeDotColor={colors.dotActive}
          inActiveDotColor={colors.dotInActive}
          inActiveDotOpacity={1}
          dotStyle={{height: 7, width: 7}}
          containerStyle={{
            top: 10,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {},
  PagerView: {
    height: scale(187),
  },
  container: {
    paddingHorizontal: scale(15),
    marginVertical: scale(15),
  },
  progressContainer: {flex: 0.1, backgroundColor: '#63a4ff'},
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
  separator: {
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  touchableTitle: {
    textAlign: 'center',
    color: '#000',
  },
  touchableTitleActive: {
    color: '#fff',
  },
  dotsContainer: {
    justifyContent: 'space-evenly',
  },
  dotContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentSlider: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dots: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 310,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});
