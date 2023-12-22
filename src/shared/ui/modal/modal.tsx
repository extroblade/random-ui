'use client';
import { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { useKey } from '@/shared/hooks/useKey';
import { useOnClickOutside } from '@/shared/hooks/useOutsideClick';
import { useScrollLock } from '@/shared/hooks/useScrollLock';

import s from './modal.module.css';
const MODAL_ROOT = 'modal-root';
export const Modal = ({
  isOpen,
  handleClose,
  children,
}: {
  isOpen?: boolean;
  handleClose: () => void;
  children: ReactNode;
}) => {
  const [root, setRoot] = useState<HTMLDivElement>();
  const { lock, unlock } = useScrollLock();
  useEffect(() => {
    const el = document.getElementById(MODAL_ROOT);
    if (!el) return;
    setRoot(() => el as HTMLDivElement);
  }, []);

  useEffect(() => {
    if (isOpen) {
      lock();
      return;
    }
    unlock();
  }, [isOpen, lock, unlock]);
  const contentRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contentRef, handleClose);
  useKey('Escape', handleClose);
  const content = (
    <div className={s.modal}>
      <div ref={contentRef} className={s.content}>
        <button className={s.close} onClick={handleClose}>
          x
        </button>
        {children}
      </div>
    </div>
  );
  if (!root || !isOpen) return <></>;
  return ReactDOM.createPortal(content, root);
};
