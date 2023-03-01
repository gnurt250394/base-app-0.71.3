import {useTheme} from 'configs/ChangeTheme';
import Image from 'elements/Image';
import React, {Dispatch, memo, SetStateAction} from 'react';
import {ColorValue, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import colors from 'res/colors';
import images from 'res/images';
import Theme from 'res/style/Theme';

interface SearchBoxProps {
  value?: string;
  onChangeText?: (text: string) => void | Dispatch<SetStateAction<string>>;
  placeholder: string;
  borderColor?: ColorValue | string;
  backgroundColor?: string;
  style?: ViewStyle;
  onSubmitEditing?: () => void;
  shadow?: boolean;
  autoFocus?: boolean;
  marginTop?: number;
}

const SearchBox = memo(
  ({
    value,
    onChangeText,
    onSubmitEditing,
    placeholder,
    borderColor,
    style,
    marginTop,
    backgroundColor,
    shadow = true,
    ...props
  }: SearchBoxProps) => {
    const {theme} = useTheme();
    return (
      <View
        style={[
          styles.container,
          style && style,
          shadow && Theme.shadow,
          {borderColor: borderColor ? borderColor : theme.borderColor},
          {backgroundColor: theme.backgroundItem},
          {marginTop: marginTop},
        ]}>
        <Image source={images.ic_search_normal} />
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={colors.GrayBlue}
          style={[styles.input, {color: theme.text}]}
          value={value}
          returnKeyType={'search'}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
      </View>
    );
  },
);

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    ...Theme.flexRow,
    minHeight: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  input: {
    fontSize: 13,
    lineHeight: 16,
    flex: 1,
    marginLeft: 16,
  },
});
