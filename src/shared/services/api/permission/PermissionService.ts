import { Api } from "../axios-config"

interface IPermissionList {
    name: string,
    description: string
}

interface IPermissionDetail {
    uuid: string, 
    name: string,
    description: string
}

type TPermissionTotalCount = {
    data: IPermissionList[];
    totalCount: number;
}

const getAll = async (page:number, size: number): Promise<TPermissionTotalCount | Error> => {
    try {
        const relativeUrl = `/v1/permission?pageNumber=${page}&pageSize=${size}`;
        const { data, headers } = await Api.get(relativeUrl);
        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'])
            }
        }
        return new Error('');
    } catch (error) {
        return new Error('');
    }
}

const getByUuid = async (): Promise<any> => {

}

const create = async (): Promise<any> => {

}

const updateByUuid = async (): Promise<any> => {

}

const deleteByUuid = async (): Promise<any> => {

}

export const PermissionService = {
    getAll, getByUuid, create, updateByUuid, deleteByUuid
}
