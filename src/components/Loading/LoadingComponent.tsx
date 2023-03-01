import React, {Component} from 'react';
import {View, Text, ActivityIndicator, Modal, StyleSheet} from 'react-native';
import LoadingManager from './LoadingManager';

import Spinner from 'react-native-loading-spinner-overlay';
import colors from 'res/colors';
const TIMEOUT = 10000;
export function showLoading(textLoading?: string) {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.showLoading(textLoading);
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}
interface Props {}
interface State {
  visible: boolean;
}
class LoadingComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showLoading = () => {
    this.setState({visible: true}, () => {
      // setTimeout(() => {
      //   this.setState({visible: false});
      // }, TIMEOUT);
    });
  };

  hideLoading = () => {
    this.setState({visible: false});
  };
  render() {
    return (
      <Spinner
        visible={this.state.visible}
        textContent={''}
        color={colors.Red}
        textStyle={styles.spinnerTextStyle}
      />
    );
  }
}

export default LoadingComponent;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.default,
  },
  txtPercent: {
    color: colors.default,
    fontWeight: 'bold',
  },
});
