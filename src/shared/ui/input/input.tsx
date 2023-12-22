import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode, useId } from 'react';

import s from './input.module.css';

type InputClassNames = {
  containerClassName?: string;
  labelClassName?: string;
};

export const Input = ({
  left,
  right,
  onLeftClick,
  onRightClick,
  comment,
  isError,
  labelClassName,
  containerClassName,
  ...props
}: {
  isError?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  comment?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement> &
  InputClassNames) => {
  const id = useId();
  return (
    <div className={clsx(s.container, containerClassName)}>
      <label htmlFor={id} className={clsx(s.label, labelClassName)}>
        label
      </label>
      <label htmlFor={id} className={s.input_field}>
        <div className={s.icon} onClick={() => onLeftClick?.()}>
          {left}
        </div>
        <input id={id} className={s.input} {...props} />
        <div className={s.icon} onClick={() => onRightClick?.()}>
          {right}
        </div>
      </label>
      {comment && (
        <label
          htmlFor={id}
          className={clsx(
            s.comment,
            isError === false && s.success,
            isError === true && s.error,
          )}
        >
          {comment}
        </label>
      )}
    </div>
  );
};
