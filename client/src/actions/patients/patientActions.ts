'use server'

import { PatientByIdFromResponse } from '@/interfaces/user'
import { schemaUpdateProfile } from '@/schemas'

const BASE_URL = process.env.API_URL

export const fetchPatient = async (patientId: string | number) => {
  const url = BASE_URL + '/patients/search/' + patientId
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Ocurrio un error al obtener los datos del paciente')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error: ', error)
    return null
  }
}

export const editPatient = async (
  data: FormData,
  patient: PatientByIdFromResponse
) => {
  const url = BASE_URL + '/patients/update/' + patient.id

  const nameFromForm = data.get('name') as string
  const emailFromForm = data.get('email') as string
  const phoneFromForm = data.get('phone') as string
  const imgFromForm = data.get('image') as string
  const socialWorkFromForm = data.get('social_work') as string
  const numberAssociateFromForm = data.get('number_associate') as string

  const validatedFields = schemaUpdateProfile.safeParse({
    name: nameFromForm,
    email: emailFromForm,
    phone: phoneFromForm,
    social_work: socialWorkFromForm,
    number_associate: numberAssociateFromForm,
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Debe rellenar todos los campos. Error al actualizar el doctor.',
    }
  }

  const body = {
    name: nameFromForm,
    email: emailFromForm,
    phone: phoneFromForm,
    image: imgFromForm,
    social_work: socialWorkFromForm,
    number_associate: numberAssociateFromForm,
    insurer: socialWorkFromForm,
  }

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const responseData = await response.json()

    if (!responseData) {
      return {
        errors: {},
        updateError: null,
        message: 'Algo salio mal...',
      }
    }

    if (responseData.error) {
      return {
        errors: {},
        updateError: responseData.error,
        message: 'Error al actualizar el doctor',
      }
    }

    return {
      success: 'Actualización exitosa',
    }
  } catch (error) {
    return {
      errors: {},
      updateError: 'Error al comunicarse con el servidor' + error,
      message: 'Algo salió mal durante la actualización.' + error,
    }
  }
}
