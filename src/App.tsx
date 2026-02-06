import './styles/app.scss'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import { Alert, Snackbar, } from "@mui/material";
import { HideSnackbar } from './redux/slices/authSlice';
import NewAppRouter from './NewAppRouter';

function App() {
    const { open, message, severity } = useSelector(
        (state: RootState) => state.auth.snackbar
    );

    const dispatch = useDispatch();

    const [localOpen, setLocalOpen] = useState(false);

    useEffect(() => {
        setLocalOpen(open);
    }, [open]);

    const handleCloseSnackbar = () => {
        setLocalOpen(false);
        setTimeout(() => {
            dispatch(HideSnackbar());
        }, 300);
    };

    return (
        <>
            <NewAppRouter />
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={severity}
                    variant="filled"
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        alignItems: 'center'
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default App
