import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import { routesWithAuth, routesWithoutAuth } from './routes';
import _404 from './pages/_404';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routesWithAuth.map((route, index) => (
            <Route key={index} path={route.path} element={<route.component />} />
          ))}
          <Route path="*" element={<_404 />} />
        </Route>

        {/* <Route path="/" element={<MainLayout />}> */}
        {routesWithoutAuth.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
