"use client"

import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { BackButton } from "../BackButton";
import CalendarWeekly from "../calendar/weekly-calendar-doctor";
import SelectMonth from "../SelectMonth";

interface Props {
  doctorId: number
}


export function ScheduleDoctor({ doctorId }: Props) {
  console.log(doctorId);
  const [view, setView] = useState('month')
  const [date, setDate] = useState<Date | undefined>(new Date())

  const appointmentsStatus = {
    "2024-11-01": "unavailable",
    "2024-11-02": "available",
  };

  const availableDaysList = [
    new Date('2024-12-07T00:00:00'),
    new Date('2024-12-09T00:00:00'),
    new Date('2024-12-10T00:00:00'),
    new Date('2024-12-13T00:00:00'),
    new Date('2024-12-16T00:00:00'),
  ]

  const errorDays = [
    new Date('2025-01-03T00:00:00')
  ]

  const waitingListDays = [
    new Date('2025-01-04T00:00:00')
  ]

  const handleViewChange = (view: string) => {
    setView(view)
  }

  return (
    <>
      <BackButton />
      <div className={`flex ${view == 'month' ? 'w-2/3' : 'w-full'} justify-between`}>
        <h2 className="text-[32px] font-medium text-blue-[#1A2C33]">Mi agenda</h2>
        <SelectMonth value={view} onChange={handleViewChange} />
      </div>
      <div className="grid grid-cols-3 max-w-[1400px] mx-auto mt-10 grid-flow-row ">
        {/* CALENDARIO  */}
        {view === "month" ? (
          <Calendar
            className="col-span-2"
            mode="single"
            showOutsideDays={false}
            selected={date}
            onSelect={setDate}
            disabled={(date) => date.getDay() === 0 || format(date, 'yyyy-MM-dd') < format(new Date, 'yyyy-MM-dd')}
            appointmentsStatus={appointmentsStatus}
            errorDays={errorDays}
            waitingListDays={waitingListDays}
            isDoctor
            availableDays={availableDaysList}
          />

        ) : (
          <CalendarWeekly />
        )}
      </div>
    </>
  )
}
