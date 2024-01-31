import { CrudLayout } from '../../../shared/layouts';
import { useAppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import {
  deleteParticipant,
  getParticipants,
  participantsSelector,
  setRows,
} from '../redux';
import { ColumnProps } from 'primereact/column';
import { useTranslation } from 'react-i18next';
import { FormParticipant } from '../components/FormParticipants';
import { useEffect, useState } from 'react';
import { IParticipant } from '../types';
import { Button } from '../../app/components/Button';
import { useNavigate } from 'react-router-dom';
import { FiltersParticipants } from '../components/FiltersParticipants';
import { TCountryCode, getCountryData } from 'countries-list';
import { Countries, Organismos } from '../../app/data';

export const Participants = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { initalRows, loading, participants, deleting } =
    useSelector(participantsSelector);
  const [participantsFiltered, setParticipantsFiltered] =
    useState<IParticipant[]>(participants);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [codeFilter, setCodeFilter] = useState<string>('');
  const [countryFilter, setCountryFilter] = useState<string>('');

  const column: ColumnProps[] = [
    {
      field: 'actions',
      header: t('Acciones'),
      body: (data: IParticipant) => (
        <>
          <Button
            disabled={deleting}
            onClick={() => {
              navigate(`${data.codigo}/edit`);
            }}
            icon="pi pi-pencil"
            style="mr-2 p-button-rounded cursos-pointer p-button-text shadow-none hover:bg-primary p-button-lg"
            tooltip="Editar"
            tooltipOptions={{ position: 'top' }}
          />
          <Button
            disabled={deleting}
            onClick={() => {
              void dispatch(deleteParticipant(data.codigo?.toString()))
                .unwrap()
                .then((deleted) => {
                  if (deleted) {
                    setParticipantsFiltered((prev) =>
                      prev.filter(
                        (p) => p.codigo.toString() !== data.codigo.toString()
                      )
                    );
                  }
                });
            }}
            icon="pi pi-trash"
            style="mr-2 p-button-rounded cursos-pointer p-button-text shadow-none hover:bg-primary p-button-lg"
            tooltip="Editar"
            tooltipOptions={{ position: 'top' }}
          />
        </>
      ),
    },
    {
      field: 'codigo',
      header: t('Codigo'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.codigo || '-'}</span>;
      },
    },
    {
      field: 'nombre',
      header: t('Nombres y apellidos'),
      sortable: true,
      style: {
        whiteSpace: 'break-spaces',
      },
      className: 'w-auto max-w-full',
      body: (data: IParticipant) => {
        return <span>{data.nombre || '-'}</span>;
      },
    },
    {
      field: 'simposio',
      header: t('Simposio'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.simposio || '-'}</span>;
      },
    },
    {
      field: 'taller',
      header: t('Taller'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.taller || '-'}</span>;
      },
    },
    {
      field: 'pais',
      header: t('País'),
      sortable: true,
      body: (data: IParticipant) => {
        return (
          <span>
            {data.pais
              ? getCountryData(data.pais as TCountryCode)?.name ??
                Countries().find(
                  (country) =>
                    country.label
                      ?.toLowerCase()
                      .includes(data.pais!.toLowerCase()) ||
                    country.value
                      ?.toLowerCase()
                      .includes(data.pais!.toLowerCase())
                )?.label
              : '-'}
          </span>
        );
      },
    },
    {
      field: 'organismo',
      header: t('Organismo'),
      sortable: true,
      body: (data: IParticipant) => {
        return (
          <span>
            {data.organismo
              ? Organismos.find(
                  (organismo) =>
                    organismo.label
                      ?.toLowerCase()
                      .includes(data.organismo!.toLowerCase()) ||
                    organismo.value
                      ?.toLowerCase()
                      .includes(data.organismo!.toLowerCase())
                )?.label
              : '-'}
          </span>
        );
      },
    },
    {
      field: 'institucion',
      header: t('Institucion'),
      sortable: true,
      style: {
        whiteSpace: 'break-spaces',
      },
      className: 'w-auto max-w-full',
      body: (data: IParticipant) => {
        return <span>{data.institucion || '-'}</span>;
      },
    },
    {
      field: 'provincia',
      header: t('Provincia'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.provincia || '-'}</span>;
      },
    },
    {
      field: 'clasificacion',
      header: t('Clasificacion'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.clasificacion || '-'}</span>;
      },
    },
    {
      field: 'acreditado',
      header: t('Acreditado'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.acreditado || '-'}</span>;
      },
    },
    {
      field: 'acceso_apertura',
      header: t('Acceso apertura'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.acceso_apertura || '-'}</span>;
      },
    },
    {
      field: 'acceso_clausura',
      header: t('Acceso clausura'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.acceso_clausura || '-'}</span>;
      },
    },
    {
      field: 'acceso_clubhabana',
      header: t('Acceso clubhabana'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.acceso_clubhabana || '-'}</span>;
      },
    },
    {
      field: 'acceso_actividad_clausura',
      header: t('Acceso actividad clausura'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.acceso_actividad_clausura || '-'}</span>;
      },
    },
    {
      field: 'acceso_ballet',
      header: t('Acceso ballet'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.acceso_ballet || '-'}</span>;
      },
    },
    {
      field: 'ponente',
      header: t('Ponente'),
      sortable: true,
      body: (data: IParticipant) => {
        return <span>{data.ponente || '-'}</span>;
      },
    },
  ];

  useEffect(() => {
    void dispatch(getParticipants({})).then((data) => {
      setParticipantsFiltered(data.payload as IParticipant[]);
    });
  }, []);

  const handleChangeNameFilter = (name: string) => {
    setNameFilter(name);
    setParticipantsFiltered(
      participants.filter((participant) =>
        name || codeFilter || countryFilter.length
          ? (codeFilter
              ? participant.codigo
                  ?.toString()
                  ?.startsWith(codeFilter?.toString())
              : true) &&
            (name
              ? participant.nombre?.toLowerCase()?.includes(name?.toLowerCase())
              : true) &&
            (countryFilter.length && participant.pais
              ? Countries().find((c) => c.value === countryFilter)?.label ===
                  participant.pais ||
                Countries().find((c) => c.value === countryFilter)?.value ===
                  participant.pais
              : true)
          : true
      )
    );
  };

  const handleChangeCodeFilter = (code: string) => {
    setCodeFilter(code);
    setParticipantsFiltered(
      participants.filter((participant) =>
        code || nameFilter || countryFilter
          ? (code
              ? participant.codigo?.toString()?.startsWith(code?.toString())
              : true) &&
            (nameFilter
              ? participant.nombre
                  ?.toLowerCase()
                  ?.includes(nameFilter?.toLowerCase())
              : true) &&
            (countryFilter && participant.pais
              ? Countries().find((c) => c.value === countryFilter)?.label ===
                  participant.pais ||
                Countries().find((c) => c.value === countryFilter)?.value ===
                  participant.pais
              : true)
          : true
      )
    );
  };

  const handleChangeCountryFilter = (country: string) => {
    setCountryFilter(country);
    setParticipantsFiltered(
      participants.filter((participant) =>
        codeFilter || nameFilter || country
          ? (codeFilter
              ? participant.codigo
                  ?.toString()
                  ?.startsWith(codeFilter?.toString())
              : true) &&
            (nameFilter
              ? participant.nombre
                  ?.toLowerCase()
                  ?.includes(nameFilter?.toLowerCase())
              : true) &&
            (country && participant.pais
              ? Countries().find((c) => c.value === country)?.label ===
                  participant.pais ||
                Countries().find((c) => c.value === country)?.value ===
                  participant.pais
              : true)
          : true
      )
    );
  };

  return (
    <CrudLayout
      newRows={(rows: number) => {
        dispatch(setRows(rows));
      }}
      initalRow={initalRows}
      update={{
        updateForm: <FormParticipant />,
        updateFormTitle: t('Actualizar participante'),
      }}
      create={{
        createForm: <FormParticipant />,
        createFormTitle: t('Crear participante'),
      }}
      list={{
        titleHeaderTable: loading
          ? t('Cargando participantes')
          : t('Participantes'),
        filtersComponents: (
          <FiltersParticipants
            nameFilter={nameFilter}
            handleChangeNameFilter={handleChangeNameFilter}
            codeFilter={codeFilter}
            handleChangeCodeFilter={handleChangeCodeFilter}
            countryFilter={countryFilter}
            handleChangeCountryFilter={handleChangeCountryFilter}
          />
        ),
        loading,
        columsTable: column,
        value: participantsFiltered,
      }}
    />
  );
};
