'use server'
import { schemaLogin, schemaLoginTwoFactor } from '@/schemas'
import { cookies } from 'next/headers'
import { sendMail } from '../email/emailActions'
import { PatientFromResponse } from '@/interfaces/user'

const BASE_URL = process.env.API_URL

export const loginUser = async (formData: FormData) => {
  const url = BASE_URL + '/user'
  const cookieStore = cookies()

  const emailFromForm = formData.get('email') as string
  const passwordFromForm = formData.get('password') as string

  const validatedFields = schemaLogin.safeParse({
    email: emailFromForm,
    password: passwordFromForm,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al iniciar sesión.',
    }
  }

  /*   cookieStore.set(
    'user',
    JSON.stringify({
      id: 44,
      name: 'maria',
      dni: '40890678',
      password: 'test123',
      email: 'maria@gmail.com',
      social_work: 'OSDE',
      number_associate: 'B1234890',
      phone: '1589067841',
      img: 'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png',
      active: true,
      insurer: 'OSDE',
    }),
    {
      httpOnly: true,
      path: '/',
    }
  ) */

  const body = {
    email: emailFromForm,
    password: passwordFromForm,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseData = await response.json()
    console.log('data', responseData)

    if (!responseData) {
      return {
        errors: {},
        loginError: null,
        message: 'Algo salió mal...',
      }
    }

    if (responseData.error) {
      return {
        errors: {},
        loginError: responseData.error,
        message: responseData.message,
      }
    }

    cookieStore.set('user', JSON.stringify(responseData), {
      httpOnly: true,
      path: '/',
    })

    return {
      success: 'Inicio de sesión exitoso',
      data: responseData,
    }
  } catch (error) {
    console.log(error)
    return {
      errors: {},
      loginError: 'Error al comunicarse con el servidor' + error,
      message: 'Algo salió mal durante el inicio de sesión.' + error,
    }
  }
}

export const logoutUser = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('user')
}

export const loginTwoFactor = async (formData: FormData) => {
  console.log('loginTwoFactor', formData)
  const cookieStore = cookies()

  //obtener usuario por dni o telefono
  const user = cookieStore.get('user')
  console.log(user)

  const identificationNumber = formData.get('identificationNumber') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const acceptTerms = formData.get('acceptTerms') as string

  const validatedFields = schemaLoginTwoFactor.safeParse({
    identificationNumber: identificationNumber ?? '',
    phoneNumber: phoneNumber ?? '',
    acceptTerms: acceptTerms === 'true' ? true : false,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al iniciar sesión.',
    }
  }

  const body = {
    identificationNumber,
    phoneNumber,
  }

  console.log(body)

  return {
    success: 'Se encontró un usuario con los datos proporcionados',
    data: body,
  }
}

export const sendCode = async (option: string) => {
  console.log('sendCodeType', option)

  const cookieStore = cookies()
  const userCookie = cookieStore.get('user')
  if (!userCookie) {
    throw new Error('User not found')
  }
  const user: PatientFromResponse = JSON.parse(userCookie.value)

  //se obtiene el usuario que se guardo en cookies
  console.log('user', user)

  /* 
  if (option === 'phone') {
    return {
      success: 'Se envió el código de verificación a tu teléfono',
      data: option,
    }
  }

  if (option === 'mail') {
    return {
      success: 'Se envió el código de verificación a tu email',
      data: option,
    }
  } */

  //se guarda el mail en una variable
  const userEmail = user.email

  //se envia una peticion al endpoint para que cree el codigo de verificacion
  //se obtiene ese codigo, se hashea y se guarda en cookies
  const hashedCode = '123456'

  if (!userEmail) {
    return {
      errors: 'Error al enviar el código de verificación',
      message: 'Error al enviar el código de verificación',
    }
  }

  //se envia el codigo por email
  try {
    const sendMailResponse = await sendMail(
      userEmail,
      'Tu código de verificación',
      hashedCode
    )
    console.log(sendMailResponse)

    cookieStore.set('code', hashedCode, {
      httpOnly: true,
      path: '/',
    })

    return {
      success: 'Se envió el código de verificación a tu correo',
      data: sendMailResponse,
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error al enviar el código de verificación')
  }
}

export const verifyCode = async (code: string) => {
  console.log(Number(code))

  const cookieStore = cookies()
  const codeCookie = cookieStore.get('code')
  if (!codeCookie) {
    throw new Error('Code not found')
  }
  const codeFromCookie = JSON.parse(codeCookie.value)

  //se verifica si el codigo es el mismo que el enviado
  if (Number(code) !== codeFromCookie) {
    return {
      errors: 'Error al verificar el código',
      message: 'El codigo no coincide con el enviado',
    }
  }

  return {
    success: 'Código verificado',
  }
}
