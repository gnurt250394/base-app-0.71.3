import React, {useCallback, useContext, useMemo, useState} from 'react';
import {ColorValue, StatusBar} from 'react-native';
import colors from 'res/colors';

export type TMode = 'dark' | 'light';

export interface ITheme {
  background: ColorValue | string;
  backgroundItem: ColorValue | string;
  text: ColorValue | string;
  text_placeholder: ColorValue | string;
  // placeholder: ColorValue | string;
  borderColor: ColorValue | string;
  activeBackgroundColor: ColorValue | string;
  inactiveBackgroundColor: ColorValue | string;
  activeTincolor: ColorValue | string;
  disabled: ColorValue | string;
}
export interface IThemeContext {
  theme: ITheme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const themes = {
  dark: {
    background: colors.Dark,
    backgroundItem: colors.Beluga,
    text: colors.WhiteText,
    text_placeholder: colors.Placeholder,
    activeBackgroundColor: colors.TealBlue,
    activeTincolor: colors.WhiteSmoke,
    inactiveBackgroundColor: colors.Platinum,
    borderColor: colors.BorderColor,
    disabled: colors.WhiteText,
  },
  light: {
    background: colors.Snow,
    backgroundItem: colors.White,
    text: colors.DarkJungleGreen,
    text_placeholder: colors.Platinum,
    activeTincolor: colors.Dark,
    inactiveBackgroundColor: colors.DarkJungleGreen,
    activeBackgroundColor: colors.TealBlue,
    borderColor: colors.Platinum,
    disabled: colors.WhiteText,
  },
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => {},
});

export const useTheme = (): IThemeContext => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return {
    theme,
    toggleTheme,
  };
};
const ThemeProvider = ({children}: ThemeProviderProps) => {
  const [mode, setMode] = useState<TMode>('dark');

  const toggleTheme = useCallback(() => {
    setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(
    () => (mode === 'light' ? themes.dark : themes.light),
    [mode],
  );
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeProvider;
