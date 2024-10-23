import { UUID } from "crypto";
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
    totalPages: number;
}

const getAll = async (page: number, size: number, field?: string, arg?: string, order?: string): Promise<TPermissionTotalCount | Error> => {
    try {
        let relativeUrl = `/v1/permission?pageNumber=${page}&pageSize=${size}`;
        if (arg !== undefined && arg !== '') {
            let fieldSearch = field?.toLowerCase();
            relativeUrl = relativeUrl + `&${fieldSearch}=${arg}&sort=${fieldSearch}&order=${order?.toLowerCase()}`;
        } else {
            relativeUrl = relativeUrl + `&sort=name&order=${order?.toLowerCase()}`;
        }
        console.log(relativeUrl);
        const { data } = await Api.get(relativeUrl);
        if (data) {
            return {
                data: data["content"],
                totalCount: data["totalElements"],
                totalPages: data["totalPages"]
            };
        }
        return new Error('Error trying get all records');
    } catch (error) {
        return new Error((error as {message: string}).message || 'Error trying get all records');
    }
}

const getByUuid = async (uuid: string): Promise<IPermissionDetail | Error> => {
    try {
        const { data } = await Api.get(`/v1/permission/${uuid}`);
        if (data) {
            return data;
        }
        return new Error('Error trying get record by UUID');
    } catch (error) {
        return new Error((error as {message: string}).message || 'Error trying get record by UUID');
    }
}

const create = async (permission: Omit<IPermissionDetail, UUID>): Promise<IPermissionDetail | Error> => {
    try {
        const { data } = await Api.post<IPermissionDetail>('/v1/permission', permission);
        if (data) {
            return data;
        }
        return new Error('Error creating record');
    } catch (error) {
        return new Error((error as {message: string}).message || 'Error creating record');
    }
}

const updateByUuid = async (uuid: string, permission: IPermissionDetail): Promise<void | Error> => {
    try {
        await Api.put(`/v1/permission/${uuid}`, permission);
        return new Error('Error updating record');
    } catch (error) {
        return new Error((error as {message: string}).message || 'Error updating record');
    }
}

const deleteByUuid = async (uuid: string): Promise<void | Error> => {
    try {
        await Api.delete(`/v1/permission/${uuid}`);
    } catch (error) {
        console.log(error);
        return new Error((error as {message: string}).message || 'Error deleting the record');
    }
}

export const PermissionService = {
    getAll, getByUuid, create, updateByUuid, deleteByUuid
}
