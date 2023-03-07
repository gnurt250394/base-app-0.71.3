import BottomModal from 'components/ModalBase/ModalBottom';
import ButtonLinear from 'elements/Buttons/ButtonLinear';
import Text from 'elements/Text';
import useModal from 'hooks/useModal';
import moment from 'moment';
import React, {
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useState,
  Ref,
} from 'react';
import {StyleSheet, View} from 'react-native';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
import colors from 'res/colors';
import sizes from 'res/sizes';
import strings from 'res/strings';
// import { formatDateDDMMYYYY, formatDateDD_MM_YY } from 'utils/DateTimeUtils';

type TimeType = 'date' | 'time' | 'datetime';
interface Props {
  title?: string;
  value?: string;
  type?: TimeType;
  onPressClose?: (date: Date, dateString: string) => void;
  visible: boolean;
  onCloseModal?: () => void;
  format?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}
export interface RefDatePickerProps {
  showModal: () => void;
}
const DateTimePicker = React.memo(
  forwardRef((props: Props, ref: Ref<RefDatePickerProps>) => {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
      if (props.value) {
        setDate(moment(props.value, props.format || 'DD/MM/YYYY').toDate());
      }
    }, [props.value]);

    const onPressClose = () => {
      if (props.onPressClose) {
        props.onPressClose(
          date,
          moment(date).format(props.format || 'DD/MM/YYYY'),
        );
      }
      props.onCloseModal && props.onCloseModal();
    };

    var renderDatePicker = useCallback(() => {
      return (
        <View style={modalDatePicker.containerDate}>
          <Text bold center hilight size={17}>
            {props.title ?? 'Chọn ngày'}
          </Text>
          <DatePicker
            date={date}
            onDateChange={setDate}
            mode={props.type || 'date'}
            style={modalDatePicker.datePicker}
            locale="vi"
            minimumDate={props.minimumDate}
            maximumDate={props.maximumDate}
          />
          <ButtonLinear
            onPress={onPressClose}
            title={'Cập nhật'}
            white
            colors={[colors.primary, colors.primary]}
            style={modalDatePicker.styleButton}
          />
        </View>
      );
    }, [date]);

    return (
      <BottomModal
        isVisibleModal={props.visible}
        onCloseModal={props.onCloseModal}>
        {renderDatePicker()}
      </BottomModal>
    );
  }),
);

export default DateTimePicker;

const modalDatePicker = StyleSheet.create({
  containerDate: {
    paddingVertical: sizes._20sdp,
    backgroundColor: colors.White,
    borderRadius: 10,
  },
  styleButton: {
    backgroundColor: colors.primary,
    margin: sizes._10sdp,
    paddingVertical: sizes._10sdp,
    paddingHorizontal: sizes._40sdp,
    alignSelf: 'center',
    height: 'auto',
  },
  textButton: {
    color: colors.White,
    fontWeight: '600',
    fontSize: sizes._font_size_17,
  },
  textTitle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: sizes._19sdp,
    lineHeight: sizes._23sdp,
  },
  datePicker: {
    alignSelf: 'center',
    height: sizes._210sdp,
    paddingVertical: sizes._30sdp,
  },
});
