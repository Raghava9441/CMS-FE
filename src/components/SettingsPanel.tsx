import { useContext, useEffect, useState } from 'react';
import { Box, Button, Divider, useTheme } from '@mui/material';
import { SettingsContext } from '../contexts/SettingsContext';
import useOutsideClick from '../hooks/useOutsideClick';
import './SettingsPanel.css';
import SettingsButton from './SettingsButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import { Close as CloseIcon, ColorLens } from '@mui/icons-material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';


export default function SettingsPanel() {
    const {
        themeMode,
        themeColor,
        themeDirection,
        onChangeMode,
        onChangeDirection,
        onChangeColor,
    } = useContext(SettingsContext);
    const theme = useTheme();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

    const panelRef = useOutsideClick(() => {
        setIsPanelOpen(false);
    });

    const handleTogglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);


    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleThemeChange = (mode: string) => {
        onChangeMode({ target: { value: mode } });
    };

    const handleDirectionChange = (direction: string) => {
        onChangeDirection({ target: { value: direction } });
    };

    return (
        <>
            <SettingsButton handleTogglePanel={handleTogglePanel} isPanelOpen={isPanelOpen} />
            <Box sx={{ backgroundColor: 'background.paper' }}>
                <Box
                    ref={panelRef}
                    className={
                        `settingsPanel ${themeMode === 'dark' ? "dark" : "light"}  ${(isPanelOpen && themeDirection === 'ltr') ? 'settingsPanelOpen' : 'settingsPanelClosedR'}`}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        padding: 2,
                        [themeDirection === 'ltr' ? 'left' : 'right']: isPanelOpen ? '0' : themeDirection === 'ltr' ? '-300px' : '-600px',
                        transition: 'left 0.3s ease, right 0.3s ease',
                        height: '100%',
                        width: '300px',
                        boxShadow: 3,
                        overflow: 'auto',
                        zIndex: theme.zIndex.drawer + 1,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ paddingY: 2 }}>Settings</Box>
                        <IconButton onClick={handleTogglePanel}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Divider />

                    <Box sx={{ paddingY: 2 }}> Mode</Box>
                    <Box sx={{ backgroundColor: 'background.paper', mb: 2, display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Box
                            onClick={() => handleThemeChange('light')}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: 'white',
                                color: 'black',
                                padding: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                boxShadow: 3,
                                width: '125px',
                                height: '75px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <LightModeIcon />
                        </Box>
                        <Box
                            onClick={() => handleThemeChange('dark')}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: 'black',
                                color: 'white',
                                padding: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                boxShadow: 3,
                                width: '125px',
                                height: '75px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <NightlightRoundIcon />
                        </Box>
                    </Box>
                    {/* Direction Section */}
                    <Box sx={{ paddingY: 2 }}>Direction</Box>
                    <Box sx={{ backgroundColor: 'background.paper', mb: 2, display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Box
                            onClick={() => handleDirectionChange('ltr')}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: themeDirection === 'ltr' ? 'lightgrey' : 'white',
                                color: 'black',
                                padding: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                boxShadow: 3,
                                width: '125px',
                                height: '75px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <AlignHorizontalLeftIcon fontSize='large' color={themeDirection === 'ltr' ? 'primary' : 'inherit'} />
                        </Box>
                        <Box
                            onClick={() => handleDirectionChange('rtl')}
                            sx={{
                                cursor: 'pointer',
                                backgroundColor: themeDirection === 'rtl' ? 'lightgrey' : 'white',
                                color: 'black',
                                padding: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                boxShadow: 3,
                                width: '125px',
                                height: '75px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <AlignHorizontalRightIcon fontSize='large' color={themeDirection === 'rtl' ? 'primary' : 'inherit'} />
                        </Box>
                    </Box>
                    {/* Color Section */}
                    <Box sx={{ paddingY: 2 }}>Primary Color</Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                        {/* First row of colors */}

                        <IconButton sx={{ backgroundColor: themeColor === "default" ? '#9adaba' : 'transparent', border: "2px solid #00AB55", ":hover": { border: "3px solid #00AB55", backgroundColor: '#64ab88' }, width: '75px', height: '75px', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onChangeColor({ target: { value: 'default' } })}>
                            <ColorLens sx={{ color: '#00AB55' }} />
                        </IconButton>

                        <IconButton sx={{ backgroundColor: themeColor === "purple" ? '#9d78da' : 'transparent', border: "2px solid #9d78da", ":hover": { border: "3px solid #9d78da", backgroundColor: '#af99d4' }, width: '75px', height: '75px', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onChangeColor({ target: { value: 'purple' } })}>
                            <ColorLens sx={{ color: '#7635dc' }} />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: themeColor === "cyan" ? '#65aac0' : 'transparent', border: "2px solid #1CCAFF", ":hover": { border: "3px solid #79b2c3", backgroundColor: '#79b2c3' }, width: '75px', height: '75px', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onChangeColor({ target: { value: 'cyan' } })}>
                            <ColorLens sx={{ color: '#1CCAFF' }} />
                        </IconButton>
                    </Box>

                    {/* Second row of colors */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <IconButton sx={{ backgroundColor: themeColor === "blue" ? '#617bc1' : 'transparent', border: "2px solid #0045FF", ":hover": { border: "3px solid #627bbe", backgroundColor: '#627bbe' }, width: '75px', height: '75px', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onChangeColor({ target: { value: 'blue' } })}>
                            <ColorLens sx={{ color: '#0045FF' }} />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: themeColor === "orange" ? '#c09d69' : 'transparent', border: "2px solid #fda92d", ":hover": { border: "3px solid #c1995d", backgroundColor: '#c1995d' }, width: '75px', height: '75px', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onChangeColor({ target: { value: 'orange' } })}>
                            <ColorLens sx={{ color: '#fda92d' }} />
                        </IconButton>
                        <IconButton sx={{ backgroundColor: themeColor === "red" ? '#d77878' : 'transparent', border: "2px solid #FF3030", ":hover": { border: "3px solid #ba5f5f", backgroundColor: '#ba5f5f' }, width: '75px', height: '75px', borderRadius: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => onChangeColor({ target: { value: 'red' } })}>
                            <ColorLens sx={{ color: '#FF3030' }} />
                        </IconButton>
                    </Box>

                    <Button
                        fullWidth
                        variant="outlined"
                        color="primary"
                        sx={{ mt: 4 }}
                        onClick={toggleFullscreen}
                    >
                        <IconButton onClick={handleTogglePanel}>
                            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                        </IconButton>
                    </Button>
                </Box>
            </Box >
        </>
    );
}
