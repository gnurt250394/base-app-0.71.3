import {StyleSheet} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
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

  /**
   * margin top
   */
  mt01: {
    marginTop: 1,
  },
  mt02: {
    marginTop: 2,
  },
  mt03: {
    marginTop: 3,
  },
  mt04: {
    marginTop: 4,
  },
  mt05: {
    marginTop: 5,
  },
  mt06: {
    marginTop: 6,
  },
  mt07: {
    marginTop: 7,
  },
  mt08: {
    marginTop: 8,
  },
  mt09: {
    marginTop: 9,
  },
  mt10: {
    marginTop: 10,
  },
  mt11: {
    marginTop: 11,
  },
  mt12: {
    marginTop: 12,
  },
  mt13: {
    marginTop: 13,
  },
  mt14: {
    marginTop: 14,
  },
  mt15: {
    marginTop: 15,
  },
  mt16: {
    marginTop: 16,
  },
  mt17: {
    marginTop: 17,
  },
  mt18: {
    marginTop: 18,
  },
  mt19: {
    marginTop: 19,
  },
  mt20: {
    marginTop: 20,
  },
  mt21: {
    marginTop: 21,
  },
  mt22: {
    marginTop: 22,
  },
  mt23: {
    marginTop: 23,
  },
  mt24: {
    marginTop: 24,
  },
  mt25: {
    marginTop: 25,
  },
  mt26: {
    marginTop: 26,
  },
  mt27: {
    marginTop: 27,
  },
  mt28: {
    marginTop: 28,
  },
  mt29: {
    marginTop: 29,
  },
  mt30: {
    marginTop: 30,
  },
  mt31: {
    marginTop: 31,
  },
  mt32: {
    marginTop: 32,
  },
  mt33: {
    marginTop: 33,
  },
  mt34: {
    marginTop: 34,
  },
  mt35: {
    marginTop: 35,
  },
  mt36: {
    marginTop: 36,
  },
  mt37: {
    marginTop: 37,
  },
  mt38: {
    marginTop: 38,
  },
  mt39: {
    marginTop: 39,
  },
  mt40: {
    marginTop: 40,
  },
  mt41: {
    marginTop: 41,
  },
  mt42: {
    marginTop: 42,
  },
  mt43: {
    marginTop: 43,
  },
  mt44: {
    marginTop: 44,
  },
  mt45: {
    marginTop: 45,
  },
  mt46: {
    marginTop: 46,
  },
  mt47: {
    marginTop: 47,
  },
  mt48: {
    marginTop: 48,
  },
  mt49: {
    marginTop: 49,
  },
  mt50: {
    marginTop: 50,
  },
  mt51: {
    marginTop: 51,
  },
  mt52: {
    marginTop: 52,
  },
  mt53: {
    marginTop: 53,
  },
  mt54: {
    marginTop: 54,
  },
  mt55: {
    marginTop: 55,
  },
  mt56: {
    marginTop: 56,
  },
  mt57: {
    marginTop: 57,
  },
  mt58: {
    marginTop: 58,
  },
  mt59: {
    marginTop: 59,
  },
  mt60: {
    marginTop: 60,
  },
  mt61: {
    marginTop: 61,
  },
  mt62: {
    marginTop: 62,
  },
  mt63: {
    marginTop: 63,
  },
  mt64: {
    marginTop: 64,
  },
  mt65: {
    marginTop: 65,
  },
  mt66: {
    marginTop: 66,
  },
  mt67: {
    marginTop: 67,
  },
  mt68: {
    marginTop: 68,
  },
  mt69: {
    marginTop: 69,
  },
  /**
   * margin bottom
   */
  mb01: {
    marginBottom: 1,
  },
  mb02: {
    marginBottom: 2,
  },
  mb03: {
    marginBottom: 3,
  },
  mb04: {
    marginBottom: 4,
  },
  mb05: {
    marginBottom: 5,
  },
  mb06: {
    marginBottom: 6,
  },
  mb07: {
    marginBottom: 7,
  },
  mb08: {
    marginBottom: 8,
  },
  mb09: {
    marginBottom: 9,
  },
  mb10: {
    marginBottom: 10,
  },
  mb11: {
    marginBottom: 11,
  },
  mb12: {
    marginBottom: 12,
  },
  mb13: {
    marginBottom: 13,
  },
  mb14: {
    marginBottom: 14,
  },
  mb15: {
    marginBottom: 15,
  },
  mb16: {
    marginBottom: 16,
  },
  mb17: {
    marginBottom: 17,
  },
  mb18: {
    marginBottom: 18,
  },
  mb19: {
    marginBottom: 19,
  },
  mb20: {
    marginBottom: 20,
  },
  mb21: {
    marginBottom: 21,
  },
  mb22: {
    marginBottom: 22,
  },
  mb23: {
    marginBottom: 23,
  },
  mb24: {
    marginBottom: 24,
  },
  mb25: {
    marginBottom: 25,
  },
  mb26: {
    marginBottom: 26,
  },
  mb27: {
    marginBottom: 27,
  },
  mb28: {
    marginBottom: 28,
  },
  mb29: {
    marginBottom: 29,
  },
  mb30: {
    marginBottom: 30,
  },
  mb31: {
    marginBottom: 31,
  },
  mb32: {
    marginBottom: 32,
  },
  mb33: {
    marginBottom: 33,
  },
  mb34: {
    marginBottom: 34,
  },
  mb35: {
    marginBottom: 35,
  },
  mb36: {
    marginBottom: 36,
  },
  mb37: {
    marginBottom: 37,
  },
  mb38: {
    marginBottom: 38,
  },
  mb39: {
    marginBottom: 39,
  },
  mb40: {
    marginBottom: 40,
  },
  mb41: {
    marginBottom: 41,
  },
  mb42: {
    marginBottom: 42,
  },
  mb43: {
    marginBottom: 43,
  },
  mb44: {
    marginBottom: 44,
  },
  mb45: {
    marginBottom: 45,
  },
  mb46: {
    marginBottom: 46,
  },
  mb47: {
    marginBottom: 47,
  },
  mb48: {
    marginBottom: 48,
  },
  mb49: {
    marginBottom: 49,
  },
  mb50: {
    marginBottom: 50,
  },
  mb51: {
    marginBottom: 51,
  },
  mb52: {
    marginBottom: 52,
  },
  mb53: {
    marginBottom: 53,
  },
  mb54: {
    marginBottom: 54,
  },
  mb55: {
    marginBottom: 55,
  },
  mb56: {
    marginBottom: 56,
  },
  mb57: {
    marginBottom: 57,
  },
  mb58: {
    marginBottom: 58,
  },
  mb59: {
    marginBottom: 59,
  },
  mb60: {
    marginBottom: 60,
  },
  mb61: {
    marginBottom: 61,
  },
  mb62: {
    marginBottom: 62,
  },
  mb63: {
    marginBottom: 63,
  },
  mb64: {
    marginBottom: 64,
  },
  mb65: {
    marginBottom: 65,
  },
  mb66: {
    marginBottom: 66,
  },
  mb67: {
    marginBottom: 67,
  },
  mb68: {
    marginBottom: 68,
  },
  mb69: {
    marginBottom: 69,
  },
  /**
   * margin left
   */
  ml01: {
    marginLeft: 1,
  },
  ml02: {
    marginLeft: 2,
  },
  ml03: {
    marginLeft: 3,
  },
  ml04: {
    marginLeft: 4,
  },
  ml05: {
    marginLeft: 5,
  },
  ml06: {
    marginLeft: 6,
  },
  ml07: {
    marginLeft: 7,
  },
  ml08: {
    marginLeft: 8,
  },
  ml09: {
    marginLeft: 9,
  },
  ml10: {
    marginLeft: 10,
  },
  ml11: {
    marginLeft: 11,
  },
  ml12: {
    marginLeft: 12,
  },
  ml13: {
    marginLeft: 13,
  },
  ml14: {
    marginLeft: 14,
  },
  ml15: {
    marginLeft: 15,
  },
  ml16: {
    marginLeft: 16,
  },
  ml17: {
    marginLeft: 17,
  },
  ml18: {
    marginLeft: 18,
  },
  ml19: {
    marginLeft: 19,
  },
  ml20: {
    marginLeft: 20,
  },
  ml21: {
    marginLeft: 21,
  },
  ml22: {
    marginLeft: 22,
  },
  ml23: {
    marginLeft: 23,
  },
  ml24: {
    marginLeft: 24,
  },
  ml25: {
    marginLeft: 25,
  },
  ml26: {
    marginLeft: 26,
  },
  ml27: {
    marginLeft: 27,
  },
  ml28: {
    marginLeft: 28,
  },
  ml29: {
    marginLeft: 29,
  },
  ml30: {
    marginLeft: 30,
  },
  ml31: {
    marginLeft: 31,
  },
  ml32: {
    marginLeft: 32,
  },
  ml33: {
    marginLeft: 33,
  },
  ml34: {
    marginLeft: 34,
  },
  ml35: {
    marginLeft: 35,
  },
  ml36: {
    marginLeft: 36,
  },
  ml37: {
    marginLeft: 37,
  },
  ml38: {
    marginLeft: 38,
  },
  ml39: {
    marginLeft: 39,
  },
  ml40: {
    marginLeft: 40,
  },
  ml41: {
    marginLeft: 41,
  },
  ml42: {
    marginLeft: 42,
  },
  ml43: {
    marginLeft: 43,
  },
  ml44: {
    marginLeft: 44,
  },
  ml45: {
    marginLeft: 45,
  },
  ml46: {
    marginLeft: 46,
  },
  ml47: {
    marginLeft: 47,
  },
  ml48: {
    marginLeft: 48,
  },
  ml49: {
    marginLeft: 49,
  },
  ml50: {
    marginLeft: 50,
  },
  ml51: {
    marginLeft: 51,
  },
  ml52: {
    marginLeft: 52,
  },
  ml53: {
    marginLeft: 53,
  },
  ml54: {
    marginLeft: 54,
  },
  ml55: {
    marginLeft: 55,
  },
  ml56: {
    marginLeft: 56,
  },
  ml57: {
    marginLeft: 57,
  },
  ml58: {
    marginLeft: 58,
  },
  ml59: {
    marginLeft: 59,
  },
  ml60: {
    marginLeft: 60,
  },
  ml61: {
    marginLeft: 61,
  },
  ml62: {
    marginLeft: 62,
  },
  ml63: {
    marginLeft: 63,
  },
  ml64: {
    marginLeft: 64,
  },
  ml65: {
    marginLeft: 65,
  },
  ml66: {
    marginLeft: 66,
  },
  ml67: {
    marginLeft: 67,
  },
  ml68: {
    marginLeft: 68,
  },
  ml69: {
    marginLeft: 69,
  },
  /**
   * margin right
   */
  mr01: {
    marginRight: 1,
  },
  mr02: {
    marginRight: 2,
  },
  mr03: {
    marginRight: 3,
  },
  mr04: {
    marginRight: 4,
  },
  mr05: {
    marginRight: 5,
  },
  mr06: {
    marginRight: 6,
  },
  mr07: {
    marginRight: 7,
  },
  mr08: {
    marginRight: 8,
  },
  mr09: {
    marginRight: 9,
  },
  mr10: {
    marginRight: 10,
  },
  mr11: {
    marginRight: 11,
  },
  mr12: {
    marginRight: 12,
  },
  mr13: {
    marginRight: 13,
  },
  mr14: {
    marginRight: 14,
  },
  mr15: {
    marginRight: 15,
  },
  mr16: {
    marginRight: 16,
  },
  mr17: {
    marginRight: 17,
  },
  mr18: {
    marginRight: 18,
  },
  mr19: {
    marginRight: 19,
  },
  mr20: {
    marginRight: 20,
  },
  mr21: {
    marginRight: 21,
  },
  mr22: {
    marginRight: 22,
  },
  mr23: {
    marginRight: 23,
  },
  mr24: {
    marginRight: 24,
  },
  mr25: {
    marginRight: 25,
  },
  mr26: {
    marginRight: 26,
  },
  mr27: {
    marginRight: 27,
  },
  mr28: {
    marginRight: 28,
  },
  mr29: {
    marginRight: 29,
  },
  mr30: {
    marginRight: 30,
  },
  mr31: {
    marginRight: 31,
  },
  mr32: {
    marginRight: 32,
  },
  mr33: {
    marginRight: 33,
  },
  mr34: {
    marginRight: 34,
  },
  mr35: {
    marginRight: 35,
  },
  mr36: {
    marginRight: 36,
  },
  mr37: {
    marginRight: 37,
  },
  mr38: {
    marginRight: 38,
  },
  mr39: {
    marginRight: 39,
  },
  mr40: {
    marginRight: 40,
  },
  mr41: {
    marginRight: 41,
  },
  mr42: {
    marginRight: 42,
  },
  mr43: {
    marginRight: 43,
  },
  mr44: {
    marginRight: 44,
  },
  mr45: {
    marginRight: 45,
  },
  mr46: {
    marginRight: 46,
  },
  mr47: {
    marginRight: 47,
  },
  mr48: {
    marginRight: 48,
  },
  mr49: {
    marginRight: 49,
  },
  mr50: {
    marginRight: 50,
  },
  mr51: {
    marginRight: 51,
  },
  mr52: {
    marginRight: 52,
  },
  mr53: {
    marginRight: 53,
  },
  mr54: {
    marginRight: 54,
  },
  mr55: {
    marginRight: 55,
  },
  mr56: {
    marginRight: 56,
  },
  mr57: {
    marginRight: 57,
  },
  mr58: {
    marginRight: 58,
  },
  mr59: {
    marginRight: 59,
  },
  mr60: {
    marginRight: 60,
  },
  mr61: {
    marginRight: 61,
  },
  mr62: {
    marginRight: 62,
  },
  mr63: {
    marginRight: 63,
  },
  mr64: {
    marginRight: 64,
  },
  mr65: {
    marginRight: 65,
  },
  mr66: {
    marginRight: 66,
  },
  mr67: {
    marginRight: 67,
  },
  mr68: {
    marginRight: 68,
  },
  mr69: {
    marginRight: 69,
  },
});
