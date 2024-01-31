import { ChangeEventHandler, FC, FocusEventHandler } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { IconType } from 'primereact/utils';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';
import TooltipOptions from 'primereact/tooltip/tooltipoptions';

interface InputProps {
  label?: string;
  password?: boolean;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  error?: any;
  style?: string;
  styleInputText?: string;
  styleContainer?: string;
  styleIcon?: string;
  styleError?: string;
  value?: string | number;
  autoComplete?: string | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  disabled?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  required?: boolean;
  contentEditable?: boolean;
  feedback?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onFocus?: any;
}

export const Input: FC<InputProps> = ({
  label,
  password = false,
  name,
  type = 'text',
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
  placeholder,
  disabled,
  styleInputText,
  styleContainer,
  styleIcon,
  tooltip,
  tooltipOptions,
  required = false,
  contentEditable = true,
  feedback = false,
  autoComplete,
  onBlur,
  onFocus,
}) => {
  return (
    <div className={`${style}`}>
      <div className={`p-inputgroup field h-3rem shadow-1  ${styleContainer}`}>
        {icon !== undefined ? (
          <span
            className={`p-inputgroup-addon bg-primary border-noround  ${styleIcon}`}
          >
            <i className={`${password ? 'pi pi-lock' : icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && ' border-red-500 border-1'
          }`}
        >
          {password ? (
            <Password
              value={value}
              onChange={onChange}
              feedback={feedback}
              strongLabel={'Fuerte'}
              mediumLabel={'Media'}
              weakLabel={'Débil'}
              id="inputgroup"
              type="password"
              toggleMask={!!value}
              autoComplete={autoComplete}
              placeholder={placeholder}
              name={name}
              disabled={disabled}
              className={`${styleInputText} border-noround`}
            />
          ) : (
            <InputText
              onFocus={onFocus}
              className={`border-noround ${styleInputText}`}
              id={name}
              name={name}
              contentEditable={contentEditable}
              type={type}
              autoComplete={autoComplete}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              disabled={disabled}
              tooltip={tooltip}
              tooltipOptions={tooltipOptions}
              onBlur={onBlur}
              min={'0'}
            />
          )}
          <label htmlFor={name}>
            {label}{' '}
            <span className={'text-overflow-clip'} style={{ color: 'red' }}>
              {required && '*'}
            </span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left mb-4 mt-3 ${
          error ? styleError : ''
        }`}
      >
        {error}
      </small>
    </div>
  );
};
