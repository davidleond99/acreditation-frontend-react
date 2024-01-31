import { FC, useEffect } from 'react';
import { Card } from '../../modules/app/components/Card';
import { HeaderTable } from '../../modules/app/components/HeaderTable';
import { GenericTable } from '../../modules/app/components/Table/GenericTable';
import { ColumnProps } from 'primereact/column';
import { useLocation } from 'react-router-dom';
import { myLocations } from '../types';
import { Loading } from '../../modules/app/components/Loading';

export interface ICrudLayoutProps {
  initalRow?: number;
  showHeader?: boolean;
  newRows?: any;
  list: {
    filtersComponents?: JSX.Element;
    titleHeaderTable: string;
    loading: boolean;
    value: any[] | undefined;
    columsTable: ColumnProps[];
  };
  create: {
    createFormTitle: string;
    createForm: JSX.Element;
  };
  update: {
    updateFormTitle: string;
    updateForm: JSX.Element;
  };
  showloading?: boolean;
  navigateCreate?: any;
}

export const CrudLayout: FC<ICrudLayoutProps> = ({
  initalRow,
  newRows,
  list,
  create,
  update,
  navigateCreate,
  showloading = false,
  showHeader = true,
}) => {
  const location = useLocation();
  const { columsTable, filtersComponents, loading, titleHeaderTable, value } =
    list;
  const { createForm } = create;
  const { updateForm } = update;
  useEffect(() => {}, []);
  return (
    <>
      {location.pathname.split('/')[2] ===
        myLocations.filter(
          (resp) => resp.name === location.pathname.split('/')[2]
        )[0]?.name && location.pathname.split('/').at(-1) === 'edit' ? (
        <> {updateForm}</>
      ) : location.pathname.split('/')[2] ===
          myLocations.filter(
            (resp) => resp.name === location.pathname.split('/')[2]
          )[0].name && location.pathname.split('/').at(-1) === 'create' ? (
        <> {createForm}</>
      ) : location.pathname.split('/')[2] ===
        myLocations.filter(
          (resp) => resp.name === location.pathname.split('/')[2]
        )[0]?.name ? (
        <>
          <Loading show={showloading} />
          {filtersComponents && (
            <Card
              style={'mx-3 shadow-3'}
              header={<h2 className="px-3 pt-1 m-0 font-semibold">Filtros</h2>}
            >
              <div className={'grid flex-row -mt-3'}>{filtersComponents}</div>
            </Card>
          )}
          <Card
            header={
              showHeader ? (
                <HeaderTable
                  navigateCreate={navigateCreate}
                  disabled={loading}
                  title={titleHeaderTable}
                />
              ) : undefined
            }
            style={'mx-3 my-3 shadow-3'}
          >
            <GenericTable
              customKey="codigo"
              newRows={newRows}
              initalRow={initalRow}
              value={value}
              dataTable={{ value }}
              colums={columsTable}
              loading={loading}
            />
          </Card>
        </>
      ) : null}
    </>
  );
};
