import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSearchParamsState = <Value>({
  key,
  serialize = String,
  deserialize = <Value>(v: string | null) => v as Value,
}: {
  key: string;
  serialize?: (...args: any[]) => string;
  deserialize?: (...args: any[]) => Value;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState<Value | null>(() => {
    const param = searchParams.get(key);
    return deserialize ? deserialize(param) : null;
  });

  const serializedValue = serialize ? serialize(value) : '';

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    if (value == null || serializedValue.trim() == '') {
      current.delete(key);
    } else {
      current.set(key, serializedValue);
    }

    current.sort();
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
  }, [key, pathname, router, searchParams, serializedValue, value]);

  return [value, setValue] as const;
};
