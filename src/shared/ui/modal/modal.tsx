import { ReactNode, useEffect, useRef } from 'react';

import { useKey } from '@/shared/hooks/useKey';
import { useOnClickOutside } from '@/shared/hooks/useOutsideClick';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { Portal } from '@/shared/ui/portal';

import s from './modal.module.css';
export const Modal = ({
  isOpen,
  handleClose,
  children,
}: {
  isOpen?: boolean;
  handleClose: () => void;
  children: ReactNode;
}) => {
  useScrollLock(isOpen || false);

  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, handleClose);
  useKey('Escape', handleClose);
  if (!isOpen) return <></>;
  return (
    <Portal>
      <div className={s.overlay}>
        <div ref={modalRef} className={s.modal}>
          <button className={s.close} onClick={handleClose}>
            x
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
