"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { es } from 'date-fns/locale/es';
import { ChevronLeft, ChevronRight } from "lucide-react"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function DoctorCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps & { appointmentsStatus?: { [key: string]: string } }) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 justify-end",
        month: "space-y-4 relative",
        caption: "flex w-[300px] pt-1 items-center mb-4",
        caption_label: "text-2xl font-medium capitalize",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 p-0 hover:opacity-100 border-none shadow-none"
        ),
        nav_button_previous: "absolute right-8",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-gray-800 rounded-md w-full font-bold capitalize",
        row: "flex gap-1",
        cell: "size-12 p-0 relative focus-within:relative focus-within:z-20 rounded-full ",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-full w-full p-0 font-normal aria-selected:opacity-100 rounded-full"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-500 text-primary-foreground rounded-full",
        day_today: "bg-blue-400 text-white",
        day_outside:
          "day-outside text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground ",
        day_hidden: "invisible ",
        ...classNames,
      }}

      components={{
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4 " />,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}
DoctorCalendar.displayName = "Calendar"

export { DoctorCalendar }
