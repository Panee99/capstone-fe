import { BaseState, FetchModel, GenericSearchSchema } from '../generic';

export type BeginningVoucher = {
  id: string;
  code: string;
  reportingDate: Date;
  description: string;
  warehouse: FetchModel;
  details: BeginningVoucherDetail[];
};

export type BeginningVoucherDetail = {
  quantity: number;
  product: FetchModel;
};

export type BeginningVoucherState = BaseState<BeginningVoucher>;

export type SearchBeginningVoucherSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetBeginningVoucherSchema = {
  id: string;
};

// Create
export type CreateBeginningVoucherSchema = {
  reportingDate: Date;
  description: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type UpdateBeginningVoucherSchema = {
  id: string;
  reportingDate: Date;
  description: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type DeleteBeginningVoucherSchema = {
  ids: string[];
};
