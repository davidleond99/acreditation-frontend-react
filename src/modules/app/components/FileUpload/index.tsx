import { FC } from 'react';
import {
  FileUpload as PrimeFileUpload,
  FileUploadEmptyTemplateType,
  FileUploadModeType,
  FileUploadOptionsType,
} from 'primereact/fileupload';
import { IconType } from 'primereact/utils';
import { ButtonProps as PrimeButtonProps } from 'primereact/button';
import { useTranslation } from 'react-i18next';

interface FileUploadProps {
  label?: string;
  name: string;
  error?: string;
  style?: string;
  styleError?: string;
  value?: string;
  onChange?: any;
  uploadHandler?: any;
  onBeforeUpload?: any;
  icon?: IconType<PrimeButtonProps>;
  placeholder?: string;
  uploadOptions?: FileUploadOptionsType;
  cancelOptions?: FileUploadOptionsType;
  chooseOptions?: FileUploadOptionsType;
  auto?: boolean;
  customUpload?: boolean;
  accept?: string;
  mode?: FileUploadModeType;
  emptyTemplate?: FileUploadEmptyTemplateType;
  fileRef?: any;
  className?: any;
}

export const FileUpload: FC<FileUploadProps> = ({
  name,
  value,
  onChange,
  uploadHandler,
  onBeforeUpload,
  uploadOptions,
  cancelOptions,
  chooseOptions,
  auto = false,
  customUpload = false,
  accept = 'image/*',
  emptyTemplate,
  mode = 'basic',
  fileRef,
  className,
}) => {
  const { t } = useTranslation();
  return (
    <PrimeFileUpload
      id={name}
      ref={fileRef}
      uploadOptions={{ className: 'hidden', ...uploadOptions }}
      cancelOptions={{ className: 'hidden', ...cancelOptions }}
      chooseOptions={{
        label: t('image')!,
        icon: 'pi pi-image',
        ...chooseOptions,
      }}
      previewWidth={200}
      name={name}
      auto={auto}
      url={value}
      mode={mode}
      customUpload={customUpload}
      onUpload={onChange}
      uploadHandler={uploadHandler}
      onBeforeUpload={onBeforeUpload}
      accept={accept}
      maxFileSize={1000000}
      emptyTemplate={emptyTemplate}
      className={className}
    />
  );
};
