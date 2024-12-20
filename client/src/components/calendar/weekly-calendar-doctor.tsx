"use client";

import React, { useMemo, useState } from 'react';
import { Calendar, DateLocalizer, momentLocalizer, ToolbarProps } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css'
import { format, startOfWeek, endOfWeek, addWeeks, isSameWeek } from 'date-fns';

const localizer = momentLocalizer(moment);

moment.locale('es');

interface CustomToolbarProps extends ToolbarProps<{ title: string; start: Date; end: Date; }, object> {
  onNavigate: (date: Date | string) => void;
  currentDate: Date;
}

const CustomToolbar: React.FC<CustomToolbarProps> = ({ onNavigate, currentDate }) => {
  const formatRange = (start: Date, end: Date) => {
    return `${format(start, 'd')}-${format(end, 'd')}`;
  };

  const weeks = useMemo(() => {
    return [
      { start: startOfWeek(new Date(), { weekStartsOn: 1 }), label: "Semana" },
      { start: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }), label: "Semana" },
      { start: startOfWeek(addWeeks(new Date(), 2), { weekStartsOn: 1 }), label: "Semana" },
    ];
  }, []);

  const isSelectedWeek = (start: Date) =>
    isSameWeek(start, currentDate, { weekStartsOn: 1 });

  const handleWeekChange = (start: Date) => {
    onNavigate(start);
  };

  return (
    <div className='rbc-toolbar flex flex-col items-start'>
      <span className='rbc-toolbar-label !content-center !text-xl capitalize !px-4 !bg-blue-500 !text-white !py-2 !rounded-t-xl !rounded-b-none'>
        {localizer.format(currentDate, 'MMMM')}
      </span>
      <div className='flex gap-2'>
        {weeks.map(({ start, label }) => (
          <button
            key={start.getTime()}
            onClick={() => handleWeekChange(start)}
            className={`!rounded-tl-none !rounded-tr-xl !rounded-b text-lg ${isSelectedWeek(start)
              ? '!bg-[#6A9BC4] !text-white'
              : '!text-blue-500 !border-blue-500'
              }`}
          >
            {label} {formatRange(start, endOfWeek(start, { weekStartsOn: 1 }))}
          </button>
        ))}
      </div>
    </div>
  );
};

const WeeklyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleNavigate = (date: Date | string) => {
    if (typeof date === 'string') {
      if (date === 'TODAY') {
        setCurrentDate(new Date());
      } else if (date === 'NEXT') {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
      }
    } else {
      setCurrentDate(date);
    }
  };

  const handleRangeChange = (range: Date[] | { start: Date; end: Date; }) => {
    if (Array.isArray(range)) {
      if (range.length > 0) {
        setCurrentDate(range[0]);
      }
    } else {
      setCurrentDate(range.start);
    }
  };

  const events = [
    {
      title: 'Ana Perez',
      start: new Date(2024, 11, 23, 10, 0),
      end: new Date(2024, 11, 23, 11, 0),
    },
    {
      title: 'Lucia Rodriguez',
      start: new Date(2024, 11, 24, 13, 0),
      end: new Date(2024, 11, 24, 12, 0),
    },
  ];

  const dayPropGetter = (date: Date) => {
    const style: React.CSSProperties = {};
    style.border = 'none';
    if (moment(date).isSame(new Date(), 'day')) {
      style.backgroundColor = 'white';
    }
    return { style };
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(18, 0, 0);

  const formats = {
    dayFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
      localizer!.format(date, 'dddd DD', culture),
  };

  return (
    <div className='col-span-3'>
      <Calendar
        components={{
          event: ({ event }) => (
            <>
              {event ? (
                <div>{event.title}</div>
              ) : (
                <div>Sin turnos agendados</div>
              )}
            </>
          ),
          timeGutterWrapper: () => <div style={{ display: 'none' }} />,
          timeGutterHeader: () => <div style={{ display: 'none' }} />,
          timeSlotWrapper: () => <div style={{ display: 'none' }} />,
          toolbar: (props) => <CustomToolbar {...props} onNavigate={handleNavigate} currentDate={currentDate} />
        }}
        dayPropGetter={dayPropGetter}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['week']}
        defaultView="week"
        date={currentDate}
        onNavigate={handleNavigate}
        onRangeChange={handleRangeChange}
        step={60}
        timeslots={1}
        min={minTime}
        max={maxTime}
        formats={formats}
        culture='es'
      />
    </div>
  );
};

export default WeeklyCalendar;