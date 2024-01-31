import { FC, ReactElement, useEffect } from 'react';
import { Image } from 'primereact/image';
import { Input } from '../../app/components/Input';
import { Button } from '../../app/components/Button';
import { Card } from '../../app/components/Card';
import { useSelector } from 'react-redux';
import { authSelector, loginUser } from '../redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store';
import { useFormik } from 'formik';
import { IAuthRequest } from '../types';
import * as Yup from 'yup';
import { showMessage } from '../../../shared/redux/message';
import { useTranslation } from 'react-i18next';

const SignupSchema = Yup.object().shape({
  usuario: Yup.string().required('Campo requerido'),
  contrasena: Yup.string().required('Campo requerido'),
});

export const LoginPage: FC = (): ReactElement => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: { usuario: '', contrasena: '' },
    onSubmit: async (values: IAuthRequest) => {
      await handleLogin(values);
    },
    validationSchema: SignupSchema,
  });

  const { logged, error, loading } = useSelector(authSelector);

  const handleLogin = async (input: IAuthRequest) => {
    void dispatch(loginUser(input));
  };

  useEffect(() => {
    if (localStorage.getItem('expired')) {
      dispatch(
        showMessage({
          severity: 'info',
          summary: 'Debe iniciar sesión nuavemente',
        })
      );
      localStorage.removeItem('expired');
    }
    if (logged) {
      navigate('/dashboard/participants', { replace: true });
    }

    if (error) dispatch(showMessage({ severity: 'error', summary: error }));
  }, [logged, error]);

  return (
    <div className="bg-no-repeat bg-cover bg-center h-screen flex justify-content-center align-items-center overflow-y-scroll">
      <div className="justify-content-center">
        <Image
          imageClassName="h-15rem scalein animation-duration-500"
          src={`${require('../../../assets/login.jpeg')}`}
          alt="Login image"
        />
      </div>
      <Card
        title={t('Bienvenido')}
        style={
          'px-3 pb-2 mb-8 -xl shadow-7 align-self-center text-center col-10 md:col-5 lg:col-4 xl:col-3'
        }
      >
        <form className="p-fluid mb-0" onSubmit={formik.handleSubmit}>
          <Input
            label={t('Usuario')!}
            name={'usuario'}
            icon={'pi pi-user'}
            onChange={formik.handleChange}
            value={formik.values.usuario}
            error={formik.touched.usuario ? formik.errors.usuario : undefined}
          />
          <Input
            label={t('Contraseña')!}
            name={'contrasena'}
            password
            icon={'pi pi-lock'}
            style={'mt-6'}
            onChange={formik.handleChange}
            value={formik.values.contrasena}
            error={
              formik.touched.contrasena ? formik.errors.contrasena : undefined
            }
          />

          <Button
            disabled={!formik.isValid || !formik.dirty}
            label={t('Entrar')!}
            icon={'pi pi-sign-in'}
            style={'mb-3 mt-3 shadow-2'}
            type={'submit'}
            loading={loading}
          />
        </form>
      </Card>
    </div>
  );
};
