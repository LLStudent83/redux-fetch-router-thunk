import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createThunkSaveModifiedPrice, createThunkChangePrice } from '../../fetchFunctions';
import { changePriceSuccess } from '../../features/priceList/priceListSlice';

import Button from '../button/Button';
import { useAppSelector, useAppDispatch } from '../../hooks';
import './changePrice.scss';

export default function ChangePrice(): JSX.Element {
  const changePriceStateDefault = {
    name: '',
    price: 0,
    id: '',
    content: '',
  };
  const [changePriceState, setChangePriceState] = useState(changePriceStateDefault);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(createThunkChangePrice(id!));
  }, [dispatch, id]);

  const { changePrice } = useAppSelector((store) => (store.priceListReducer));

  useEffect(() => {
    setChangePriceState(changePrice!);
  }, [changePrice]);

  const {
    name, price, content,
  } = changePriceState;

  const hendelChangeForm = (e: React.ChangeEvent<HTMLInputElement>): any => {
    const { value } = e.target;
    const inputId = e.target.id;
    switch (inputId) {
      case 'name':
        setChangePriceState((changePriceState) => ({
          ...changePriceState, name: value,
        }));
        break;
      case 'cost':
        setChangePriceState((changePriceState) => ({
          ...changePriceState, price: Number(value),
        }));
        break;
      case 'description':
        setChangePriceState((changePriceState) => ({
          ...changePriceState, content: value,
        }));
        break;
      default:
        throw new Error('Нет таких значений');
    }
  };

  const hendelClickCancel = (): void => {
    navigate('/api/services');
    dispatch(changePriceSuccess({ changePrice: changePriceStateDefault }));
  };

  const submit = (): void => {
    dispatch(createThunkSaveModifiedPrice(changePriceState));
    navigate('/api/services');
    setChangePriceState(changePriceStateDefault);
    dispatch(changePriceSuccess({ changePrice: changePriceStateDefault }));
  };

  return (
    <form className="ChangePrice__wrapper" onSubmit={submit}>
      <label htmlFor="name">
        Название
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => hendelChangeForm(e)}
        />
      </label>
      <label htmlFor="cost">
        Стоимость
        <input
          type="text"
          id="cost"
          value={price}
          onChange={(e) => hendelChangeForm(e)}
        />
      </label>
      <label htmlFor="description">
        Описание
        <input
          type="text"
          id="description"
          value={content}
          onChange={(e) => hendelChangeForm(e)}
        />
      </label>
      <footer className="ChangePrice__futer">
        <Button
          className="cancel"
          nameButon="Отмена"
          typeButton="button"
          action={hendelClickCancel}
        />
        <Button
          className="save"
          nameButon="Сохранить"
          typeButton="submit"
        />
      </footer>

    </form>
  );
}
