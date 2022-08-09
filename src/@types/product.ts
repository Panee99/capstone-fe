import { BaseState, FetchModel, GenericSearchSchema } from './generic';

export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  onHandMin?: number;
  onHandMax?: number;
  isActive: boolean;
  categories: {
    id: string;
    name?: string
  }[];
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
  categories: {
    id: string;
    name?: string
  }[];
};

export type UpdateProductSchema = {
  id: string;
  code: string;
  name: string;
  description: string;
  onHandMin?: number;
  onHandMax?: number;
  isActive: boolean;
  categories: {
    id: string;
    name?: string
  }[];
};

export type DeleteProductSchema = {
  ids: string[];
};

export type Category = {
  id: string;
  name?: string
};