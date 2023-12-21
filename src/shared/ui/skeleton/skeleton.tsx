import { clsx } from 'clsx';

import s from './skeleton.module.css';
export const Skeleton = ({
  className,
  width,
  height,
  borderRadius,
}: {
  className?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}) => {
  return (
    <div
      className={clsx(s.skeleton, className)}
      style={{
        width: width || '100%',
        height: height || '100%',
        borderRadius: borderRadius || '0',
      }}
    />
  );
};
