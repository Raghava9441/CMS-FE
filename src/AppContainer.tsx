import './App.css'
import ThemeConfig from './theme'
import { SettingsProvider } from './contexts/SettingsContext'
import { Box, Button } from '@mui/material'
import SettingsPanel from './components/SettingsPanel'
import ThemeLocalization from './components/ThemeLocalization'
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import { AuthProvider } from './contexts/AuthContext'
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function AppContainer() {
    return (
        <>
            {/* <AuthProvider> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <SettingsProvider>
                    <ThemeConfig>
                        <ThemeLocalization>
                            <NotificationsProvider>
                                <Box sx={{ backgroundColor: 'background.paper', width: '100vw', height: '100vh' }}>
                                    <ToastContainer />
                                    <SettingsPanel />
                                    <App />
                                </Box>
                            </NotificationsProvider>
                        </ThemeLocalization>
                    </ThemeConfig>
                </SettingsProvider>
            </LocalizationProvider>
            {/* </AuthProvider> */}
        </>
    )
}

export default AppContainer;
