import { Api } from "../axios-config"

export interface IPermissionList {
    name: string,
    description: string
}

export interface IPermissionDetail {
    uuid: string, 
    name: string,
    description: string
}

type TPermissionTotalCount = {
    data: IPermissionDetail[];
    totalCount: number;
}

const getAll = async (page:number, size: number): Promise<TPermissionTotalCount | Error> => {
    try {
        const relativeUrl = `/v1/permission?pageNumber=${page}&pageSize=${size}`;
        const { data } = await Api.get(relativeUrl);
        if (data) {
            return {
                data: data["content"],
                totalCount: data["totalElements"]
            };
        }
        return new Error('');
    } catch (error) {
        return new Error('');
    }
}

const getByUuid = async (uuid: string): Promise<IPermissionDetail | Error> => {
    try {
        const { data } = await Api.get(`/v1/permission/${uuid}`);
        if (data) {
            return data;
        }
        return new Error('');
    } catch (error) {
        return new Error('');
    }
}

const create = async (permission: IPermissionList): Promise<IPermissionDetail | Error> => {
    try {
        const { data } = await Api.post('/v1/permission', permission);
        if (data) {
            return data;
        }
        return new Error('');
    } catch (error) {
        return new Error('');
    }
}

const updateByUuid = async (uuid: string, permission: IPermissionList): Promise<IPermissionDetail | Error> => {
    try {
        const { data } = await Api.put(`/v1/permission/${uuid}`, permission);
        if (data) {
            return data;
        }
        return new Error('');
    } catch (error) {
        return new Error('');
    }
}

const deleteByUuid = async (uuid: string): Promise<void | Error> => {
    try {
        const { data } = await Api.delete(`/v1/permission/${uuid}`);
    } catch (error) {
        return new Error('');
    }
}

export const PermissionService = {
    getAll, getByUuid, create, updateByUuid, deleteByUuid
}
