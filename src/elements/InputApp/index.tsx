import {useTheme} from 'configs/ChangeTheme';
import Text from 'elements/Text';
// import TextInput from 'elements/TextInput';
import {FormikErrors, FormikTouched, FormikValues} from 'formik';
import React, {
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextInput,
  ColorValue,
  View,
  TextInputProps,
  LayoutChangeEvent,
  TextStyle,
} from 'react-native';
import colors from 'res/colors';
import Theme from 'res/style/Theme';
import _ from 'lodash';
import scale from 'utils/scale';
import {useScroll} from 'components/Scroll/ScrollWrapper';
interface InputAppProps {
  value: string;
  onChangeText?: (text: string) => void | Dispatch<SetStateAction<string>>;
  placeholder?: string;
  isShowIcon?: boolean;
  icon?: any;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  styleView?: ViewStyle;
  title: string;
  colorTitle?: string;
  borderColor?: string;
  iconPress?: () => void;
  autoFocus?: boolean;
  isShowIconLeft?: boolean;
  iconLeft?: any;
  iconPressLeft?: () => void;
  marginTop?: number;
  multiline?: boolean;
  editable?: boolean;
  onPress?: () => void;
  styleInput?: TextStyle;
  errors?: FormikErrors<FormikValues>;
  touched?: FormikTouched<FormikValues>;
  name?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  isRequired?: boolean;

  onFocus?: () => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  onEndEditing?: () => void;
  onSelectionChange?: () => void;
  iconStyle?: ViewStyle;
  backgroundColor?: ColorValue | string;
  color?: ColorValue;
}

const InputApp = memo(
  ({
    value,
    placeholder,
    onChangeText,
    isShowIcon,
    icon,
    secureTextEntry,
    style,
    styleView,
    title,
    colorTitle,
    borderColor,
    iconPress,
    autoFocus,
    isShowIconLeft,
    iconLeft,
    iconPressLeft,
    marginTop,
    editable = true,
    onPress,
    styleInput,
    errors,
    touched,
    name,
    keyboardType,
    maxLength,
    isRequired,
    onSubmitEditing,
    onEndEditing,
    onSelectionChange,
    iconStyle,
    backgroundColor,
    onFocus,
    onBlur,
    color,
    ...props
  }: InputAppProps) => {
    const inputRef = useRef<any>();
    const [isFocus, setIsFocus] = useState(false);
    let lineHeight;
    if (props.multiline) {
      lineHeight = 24;
    }
    let height;
    let errorName = _.get(errors, name || '');
    let touchedName = _.get(touched, name || '');
    const {theme} = useTheme();
    const focus = () => {
      setIsFocus(true);
      onFocus && onFocus();
    };
    const blur = () => {
      setIsFocus(false);
      onBlur && onBlur();
    };
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.setNativeProps({
          style: {fontFamily: 'Inter-SemiBold'},
        });
      }
    }, [secureTextEntry]);
    const {scrollTracker} = useScroll();
    const onLayout = (event: LayoutChangeEvent) => {
      if (!!name && scrollTracker) {
        scrollTracker(event.target, name);
      }
    };
    return (
      <View onLayout={onLayout}>
        <TouchableOpacity
          style={[
            styles.containerInput,
            {
              marginTop: marginTop,
              backgroundColor,
            },
            !!isFocus && styles.borderFocus,
            !!errorName && touchedName && styles.borderError,
            styleView,
          ]}
          onPress={onPress}
          disabled={!onPress}
          activeOpacity={0.7}>
          <View style={Theme.flex1}>
            <Text size={12} lineHeight={18} color={colors.gray}>
              {title} {isRequired && <Text color={colors.Red}>*</Text>}
            </Text>
            <View style={[styles.container, props.multiline && styles.muli]}>
              {!!isShowIconLeft && !!iconLeft && (
                <TouchableOpacity
                  style={styles.iconLeftView}
                  onPress={iconPressLeft}
                  disabled={!iconPressLeft}>
                  {iconLeft}
                </TouchableOpacity>
              )}
              {editable && !onPress ? (
                <TextInput
                  numberOfLines={1}
                  placeholder={placeholder}
                  value={value}
                  onChangeText={onChangeText}
                  onFocus={focus}
                  onBlur={blur}
                  ref={inputRef}
                  onSubmitEditing={onSubmitEditing}
                  onEndEditing={onEndEditing}
                  onSelectionChange={onSelectionChange}
                  style={[
                    styles.textInput,
                    {
                      lineHeight: lineHeight,
                      color: theme.text,
                    },
                    styleInput,
                  ]}
                  secureTextEntry={secureTextEntry}
                  editable={editable}
                  keyboardType={keyboardType}
                  placeholderTextColor={colors.GrayBlue}
                  autoFocus={autoFocus}
                  maxLength={maxLength}
                  {...props}
                />
              ) : (
                <Text
                  size={15}
                  lineHeight={24}
                  text_placeholder={!value}
                  semiBold
                  style={[
                    styles.textPlace,
                    {
                      lineHeight: lineHeight,
                    },
                    styleInput,
                  ]}>
                  {value || placeholder}
                </Text>
              )}
            </View>
          </View>
          {isShowIcon && !!icon && (
            <TouchableOpacity
              style={[styles.iconView, iconStyle]}
              onPress={iconPress}
              disabled={!iconPress}>
              {icon}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        {!!errorName && touchedName && (
          <Text size={12} marginTop={5} color={colors.Red}>
            {errorName}
          </Text>
        )}
      </View>
    );
  },
);

export default InputApp;

const styles = StyleSheet.create({
  textPlace: {
    flex: 1,
    fontSize: scale(14),
    paddingVertical: 8,
    height: '100%',
  },
  borderFocus: {
    borderColor: colors.borderFocus,
  },
  containerInput: {
    borderColor: colors.border,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    paddingBottom: 0,
    marginBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderError: {
    borderColor: colors.Red,
  },
  container2: {},
  container: {
    justifyContent: 'center',
    paddingRight: 16,
    ...Theme.flexRow,
  },
  iconView: {
    width: 24,
    height: 24,
    paddingBottom: 6,
    ...Theme.center,
  },
  iconLeftView: {
    width: 24,
    height: 24,
    ...Theme.center,
    marginRight: 16,
  },
  muli: {
    paddingBottom: 16,
  },
  textInput: {
    flex: 1,
    fontSize: scale(14),
    lineHeight: 24,
    paddingVertical: 8,
    height: '100%',
    color: colors.text,
  },
});
