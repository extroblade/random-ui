'use client';
import { Accordion } from '@/shared/ui/accordion';
import { Select } from '@/shared/ui/select';

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
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={'flex'}>
        <Accordion items={sampleAccordion} />
      </div>
    </main>
  );
}