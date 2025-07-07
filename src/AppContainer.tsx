/**
 * AppContainer wraps the ScholarSync App with all necessary context providers,
 * including theme, localization, notifications, and settings.
 *
 * @packageDocumentation
 */
import './App.css'
import ThemeConfig from './theme'
import { SettingsProvider } from './contexts/SettingsContext'
import { Box } from '@mui/material'
import SettingsPanel from './components/SettingsPanel'
import ThemeLocalization from './components/ThemeLocalization'
import { NotificationsProvider } from '@toolpad/core/useNotifications';
import App from './App'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

/**
 * AppContainer wraps the ScholarSync App with all necessary context providers.
 *
 * @component
 * @returns {JSX.Element} The ScholarSync application wrapped with providers.
 */
function AppContainer() {
    return (
        <>
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
        </>
    )
}

export default AppContainer;
