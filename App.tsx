/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {LocalizationProvider} from 'assets/languages/Translations';
import LoadingComponent from 'components/Loading/LoadingComponent';
import LoadingManager from 'components/Loading/LoadingManager';
import NotificationConfig from 'components/NotificationConfig';
import {persistor, store} from 'middlewares/stores';
import RootApp from 'navigation';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import 'utils/string-utils';
import RootView from './src/RootView';

const App = () => {
  const loadingRef: any = React.useRef();
  React.useEffect(() => {
    loadingRef && LoadingManager.register(loadingRef);
    return () => {
      LoadingManager.unregister(loadingRef);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider>
          <RootView>
            <NotificationConfig>
              <MenuProvider>
                <RootApp />
                <FlashMessage style={{paddingTop: 20}} />
              </MenuProvider>
              <LoadingComponent ref={loadingRef} />
            </NotificationConfig>
          </RootView>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
