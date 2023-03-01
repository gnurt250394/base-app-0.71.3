import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  imageMaker: {
    resizeMode: 'center',
  },
  txtAppName2: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
  },
  txtAppName: {
    fontSize: 60,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerMaker: {
    // Transparent background because mask is based off alpha channel.
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
