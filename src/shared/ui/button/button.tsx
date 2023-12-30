import { clsx } from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, HTMLProps } from 'react';

import s from './button.module.css';

type ButtonVariants = 'primary' | 'secondary';

type Props = {
  variant?: ButtonVariants;
  className?: string;
  href?: string;
};
type ButtonProps = {
  href?: undefined;
} & Props &
  ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLinkProps = {
  href?: string;
  link?: true;
} & Props &
  Omit<LinkProps, 'href'> &
  Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref'>;

export const Button = ({
  variant = 'primary',
  className,
  children,
  href,
  ...props
}: ButtonAsLinkProps | ButtonProps) => {
  const styles = clsx(s.button, variant && s[variant], className);
  if (href) {
    return (
      <Link
        className={styles}
        href={href}
        target="_self"
        {...(props as Omit<ButtonAsLinkProps, 'href'>)}
      >
        {children}
      </Link>
    );
  }
  const { onClick, ...rest } = props as ButtonProps;
  return (
    <button className={styles} onClick={onClick} type="button" {...rest}>
      {children}
    </button>
  );
};
