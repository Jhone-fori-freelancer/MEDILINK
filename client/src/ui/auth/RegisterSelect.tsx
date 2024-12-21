'use client'
import Image from "next/image"
import { useState } from "react"
import DoctorImage from '/public/images/register/doctor.png'
import PatientImage from '/public/images/register/patient.png'
import { useRouter } from "next/navigation"
import { ButtonComponent } from "../buttons/ButtonComponent"
import Link from "next/link"

export function RegisterSelect() {
  const [registerType, setRegisterType] = useState<string>('')
  const router = useRouter()

  const handleRedirect = () => {
    if (registerType === 'doctor') {
      router.push('/auth/register/doctor')
    } else {
      router.push('/auth/register/patient')
    }
  }


  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-[40px] text-secondaryBlue-500 font-medium">¿Cómo querés usar la plataforma?</h2>
        <p className="text-2xl text-gray-800">Elegí una opción para personalizar tu experiencia.</p>

        <div className="flex justify-center my-10 gap-20">

          <button type="button" className={`flex flex-col justify-center items-center px-20 gap-6 border-2 rounded-[48px] w-[474px] h-[450px] ${registerType === 'patient' ? 'border-4 border-secondaryBlue-500' : 'border-gray-500'}`} onClick={() => setRegisterType('patient')}>
            <Image src={PatientImage} alt="Patient" width={269} height={269} />

            <h4 className="text-3xl text-secondaryBlue-500 font-medium">Soy paciente</h4>

            <p className="text-lg text-gray-800">Quiero sacar un turno médico rápido y fácil.</p>
          </button>

          <button type="button" className={`flex flex-col justify-center items-center px-20 gap-6 border-2 rounded-[48px] w-[474px] h-[450px] ${registerType === 'doctor' ? 'border-4 border-secondaryBlue-500' : 'border-gray-500'}`} onClick={() => setRegisterType('doctor')}>
            <Image src={DoctorImage} alt="Doctor" width={269} height={269} />

            <h4 className="text-3xl text-secondaryBlue-500 font-medium">Soy Médico</h4>

            <p className="text-lg text-gray-800">Quiero gestionar mis turnos y atender a mis pacientes.</p>
          </button>
        </div>

        <p className="mb-6"><span className="text-lg">¿Ya tenés cuenta?</span> <Link href={'/auth/login'} className="underline text-secondaryBlue-500">Iniciá sesión aquí</Link></p>

        <ButtonComponent size="normal" text="Siguiente" variant="dark" onClick={handleRedirect} />

      </div>
    </>
  )
}