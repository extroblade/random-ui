'use client';
import { Select } from '@/shared/ui/select/select';

const sampleSelect = [
  { id: 1, title: 'Value1' },
  { id: 2, title: 'Value2' },
  { id: 3, title: 'Value3' },
  { id: 4, title: 'Value4' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={'flex'}>
        <Select
          isHover={false}
          isSingle
          defaultValue={sampleSelect[0]}
          options={sampleSelect}
        />
        <Select
          isHover={true}
          shouldCloseOnClick
          isSingle
          label={'Select2'}
          options={sampleSelect}
        />
      </div>
    </main>
  );
}
