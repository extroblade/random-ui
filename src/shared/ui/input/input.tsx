import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode, useId } from 'react';

import s from './input.module.css';

export const Input = ({
  left,
  right,
  onLeftClick,
  onRightClick,
  comment,
}: {
  left?: ReactNode;
  right?: ReactNode;
  comment?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement>) => {
  const id = useId();
  return (
    <div className={s.container}>
      <label htmlFor={id} className={clsx(s.label)}>
        label
      </label>
      <label htmlFor={id} className={s.input_field}>
        <div className={s.icon} onClick={() => onLeftClick?.()}>
          {left}
        </div>
        <input id={id} className={s.input} />
        <div className={s.icon} onClick={() => onRightClick?.()}>
          {right}
        </div>
      </label>
      {comment && (
        <label htmlFor={id} className={s.comment}>
          {comment}
        </label>
      )}
    </div>
  );
};
