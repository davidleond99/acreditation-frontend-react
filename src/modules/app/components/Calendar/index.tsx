import { FC } from 'react';
import {
  Calendar as PrimeCalendar,
  CalendarProps as IconCalendarProps,
} from 'primereact/calendar';
import { IconType } from 'primereact/utils';

interface CalendarProps {
  label?: string;
  name: string;
  error?: string | undefined;
  style?: string;
  styleError?: string;
  value?: any;
  onChange?: any;
  onHide?: any;
  icon?: IconType<IconCalendarProps>;
  placeholder?: string;
  showTime?: boolean;
  showSeconds?: boolean;
  required?: boolean;
  minDate?: any;
  maxDate?: any;
  disabledDates?: Date[] | undefined;
  selectionMode?: string;
}

export const Calendar: FC<CalendarProps> = ({
  label,
  name,
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
  placeholder,
  showTime,
  showSeconds,
  required,
  minDate,
  maxDate,
  disabledDates,
  selectionMode,
  onHide,
}) => {
  return (
    <div className={`${style}`}>
      <div className="p-inputgroup field h-3rem shadow-1 ">
        <span
          className={`p-float-label `}
        >
          <PrimeCalendar
            // monthNavigator
            // yearNavigator
            // yearRange={`${new Date().getFullYear() - 100}:${
            //   new Date().getFullYear() + 100
            // }`}
            disabledDates={disabledDates}
            // disabledDays
            className={`-left-none ${
              error != null && ' border-red-500 border-1'
            }`}
            icon={icon}
            onHide={onHide}
            id={name}
            name={name}
            value={value}
            dateFormat="dd-mm-yy"
            placeholder={placeholder}
            onChange={onChange}
            showIcon
            iconPos={'left'}
            showTime={showTime}
            showSeconds={showSeconds}
            minDate={minDate}
            maxDate={maxDate}
            readOnlyInput
            showOtherMonths={false}
            selectionMode={selectionMode}
          />

          <label style={{ marginLeft: 40 }} htmlFor={name}>
            {label} <span style={{ color: 'red' }}>{required && '*'}</span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left -mb-4 -mt-2 ${error ?? styleError}`}
      >
        {error}
      </small>
    </div>
  );
};
