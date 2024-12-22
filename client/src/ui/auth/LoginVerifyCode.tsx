"use client"
import { useState } from 'react';
import EnterCode from './EnterCodeComponent';
import { verifyCode } from '@/actions/auth/login-action';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { StepIndicator } from "./stepsForm/StepIndicator";
import { ButtonComponent } from '../buttons/ButtonComponent';

export function VerifyCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string>('')
  const router = useRouter();
  const params = useSearchParams()
  const showSteps = params.get('steps')

  const handleSubmit = async (code: string) => {
    setIsLoading(true);
    setErrors('');
    console.log('Code:', code);
    console.log('Verifying code...');

    try {
      const response = await verifyCode(code);
      console.log(response);

      if (response.errors || response.message) {
        setErrors(response.errors + ': ' + response.message || 'Error al verificar el código');
        return;
      }

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
    <div className='flex flex-col items-center justify-center text-secondaryBlue-500 gap-8'>
      {showSteps && <StepIndicator step={3} />}
      <h2 className='text-4xl font-medium'>Ingresá el código de verificación</h2>
      <p className='text-2xl'>Te enviamos un codigo para confirmar tu identidad al metodo seleccionado.</p>

      <EnterCode isLoading={isLoading} callback={handleSubmit} />

      <ButtonComponent size='normal' text='Verificar' variant='dark' />

      {errors && <p className='text-red-500'>{errors}</p>}
    </div>
  )
}