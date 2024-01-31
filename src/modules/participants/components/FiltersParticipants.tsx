import { FC } from 'react';
import { Input } from '../../app/components/Input';
import { Select } from '../../app/components/Select';
import { Countries } from '../../app/data';

interface IFiltersParticipants {
  nameFilter: string;
  handleChangeNameFilter: (name: string) => void;
  codeFilter: string;
  handleChangeCodeFilter: (code: string) => void;
  countryFilter: string;
  handleChangeCountryFilter: (countries: string) => void;
}

export const FiltersParticipants: FC<IFiltersParticipants> = ({
  nameFilter,
  handleChangeNameFilter,
  codeFilter,
  handleChangeCodeFilter,
  countryFilter,
  handleChangeCountryFilter,
}) => {
  return (
    <>
      <Input
        style="col-12 md:col-6 xl:col-3"
        name={'codigo'}
        label={'Código'}
        value={codeFilter}
        onChange={(e) => handleChangeCodeFilter(e.target?.value ?? '')}
        icon={'pi pi-info-circle'}
      />
      <Input
        style="col-12 md:col-6 xl:col-3"
        name={'nombre'}
        value={nameFilter}
        onChange={(e) => handleChangeNameFilter(e.target?.value ?? '')}
        label={'Nombres y apellidos'}
        icon={'pi pi-info-circle'}
      />
      <Select
        selectStyle="col-12 md:col-6 xl:col-3"
        value={countryFilter}
        options={Countries()}
        onChange={(e) => {
          handleChangeCountryFilter(e.target?.value ?? '');
        }}
        name={'pais'}
        label={'País'}
        icon={'pi pi-info-circle'}
      />
    </>
  );
};
