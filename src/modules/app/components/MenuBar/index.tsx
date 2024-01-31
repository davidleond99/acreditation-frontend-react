import {
  Menubar,
  MenubarEndTemplate,
  MenubarStartTemplate,
} from 'primereact/menubar';
import { FC, ReactElement, useRef } from 'react';
import { MenuItem } from 'primereact/menuitem';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { logout, authSelector, changeLang } from '../../../auth/redux';
import { useAppDispatch } from '../../store';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink } from '../NavLink';
import { Dropdown } from 'primereact/dropdown';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface MenuProps {
  model?: MenuItem[];
  start?: MenubarStartTemplate;
  end?: MenubarEndTemplate;
  style?: string;
}

export const MenuBar: FC<MenuProps> = ({
  model,
  start,
  end,
  style,
}): ReactElement => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const menu = useRef<any>(null);
  const menuItems: MenuItem[] = [
    {
      label: t('salir')!,
      icon: 'pi pi-fw pi-sign-out',
      command() {
        dispatch(logout());
      },
    },
  ];

  return (
    <Menubar
      style={{
        background: `linear-gradient(to right, var(--primary-100), var(--primary-50), var(--primary-100), var(--primary-100))`,
      }}
      className={`shadow-3 max-w-screen w-screen fixed top-0 z-5 ${style}`}
      model={model}
      start={start ?? <Link to={'/participants'}></Link>}
      end={
        end ?? (
          <div className="flex flex-wrap">
            <TieredMenu model={menuItems} popup ref={menu} id="overlay_tmenu" />

            <Button
              label={'Salir'}
              className="transition-duration-400 hover:shadow-4 mr-3"
              aria-label="User"
              onClick={() => {
                void dispatch(logout());
              }}
              aria-haspopup
              aria-controls="overlay_tmenu"
            />
          </div>
        )
      }
    />
  );
};
