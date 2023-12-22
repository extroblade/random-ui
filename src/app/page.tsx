'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import * as z from 'zod';

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
  phone: z
    .string()
    .regex(/^[+]*[(]?[0-9]{1}[)]?[-\s./0-9]{14}$/g)
    .optional(),
});

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    resetField,
    watch,
    reset,
  } = useForm({
    reValidateMode: 'onChange',
    mode: 'onBlur',
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
    },
    (errors) => {
      console.log('invalid', errors);
    },
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={'flex gap-8'}>
        <Accordion items={sampleAccordion} />
        <Select
          shouldCloseOnClick
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
      <div className={'flex flex-col'}>
        <button onClick={handleClick}>log both inputs</button>
        <input
          className={'border-2 rounded px-3 py-1'}
          type="text"
          {...register('email')}
        />
      </div>
      <div>
        <Input
          label={'Номер телефона'}
          register={registerWithMask}
          mask={'+[9] [9][9][9] [9][9][9] [9][9] [9][9]'}
          name={'phone'}
          className={'placeholder-opacity-0!important'}
          isError={dirtyFields['phone']}
          left={undefined}
          onRightClick={() => resetField('phone')}
          right={<div className={'cursor-pointer'}>x</div>}
          comment={dirtyFields['phone'] && errors['phone'] && 'invalid'}
        />
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
