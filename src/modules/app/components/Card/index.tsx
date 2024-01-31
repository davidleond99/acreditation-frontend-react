import { FC, ReactElement } from 'react';

import { Card as PrimeCard, CardTemplateTypes } from 'primereact/card';

interface CardProps {
  children?: ReactElement | ReactElement[];
  title?: any;
  style?: string;
  header?: CardTemplateTypes;
  footer?: CardTemplateTypes;
}

export const Card: FC<CardProps> = ({
  children,
  title,
  style,
  header,
  footer,
}) => {
  return (
    <PrimeCard
      className={`${style} border-noround`}
      title={title}
      header={header}
      footer={footer}
    >
      {children}
    </PrimeCard>
  );
};
