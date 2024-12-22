"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { schemaLogin } from "@/schemas"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { SubmitButton } from "@/ui"
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth/login-action"
import Link from "next/link"

type TypeFormData = z.infer<typeof schemaLogin>

export function LoginForm() {

    const router = useRouter()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TypeFormData>({
        resolver: zodResolver(schemaLogin)
    })

    const [success, setSuccess] = useState<string | undefined>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const submit = handleSubmit(async data => {
        console.log(data)

        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)

        setLoading(true)
        setError('')
        setSuccess('')

        try {
            const result = await loginUser(formData)
            console.log(result)

            if (result.errors || result.loginError) {
                setLoading(false)
                setError(result.message || 'Error al iniciar Sesion' + ': ' + result.loginError || 'Error desconocido al iniciar sesión.')
                return
            }

            if (result.success) {
                setSuccess(result.success)
                setSuccess('Inicio de sesión exitoso')
                reset({
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    const redirectUrl = result.data.rol === 'MEDIC' || result.data.rol === 'ADMIN' ? '/doctor/calendar' : '/dashboard'
                    router.push(redirectUrl)
                }, 1000)
            }
        } catch (error: unknown) {
            setLoading(false)
            setError('Ha ocurrido un error al iniciar sesión: ' + error)
        }
    })

    return (
        <form onSubmit={submit} className="grid w-[500px] p-6 gap-4 rounded-3xl text-secondaryBlue-700">
            <h2 className="text-4xl my-2 font-medium">Iniciar Sesión</h2>

            <label htmlFor="email" className="text-secondaryBlue-500 font-medium text-xl">Email <span className="text-red-500">*</span></label>
            <input
                type="text"
                id="email"
                placeholder="Ingrese su email"
                {...register("email")}
                className="border border-[#c2c2c2] rounded-xl w-[412px] h-16 px-4 text-xl bg-[#F6F7F7]"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <label htmlFor="password" className="text-secondaryBlue-500 font-medium text-xl">Contraseña <span className="text-red-500">*</span></label>
            <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                {...register("password")}
                className="border border-[#c2c2c2] rounded-xl w-[412px] h-16 px-4 text-xl bg-[#F6F7F7]"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            <span className="text-blue-500 hover:text-blue-800 cursor-pointer select-none">¿Olvidó su contraseña?</span>

            <SubmitButton loading={loading} variant="dark" loadingText="Cargando" text="Iniciar Sesión" className="place-self-center mt-2" />

            {success && <p className="text-xl text-emerald-500">{success}</p>}
            {error && <p className="text-xl text-red-600">{error}</p>}

            <Link href={'/auth/register'} className="text-xl mt-4 ">¿No tienes una cuenta? <span className="text-blue-500 hover:text-blue-800 cursor-pointer select-none">Regístrate</span></Link>
        </form>
    )
}
