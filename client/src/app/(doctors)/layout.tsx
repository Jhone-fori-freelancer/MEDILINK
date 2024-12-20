import { TopMenuDoctor } from "@/ui";
/* import { cookies } from 'next/headers'
import { redirect } from "next/navigation"; */

export default function LayoutDashboard({
  children
}: {
  children: React.ReactNode;
}) {
  /* const userCookie = cookies().get('user');
  const user = userCookie ? JSON.parse(userCookie.value) : null;

  if (user.rol !== 'MEDIC' && user.rol !== 'ADMIN') {
    redirect('/')
  } */
  const user = {
    "id": 2,
    "name": "Dr. Juliana Martinez",
    "dni": "12243336",
    "obraSocial": "Osecac",
    "numeroAsociado": "99176543",
    "password": "9988546",
    "email": "juliana.martinez@gmail.com",
    "phone": "1155787668",
    "img": "https://res.cloudinary.com/db395v0wf/image/upload/v1729091462/dsocdiq0hoijcez4qv2e.png",
    "specialization": "DErmatologa",
    "licenseNumber": "MP33540",
    "clinic_id": 1,
    "rol": "MEDIC",
    "active": true,
  }
  return (
    <div className="min-h-screen">
      <TopMenuDoctor user={user} />
      <div className="max-w-[1524px] mx-auto px-4 text-[#1A2C33]">
        {children}
      </div>
    </div>
  );
}