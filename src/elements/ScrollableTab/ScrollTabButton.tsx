import { useTheme } from 'configs/ChangeTheme';
import Container from 'elements/Layout/Container';
import Text from 'elements/Text';
import React, { memo, useCallback } from 'react';
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import colors from 'res/colors';

interface Props {
  index?: number;
  title: string;
  focus?: boolean;
  onPressTab?: (index?: number) => void;
  onLayout?: (event: any) => void;
  onScrollTo?: (event: any, isPress?: boolean) => void;
  labelStyle?: TextStyle;
}

const ScrollTabButton = memo(
  ({
    title,
    focus,
    onPressTab,
    index,
    onLayout,
    onScrollTo,
    labelStyle,
  }: Props) => {
    const onPress = useCallback(() => {
      onPressTab && onPressTab(index);
      onScrollTo && onScrollTo(index, true);
    }, [index, onPressTab, onScrollTo]);
    const {theme} = useTheme();
    return (
      <TouchableOpacity
        activeOpacity={0.54}
        style={[styles.button, {backgroundColor: theme.background}]}
        {...{onLayout, onPress}}>
        <Text
          color={theme.text}
          bold
          style={labelStyle && labelStyle}
          size={24}
          lineHeight={28}>
          {title}
        </Text>
        {focus && (
          <Container
            style={{...styles.underLine, backgroundColor: theme.text}}
          />
        )}
      </TouchableOpacity>
    );
  },
);

export default ScrollTabButton;

const styles = StyleSheet.create({
  button: {
    marginRight: 40,
    justifyContent: 'center',
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  focus: {
    backgroundColor: colors.TealBlue,
  },
  underLine: {
    width: 24,
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
