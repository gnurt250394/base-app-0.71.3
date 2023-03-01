import { StyleSheet } from 'react-native';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from 'res/colors';
import scale from 'utils/scale';

export default StyleSheet.create({
  flexRowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowSpaceEvenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flexRowSpaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
  flex7: {
    flex: 7,
  },
  flex8: {
    flex: 8,
  },
  flex9: {
    flex: 9,
  },
  flexDirection: {
    flexDirection: 'row',
  },
  flexDirectionBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    // backgroundColor: colors.Snow,
    paddingHorizontal: 24,
    paddingBottom: getBottomSpace(),
    paddingTop: getStatusBarHeight(),
  },
  icons: {
    width: 24,
    height: 24,
  },
  icons32: {
    width: 32,
    height: 32,
  },
  icons16: {
    width: 16,
    height: 16,
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonSlider: {
    width: 48,
    height: 6,
    backgroundColor: colors.Platinum,
    marginTop: 12,
    borderRadius: 3,
    alignSelf: 'center',
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerBackGround: {
    flex: 1,
  },
  headerNavigationStyle: {
    shadowColor: 'transparent',
    height: scale(108),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 108 - getStatusBarHeight(),
    paddingTop: getStatusBarHeight(),
  },
  searchBox: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.TiffanyBlue,
  },
});
