import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainLayout from './components/MainLayout';
import {routesWithAuth, routesWithoutAuth} from './routes';
import _404 from './pages/_404';
import {useSelector} from "react-redux";
import {RootState} from "@redux/store";
import {Suspense} from "react";
import {CircularProgress} from "@mui/material";

const AppRouter = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <Router>
            <Suspense fallback={<CircularProgress/>}>
                <Routes>
                    <Route path="/" element={<MainLayout/>}>
                        {routesWithAuth(user?.role).map((route, index) => (
                            <Route key={index} path={route.path} element={<route.component/>}/>
                        ))}
                        <Route path="*" element={<_404/>}/>
                    </Route>

                    {/* <Route path="/" element={<MainLayout />}> */}
                    {routesWithoutAuth.map((route, index) => (
                        <Route key={index} path={route.path} element={<route.component/>}/>
                    ))}
                    {/* </Route> */}
                </Routes>
            </Suspense>
        </Router>
    );
};

function App() {
    return (
        <>
            <AppRouter/>
        </>
    )
}

export default App
