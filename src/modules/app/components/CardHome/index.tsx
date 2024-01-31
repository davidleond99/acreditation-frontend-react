import { Button } from '../Button';
import { FC, ReactElement } from 'react';
import { Card } from '../Card';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CardHomeProps {
  color: string;
  label:
    | 'participantes'
    | 'promociones'
    | 'reglas'
    | 'restricciones'
    | 'estadísticas'
    | 'usuarios'
    | 'tiendas'
    | 'monitorización';
  type?: string;
  total?: number;
  icon: string;
  canCreate?: boolean;
  canList?: boolean;
}

export const CardHome: FC<CardHomeProps> = ({
  color,
  type,
  total,
  icon,
  label,
  canCreate = true,
  canList = true,
}): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const header = (
    <div
      className={`-top-xl border-${color}-500 border-top-1 p-3 w-full flex flex-row flex-wrap justify-content-between`}
      style={{
        background: `linear-gradient(to right, var(--${color}-400), var(--${color}-500), var(--${color}-500), var(--${color}-600))`,
      }}
    >
      <i
        className={`pi ${icon}`}
        style={{ fontSize: '6em', color: 'white' }}
      ></i>
      <div className={'text-2xl text-white'}>
        <span className={'block text-right text-4xl'}>{total}</span>
        <span className={`capitalize text-center ${total !== null && 'mt-3'}`}>
          {label}
        </span>
      </div>
    </div>
  );
  const footer = (
    <div className={'-mt-3'}>
      {canCreate ? (
        <Button
          onClick={() => navigate(`/dashboard/${type}/create`)}
          label={t('high')!}
          icon={'pi pi-plus'}
          style={`font-medium mr-3 bg-${color}-500 shadow-2 border-3 border-white`}
        />
      ) : undefined}

      {canList ? (
        <Button
          onClick={() => navigate(`/dashboard/${type}`)}
          label={t('consultation')!}
          icon={'pi pi-eye'}
          style={`font-medium bg-${color}-500 shadow-2 border-3 border-white`}
        />
      ) : undefined}
    </div>
  );
  return (
    <Card
      header={header}
      footer={footer}
      style={
        'transition-all transition-duration-400 transition-delay-100 -xl mx-3 shadow-4 hover:shadow-7 rotate'
      }
    />
  );
};
