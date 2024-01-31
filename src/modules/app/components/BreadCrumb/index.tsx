import { BreadCrumb as BreadCrumbPrime } from 'primereact/breadcrumb';
import { FC, useEffect, useState } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

interface BreadCrumbProps {
  model?: MenuItem[];
}

export const BreadCrumb: FC<BreadCrumbProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [history, setHistory] = useState<MenuItem[]>([
    {
      label: 'Home',
      command() {
        navigate('/dashboard/participants');
      },
    },
  ]);
  const home = {
    icon: 'pi pi-home',
    command() {
      navigate('/dashboard/participants');
    },
  };

  useEffect(() => {
    const paths = location.pathname.split('/').slice(-1);
    setHistory(
      paths.map((path) => {
        let pathName = '';
        switch (path) {
          case 'edit':
            pathName = t('Editar');
            break;
          case 'create':
            pathName = t('Crear');
            break;
          case 'home':
            pathName = t('Inicio');
            break;
          case 'participants':
            pathName = t('Participantes');
            break;
          default:
            pathName = path;
        }
        return {
          label:
            path === ''
              ? t('participants')!
              : `${pathName[0]?.toUpperCase()}${pathName.substring(1)}`,
          className: 'text-lg',
        };
      })
    );
  }, [location, i18next.language]);
  return (
    <BreadCrumbPrime
      model={history}
      className={'mx-5 mt-8 mb-1 border-none bg-primary-50'}
      home={home}
    />
  );
};
