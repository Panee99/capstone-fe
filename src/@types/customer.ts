import { BaseState, GenericSearchSchema } from './generic';

export type Customer = {
  id: string;
  code: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
};

export type CustomerState = BaseState<Customer>;

export type SearchCustomerSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetCustomerSchema = {
  id: string;
};

export type CreateCustomerSchema = {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
};

export type UpdateCustomerSchema = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
};

export type DeleteCustomerSchema = {
  ids: string[];
};
