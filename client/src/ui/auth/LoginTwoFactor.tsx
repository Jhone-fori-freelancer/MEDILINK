"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { SubmitButton } from "@/ui"
import { useRouter } from "next/navigation";
import { loginTwoFactor } from "@/actions/auth/login-action"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaLoginTwoFactor } from "@/schemas";

type TypeFormData = {
  identificationNumber?: string;
  phoneNumber?: string;
  acceptTerms: boolean;
}

export function LoginTwoFactor() {

  const router = useRouter()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeFormData>({
    resolver: zodResolver(schemaLoginTwoFactor)
  })

  const [success, setSuccess] = useState<string | undefined>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const submit = handleSubmit(async data => {
    console.log(data)

    if (!data.identificationNumber && !data.phoneNumber) {
      setError('Debe proporcionar al menos uno de los dos campos: Número de Identificación o Número de Teléfono.')
      return;
    }

    const formData = new FormData()
    if (data.identificationNumber) formData.append('identificationNumber', data.identificationNumber)
    if (data.phoneNumber) formData.append('phoneNumber', data.phoneNumber)
    if (data.acceptTerms) formData.append('acceptTerms', data.acceptTerms.toString())

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await loginTwoFactor(formData)
      console.log(result)

      if (result.errors || result.message) {
        setLoading(false)
        setError(result.message || 'Error al encontrar usuario')
        return
      }

      if (result.success) {
        setSuccess(result.success)
        setSuccess('Se encontro un usuario con los datos proporcionados')
        reset({
          identificationNumber: "",
          phoneNumber: "",
          acceptTerms: false
        })
        setTimeout(() => {
          router.push('/auth/login/verified')
        }, 1000)
      }

    } catch (error: unknown) {
      setLoading(false)
      setError('Ha ocurrido un error al buscar usuario: ' + error)
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={submit} className="flex flex-col items-center p-6 gap-16 rounded-3xl text-secondaryBlue-500">
      <h2 className="text-4xl my-2 font-medium">Ingresá tus datos personales para solicitar un turno</h2>

      <div className="flex justify-between gap-24 flex-wrap lg:w-full lg:flex-nowrap">
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="identificationNumber" className="text-xl">Número de Identificación*</label>
          <input
            placeholder="Ingresá tu número de DNI(sin puntos)"
            type="text"
            id="identificationNumber"
            {...register("identificationNumber")}
            className="min-h-16 border rounded-xl bg-[#F6F7F7] px-4 py-2"
          />
          {errors.identificationNumber && <p className="text-red-500">{errors.identificationNumber.message}</p>}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="phoneNumber" className="text-xl">Número de Teléfono*</label>
          <input
            placeholder="Ingresá tu número de teléfono"
            type="text"
            id="phoneNumber"
            {...register("phoneNumber")}
            className="min-h-16 border rounded-xl bg-[#F6F7F7] px-4 py-2"
          />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <label className="flex items-center">
        <input
          type="checkbox"
          {...register("acceptTerms", { required: true })}
          className="mr-2"
        />
        Acepto los términos y condiciones
      </label>
      {errors.acceptTerms && <p className="text-red-500">Debe aceptar los términos y condiciones</p>}

      <div className="flex flex-col items-center w-full">
        <SubmitButton loading={loading} variant="dark" loadingText="Cargando" text="Iniciar Sesión" className="place-self-center mt-2" />

        {success && <p className="text-xl text-emerald-500">{success}</p>}
        {error && <p className="text-xl text-red-600">{error}</p>}

        <Link href={'/auth/register'} className="text-xl mt-4 ">¿No tienes una cuenta? <span className="text-blue-500 hover:text-blue-800 cursor-pointer select-none">Regístrate</span></Link>
      </div>

    </form>
  )
}