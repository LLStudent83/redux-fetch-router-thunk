import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PriseItem from '../priceItem/PriceItem';
import { createThunkFetchPrices } from '../../fetchFunctions';
import './priceList.scss';

export default function PriceList(): JSX.Element {
  const dispatch = useAppDispatch();
  const prices = useAppSelector((store) => store.priceListReducer.prices);

  useEffect(() => {
    dispatch(createThunkFetchPrices());
  }, [dispatch]);

  return (
    <ul className="PriceList__list">

      <p className="PriceList__headers">
        Перечень работ
      </p>
      {prices?.map((prise) => (
        <PriseItem
          key={prise?.id}
          id={prise!.id}
          name={prise!.name}
          cost={prise!.price}
        />
      ))}

    </ul>
  );
}
