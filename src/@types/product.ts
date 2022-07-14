import {BaseState, FetchModel, GenericSearchSchema} from './generic';

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  onHandMin?: number;
  onHandMax?: number;
  isActive: boolean;
};

export type ProductState = BaseState<Product>;

export type SearchProductSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetProductSchema = {
  id: string;
};

export type CreateProductSchema = {
  name: string;
  description: string;
  onHandMin: number;
  onHandMax: number;
};

export type UpdateProductSchema = {
  id: string;
  name: string;
  description: string;
  onHandMin?: number;
  onHandMax?: number;
  isActive: boolean;
};

export type UpdateProductCategorySchema = {
  id: string;
  category?: FetchModel | null;
}

export type DeleteProductSchema = {
  ids: string[];
};
