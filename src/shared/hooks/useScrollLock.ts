import { useCallback, useEffect, useState } from 'react';

export const useScrollLock = () => {
  const [body, setBody] = useState<HTMLElement>();

  useEffect(() => {
    if (typeof window === undefined) return;

    setBody(() => document.body);
  }, []);
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
  return { lock, unlock };
};
