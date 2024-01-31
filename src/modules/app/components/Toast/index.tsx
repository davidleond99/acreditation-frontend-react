import { Toast as ToastPrime, ToastPositionType } from 'primereact/toast';

import { FC, ReactElement, useEffect, useRef } from 'react';
import { IShowMessage } from '../../types';
import { useSelector } from 'react-redux';
import { hideMessage, messageSelector } from '../../../../shared/redux/message';
import { useAppDispatch } from '../../store';
import { useTranslation } from 'react-i18next';

interface ToastProps {
  position?: ToastPositionType;
  children: ReactElement;
}

export const Toast: FC<ToastProps> = ({ position, children }) => {
  const { show, detail, summary, life, severity } =
    useSelector(messageSelector);
  const dispacth = useAppDispatch();
  const { t } = useTranslation();
  const toast = useRef<any>(null);
  const showSuccess = (data: IShowMessage): void => {
    toast.current?.show(data);
  };

  useEffect(() => {
    if (show) {
      showSuccess({
        detail: t(detail || '') || '',
        summary: t(summary) || 'error',
        life,
        severity,
      });
      setTimeout(() => {
        dispacth(hideMessage());
      }, life);
    }
  }, [show]);

  return (
    <>
      <ToastPrime ref={toast} position={position} />
      {children}
    </>
  );
};
