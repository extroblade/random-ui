import { useCallback, useEffect, useState } from 'react';

export const useScrollLock = (state: boolean) => {
  const [body, setBody] = useState<HTMLElement>();
  const lock = useCallback(() => {
    if (body && 'style' in body) {
      body.style.overflowY = 'hidden';
    }
  }, [body]);
  const unlock = useCallback(() => {
    if (body && 'style' in body) {
      body.style.overflowY = 'auto';
    }
  }, [body]);
  useEffect(() => {
    if (typeof window === undefined) return;

    setBody(() => document.body);
  }, []);

  useEffect(() => {
    if (state) {
      lock();
      return;
    }
    unlock();
  }, [state, lock, unlock]);
};
