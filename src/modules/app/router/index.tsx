import { FC, ReactElement, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Loading } from '../components/Loading';
import { MainLayout } from '../layout/MainLayout';
import { useSelector } from 'react-redux';
import { authSelector } from '../../auth/redux';
import { PageNotFound } from '../components/404';
import { PageServerError } from '../components/500';
import AuthRouter from '../../auth/router';
import ParticipantRouter from '../../participants/router';

export const AppRouter: FC = (): ReactElement => {
  const { user, logged } = useSelector(authSelector);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/server-error'} element={<PageServerError />} />
        <Route
          path="/auth/*"
          element={
            <Suspense fallback={<Loading show={true} />}>
              <AuthRouter />
            </Suspense>
          }
        />
        <Route path="dashboard/*" element={<MainLayout />}>
          <Route
            path="participants/*"
            element={
              <PrivateRoute isAllowed={!!user && logged}>
                <Suspense fallback={<Loading show={true} />}>
                  <ParticipantRouter />
                </Suspense>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/" element={<Navigate replace to={'/auth/login'} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRouter;
