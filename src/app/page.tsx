'use client';
import { useState } from 'react';

import { Accordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { Modal } from '@/shared/ui/modal';
import { Select } from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';

const sampleSelect = [
  { id: 1, title: 'Value1' },
  { id: 2, title: 'Value2' },
  { id: 3, title: 'Value3' },
  { id: 4, title: 'Value4' },
];

const sampleAccordion = [
  { id: 1, label: 'Value1', body: <p>body</p> },
  { id: 2, label: 'Value2', body: <p>body</p> },
  { id: 3, label: 'Value3', body: <p>body</p> },
  { id: 4, label: 'Value4', body: <p>body</p> },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={'flex gap-8'}>
        <Accordion items={sampleAccordion} />
        <Select
          isSingle
          label={'Select'}
          options={sampleSelect}
          isHover={false}
        />
        <Skeleton width={250} height={250} borderRadius={32} />
        <button onClick={() => setIsOpen(true)}>open</button>
        <Modal isOpen={isOpen} handleClose={() => setIsOpen(false)}>
          <div className={'h-lvh min-h-[calc(100vh-64px)]'}>modal</div>
        </Modal>
      </div>
      <div className={'flex gap-8'}>
        <Button onClick={() => console.log(1)}>button primary</Button>
        <Button onClick={() => console.log(2)} variant={'secondary'}>
          button primary
        </Button>
        <Button href={'https://vk.ru'}>link!</Button>
      </div>
    </main>
  );
}
