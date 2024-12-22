"use client"

import { ButtonComponent } from "@/ui/buttons/ButtonComponent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import RegisterInput from "./RegisterInput";
import { registerPatient } from "@/actions/auth/register-action";

interface Props {
  isDoctor: boolean;
}

export function AuthStepsForm({ isDoctor }: Props) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    phone: "",
    specialty: "",
    licenseNumber: "",
    establishment: "",
    email: "",
    obraSocial: "",
    numeroAsociado: "",
  });
  const [error, setError] = useState("");
  const router = useRouter()

  const handleNext = async (step: number) => {
    console.log(step);
    if (step === 0) {
      if (!formData.name || !formData.dni || !formData.phone) {
        setError("Por favor completá los campos obligatorios.");
        return;
      }
      setStep(step + 1);
    }

    if (step === 1 && isDoctor) {
      if (!formData.specialty || !formData.licenseNumber) {
        setError("Por favor completá los campos obligatorios.");
        return;
      }

      try {
        const result = await registerPatient(formData)
        console.log(result)

        if (result.errors || result.registerError) {
          setError(result.message + ': ' + result.registerError || 'Error desconocido al iniciar sesión.')
          return
        }

        if (result.success) {
          console.log(result.success);
          console.log("Doctor registrado correctamente");
          router.push('/auth/send-code?steps=true')
        }
      } catch (error) {
        setError('Ha ocurrido un error al guardar la informacion de registro' + error)
      }
    }

    if (step === 1 && !isDoctor) {
      if (!formData.email || !formData.obraSocial || !formData.numeroAsociado) {
        setError("Por favor completá los campos obligatorios.");
        return;
      }
      console.log(formData);

      try {
        const result = await registerPatient(formData)
        console.log(result)

        if (result.errors || result.registerError) {
          if (result.errors) {
            const errorMessages = Object.values(result.errors).flat().join(', ');
            setError(result.message + ': ' + errorMessages);
            return;
          }
          setError(result.message + ': ' + result.registerError || 'Error desconocido al iniciar sesión.')
          return
        }

        if (result.success) {
          console.log(result.success);
          console.log("Doctor registrado correctamente");
          router.push('/auth/send-code?steps=true')
        }
      } catch (error) {
        setError('Ha ocurrido un error al guardar la informacion de registro' + error)
      }
    }
    setError("");
    console.log(formData);
  }
  return (
    <div className="flex flex-col gap-2 w-full h-[calc(100vh-20rem)] items-center">
      <div className="w-full flex justify-center mb-4">
        <StepIndicator step={step} />
      </div>
      <h2 className="font-medium text-[40px] text-secondaryBlue-500">Completá tus datos para empezar</h2>
      <h4 className="text-2xl">{isDoctor ? "Necesitamos algunos datos básicos para crear tu cuenta." : "Esto nos ayuda a reservar tu turno rápidamente."}</h4>

      <form className="justify-items-center">
        {step === 0 && (
          <div className="w-full flex flex-col items-center gap-8 my-12">
            <RegisterInput label="Nombre Completo" type="text" placeholder="Escribí tu nombre igual que en tu DNI" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} isOptional={false} />
            <RegisterInput label="Numero de identificación" type="text" placeholder="Ingresá tu número de DNI (sin puntos)." value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} isOptional={false} />
            <RegisterInput label="Numero de telefono" type="email" placeholder="Ingresá tu número teléfono celular" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} isOptional={false} />
          </div>
        )}

        {step === 1 && isDoctor && (
          <div className="w-full flex flex-col items-center gap-8 my-12">
            <RegisterInput label="Especialidad Médica" type="text" placeholder="Escribí tu especialidad médica." value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} isOptional={false} />
            <RegisterInput label="Número de Matrícula Profesional" type="text" placeholder="Ingresá tu matrícula profesional" value={formData.licenseNumber} onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })} isOptional={false} />
            <RegisterInput label="Establecimiento de atención" type="text" placeholder="Escribí el lugar donde atendés." value={formData.establishment} onChange={(e) => setFormData({ ...formData, establishment: e.target.value })} isOptional={true} />
          </div>
        )}

        {step === 1 && (
          <div className="w-full flex flex-col items-center gap-8 my-12">
            <RegisterInput label="Correo electrónico" type="text" placeholder="Ingresá tu correo para notificarte" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} isOptional={false} />
            <RegisterInput label="Obra social/Aseguradora opcional" type="text" placeholder="Escribí el nombre de tu obra social" value={formData.obraSocial} onChange={(e) => setFormData({ ...formData, obraSocial: e.target.value })} isOptional={false} />
            <RegisterInput label="Número de asociado" type="text" placeholder="Ingresá tu número del asociado" value={formData.numeroAsociado} onChange={(e) => setFormData({ ...formData, numeroAsociado: e.target.value })} isOptional={true} />
          </div>
        )}
        <ButtonComponent size="normal" text="Siguiente" variant="dark" onClick={() => handleNext(step)} />
      </form>


      <p className="mt-auto text-red-500">{error}</p>

      <p className="mt-auto"><span className="text-secondaryBlue-500 font-medium">¿Por qué te pedimos estos datos?</span><span className="text-[#a6a6a6]">Para confirmar tus turnos y verificar tu cobertura médica. No compartimos tu información sin tu consentimiento.</span></p>
    </div>
  );
}