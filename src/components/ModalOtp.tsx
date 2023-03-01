import ModalComponent from 'components/Modal/ModalComponent';
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// import firebase from 'react-native-firebase';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import colors from 'res/colors';
import sizes from 'res/sizes';
const ModalOtp = ({
  isVisible,
  onBackdropPress,
  onVerifySuccess,
  phone,
  isSendOtp,
}) => {
  const unsubscribe = useRef();
  const inteval = useRef();
  const time = useRef(-941);
  const [otp, setOtp] = useState('');
  const [count, setCount] = useState(-941);
  const [result, setResult] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const onSendOtp = () => {
    auth()
      .signInWithPhoneNumber(phone.replace('0', '+84'))
      .then(confirmResult => {
        console.log('confirmResult: ', confirmResult);
        setOtp('');
        countDownTimer();
        setConfirmResult(confirmResult);
      })
      .catch(error => {
        countDownTimer();
        console.log('error: ', error);
      });
  };
  useEffect(() => {
    if (isSendOtp && phone) {
      unsubscribe.current = auth().onAuthStateChanged(user => {
        console.log('user: ', user);
        if (user) {
        } else {
          // User has been signed out, reset the state
        }
      });
      onSendOtp();
    }
    return () => {
      if (unsubscribe.current) unsubscribe.current();
      if (inteval.current) clearInterval(inteval.current);
      inteval.current = null;
      time.current = -941;
    };
  }, [isSendOtp]);
  const onContinue = async () => {
    if (confirmResult && otp.length == 6) {
      confirmResult
        .confirm(otp)
        .then(user => {
          onVerifySuccess && onVerifySuccess();
        })
        .catch(error => {
          console.log('error: ', error);
          if (error?.code == 'auth/invalid-verification-code') {
            setResult('Mã OTP không chính xác vui lòng nhập lại');
          }
        });
    }
  };
  const countDownTimer = () => {
    if (!inteval.current) {
      inteval.current = setInterval(() => {
        time.current -= 1000;

        setCount(moment(time.current).format('ss'));
      }, 1000);
    }
  };
  useEffect(() => {
    if (time.current && moment(time.current).format('ss') == '00') {
      inteval.current && clearInterval(inteval.current);
      time.current = -941;
      inteval.current = null;
      setCount('00');
    }
  }, [time.current]);
  return (
    <ModalComponent
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      backdropOpacity={0.5}
      animationInTiming={500}
      animationOutTiming={500}
      style={styles.modal}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : null}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.container}>
            <Text style={styles.txtTitle}>
              Nhập mã OTP gửi về thiết bị của bạn
            </Text>
            <View style={styles.containerInputOtp}>
              <TextInput
                maxLength={6}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                style={styles.input}
              />
              <TouchableOpacity
                disabled={count != '00'}
                onPress={onSendOtp}
                style={styles.buttonReSend}>
                <Text style={styles.txtResend}>Gửi lại</Text>
                {count && count != '00' && count != -941 ? (
                  <Text style={{fontSize: sizes._14sdp}}>({count})</Text>
                ) : null}
              </TouchableOpacity>
            </View>
            {result ? (
              <Text style={{color: colors.red, fontSize: sizes._16sdp}}>
                {result}
              </Text>
            ) : null}
            <View style={styles.row}>
              <TouchableOpacity
                onPress={onContinue}
                disabled={otp.length !== 6}
                style={[
                  styles.buttonContinue,
                  otp.length == 6 ? {} : {backgroundColor: colors.gainsboro},
                ]}>
                <Text
                  style={[
                    styles.txtContinue,
                    otp.length == 6 ? {} : {color: '#00000050'},
                  ]}>
                  Tiếp tục
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onBackdropPress}
                style={[
                  styles.buttonContinue,
                  {backgroundColor: colors.gray, marginLeft: 10},
                ]}>
                <Text style={[styles.txtContinue]}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ModalComponent>
  );
};

export default ModalOtp;

const styles = StyleSheet.create({
  txtResend: {
    color: colors.text,
    fontSize: sizes._14sdp,
  },
  containerInputOtp: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonReSend: {
    paddingLeft: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContinue: {
    fontSize: sizes._16sdp,
    fontWeight: 'bold',
    color: colors.white,
  },
  buttonContinue: {
    backgroundColor: colors.default,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    borderColor: colors.text,
    borderWidth: 1,
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: sizes._16sdp,
    flex: 1,
    backgroundColor: '#6495ed20',
  },
  txtTitle: {
    color: colors.text,
    fontSize: sizes._16sdp,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 30,
    paddingBottom: 70,
    paddingTop: 20,
  },
  modal: {
    marginHorizontal: 0,
    marginBottom: 0,
  },
});
