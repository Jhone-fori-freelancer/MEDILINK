'use server'

//segun que pais sea se cambia la url para obtener los feriados
const URL_ARG = 'https://api.argentinadatos.com/v1/feriados/2024'

export const getHolidays = async () => {
  const response = await fetch(URL_ARG)
  const data = await response.json()
  return data.map((holiday: { fecha: string }) => holiday.fecha)
}
