import { BaseState, FetchModel, GenericSearchSchema } from './generic';


export type UserGroup ={
 id : string;
 name : string;
 description : string;
 inWarehouseId: string;
 userPermission : boolean;
 warehousePermission : boolean;
 productPermission : boolean;
}
export type UserGroupState = BaseState<UserGroup>;

export type SearchUserGroupSchema = Omit<GenericSearchSchema, 'keyword'> & {
    name?: string | null;
};

export type GetUserGroupSchema = {
    id: string;
};
export type CreateUserGroupSchema = {
    name : string;
    description : string;
};
export type UpdateUserGroupSchema = {
    id : string;
    name : string;
    description : string;
    inWarehouseId: string;
    userPermission : boolean;
    warehousePermission : boolean;
    productPermission : boolean;
};
export type DeleteUserGroupSchema = {
    ids : string[];
};
