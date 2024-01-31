import { FC, FocusEventHandler } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconType } from 'primereact/utils';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';

interface InputTextAreaProps {
  rows?: number;
  cols?: number;
  name: string;
  label?: string;
  error?: string;
  style?: string;
  styleInputText?: string;
  styleIcon?: string;
  styleError?: string;
  value?: string | number;
  onChange?: any;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  disabled?: boolean;
  showError?: boolean;
  required?: boolean;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
}

export const InputTextArea: FC<InputTextAreaProps> = ({
  rows,
  cols,
  label,
  name,
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
  placeholder,
  disabled,
  styleInputText,
  styleIcon,
  showError = true,
  required = false,
  onBlur,
}) => {
  return (
    <>
      <div className={`${style}`}>
        <div className="p-inputgroup field h-3rem shadow-1 ">
          {icon !== undefined ? (
            <span
              className={`p-inputgroup-addon bg-primary  ${styleIcon}`}
            >
              <i className={`${icon}`}></i>
            </span>
          ) : null}
          <span className={`p-float-label`}>
            <InputTextarea
              onBlur={onBlur}
              name={name}
              cols={1}
              rows={1}
              style={{ resize: 'none' }}
              value={value}
              onChange={onChange}
              className={`${styleInputText} ${
                error != null && 'ed border-red-500 border-1'
              }`}
            />
            <label htmlFor={name}>
              {label} <span style={{ color: 'red' }}>{required && '*'}</span>
            </label>
          </span>
        </div>
      </div>
      {error ? (
        <small className={`p-error py-2 block text-left${error ?? styleError}`}>
          {error}
        </small>
      ) : null}
    </>
  );
};
