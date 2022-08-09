import { BaseState, GenericSearchSchema } from './generic';

export type SumProduct = {
  productId: string;
  productName: string;
  quantity: string;
};

export type SumProductState = BaseState<SumProduct>;

export type SearchSumProductSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
  id?: string | null;
};
