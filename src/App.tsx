import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { routesWithAuth, routesWithoutAuth } from './routes';
import _404 from './pages/_404';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Suspense, useEffect, useState } from "react";
import { Alert, CircularProgress, Slide, Snackbar, useMediaQuery, useTheme } from "@mui/material";
import { HideSnackbar } from './redux/slices/authSlice';
import LoadingScreen from '@components/LoadingScreen';

const AppRouter = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Router>
            <Suspense fallback={<LoadingScreen fromChat={false} />}>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        {routesWithAuth(user?.role).map((route, index) => (
                            <Route key={index} path={route.path} element={<route.component />} />
                        ))}
                        <Route path="*" element={<_404 />} />
                    </Route>

                    {routesWithoutAuth.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component />} />
                    ))}
                </Routes>
            </Suspense>
        </Router>
    );
};

const vertical = "top";
const horizontal = "right";


function SlideTransition(props) {
    // breakpoint
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return <Slide {...props} direction={isSmallScreen ? "down" : "left"} />;
}


function App() {
    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    // from redux
    const { open, message, severity } = useSelector(
        (state: RootState) => state.auth.snackbar
    );

    // use dispatch
    const dispatch = useDispatch();

    // Local state to manage Snackbar visibility
    const [localOpen, setLocalOpen] = useState(false);

    // Effect to synchronize localOpen with the global open state
    useEffect(() => {
        setLocalOpen(open);
    }, [open]);

    // Handler for Snackbar close
    const handleCloseSnackbar = () => {
        setLocalOpen(false); // Hide Snackbar with local state
        setTimeout(() => {
            dispatch(HideSnackbar()); // Dispatch action after delay
        }, 300);
    };

    return (
        <>
            <AppRouter />
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: isSmallScreen ? "center" : "right",
                }}
                open={localOpen}
                autoHideDuration={5000}
                key={vertical + horizontal}
                onClose={handleCloseSnackbar}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default App
