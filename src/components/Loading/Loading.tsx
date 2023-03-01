import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import colors from 'res/colors';

interface Props {}
interface State {
  visible: boolean;
}
class Loading extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  render() {
    return (
      <Spinner
        visible={true}
        textContent={''}
        color={colors.primary}
        textStyle={styles.spinnerTextStyle}
      />
    );
  }
}

export default Loading;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.Beluga,
  },
  txtPercent: {
    color: colors.Beluga,
    fontWeight: 'bold',
  },
});
