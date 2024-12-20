"use client"
import { useState } from 'react';
import EnterCode from './EnterCodeComponent';
import { verifyCode } from '@/actions/auth/login-action';
import { useRouter } from 'next/navigation';

export function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (code: string) => {
    setIsLoading(true);
    console.log('Code:', code);
    console.log('Verifying code...');

    try {
      const response = await verifyCode(code);
      console.log(response);

      if (response.success) {
        console.log('Code verified successfully');
        router.push('/dashboard')
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex flex-col items-center justify-center text-secondaryBlue-500 gap-4'>
      <h2 className='text-4xl font-medium'>Ingresá el código de verificación</h2>
      <p className='text-2xl'>Te enviamos un codigo para confirmar tu identidad al metodo seleccionado.</p>

      <EnterCode isLoading={isLoading} callback={handleSubmit} />
    </div>
  )
}