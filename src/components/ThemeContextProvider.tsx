import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import palette from '../theme/palette';
import { zhCN } from '@mui/material/locale';

type CustomThemeOptions = {
    mode: 'light' | 'dark';
    primary: string;
    secondary: string;
};

type ThemeContextType = {
    toggleThemeMode: () => void;
    setCustomColors: (colors: Partial<CustomThemeOptions>) => void;
    themeOptions: CustomThemeOptions;
};

const defaultThemeOptions: CustomThemeOptions = {
    mode: 'light', // Default to light mode
    primary: palette.light.primary.main,
    secondary: palette.light.secondary.main,
};

const ThemeContext = createContext<ThemeContextType>({
    toggleThemeMode: () => { },
    setCustomColors: () => { },
    themeOptions: defaultThemeOptions,
});

export const useThemeContext = () => useContext(ThemeContext);

const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [themeOptions, setThemeOptions] = useState<CustomThemeOptions>(defaultThemeOptions);

    const theme = createTheme({
        palette: {
            mode: themeOptions.mode,
            ...(themeOptions.mode === 'light' ? palette.light : palette.dark),
            primary: {
                main: themeOptions.primary,
            },
            secondary: {
                main: themeOptions.secondary,
            },
        },
    }, zhCN);

    const toggleThemeMode = () => {
        setThemeOptions(prevOptions => ({
            ...prevOptions,
            mode: prevOptions.mode === 'light' ? 'dark' : 'light',
            primary: prevOptions.mode === 'light' ? palette.dark.primary.main : palette.light.primary.main,
            secondary: prevOptions.mode === 'light' ? palette.dark.secondary.main : palette.light.secondary.main,
        }));
    };

    const setCustomColors = (colors: Partial<CustomThemeOptions>) => {
        setThemeOptions(prevOptions => ({
            ...prevOptions,
            ...colors,
        }));
    };

    return (
        <ThemeContext.Provider value={{ toggleThemeMode, setCustomColors, themeOptions }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
