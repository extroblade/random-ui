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
}: {
  items: iAccordion[];
  itemClassNames?: AccordionItemClassNames;
  className?: string;
}) => {
  const [currentItem, setCurrentItem] = useState<iAccordion | null>(items?.[0]);

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
