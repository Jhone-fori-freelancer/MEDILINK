"use client"

import * as React from "react"
import { DayPicker, useNavigation } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { es } from 'date-fns/locale/es';
import { format } from "date-fns"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CustomHeaderComponent() {
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  return (
    <thead>
      <tr className="flex gap-2 w-full">
        {days.map((day, index) => (
          <th key={index} className="w-[6.5rem] text-black text-lg font-medium capitalize text-center">{day}</th>
        ))}
      </tr>
    </thead>
  )
}

function CustomCaptionComponent() {
  // Estado para controlar el mes actual que se está mostrando
  const [currentMonth] = React.useState(new Date());
  const [currentMonthName, setCurrentMonthName] = React.useState(new Date());
  const { goToMonth } = useNavigation();

  // Generar los 3 meses a mostrar (mes actual, siguiente y siguiente)
  const months = [
    { label: format(currentMonth, "MMMM", { locale: es }), value: currentMonth },
    { label: format(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1), "MMMM", { locale: es }), value: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1) },
    { label: format(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2), "MMMM", { locale: es }), value: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2) },
  ];

  const handleMonthChange = (month: Date) => {
    setCurrentMonthName(() => month);
    goToMonth(month);
  }

  return (
    <>
      <div className="flex space-x-4">
        {months.map((month, index) => (
          <button
            key={index}
            onClick={() => handleMonthChange(month.value)} // Cambia el mes al hacer clic
            className={`h-10 w-36 text-center text-lg font-medium border p-2 capitalize border-blue-500 text-blue-500 rounded-t-xl ${currentMonthName.getTime() === month.value.getTime() ? 'bg-blue-500 text-white' : ''}`}
          >
            {month.label}
          </button>
        ))}
      </div>
    </>
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps & { appointmentsStatus?: { [key: string]: string } } & { waitingListDay?: Date } & { errorDay?: Date }) {
  const currentMonth = new Date()
  const nextMonth = new Date(currentMonth)
  nextMonth.setMonth(currentMonth.getMonth() + 1)
  const secondNextMonth = new Date(currentMonth)
  secondNextMonth.setMonth(currentMonth.getMonth() + 2)

  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      weekStartsOn={0}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 ",
        month: "space-y-4 grow ",
        caption: "flex justify-center w-[300px] pt-1 relative items-center mb-4",
        caption_label: "text-2xl font-medium capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex ",
        head_cell:
          "text-gray-800 rounded-md w-full font-bold capitalize",
        row: "flex w-full mt-2 gap-2",
        cell: "h-20 w-9 grow p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "bg-[#C2DCF2] text-blue-500 !font-bold !hover:opacity-50 !hover:bg-secondaryBlue-200 text-[18px] justify-start items-start h-full w-full ps-2 pt-0 font-normal aria-selected:opacity-100 border border-[#97A1A3] rounded-sm",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "!bg-secondaryBlue-500 text-primary-foreground !hover:bg-secondaryBlue-200",
        day_today: "text-white !opacity-100 !bg-secondaryBlue-500",
        day_outside:
          "day-outside text-muted-foreground opacity-100 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-[#d5d5d5] cursor-none !bg-white !opacity-100 relative after:content-[''] after:opacity-50 after:absolute after:w-[100%] after:h-[2px] after:bg-[#A6A6A6] after:-rotate-[-141deg] after:top-1/2 after:left-0",
        day_range_middle:
          "bg-secondaryBlue-500",
        day_hidden: "invisible ",
        ...classNames,
      }}
      fromDate={currentMonth}
      toDate={secondNextMonth}
      modifiers={{
        waiting: (date) =>
          date.toDateString() === props.waitingListDay?.toDateString(),
        error: (date) =>
          date.toDateString() === props.errorDay?.toDateString(),
      }}
      modifiersClassNames={{
        waiting: "relative after:text-[10px] after:content-['Lista_de_espera_abierta'] after:z-10  after:absolute after:text-xs after:font-semibold after:text-start after:top-[30%] after:bg-[#FFCC99] after:text-black after:w-[98%] after:left-[1.5px] after:h-[48px] after:rounded-md after:text-start after:p-1 after:text-wrap",

        error: "relative after:text-[10px] after:content-['Sin_turnos_disponibles'] after:z-10 after:absolute after:text-xs after:font-semibold after:text-start after:top-[30%] after:bg-[#FFB4B2] after:text-black after:w-[98%] after:left-[1.5px] after:h-[48px] after:rounded-md after:text-start after:p-1 after:text-wrap",

      }}

      components={{
        Caption: CustomCaptionComponent,
        Head: CustomHeaderComponent,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
