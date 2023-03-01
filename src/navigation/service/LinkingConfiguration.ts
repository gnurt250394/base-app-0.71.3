// import * as Linking from 'expo-linking';

import {Linking} from 'react-native';
import {Routes} from 'configs';

export default {
  prefixes: ['payment://'],
  async getInitialURL() {
    // First, you would need to get the initial URL from your third-party integration
    // The exact usage depend on the third-party SDK you use
    // For example, to get to get the initial URL for Firebase Dynamic Links:

    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();
    console.log('-> url', url);

    return url;
  },
  config: {
    screens: {
      [Routes.OrderScreen]: 'order',
      NotFound: '*',
    },
  },
};
