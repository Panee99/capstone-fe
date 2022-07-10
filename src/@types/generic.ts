export enum Sort {
  ASC,
  DESC,
}

export type OrderBy = {
  name?: string | null;
  sort: Sort | null;
};

export type SearchResult<T> = {
  totalRows: number;
  items: Array<T>;
  pageIndex?: number;
  pageSize?: number;
};

export type GenericSearchSchema = {
  pageIndex?: number;
  pageSize?: number;
  orderBy?: OrderBy;
  keyword?: string;
};

export type FetchModel = {
  id: string;
  name: string;
};

export type Base = {
  id: string;
  name: string;
};

export type BaseEntity = Base & {
  isActive: boolean;
};

export type Attachment = {};

export type BaseState<T> = {
  loading: BaseLoading | null;
  list: SearchResult<T>;
  single: T | null;
  page: number;
  pageSize: number;
};

export type BaseLoading = 'SEARCH' | 'GET' | 'CREATE' | 'UPDATE' | 'DELETE' | 'DELETE_MUL';
