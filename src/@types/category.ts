import { BaseState, GenericSearchSchema } from './generic';

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type CategoryState = BaseState<Category>;

export type SearchCategorySchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetCategorySchema = {
  id: string;
};

export type CreateCategorySchema = {
  name: string;
  description: string;
};

export type UpdateCategorySchema = {
  id: string;
  name: string;
  description: string;
};

export type DeleteCategorySchema = {
  ids: string[];
};
