import { FC } from 'react';
import { IconType } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';
import TooltipOptions from 'primereact/tooltip/tooltipoptions';

interface InputProps {
  label?: string;
  password?: boolean;
  name: string;
  error?: string;
  style?: string;
  styleInputText?: string;
  styleContainer?: string;
  styleIcon?: string;
  styleError?: string;
  value?: any;
  onChange?: any;
  onBlur?: any;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  required?: boolean;
  min?: number;
  max?: number;
  minFractionDigits?: number;
  maxFractionDigits?: number;
}

export const InputNum: FC<InputProps> = ({
  label,
  password = false,
  name,
  error,
  style,
  styleError,
  value,
  onChange,
  onBlur,
  icon,
  placeholder,
  disabled,
  styleInputText,
  styleContainer,
  styleIcon,
  tooltip,
  tooltipOptions,
  required = false,
  min,
  max,
  minFractionDigits,
  maxFractionDigits,
}) => {
  return (
    <div className={`${style}`}>
      <div
        className={`p-inputgroup field h-3rem shadow-1  ${styleContainer}`}
      >
        {icon !== undefined ? (
          <span
            className={`p-inputgroup-addon bg-primary  ${styleIcon}`}
          >
            <i className={`${password ? 'pi pi-lock' : icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && ' border-red-500 border-1'
          }`}
        >
          <InputNumber
            className={`-left-none ${styleInputText}`}
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            onInput={onChange}
            disabled={disabled}
            tooltip={tooltip}
            tooltipOptions={tooltipOptions}
            min={min}
            max={max}
            minFractionDigits={minFractionDigits}
            maxFractionDigits={maxFractionDigits}
          />
          <label htmlFor={name}>
            {label}{' '}
            <span className={'text-overflow-clip'} style={{ color: 'red' }}>
              {required && '*'}
            </span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left mb-4 mt-3 ${error ?? styleError}`}
      >
        {error}
      </small>
    </div>
  );
};
