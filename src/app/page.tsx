'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import * as z from 'zod';

import { regex } from '@/shared/const/regex';
import { Accordion } from '@/shared/ui/accordion';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
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

const schema = z.object({
  email: z.string().email(),
  phone: z.string().regex(regex.email),
});

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    reset,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onTouched',
    defaultValues: {
      phone: '',
      email: '',
    },
    resolver: zodResolver(schema),
  });
  const registerWithMask = useHookFormMask(register);
  const handleClick = handleSubmit(
    (formData) => {
      console.log(
        'valid',
        formData['email'],
        formData['phone'].replace(/ /g, ''),
      );
      reset();
    },
    (errors) => {
      console.log('invalid', errors);
    },
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={'flex gap-8 items-start'}>
        <Accordion items={sampleAccordion} />
        <Select
          shouldCloseOnClick
          isSingle
          label={'Select'}
          options={sampleSelect}
          isHover={false}
        />
        <Skeleton width={220} height={24} borderRadius={32} />
        <Button href={'?modal=default'}>modal link</Button>
        <Modal id={'default'}>
          <div className={'h-lvh min-h-[calc(100vh-64px)]'}>modal</div>
        </Modal>
      </div>
      <div className={'flex flex-col'}>
        <button onClick={handleClick}>log both inputs</button>
        <input
          className={'border-2 rounded px-3 py-1'}
          type="text"
          {...register('email')}
        />
      </div>
      <div className={'w-[350px]'}>
        <Input
          label={'Номер телефона'}
          register={registerWithMask}
          mask={['+[9]', '+[9] [9][9][9] [9][9][9] [9][9] [9][9]']}
          name={'phone'}
          isError={!!errors['phone']}
          left={undefined}
          onRightClick={() => resetField('phone')}
          right={dirtyFields['phone'] && <div>x</div>}
          comment={
            dirtyFields['phone'] && (errors['phone'] ? 'invalid' : 'valid')
          }
        />
      </div>
      <div className={'flex gap-8'}>
        <Button onClick={() => console.log(1)}>button primary</Button>
        <Button onClick={() => console.log(2)} variant={'secondary'}>
          button secondary
        </Button>
      </div>
    </main>
  );
}
