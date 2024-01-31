import AppRouter from './router';

import 'primereact/resources/themes/md-light-indigo/theme.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';

import { ReactElement, useEffect } from 'react';
import { useAppDispatch } from './store/index';
import { init } from './utils';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { BaseSetting } from './i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { PageServerError } from './components/500';

void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: BaseSetting.resourcesLanguage,
  lng: BaseSetting.defaultLanguage,
});

function App(): ReactElement {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void init(dispatch);
  }, []);

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => (
        <PageServerError error={error?.message ?? ''} />
      )}
    >
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
