import { clsx } from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

import s from './accordion.module.css';

export type AccordionItemClassNames = {
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
};

export const AccordionItem = ({
  children,
  label,
  isOpen,
  onClick,
  labelClassName,
  containerClassName,
  className,
}: {
  label: ReactNode;
  isOpen?: boolean;
  onClick: () => void;
} & PropsWithChildren &
  AccordionItemClassNames) => {
  return (
    <div className={clsx(s.item, containerClassName)} onClick={onClick}>
      <div className={clsx(s.label, labelClassName)}>
        {label} <span className={clsx(s.arrow, isOpen && s.rotate)}>&lt;</span>
      </div>
      <div className={clsx(s.body, isOpen && s.open, className)}>
        {children}
      </div>
    </div>
  );
};
