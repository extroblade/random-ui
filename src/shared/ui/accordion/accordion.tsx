'use client';
import { clsx } from 'clsx';
import { ReactNode, useState } from 'react';

import s from './accordion.module.css';
import { AccordionItem, AccordionItemClassNames } from './accordion-item';

export type iAccordion = {
  id: string | number;
  label: ReactNode;
  body: ReactNode;
};
export const Accordion = ({
  items,
  className,
  itemClassNames,
  defaultIndex,
}: {
  items: iAccordion[];
  itemClassNames?: AccordionItemClassNames;
  className?: string;
  defaultIndex?: number;
}) => {
  const [currentItem, setCurrentItem] = useState<iAccordion | null>(
    defaultIndex !== undefined
      ? items?.[Math.max(Math.min(defaultIndex, items.length - 1), 0)]
      : null,
  );

  const handleSingleSelect = (item: iAccordion) => {
    setCurrentItem((value) => (item.id === value?.id ? null : item));
  };
  return (
    <div className={clsx(s.accordion, className)}>
      {items.map((item) => (
        <AccordionItem
          label={item.label}
          isOpen={item.id === currentItem?.id}
          onClick={() => handleSingleSelect(item)}
          key={item.id}
          {...itemClassNames}
        >
          {item.body}
        </AccordionItem>
      ))}
    </div>
  );
};
