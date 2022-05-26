import * as React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import PriseItem from '../priceItem/PriceItem';
import { createThunkFetchPrices } from '../../fetchFunctions';
import './priceList.scss';

export default function PriceList(): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createThunkFetchPrices());
  }, [dispatch]);

  const prices = useAppSelector((store) => store.priceListReducer.prices);

  return (
    <ul className="PriceList__list">

      <p className="PriceList__headers">
        Здесь выведем список
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
