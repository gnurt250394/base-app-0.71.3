import {InternetConnection} from 'components/InternetConnection';
import UpdateApp from 'components/UpdateApp';
import React, {ReactNode} from 'react';
import {LogBox, StatusBar, StyleSheet, View} from 'react-native';
import colors from 'res/colors';
import * as Sentry from '@sentry/react-native';
LogBox.ignoreLogs(['Remote debugger']);
if (!__DEV__) {
  Sentry.init({
    dsn: 'https://6621084d766042f9a360bc90d475b728@o306136.ingest.sentry.io/5997313',
  });
}
interface Props {
  children?: ReactNode;
}
const RootView = ({children}: Props) => {
  return (
    <View style={[styles.container]}>
      {!__DEV__ && <UpdateApp />}
      {children}
      {/* <PushController /> */}
      <InternetConnection />
    </View>
  );
};

export default RootView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
