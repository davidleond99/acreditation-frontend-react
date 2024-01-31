import { FC } from 'react';
import {
  Calendar as Time,
  CalendarProps as IconCalendarProps,
} from 'primereact/calendar';
import { IconType } from 'primereact/utils';

interface TimeProps {
  label?: string;
  disabled?: boolean;
  name: string;
  error?: string | undefined;
  style?: string;
  styleError?: string;
  value?: any;
  onChange?: any;
  onHide?: any;
  onBlur?: any;
  icon?: IconType<IconCalendarProps>;
  placeholder?: string;
  showTime?: boolean;
  showSeconds?: boolean;
  required?: boolean;
  minDate?: Date | undefined;
  maxDate?: Date | undefined;
  disabledDates?: Date[] | undefined;
  selectionMode?: string;
}

export const TimePicker: FC<TimeProps> = ({
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
  disabled,
  minDate,
  maxDate,
  disabledDates,
  selectionMode,
  onHide,
  onBlur,
}) => {
  return (
    <div className={`${style}`}>
      <div className="p-inputgroup field h-3rem shadow-1 ">
        <span className={`p-float-label `}>
          <Time
            showSeconds
            timeOnly
            className={`-left-none ${
              error != null && ' border-red-500 border-1'
            }`}
            icon={icon}
            disabled={disabled}
            onHide={onHide}
            onBlur={onBlur}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            showIcon
            iconPos={'left'}
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
