import { BaseState, FetchModel, GenericSearchSchema } from '../generic';

export enum ENUM_RECEIVE_VOUCHER_REQUEST {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Done = 'Done',
  Cancelled = 'Cancelled',
}

export type ReceiveVoucherRequest = {
  id: string;
  code: string;
  reportingDate: Date;
  description: string;
  warehouse: FetchModel;
  status: ENUM_RECEIVE_VOUCHER_REQUEST;
  locked: boolean;
  customer: FetchModel;
  details: ReceiveVoucherRequestDetail[];
  createdAt: Date;
  createdBy: FetchModel;
};

export type ReceiveVoucherRequestDetail = {
  quantity: number;
  product: FetchModel;
};

export type ReceiveVoucherRequestState = BaseState<ReceiveVoucherRequest>;

export type SearchReceiveVoucherRequestSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetReceiveVoucherRequestSchema = {
  id: string;
};

export type CreateReceiveVoucherRequestSchema = {
  reportingDate: Date;
  description: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type UpdateReceiveVoucherRequestSchema = {
  id: string;
  reportingDate: Date;
  description: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type DeleteReceiveVoucherRequestSchema = {
  ids: string[];
};
