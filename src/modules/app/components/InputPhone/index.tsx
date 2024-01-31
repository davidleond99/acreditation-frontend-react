import { IconType } from 'primereact/utils';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';
import { InputMask } from 'primereact/inputmask';
import TooltipOptions from 'primereact/tooltip/tooltipoptions';
import React, { FC, useEffect, useState } from 'react';

interface InputProps {
  label?: string;
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
  onChange: any;
  icon?: IconType<PrimeButtonProps>;
  disabled?: boolean;
  tooltip?: string;
  mask?: string;
  placeholder?: string;
  tooltipOptions?: TooltipOptions;
  required?: boolean;
  contentEditable?: boolean;
  feedback?: boolean;
}

export const InputPhone: FC<InputProps> = ({
  label,
  name,
  type = 'text',
  error,
  style,
  styleError,
  value,
  onChange,
  icon,
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
  mask = '(99) 9999-99999',
  placeholder = '(99) 9999-99999',
}) => {
  const [phone, setPhone] = useState<string | number>();

  useEffect(() => {
    setPhone(value);
  }, [value]);

  return (
    <div className={`${style}`}>
      <div
        className={`p-inputgroup field h-3rem shadow-1  ${styleContainer}`}
      >
        {icon !== undefined ? (
          <span
            className={`p-inputgroup-addon bg-primary  ${styleIcon}`}
          >
            <i className={`${icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && ' border-red-500 border-1'
          }`}
        >
          <InputMask
            className={`-left-none ${styleInputText}`}
            id={name}
            name={name}
            contentEditable={contentEditable}
            type={type}
            autoComplete={autoComplete}
            value={phone}
            disabled={disabled}
            tooltip={tooltip}
            tooltipOptions={tooltipOptions}
            mask={mask}
            placeholder={placeholder}
            onChange={onChange}
            autoClear={false}
          ></InputMask>
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
