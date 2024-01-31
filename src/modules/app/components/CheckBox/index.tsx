import { FC } from 'react';
import { Checkbox as PrimeCheckBox } from 'primereact/checkbox';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';
import { IconType } from 'primereact/utils';

interface CheckBoxProps {
  label?: string;
  name: string;
  error?: string;
  style?: string;
  styleError?: string;
  value?: any;
  onChange: any;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  disabled?: boolean;
  checked: any;
}

export const CheckBox: FC<CheckBoxProps> = ({
  label,
  name,
  disabled,
  style,
  value,
  onChange,
  checked,
}) => {
  return (
    <div className={`field-checkbox ${style}`}>
      <PrimeCheckBox
        disabled={disabled}
        checked={checked}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
