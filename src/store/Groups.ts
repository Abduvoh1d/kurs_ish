import {makeAutoObservable} from "mobx";
import api from "../api";
import {AxiosResponse} from "axios";
import {IGroups} from "../types";

class Groups {
    constructor() {
        makeAutoObservable(this)
    }

    async getGroups(): Promise<IGroups[]> {
        const response: AxiosResponse<IGroups[]> = await api.get('group/list')
        console.log(response.data)
        return response.data
    }

    async getOneGroup(id: number): Promise<IGroups> {
        const response: AxiosResponse<IGroups> = await api.get(`group/detail/${id}`)
        return response.data
    }

    async createGroup(data: Omit<IGroups, 'id'>): Promise<void> {
        await api.post('group/create' , data)
    }

    async updateGroup(data: IGroups): Promise<void>{
        await api.put(`group/update/${data.id}` , data)
    }

    async deleteGroup(id: number): Promise<void>{
        await api.delete(`group/delete/${id}`)
    }
}

const GroupStore = new Groups()
export default GroupStore