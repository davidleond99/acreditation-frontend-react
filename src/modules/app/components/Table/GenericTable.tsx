import {
  DataTable,
  DataTablePFSEvent,
  DataTableProps,
} from 'primereact/datatable';
import { ChangeEvent, FC, useState } from 'react';
import { Column, ColumnProps } from 'primereact/column';
import { PaginatorTemplate } from 'primereact/paginator';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useTranslation } from 'react-i18next';

interface GenericTableProps {
  dataTable?: DataTableProps;
  colums: ColumnProps[];
  value: any[] | undefined;
  loading: boolean;
  initalRow?: number;
  newRows?: any;
  customKey?: string;
  showSelection?: boolean;
  showExpansion?: boolean;
  selection?: any;
  onSelectionChange?: any;
  rowExpansionTemplate?: any;
}

export const GenericTable: FC<GenericTableProps> = ({
  colums,
  value,
  loading,
  dataTable,
  initalRow = 10,
  newRows = () => {},
  onSelectionChange,
  selection,
  showSelection,
  showExpansion,
  rowExpansionTemplate,
  customKey,
}) => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(initalRow);
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState();
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Presione 'Enter' para ir a esta página."
  );
  const onPageInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCurrentPage(+event.target.value);
  };
  const onCustomPage = (event: DataTablePFSEvent): void => {
    setFirst(event.first);
    setRows(event.rows);
    newRows(event.rows);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setCurrentPage(+event.page! + 1);
  };
  const onPageInputKeyDown = (event: any, options: any): void => {
    if (event.key === 'Enter') {
      const page = parseInt(String(currentPage));
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(`${t('valor_entre')} ${options.totalPages}.`);
      } else {
        const first = currentPage !== 0 ? options.rows * (page - 1) : 0;

        setFirst(first);
        setPageInputTooltip("Presione 'Enter' para ir a esta página.");
      }
    }
  };
  const paginatorTemplate: PaginatorTemplate = {
    FirstPageLink: undefined,
    JumpToPageInput: undefined,
    LastPageLink: undefined,
    NextPageLink: undefined,
    PageLinks: undefined,
    PrevPageLink: undefined,
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ];

      return (
        <div>
          <span
            className="mx-1"
            style={{ color: 'var(--text-color)', userSelect: 'none' }}
          >
            {t('paginado')}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
            className={'mr-3 border-primary'}
          />
        </div>
      );
    },
    CurrentPageReport: (options: any) => {
      return (
        <div className={'-mr-8'}>
          <span
            style={{
              color: 'var(--text-color)',
              userSelect: 'none',
              width: '120px',
              textAlign: 'center',
            }}
          >
            {options.first} - {options.last} de {options.totalRecords}
          </span>
          <span
            className={'ml-2'}
            style={{ color: 'var(--text-color)', userSelect: 'none' }}
          >
            {' '}
            {t('ir')}{' '}
            <InputText
              type={'number'}
              className="ml-1 w-2 -mr-6 border-primary"
              tooltip={pageInputTooltip}
              value={currentPage}
              onKeyDown={(e) => onPageInputKeyDown(e, options)}
              onChange={onPageInputChange}
            />
          </span>
        </div>
      );
    },
  };
  return (
    <DataTable
      {...dataTable}
      emptyMessage={t('No hay resultados')}
      className={'w-auto'}
      paginatorClassName="justify-content-end"
      paginatorTemplate={paginatorTemplate}
      first={first}
      rows={rows}
      responsiveLayout="stack"
      onPage={onCustomPage}
      paginator
      removableSort
      scrollable
      scrollDirection={'horizontal'}
      resizableColumns
      columnResizeMode="fit"
      selectionMode="checkbox"
      dataKey={customKey || 'id'}
      selection={selection}
      onSelectionChange={onSelectionChange}
      expandedRows={expandedRows}
      rowExpansionTemplate={rowExpansionTemplate}
    >
      {showExpansion && (
        <Column
          expander
          // expander={(row: any) => row.descripcion}
          body={(row) => {
            if (row.descripcion) {
              const key: string = row.id;
              return !expandedRows?.[key] ? (
                <i
                  className="pi pi-chevron-right"
                  onClick={() =>
                    setExpandedRows((prev: any) => {
                      const newState = { ...prev };
                      newState[row[customKey || 'sk']] =
                        !newState[row[customKey || 'sk']];
                      return newState;
                    })
                  }
                ></i>
              ) : (
                <i
                  className="pi pi-chevron-down"
                  onClick={() =>
                    setExpandedRows((prev: any) => {
                      const newState = { ...prev };
                      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                      delete newState[row[customKey || 'sk']];
                      return newState;
                    })
                  }
                ></i>
              );
            }
          }}
          style={{ maxWidth: '3rem' }}
        ></Column>
      )}
      {colums.map((resp, i) => (
        <Column {...resp} key={i} />
      ))}
    </DataTable>
  );
};
