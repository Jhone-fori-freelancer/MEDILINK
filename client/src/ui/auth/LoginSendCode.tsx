"use client"

import { IconMail, IconPhone } from "@/components/icons";
import { useState } from "react";
import { ButtonComponent } from "../buttons/ButtonComponent";
import { sendCode } from "@/actions/auth/login-action";
import { useRouter } from "next/navigation";

export function LoginSendCode() {
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [error, setError] = useState<string>('')
  const router = useRouter()

  const handleSelectOption = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption('')
      return;
    }
    setError('')
    setSelectedOption(option)
  }

  const handleSendCode = async () => {
    if (!selectedOption) {
      setError('Debes seleccionar una opción para recibir el código')
      return;
    }

    setError('')
    console.log(selectedOption);
    console.log('Sending code...')

    try {
      const result = await sendCode(selectedOption)
      console.log(result)

      if (result.errors || result.message) {
        setError('Error al enviar código')
        return
      }

      if (result.success) {
        console.log('Code sent successfully')
        router.push('/auth/login/verify-code')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 text-secondaryBlue-500">
      <h2 className="my-2 font-medium text-3xl">Verificá tu cuenta para continuar</h2>
      <p className="text-gray-500 text-xl -mt-4">¿Cómo quieres recibir tu código?</p>

      <button type="button" title="phone" onClick={() => handleSelectOption('phone')} className={`flex gap-7 w-full mt-6 py-2 px-4 ${selectedOption === 'phone' ? 'bg-blue-100/50 border-blue-500 rounded-md' : ''}`}>
        <div className="size-[54px] border border-blue-500 rounded-md content-center place-items-center">
          <IconPhone />
        </div>
        <div className="flex flex-col text-start gap-1">
          <h4 className="text-xl font-medium">Recibir código por SMS</h4>
          <p className="text-gray-500">Te lo enviaremos al número que registraste</p>
        </div>
      </button>

      <button type="button" title="mail" onClick={() => handleSelectOption('mail')} className={`flex gap-7 w-full mb-6 py-2 px-4 ${selectedOption === 'mail' ? 'bg-blue-100/50 border-blue-500 rounded-md' : ''}`}>
        <div className="size-[54px] border border-blue-500 rounded-md content-center place-items-center">
          <IconMail />
        </div>
        <div className="flex flex-col text-start gap-1">
          <h4 className="text-xl font-medium">Recibir código por EMAIL</h4>
          <p className="text-gray-500">Te lo enviaremos a tu dirección de correo registrada.</p>
        </div>
      </button>

      <ButtonComponent size="normal" onClick={handleSendCode} text="Enviar código" variant="dark" className="place-self-center mt-2" />
      {error && <p className="text-red-500 -mt-4">{error}</p>}
    </div>
  );
}