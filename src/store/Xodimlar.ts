import { makeAutoObservable } from "mobx"
import api from "../api"
import { AxiosResponse } from "axios"
import { IXodim } from "../types"

class Xodimlar {
    constructor() {
        makeAutoObservable(this)
    }

    async getEmployee(role?: string): Promise<IXodim[]> {
        const response: AxiosResponse<IXodim[]> = await api.get(role ? `worker/list/?role=${role}` : "worker/list")
        console.log(response.data)
        return response.data
    }

    async oneEmployee(id: number): Promise<IXodim> {
        const response: AxiosResponse<IXodim> = await api.get(`worker/detail/${id}`)
        return response.data
    }

    async createEmployee(data: IXodim): Promise<void> {
        await api.post("worker/create/", data)
    }

    async deleteEmployee(id: number): Promise<void> {
        await api.delete(`worker/delete/${id}`)
    }
}

const UserStore = new Xodimlar()
export default UserStore
