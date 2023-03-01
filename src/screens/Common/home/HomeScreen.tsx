import {
  SECTIONS_QUERY,
  useAdvertisementProducts,
} from 'apollo/query/ApiGetAdvertisementProducts';
import Category from 'components/Home/Category';
import HotDeals from 'components/Home/HotDeals';
import Swiper from 'components/Home/Swiper';
import ButtonIconHeader from 'elements/Buttons/ButtonIconHeader';
import Image from 'elements/Image';
import Container from 'elements/Layout/Container';
import API from 'network/request';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import images from 'res/images';
import Theme from 'res/style/Theme';
import {gql, useQuery} from '@apollo/client';
import {useCheckAuth} from 'apollo/query/ApiAuth';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from 'middlewares/reducers';
import {
  onLogout,
  onSaveDataUser,
  onSaveTime,
} from 'middlewares/actions/auth/actionLogin';
import ModalBase from 'components/ModalBase';
import SwiperPopup from 'components/Home/SwiperPopup';
import useModalAnimation from 'hooks/useModalAnimation';

interface HomeScreenProps {}

const HomeScreen = (props: HomeScreenProps) => {
  const userProfile = useSelector((state: RootReducer) => state.userProfile);
  console.log('userProfile: ', userProfile);
  const dataAuth = useCheckAuth(userProfile?.loginToken);
  const [isVisible, open, close] = useModalAnimation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !userProfile?.timeShowPopup ||
      (userProfile?.timeShowPopup &&
        new Date(userProfile?.timeShowPopup).compareDate(new Date()) < 0)
    ) {
      dispatch(onSaveTime(new Date().getTime()));
      open();
    }
  }, []);
  useEffect(() => {
    if (dataAuth?.checkAuth?.success) {
      dispatch(
        onSaveDataUser(
          dataAuth?.checkAuth?.user,
          dataAuth?.checkAuth?.token,
          dataAuth?.checkAuth?.role?.name,
        ),
      );
    } else if (dataAuth?.checkAuth?.success == false) {
      dispatch(onLogout());
    }
  }, [dataAuth, dispatch]);

  return (
    <Container
      buttonLeft={<Image source={images.ic_logo_app} />}
      style={styles.container}>
      <HotDeals
        renderHeader={() => (
          <View style={Theme.flex1}>
            <Swiper />
            <Category />
          </View>
        )}
      />
      <ModalBase isVisibleModal={isVisible} onCloseModal={close}>
        <SwiperPopup onClose={close} />
      </ModalBase>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
