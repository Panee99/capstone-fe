import { BaseState, FetchModel, GenericSearchSchema } from '../generic';

export type DeliveryRequestStatus = 'Pending' | 'Confirmed' | 'Done' | 'Cancelled';

export type DeliveryRequest = {
  id: string;
  code: string;
  reportingDate: Date;
  description: string;
  warehouse: FetchModel;
  details: DeliveryRequestDetail[];
  status: DeliveryRequestStatus;
  locked: boolean;
  customer: FetchModel;
};

export type DeliveryRequestDetail = {
  quantity: number;
  product: FetchModel;
};

export type DeliveryRequestState = BaseState<DeliveryRequest>;

export type SearchDeliveryRequestSchema = Omit<GenericSearchSchema, 'keyword'> & {
  name?: string | null;
};

export type GetDeliveryRequestSchema = {
  id: string;
};

// Create
export type CreateDeliveryRequestSchema = {
  reportingDate: Date;
  description: string;
  customerId: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type UpdateDeliveryRequestSchema = {
  id: string;
  reportingDate: Date;
  description: string;
  customerId: string;
  details: {
    productId: string;
    quantity: number;
  }[];
};

export type DeleteDeliveryRequestSchema = {
  ids: string[];
};
