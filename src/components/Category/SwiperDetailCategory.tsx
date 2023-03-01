import React, {useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import PagerView, {
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from 'react-native-pager-view';
// import PagerView from 'react-native-swiper';
import {
  ScalingDot,
  SlidingBorder,
  ExpandingDot,
  SlidingDot,
} from 'react-native-animated-pagination-dots';
import images from 'res/images';
import strings from 'res/strings';
import colors from 'res/colors';
import SwiperItemDetail from './SwiperItemDetail';
import scale from 'utils/scale';
import Text from 'elements/Text';
import {width} from 'configs/Const';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
interface Props {
  data: string[];
}
export default function SwiperDetailCategory({data}: Props) {
  const ONBOARDING = useMemo(() => data || [], [data]);
  const width = Dimensions.get('window').width;
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const onPageSelectedPosition = useRef(new Animated.Value(0)).current;
  const [activePage, setActivePage] = useState<number>(0);
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
  const onPageSelected = useMemo(
    () =>
      Animated.event<PagerViewOnPageSelectedEventData>(
        [{nativeEvent: {position: onPageSelectedPosition}}],
        {
          listener: ({nativeEvent: {position}}) => {
            console.log('position: ', position);
            setActivePage(position);
          },
          useNativeDriver: true,
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
        onPageSelected={onPageSelected}
        onPageScroll={onPageScroll}>
        {ONBOARDING.map((i, index) => (
          <SwiperItemDetail key={index.toString()} image={i} />
        ))}
      </AnimatedPagerView>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-start',
          padding: 8,
          paddingVertical: 10,
          position: 'absolute',
          bottom: scale(16),
          left: scale(16),
        }}>
        <Text color={colors.White} semiBold size={14}>
          {activePage + 1}/{ONBOARDING.length}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {},
  PagerView: {
    height: width,
  },
  container: {
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
