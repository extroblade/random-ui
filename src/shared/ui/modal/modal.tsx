'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef, useState } from 'react';

import { useKey } from '@/shared/hooks/useKey';
import { useOnClickOutside } from '@/shared/hooks/useOutsideClick';
import { useScrollLock } from '@/shared/hooks/useScrollLock';
import { Portal } from '@/shared/ui/portal';

import s from './modal.module.css';
export const Modal = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const searchParams = useSearchParams();
  const path = usePathname();
  const router = useRouter();
  const [isParamsOpen, setIsParamsOpen] = useState(
    searchParams.get('modal') == id,
  );
  const handleClose = () => {
    router.push(path);
  };
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsParamsOpen(() => searchParams.get('modal') == id);
  }, [id, searchParams]);
  useScrollLock(isParamsOpen || false);
  useOnClickOutside(modalRef, handleClose);
  useKey('Escape', handleClose);
  if (!isParamsOpen) return <></>;
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
