import { BaseState, FetchModel, GenericSearchSchema } from './generic';

export enum ENUM_GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export type AppUser = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  gender: string | null;
  isActive: boolean;
  inWarehouse: FetchModel | null;
};

export type AppUserState = BaseState<AppUser>;

export type SearchAppUserSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetAppUserSchema = {
  id: string;
};

export type CreateAppUserSchema = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  gender: string | null;
};

export type UpdateAppUserSchema = {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  gender?: string | null;
  isActive?: boolean | null;
  inWarehouse?: FetchModel | null;
};

export type DeleteAppUserSchema = {
  ids: string[];
};
