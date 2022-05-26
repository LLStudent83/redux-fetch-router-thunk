import * as React from 'react';
import './popup.scss';

export default function Popup({ text }: { text: string }): JSX.Element {
  return (
    <div className="Popup__wrapper">
      <p className="Popup__main">
        {text}
      </p>
    </div>
  );
}
