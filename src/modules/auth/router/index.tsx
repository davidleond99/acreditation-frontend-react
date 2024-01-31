import { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../page/LoginPage';

export const AuthRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<Navigate replace to="login" />} />
    </Routes>
  );
};

export default AuthRouter;
