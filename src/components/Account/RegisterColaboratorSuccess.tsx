import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import Text from 'elements/Text';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import colors from 'res/colors';
import images from 'res/images';
import scale from 'utils/scale';

interface RegisterColaboratorSuccessProps {
  close: () => void;
}

const RegisterColaboratorSuccess = (props: RegisterColaboratorSuccessProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 30,
          backgroundColor: colors.pinkOpacity,
          alignSelf: 'center',
          borderRadius: 1000,
          marginTop: scale(60),
        }}>
        <Image source={images.ic_register_colaborator_success} />
      </View>
      <Text
        size={16}
        lineHeight={26}
        color={colors.gray}
        center
        style={{paddingHorizontal: scale(40)}}>
        Tài khoản của bạn đang được xét duyệt để trở thành cộng tác viên
      </Text>
      <ButtonText
        onPress={props.close}
        title={'Đóng'}
        style={styles.buttonClose}
      />
    </View>
  );
};

export default RegisterColaboratorSuccess;

const styles = StyleSheet.create({
  buttonClose: {
    borderColor: colors.primary,
    height: scale(58),
    marginBottom: getBottomSpace(),
    marginHorizontal: 14,
    marginTop: scale(69),
  },
  container: {},
});
