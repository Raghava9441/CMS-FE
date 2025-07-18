import { IconButton, Box } from '@mui/material';
import { Settings as SettingsIcon, Close as CloseIcon } from '@mui/icons-material';
import { useContext } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';

export default function SettingsButton({ handleTogglePanel, isPanelOpen }: { handleTogglePanel: () => void; isPanelOpen: boolean }) {
    const { themeDirection } = useContext(SettingsContext);

    const buttonStyles = {
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        // transition: 'left 0.3s ease, right 0.3s ease',
        zIndex: 1201,
        left: themeDirection === 'ltr' ? (isPanelOpen ? '290px' : '-7px') : 'unset',
        right: themeDirection === 'rtl' ? (isPanelOpen ? '300px' : '0') : 'unset',
    };

    return (
        <Box
            sx={buttonStyles}
        >
            <IconButton
                color="primary"
                onClick={handleTogglePanel}
                sx={{
                    borderRadius: '50%',
                    backgroundColor: 'background.paper',
                    boxShadow: 3,
                }}
            >
                {isPanelOpen ? (
                    <CloseIcon />
                ) : (
                    <SettingsIcon
                        sx={{
                            '@keyframes spin': {
                                '0%': { transform: 'rotate(0deg)' },
                                '100%': { transform: 'rotate(360deg)' },
                            },
                            animation: 'spin 1.5s linear infinite',
                        }}
                    />
                )}
            </IconButton>
        </Box>
    );
}
