import { FC, ReactElement } from 'react';
import {
  Dropdown,
  DropdownItemTemplateType,
  DropdownProps,
} from 'primereact/dropdown';
import {
  MultiSelect,
  MultiSelectOptionGroupTemplateType,
} from 'primereact/multiselect';

export interface SelectProps extends DropdownProps {
  // options?: any[];
  label?: string;
  icon?: string;
  error?: any;
  styleError?: string;
  selectStyle?: string;
  optionGroupLabel?: string;
  optionGroupChildren?: string;
  optionGroupTemplate?: MultiSelectOptionGroupTemplateType;
  itemTemplate?: DropdownItemTemplateType;
}

export const Select: FC<SelectProps> = ({
  value,
  options,
  style,
  icon,
  error,
  name,
  label,
  styleError,
  filterBy,
  disabled,
  onChange,
  onBlur,
  onHide,
  type = 'basic',
  selectStyle,
  required,
  onFocus,
  onMouseDown,
  optionGroupLabel,
  optionGroupChildren,
  optionGroupTemplate,
  tooltip,
  tooltipOptions,
  itemTemplate,
}): ReactElement => {
  return (
    <div className={`${selectStyle}`}>
      <div className="p-inputgroup field h-3rem shadow-1 ">
        {icon !== undefined ? (
          <span className="p-inputgroup-addon border-noround border-no bg-primary ">
            <i className={`${icon}`}></i>
          </span>
        ) : null}
        <span
          className={`p-float-label ${
            error != null && ' border-red-500 border-1'
          }`}
        >
          {type === 'basic' ? (
            <Dropdown
              className="w-full md:w-15rem"
              disabled={disabled}
              emptyMessage={'No hay resultados que mostrar'}
              filter
              filterBy={filterBy ?? 'label'}
              id={name}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              onMouseDown={onMouseDown}
              optionLabel="label"
              options={options}
              optionValue={'value'}
              showClear
              itemTemplate={itemTemplate}
              style={style}
              value={value}
              optionGroupChildren={optionGroupChildren}
              optionGroupLabel={optionGroupLabel}
              optionGroupTemplate={optionGroupTemplate}
              tooltip={tooltip}
              tooltipOptions={tooltipOptions}
            />
          ) : (
            <MultiSelect
              className="w-full md:w-15rem"
              disabled={disabled}
              filter
              filterBy={filterBy ?? 'label'}
              id={name}
              name={name}
              onChange={onChange}
              onHide={onHide}
              itemTemplate={itemTemplate}
              optionGroupChildren={optionGroupChildren}
              optionGroupLabel={optionGroupLabel}
              optionGroupTemplate={optionGroupTemplate}
              optionLabel="label"
              options={options}
              optionValue={'value'}
              showClear
              style={style}
              value={value}
              tooltip={tooltip}
              tooltipOptions={tooltipOptions}
            />
          )}
          <label className={'text-overflow-clip'} htmlFor={name}>
            {label}{' '}
            <span className={'text-overflow-clip'} style={{ color: 'red' }}>
              {required && '*'}
            </span>
          </label>
        </span>
      </div>
      <small
        className={`p-error block text-left mb-2 mt-3  ${error ?? styleError}`}
      >
        {error}
      </small>
    </div>
  );
};
