import React, { createContext, useContext } from "react";
import { Theme } from "themes/interfaces";
import { Dark, Light } from "themes";
import { HObject } from "helpers";

type ThemeProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeProps>({
  theme: Light,
  setTheme: () => {},
  toggleTheme: () => {},
});

interface Props {
  initTheme: Theme;
  children?: React.ReactNode;
}

export const ThemeProvider = React.memo<Props>(
  ({ initTheme, children }: Props) => {
    const [theme, setTheme] = React.useState<Theme>(initTheme);

    const setThemeCallback = React.useCallback((newTheme: Theme) => {
      setTheme((currentTheme: Theme) =>
        HObject.deepInterpolation(currentTheme, newTheme)
      );
    }, []);

    const toggleThemeCallback = React.useCallback(() => {
      setTheme((currentTheme: Theme) =>
        currentTheme.id === Dark.id ? Light : Dark
      );
    }, []);

    const MemoizedValue = React.useMemo(() => {
      const value: ThemeProps = {
        theme,
        setTheme: setThemeCallback,
        toggleTheme: toggleThemeCallback,
      };
      return value;
    }, [theme, setThemeCallback, toggleThemeCallback]);

    return (
      <ThemeContext.Provider value={MemoizedValue}>
        {children}
      </ThemeContext.Provider>
    );
  }
);

export const useTheme = () => useContext(ThemeContext);
