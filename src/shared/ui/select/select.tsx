'use client';
import { clsx } from 'clsx';
import React, { memo, useCallback, useRef, useState } from 'react';

import { useOnClickOutside } from '@/shared/hooks/useOutsideClick';

import s from './select.module.css';

type SelectClassNames = {
  containerClassName?: string;
  labelClassName?: string;
  optionClassName?: string;
  bodyClassName?: string;
};
type Option = {
  id: number | string;
  title: number | string;
};
type PropsWithPlaceholder = {
  placeholder?: string;
};
type PropsWithDefaultValue = {
  defaultValue?: Option;
};
type SelectProps = {
  label?: string;
  options: Option[];
  isSingle?: boolean;
  isHover?: boolean;
  shouldCloseOnClick?: boolean;
};
// eslint-disable-next-line react/display-name
export const Select = memo(
  ({
    label,
    isSingle,
    options,
    isHover,
    defaultValue,
    shouldCloseOnClick,
    containerClassName,
    labelClassName,
    optionClassName,
    bodyClassName,
  }: SelectProps &
    SelectClassNames &
    PropsWithPlaceholder &
    PropsWithDefaultValue) => {
    const [selectedSingle, setSelectedSingle] = useState<Option | undefined>(
      defaultValue,
    );
    const [selectedMulti, setSelectedMulti] = useState<Option[]>();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const handleSingleSelect = useCallback((option: Option) => {
      setSelectedSingle(() => option);
    }, []);
    const handleMultiSelect = useCallback(
      (option: Option) => {
        if (!selectedMulti?.length) {
          setSelectedMulti(() => [option]);
          return;
        }
        if (selectedMulti.find((value) => value.id === option.id)) {
          setSelectedMulti(
            (values) => values?.filter((value) => value.id !== option.id),
          );
          return;
        }
        setSelectedMulti((values) => [...(values || []), option]);
      },
      [selectedMulti],
    );
    const handleSelect = useCallback(
      (option: Option) => {
        isSingle ? handleSingleSelect(option) : handleMultiSelect(option);
        if (shouldCloseOnClick) {
          setIsOpen(() => false);
          setIsClosing(() => true);
          setTimeout(() => setIsClosing(false), 50);
        }
      },
      [handleMultiSelect, handleSingleSelect, isSingle, shouldCloseOnClick],
    );
    const ref = useRef<HTMLDivElement>(null);
    const handleClose = useCallback(() => setIsOpen(false), []);
    const handleToggle = useCallback(() => setIsOpen((v) => !v), []);

    useOnClickOutside(ref, () => !isHover && handleClose());
    return (
      <div
        ref={ref}
        className={clsx(
          s.container,
          isOpen && s.open,
          isClosing && s.close,
          containerClassName,
        )}
      >
        <div
          onClick={() => !isHover && handleToggle()}
          className={clsx(s.label, labelClassName)}
        >
          {!!selectedSingle && selectedSingle.title}
          {!!selectedMulti &&
            selectedMulti.map((v) => (
              <div onClick={() => handleMultiSelect(v)} key={v.id}>
                {v.title}
              </div>
            ))}
          {!selectedMulti?.length && !selectedSingle && label}
        </div>
        <div className={clsx(s.body, isHover && s.hover, bodyClassName)}>
          {options.map((option) => (
            <div
              onClick={() => handleSelect(option)}
              key={option.id}
              className={clsx(s.option, optionClassName)}
            >
              {option.title}
            </div>
          ))}
        </div>
      </div>
    );
  },
);
