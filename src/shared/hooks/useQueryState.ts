import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type useQueryStateProps<Value> = {
  key: string;
  serialize?: (value: Value | null) => string;
  deserialize?: (value: string) => Value;
};

export const useQueryState = <Value>({
  key,
  serialize = String,
  deserialize = <Value>(v: string) => v as Value,
}: useQueryStateProps<Value>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState<Value | null>(() => {
    const param = searchParams.get(key) || '';
    return deserialize ? deserialize(param) : null;
  });

  const serializedValue = serialize ? serialize(value) : '';

  useEffect(() => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

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
