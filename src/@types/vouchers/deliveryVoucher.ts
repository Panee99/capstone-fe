import { BaseState, FetchModel, GenericSearchSchema } from '../generic';

export type DeliveryVoucherStatus = 'Pending' | 'Delivered' | 'Done' | 'Cancelled';

export type DeliveryVoucher = {
  id: string;
  code: string;
  reportingDate: Date;
  description: string;
  warehouse: FetchModel;
  details: DeliveryVoucherDetail[];
  status: DeliveryVoucherStatus;
  locked: boolean;
  customer: FetchModel;
};

export type DeliveryVoucherDetail = {
  quantity: number;
  product: FetchModel;
};

export type DeliveryVoucherState = BaseState<DeliveryVoucher>;

export type SearchDeliveryVoucherSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetDeliveryVoucherSchema = {
  id: string;
};

// Create
export type CreateDeliveryVoucherSchema = {
  reportingDate: Date;
  description: string;
  customerId: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type UpdateDeliveryVoucherSchema = {
  id: string;
  reportingDate: Date;
  description: string;
  customerId: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type DeleteDeliveryVoucherSchema = {
  ids: string[];
};
