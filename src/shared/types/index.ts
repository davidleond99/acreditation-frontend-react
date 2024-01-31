import { IResponseBase } from '../baseCrud';

export interface IBaseGetInterface<T> extends IResponseBase {
  Items: T[];
}

export interface IBaseCrudInterface<T> extends IResponseBase {
  Items: T[];
  Count: number;
  ScannedCount: number;
}

export interface IResponseMessage {
  message: string;
}

export interface Locations {
  name: string;
  crud: string[];
}

export const myLocations: Locations[] = [
  {
    name: 'participants',
    crud: ['edit', 'create', 'update'],
  },
];
