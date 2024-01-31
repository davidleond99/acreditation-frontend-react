import { FC, ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Participants } from '../pages';
export const ParticipantsRouter: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path={''} key={'participants'} element={<Participants />} />
      <Route path={'create'} element={<Participants />} />
      <Route path={':codigo/edit'} element={<Participants />} />
      <Route path={'*'} element={<Navigate to={''} replace />} />
    </Routes>
  );
};

export default ParticipantsRouter;
