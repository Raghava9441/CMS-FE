import React from 'react';
import { Button } from '@mui/material';
import { useThemeContext } from './ThemeContextProvider';

const ThemeControlPanel: React.FC = () => {
    const { toggleThemeMode, setCustomColors, themeOptions } = useThemeContext();

    return (
        <div>
            <Button onClick={toggleThemeMode}>
                Toggle {themeOptions.mode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>

            <Button
                onClick={() => setCustomColors({ primary: '#FF0000', secondary: '#00FF00' })}
            >
                Set Custom Red/Green Theme
            </Button>

            <Button
                onClick={() => setCustomColors({ primary: '#3366FF', secondary: '#FFC107' })}
            >
                Set Default Blue/Yellow Theme
            </Button>
        </div>
    );
};

export default ThemeControlPanel;
