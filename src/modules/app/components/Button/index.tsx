import { FC, LegacyRef, MouseEventHandler } from 'react';

import {
  Button as PrimeButton,
  ButtonPositionType,
  ButtonProps as PrimeButtonProps,
} from 'primereact/button';
import { IconType } from 'primereact/utils';
import TooltipOptions from 'primereact/tooltip/tooltipoptions';
import { useTranslation } from 'react-i18next';

interface ButtonProps {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: IconType<PrimeButtonProps>;
  iconPos?: ButtonPositionType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  tooltipOptions?: TooltipOptions;
  refE?: LegacyRef<PrimeButton>;
}

export const Button: FC<ButtonProps> = ({
  label,
  disabled = false,
  style,
  type = 'button',
  icon,
  loading,
  iconPos,
  onClick,
  tooltip,
  tooltipOptions,
  refE,
}) => {
  const { t } = useTranslation();
  return (
    <PrimeButton
      ref={refE}
      onClick={onClick}
      iconPos={iconPos}
      loading={loading}
      disabled={disabled || loading}
      className={`transition-all transition-duration-500 border-noround transition-delay-100 hover:shadow-5 ${style}`}
      type={type}
      label={loading ?? false ? t('loading')! : label}
      icon={icon}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  );
};
