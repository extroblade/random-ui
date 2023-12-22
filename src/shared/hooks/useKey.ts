import { Key, useCallback, useEffect } from 'react';

const KEY_EVENT_TYPE = 'keyup';

export function useKey(key: Key, cb: () => void) {
  const handleEscKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) {
        cb();
      }
    },
    [cb, key],
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
}
