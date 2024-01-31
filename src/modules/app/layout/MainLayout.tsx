import { FC, ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { MenuItem } from 'primereact/menuitem';

import { MenuBar } from '../components/MenuBar';
import { BreadCrumb } from '../components/BreadCrumb';
import { NavLink } from '../components/NavLink';
import { useTranslation } from 'react-i18next';

export const MainLayout: FC = (): ReactElement => {
  const { t } = useTranslation();
  const items: MenuItem[] = [
    {
      template: () => (
        <NavLink
          to={'/dashboard/participants'}
          end
          icon={'pi pi-pw pi-users'}
          label={t('Participantes')!}
        />
      ),
    },
  ];
  return (
    <div className={'container bg-primary-50'}>
      <MenuBar model={items} />
      <BreadCrumb />
      <div className={'mx-4 mb-7 fadein animation-duration-500 z-0'}>
        <Outlet />
      </div>
    </div>
  );
};
