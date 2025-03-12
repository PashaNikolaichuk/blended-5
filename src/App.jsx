import { Navigate, Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import Header from './components/Header/Header';
import { useDispatch } from 'react-redux';
import { fetchBaseCurrenty } from './redux/currency/operations';
import { setBaseCurrenty } from './redux/currency/slice';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const coord = pos.coords;
      dispatch(fetchBaseCurrenty(coord));
    }

    function error() {}
    dispatch(setBaseCurrenty('USD'));
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/rates" element={<Rates />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
