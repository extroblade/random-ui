import { clsx } from 'clsx';
import { InputHTMLAttributes, ReactNode, useId } from 'react';

import s from './input.module.css';

type InputClassNames = {
  containerClassName?: string;
  labelClassName?: string;
};

type RHFProps = {
  name?: string;
  register?: any;
  mask?: string | string[];
};

export const Input = ({
  name,
  mask,
  register,
  left,
  right,
  onLeftClick,
  onRightClick,
  label,
  comment,
  isError,
  labelClassName,
  containerClassName,
  className,
  ...props
}: {
  label?: ReactNode;
  isError?: boolean;
  left?: ReactNode;
  right?: ReactNode;
  comment?: ReactNode;
  onLeftClick?: () => void;
  onRightClick?: () => void;
} & InputHTMLAttributes<HTMLInputElement> &
  InputClassNames &
  RHFProps) => {
  const id = useId();
  return (
    <div className={clsx(s.container, containerClassName)}>
      {!!label && (
        <label htmlFor={id} className={clsx(s.label, labelClassName)}>
          {label}
        </label>
      )}
      <label htmlFor={id} className={s.input_field}>
        {left && (
          <div className={s.icon} onClick={() => onLeftClick?.()}>
            {left}
          </div>
        )}
        <input
          id={id}
          className={clsx(s.input, className)}
          {...(register && name && register(name, mask))}
          {...props}
        />
        {right && (
          <div className={s.icon} onClick={() => onRightClick?.()}>
            {right}
          </div>
        )}
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
