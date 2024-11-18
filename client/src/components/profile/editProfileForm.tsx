"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitButton } from "@/ui";
import { useState } from "react";
import Image from "next/image";
import { PatientByIdFromResponse } from "@/interfaces/user";
import { IconPencil } from "../icons";
import { uploadSingleImage } from "@/actions/images/ImageActions";
import { BackButton } from "../BackButton";
import { schemaUpdateProfile } from "@/schemas";
import { editPatient } from "@/actions/patients/patientActions";

type TypeFormData = z.infer<typeof schemaUpdateProfile>;

interface Props {
  data: PatientByIdFromResponse
}

export function EditProfileForm({ data }: Props) {

  const { register, handleSubmit, formState: { errors } } = useForm<TypeFormData>({
    resolver: zodResolver(schemaUpdateProfile)
  });

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string>(data.img || '')


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const image = await uploadSingleImage(file)
      setProfileImg(image)
    }
  }

  const submit = handleSubmit(async (patient) => {
    console.log(patient);

    const formData = new FormData();
    formData.append("name", patient.name);
    /*formData.append("surname", data.surname);*/
    formData.append("phone", patient.phone);
    formData.append("email", patient.email);
    formData.append("social_work", patient.social_work);
    formData.append("number_associate", patient.number_associate);
    formData.append("image", profileImg);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      /* crear action y hacer peticion a la api cuando esté */
      console.log(formData);
      const response = await editPatient(formData, data)
      console.log('response', response)

      if (response.errors || response.updateError) {
        setError(response.message + ': ' + response.updateError || 'Error desconocido al actualizar el doctor.')
        setLoading(false)
        return
      }

      if (response.success) {
        setSuccess(response.success)
        setLoading(false)
      }

      setSuccess("Perfil actualizado correctamente")
      setLoading(false)
    } catch (error: unknown) {
      setLoading(false);
      setError("Ha ocurrido un error al actualizar el perfil: " + error);
    }
  });

  return (
    <form onSubmit={submit} className="max-w-5xl grid p-6 gap-4 text-[#1A2C33]">
      <BackButton />
      <h2 className="text-[32px] font-medium mb-4">Mi perfil</h2>
      <div className="flex my-4 mb-11 gap-7 mx-4">
        <div className='flex flex-col gap-2 relative'>
          <input
            type='file'
            name='imagenProfile'
            id='imagenProfile'
            title='imagenProfile'
            onChange={handleFileChange}
            className='invisible w-0 h-0'
          />
          <label htmlFor='imagenProfile' className="cursor-pointer size-[100px]">
            {profileImg ? <Image
              width={500}
              height={500}
              className="rounded-full size-[100px] absolute z-10"
              src={profileImg}
              alt='Profile Image uploaded'
            /> : <Image
              width={500}
              height={500}
              className="rounded-full size-[100px] absolute"
              src={'https://res.cloudinary.com/db395v0wf/image/upload/v1729121057/vooufndzyzyyfnyi4zwv.png'}
              alt='Subir imagen'
              title="Subir Imagen"
            />}
          </label>
        </div>
        <p className="text-[22px] font-medium content-center mb-7 text-black">{data.name}</p>
      </div>

      <h3 className="text-2xl my-2 font-medium">Datos Personales</h3>
      <div className="flex flex-wrap gap-4">
        <div className="w-[420px] flex flex-col gap-[10px] relative">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" {...register("name")} defaultValue={data.name} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          <IconPencil className="absolute top-[46px] right-3" />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        {/*       <label htmlFor="surname">Apellido</label>
      <input type="text" id="surname" {...register("surname")} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
      {errors.surname && <p className="text-red-500">{errors.surname.message}</p>} */}

        <div className="w-[420px] flex flex-col gap-[10px] relative">
          <label htmlFor="phone">Número de teléfono</label>
          <input type="text" id="phone" {...register("phone")} defaultValue={data.phone} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          <IconPencil className="absolute top-[46px] right-3" />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>

        <div className="w-[420px] flex flex-col gap-[10px] relative">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...register("email")} defaultValue={data.email} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          <IconPencil className="absolute top-[46px] right-3" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/*         <div className="w-[420px] flex flex-col gap-[10px] relative">
          <label htmlFor="dni">DNI</label>
          <input type="text" id="dni" {...register("dni")} defaultValue={data.dni} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          <IconPencil className="absolute top-[46px] right-3" />
          {errors.dni && <p className="text-red-500">{errors.dni.message}</p>}
        </div> */}
      </div>


      <h2 className="text-2xl my-4 font-medium">Obra Social</h2>

      <div className="flex flex-wrap gap-4">
        <div className="w-[420px] flex flex-col gap-[10px] relative">
          <label htmlFor="social_work">Obra Social</label>
          <input type="text" id="social_work" {...register("social_work")} defaultValue={data.social_work} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          <IconPencil className="absolute top-[46px] right-3" />
          {errors.social_work && <p className="text-red-500">{errors.social_work.message}</p>}
        </div>

        <div className="w-[420px] flex flex-col gap-[10px] relative">
          <label htmlFor="number_associate">Numero de asociado</label>
          <input type="text" id="number_associate" {...register("number_associate")} defaultValue={data.number_associate} className="block mt-1 p-2 bg-[#F6F7F7] w-full rounded-xl h-12" />
          <IconPencil className="absolute top-[46px] right-3" />
          {errors.number_associate && <p className="text-red-500">{errors.number_associate.message}</p>}
        </div>
      </div>

      <SubmitButton loading={loading} variant="dark" loadingText="Cargando" text="Editar" className="mt-2" />

      {success && <p className="text-xl text-emerald-500">{success}</p>}
      {error && <p className="text-xl text-red-600">{error}</p>}
    </form>
  );
}
