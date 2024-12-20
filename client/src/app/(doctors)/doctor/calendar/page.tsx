import { DoctorFromResponse } from "@/interfaces/user";
import { CalendarDoctor } from "@/components";
import { cookies } from "next/headers";

export const revalidate = 0

export default async function CalendarDoctorPage() {
    const userCookie = cookies().get('user');
    const user: DoctorFromResponse = userCookie ? JSON.parse(userCookie.value) : {
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
    };

    return (
        <div className="max-w-[1400px] mx-auto px-6">
            <CalendarDoctor user_id={user.id} user_name={user.name} />
        </div>
    );
}