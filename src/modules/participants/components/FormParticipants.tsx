import { FC, ReactElement, useEffect } from 'react';

import * as Yup from 'yup';

import { InputSwitch } from 'primereact/inputswitch';
import { Card } from '../../app/components/Card';
import { useFormik } from 'formik';
import { Button } from '../../app/components/Button';
import { useAppDispatch } from '../../app/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Input } from '../../app/components/Input';
import { IParticipant } from '../types';
import {
  createParticipant,
  editParticipant,
  getParticipantById,
  participantsSelector,
} from '../redux';
import { useSelector } from 'react-redux';
import { Select } from '../../app/components/Select';
import {
  Clasificacion,
  Countries,
  Organismos,
  Provincias,
  Simposios,
  Talleres,
} from '../../app/data';

const initialValues = {
  codigo: 0,
  simposio: undefined,
  taller: undefined,
  nombre: '',
  pais: undefined,
  organismo: undefined,
  institucion: '',
  provincia: undefined,
  clasificacion: undefined,
  acreditado: undefined,
  acceso_apertura: undefined,
  acceso_clausura: undefined,
  acceso_clubhabana: undefined,
  acceso_actividad_clausura: undefined,
  acceso_ballet: undefined,
  ponente: undefined,
};

const SignupSchema = Yup.object().shape({
  nombre: Yup.string().required('Campo requerido'),
  pais: Yup.string().required('Campo requerido'),
});

export const FormParticipant: FC = (): ReactElement => {
  const { creating } = useSelector(participantsSelector);
  const { codigo } = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const locate = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (values: IParticipant) => {
    if (codigo) {
      void handleUpdateParticipant(values);
    } else {
      void handleCreateParticipant(values);
    }
  };

  const handleCreateParticipant = async (values: IParticipant) => {
    try {
      const response = await dispatch(createParticipant(values)).unwrap();
      if (response) {
        formik.resetForm({
          values: initialValues,
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleUpdateParticipant = async (values: IParticipant) => {
    try {
      const response = await dispatch(editParticipant(values)).unwrap();
      if (response) {
        navigate(-1);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const handleGetParticipantById = async (codigo: string) => {
    try {
      const response = await dispatch(getParticipantById(codigo)).unwrap();
      if (response) {
        const country = Countries().find(
          (country) =>
            country.label === response.pais || country.value === response.pais
        );
        formik.resetForm({
          values: { ...response, pais: country?.value || undefined },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const formik = useFormik<IParticipant>({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: SignupSchema,
  });

  useEffect(() => {
    if (codigo) void handleGetParticipantById(codigo);
  }, [codigo]);

  return (
    <div>
      <form>
        <Card
          style={'shadow-3'}
          title={
            locate.pathname.split('/').at(-1) === 'edit'
              ? t('Actualizar participant')
              : t('Crear participante')
          }
        >
          <div className={'flex flex-wrap'}>
            <Input
              required
              style="col-12 md:col-6 xl:col-3"
              value={formik.values?.nombre}
              name={'nombre'}
              label={t('Nombres y apellidos')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nombre ? formik.errors.nombre : undefined}
            />
            <Select
              selectStyle="col-12 md:col-6 xl:col-3"
              required
              value={formik.values?.pais}
              options={Countries()}
              name={'pais'}
              label={t('País')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pais ? formik.errors.pais : undefined}
            />
            <Input
              style="col-12 md:col-6 xl:col-3"
              value={formik.values?.institucion}
              name={'institucion'}
              label={t('Institucion')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.institucion
                  ? formik.errors.institucion
                  : undefined
              }
            />
            <Select
              selectStyle="col-12 md:col-6 xl:col-3"
              value={formik.values?.provincia}
              name={'provincia'}
              options={Provincias}
              label={t('Provincia')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.provincia ? formik.errors.provincia : undefined
              }
            />
            <Select
              selectStyle="col-12 md:col-6 xl:col-3"
              value={formik.values?.simposio}
              name={'simposio'}
              options={Simposios}
              label={t('Simposio')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.simposio ? formik.errors.simposio : undefined
              }
            />
            <Select
              selectStyle="col-12 md:col-6 xl:col-3"
              value={formik.values?.taller}
              name={'taller'}
              label={t('Taller')!}
              options={Talleres}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.taller ? formik.errors.taller : undefined}
            />
            <Select
              selectStyle="col-12 md:col-6 xl:col-3"
              value={formik.values?.organismo}
              name={'organismo'}
              options={Organismos}
              label={t('Organismo')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.organismo ? formik.errors.organismo : undefined
              }
            />
            <Select
              selectStyle="col-12 md:col-6 xl:col-3"
              value={formik.values?.clasificacion}
              name={'clasificacion'}
              options={Clasificacion}
              label={t('Clasificacion')!}
              icon={'pi pi-info-circle'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.clasificacion
                  ? formik.errors.clasificacion
                  : undefined
              }
            />
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'acreditado'}
                checked={!!formik.values.acreditado}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'acreditado',
                    formik.values.acreditado ? undefined : 'acreditado'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Acreditado')!}</span>
            </div>
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'ponente'}
                checked={!!formik.values.ponente}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'ponente',
                    formik.values.ponente ? undefined : 'ponente'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Ponente')!}</span>
            </div>
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'acceso_apertura'}
                checked={!!formik.values.acceso_apertura}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'acceso_apertura',
                    formik.values.acceso_apertura
                      ? undefined
                      : 'acceso_apertura'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Acceso apertura')!}</span>
            </div>
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'acceso_clausura'}
                checked={!!formik.values.acceso_clausura}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'acceso_clausura',
                    formik.values.acceso_clausura
                      ? undefined
                      : 'acceso_clausura'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Acceso clausura')!}</span>
            </div>
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'acceso_clubhabana'}
                checked={!!formik.values.acceso_clubhabana}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'acceso_clubhabana',
                    formik.values.acceso_clubhabana
                      ? undefined
                      : 'acceso_clubhabana'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Acceso Club Habana')!}</span>
            </div>
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'acceso_actividad_clausura'}
                checked={!!formik.values.acceso_actividad_clausura}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'acceso_actividad_clausura',
                    formik.values.acceso_actividad_clausura
                      ? undefined
                      : 'acceso_actividad_clausura'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Acceso actividad clausura')!}</span>
            </div>
            <div className={'col-3 mt-4 flex flex-warp'}>
              <InputSwitch
                name={'acceso_ballet'}
                checked={!!formik.values.acceso_ballet}
                onChange={(e) => {
                  void formik.setFieldValue(
                    'acceso_ballet',
                    formik.values.acceso_ballet ? undefined : 'acceso_ballet'
                  );
                }}
              />
              <span className={'ml-3'}>{t('Acceso ballet')!}</span>
            </div>
          </div>
        </Card>

        <div className={'grid flex-row mt-3 mr-3 justify-content-end'}>
          <Button
            loading={creating}
            type="button"
            style={'mr-3 bg-red-600 border-red-600'}
            label={t('Cancelar')!}
            icon={'pi pi-check'}
            onClick={() => navigate(-1)}
          />
          <Button
            loading={creating}
            onClick={() => handleSubmit(formik.values)}
            disabled={!formik.isValid || !formik.touched || !formik.dirty}
            type="button"
            label={t('Guardar')!}
            icon={'pi pi-save'}
          />
        </div>
      </form>
    </div>
  );
};
