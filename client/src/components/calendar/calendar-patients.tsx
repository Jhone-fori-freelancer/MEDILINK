"use client"

import { SkeletonHourDoctor } from "../skeleton/skeleton-hourDoctor";
import { getHoursDoctorId } from "@/actions/doctors/doctorActions";
import { AlertDialogCalendar } from "../alert/alertDialog";
import { useEffect, useState } from "react";
import { Calendar } from "../ui/calendar";
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import { PatientFromResponse } from "@/interfaces/user";
import { CalendarWaitList } from "@/ui/waitlist/CalendarWaitList";

interface HoursDoctor {
    amHours: { hour: string; }[]
    pmHours: { hour: string; }[]
}

interface Props {
    doctor: { id: number, name: string }
    user: PatientFromResponse
    reschedule: boolean
    appointmentId: number
    holidays: string[]
}

export function CalendarPatients({ doctor, user, reschedule, appointmentId, holidays }: Props) {
    const [hoursDoctor, setHoursDoctor] = useState<HoursDoctor>({ amHours: [], pmHours: [] })
    const [loading, setLoading] = useState(false)
    const [hour, setHour] = useState<string>("")
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [openDialog, setOpenDialog] = useState(false)
    const [position, setPosition] = useState(0)

    const handleSetPosition = (newPosition: number) => {
        if (newPosition >= 0 && newPosition <= 5) {
            setPosition(newPosition);
        }
    }

    const formatYear = format(date ?? new Date(), 'yyyy-MM-dd')
    const formattedDate = format(date ?? new Date(), "EEEE d 'de' MMMM", { locale: es });

    // COMPONENTE DE HORAS
    const createHourItem = (hour: string) => (
        <li
            onClick={() => { setHour(hour); setOpenDialog(true) }}
            key={hour}
            className={`border font-medium border-secondaryBlue-400 text-secondaryBlue-400 px-5 py-1 rounded-md cursor-pointer hover:bg-secondaryBlue-400 hover:text-white`}
        >
            {hour}
        </li>
    );

    useEffect(() => {
        const dataHours = async () => {
            const res = await getHoursDoctorId(formatYear, doctor.id)
            setHoursDoctor(res)
            setLoading(true)
        }
        dataHours()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatYear])

    return (
        <div className="grid grid-cols-3 max-w-[1400px] mx-auto mt-10 grid-flow-row">

            {/* CALENDARIO  */}
            <Calendar
                className="col-span-2 ps-0 max-[1180px]:col-span-3"
                mode="single"
                showOutsideDays={false}
                selected={date}
                onSelect={setDate}
                disabled={[(date) => date.getDay() === 0 || format(date, 'yyyy-MM-dd') < format(new Date, 'yyyy-MM-dd'), (date) => holidays.includes(format(date, 'yyyy-MM-dd'))]}
                waitingListDay={new Date('Thu Dec 19 2024 00:00:00 GMT-0300 (hora estándar de Argentina)')}
                errorDay={new Date('Thu Dec 20 2024 00:00:00 GMT-0300 (hora estándar de Argentina)')}
            />

            {/* HORARIOS DISPONIBLES  */}
            <div className="ms-16 text-start max-[1180px]:hidden">
                <span className="font-bold capitalize text-xl">{formattedDate}</span>
                {hoursDoctor.amHours.length === 0 && hoursDoctor.pmHours.length === 0 ? (
                    <div>
                        <CalendarWaitList confirmWaitList={false} position={position} setPosition={handleSetPosition} date={formatYear} doctorId={doctor.id} userId={user.id} />
                    </div>
                ) : (
                    <>
                        <h2 >Horarios disponibles</h2>

                        <div className="grid grid-cols-2 mt-6 justify-center justify-items-center max-w-[250px]">
                            {/* COLUMNA AM  */}
                            <div >
                                <h3 className="font-bold text-xl mb-2 text-center">AM</h3>
                                <ul className="space-y-2">
                                    {
                                        loading ?
                                            (hoursDoctor.amHours.map((item) => createHourItem(item.hour)))
                                            :
                                            (Array.from({ length: 10 }).map((_, index) => (
                                                <SkeletonHourDoctor key={index} />
                                            )))
                                    }
                                </ul>
                            </div>

                            {/* COLUMNA PM  */}
                            <div>
                                <h3 className="font-bold text-xl mb-2 text-center">PM</h3>
                                <ul className="space-y-2">
                                    {
                                        loading ?
                                            (hoursDoctor.pmHours.map((item) => createHourItem(item.hour)))
                                            :
                                            (Array.from({ length: 13 }).map((_, index) => (
                                                <SkeletonHourDoctor key={index} />
                                            )))
                                    }
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {/* FIN HORAS DISPONIBLES  */}

            <AlertDialogCalendar
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                formattedDate={formattedDate}
                hour={hour}
                doctor={{ id: doctor.id, name: doctor.name, dateYear: formatYear }}
                patientId={user.id}
                reschedule={reschedule}
                appointmentId={appointmentId}
            />
        </div>
    )
}
