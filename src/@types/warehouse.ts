import { BaseState, GenericSearchSchema } from './generic';

export type Warehouse = {
  id: string;
  name: string;
  address: string;
};

export type WarehouseState = BaseState<Warehouse>;

export type SearchWarehouseSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetWarehouseSchema = {
  id: string;
};

export type CreateWarehouseSchema = {
  name: string;
  address: string;
};

export type UpdateWarehouseSchema = {
  id: string;
  name: string;
  address: string;
};

export type DeleteWarehouseSchema = {
  ids: string[];
};
