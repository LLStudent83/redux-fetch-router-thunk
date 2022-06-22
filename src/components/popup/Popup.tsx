import * as React from 'react';
import { useMatch } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import Button from '../button/Button';
import { createThunkFetchPrices, createThunkChangePrice } from '../../fetchFunctions';
import './popup.scss';

export default function Popup({ text }: { text: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const match = useMatch('/api/services/:id');

  const reload = (): void => {
    if (match !== null) {
      dispatch(createThunkChangePrice(match.params.id!));
    } else {
      dispatch(createThunkFetchPrices());
    }
  };
  return (
    <div className="Popup__wrapper">
      <p className="Popup__main">
        {text}
      </p>
      <Button
        className="blueButton"
        nameButon="Перезагрузить"
        typeButton="button"
        action={reload}
      />
    </div>
  );
}
