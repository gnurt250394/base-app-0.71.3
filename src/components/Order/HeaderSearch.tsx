import DateTimePicker from 'components/DateTimePicker/DateTimePicker';
import CustomMenu from 'components/Menu/CustomMenu';
import {width} from 'configs/Const';
import {DataStatus} from 'configs/Data';
import ButtonText from 'elements/Buttons/ButtonText';
import Image from 'elements/Image';
import InputApp from 'elements/InputApp';
import Switch from 'elements/Switch';
import Text from 'elements/Text';
import TextInput from 'elements/TextInput';
import useModal from 'hooks/useModal';
import * as React from 'react';
import {memo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';
import scale from 'utils/scale';

export interface SearchProps {
  code?: string;
  dateStart?: string;
  dateEnd?: string;
  status?: string;
}
interface HeaderSearchProps {
  onSearch: (data: SearchProps) => void;
  isLoading?: boolean;
}

const HeaderSearch = (props: HeaderSearchProps) => {
  const [visible, open, close] = useModal();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');
  const [dateStart, setStartDate] = useState('');
  const [dateEnd, setEndDate] = useState('');
  const [isVisibleDateStart, openDateStart, closeDateStart] = useModal();
  const [isVisibleDateEnd, openDateEnd, closeDateEnd] = useModal();

  const _onSearch = () => {
    props.onSearch && props.onSearch({code, status, dateStart, dateEnd});
  };
  return (
    <View>
      <View style={[Theme.flexRow]}>
        <Switch
          enable={visible}
          onPress={() => (!visible ? open() : close())}
          backgroundActive={colors.horver}
          backgroundInactive={colors.border}
          circleActiveColor={colors.primary}
          circleInActiveColor={colors.gray}
        />
        <Text
          semiBold
          size={14}
          lineHeight={24}
          color={colors.Black}
          marginLeft={12}>
          Bộ lọc thông tin
        </Text>
      </View>
      {!!visible && (
        <View
          style={{
            backgroundColor: colors.lightGray,
            padding: 10,
            marginTop: 10,
            borderRadius: 16,
          }}>
          <InputApp
            value={code}
            onChangeText={setCode}
            title={'Mã đơn hàng'}
            icon={<Image source={images.ic_close} />}
            isShowIcon={!!code}
            placeholder="OH-xxxxxx"
            iconPress={() => setCode('')}
            styleView={{backgroundColor: colors.White}}
          />
          <View style={{paddingTop: 10}}>
            <Text
              size={14}
              lineHeight={24}
              color={colors.gray}
              marginBottom={6}>
              Trạng thái đơn hàng
            </Text>
            <CustomMenu
              popover
              optionsContainerStyle={{width: width - (scale(16) * 2 + 20)}}
              MenuSelectOption={
                <TextInput
                  value={status}
                  editable={false}
                  placeholder={'Chọn trạng thái'}
                  icon={
                    status ? (
                      <Image source={images.ic_close} />
                    ) : (
                      <Image source={images.ic_dropdown} />
                    )
                  }
                  iconPress={() => !!status && setStatus('')}
                  isShowIcon
                  style={{height: 60, backgroundColor: colors.White}}
                />
              }
              onSelected={(item, index) => {
                console.log('item: ', item);
                setStatus(item.value);
              }}
              options={DataStatus}
            />
          </View>
          <InputApp
            title={'Từ ngày'}
            value={dateStart}
            onPress={openDateStart}
            styleView={{backgroundColor: colors.White}}
            iconPress={() => !!dateStart && setStartDate('')}
            marginTop={10}
            icon={
              dateStart ? (
                <Image source={images.ic_close} />
              ) : (
                <Image source={images.ic_calendar} />
              )
            }
            isShowIcon
          />
          <InputApp
            value={dateEnd}
            marginTop={10}
            onPress={openDateEnd}
            styleView={{backgroundColor: colors.White}}
            title={'Đến ngày'}
            iconPress={() => !!dateEnd && setEndDate('')}
            icon={
              dateEnd ? (
                <Image source={images.ic_close} />
              ) : (
                <Image source={images.ic_calendar} />
              )
            }
            isShowIcon
          />
          <ButtonText
            title={'Tìm kiếm'}
            isLoading={props?.isLoading}
            onPress={_onSearch}
            backgroundColor={colors.primary}
            titleColor={colors.White}
            textProps={{
              semiBold: true,
              size: 16,
              lineHeight: 26,
            }}
            style={{marginTop: 13}}
          />
        </View>
      )}
      <DateTimePicker
        onPressClose={(date, dateString) => {
          setStartDate(dateString);
        }}
        format={'DD/MM/YYYY'}
        value={dateStart}
        maximumDate={new Date()}
        visible={isVisibleDateStart}
        onCloseModal={closeDateStart}
      />
      <DateTimePicker
        value={dateEnd}
        format={'DD/MM/YYYY'}
        minimumDate={new Date(dateStart)}
        visible={isVisibleDateEnd}
        onCloseModal={closeDateEnd}
        onPressClose={(date, dateString) => {
          setEndDate(dateString);
        }}
      />
    </View>
  );
};

export default HeaderSearch;

const styles = StyleSheet.create({
  container: {},
});
