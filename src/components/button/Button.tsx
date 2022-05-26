import * as React from 'react';
import { MouseEvent } from 'react';
import './button.scss';

type ButtonType = {
  className: string,
  action?: (event: MouseEvent<HTMLButtonElement>) => void,
  nameButon: string,
  typeButton: 'submit' | 'button',
};

function Button({
  className, action,
  nameButon, typeButton,
}: ButtonType): JSX.Element {
  return (
    <button
      className={`button ${className}`}
      type={typeButton}
      onClick={action}
    >
      {nameButon}
    </button>
  );
}

Button.defaultProps = {
  action: null,
};

export default Button;
