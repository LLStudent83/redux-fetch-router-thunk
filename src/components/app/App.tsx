import * as React from 'react';
import { useEffect } from 'react';
import {
  Route, Routes, useNavigate,
} from
  'react-router-dom';
import { useAppSelector } from '../../hooks';
import PriceList from '../priceList/PriceList';
import ChangePrice from '../changePrice/ChangePrice';
import Loader from '../loader/Loader';
import Popup from '../popup/Popup';

export default function App(): JSX.Element {
  // const loading = useAppSelector((store) => store.priceListReducer.loading);
  const { loading, error } = useAppSelector((store) => store.priceListReducer);

  const loader = loading ? <Loader /> : null;
  const popup = error ? <Popup text={`Что то пошло не так ${error}`} /> : null;

  const navigate = useNavigate();
  useEffect(() => {
    navigate('/api/services');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loader}
      {popup}
      <Routes>
        <Route path="/api/services" element={<PriceList />} />
        <Route path="/api/services/:id" element={<ChangePrice />} />

      </Routes>

    </>

  );
}
