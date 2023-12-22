import { Key, useCallback, useEffect } from 'react';

export function useKey(
  key: Key,
  cb: () => void,
  key_event: 'keyup' | 'keydown' = 'keyup',
) {
  const keyCallback = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== key) {
        return;
      }
      cb();
    },
    [cb, key],
  );

  useEffect(() => {
    document.addEventListener(key_event, keyCallback, false);

    return () => {
      document.removeEventListener(key_event, keyCallback, false);
    };
  }, [keyCallback, key_event]);
}
