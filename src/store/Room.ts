import { makeAutoObservable } from "mobx"
import { IRooms } from "../types"
import api from "../api"
import { AxiosResponse } from "axios"

class Room {
    constructor() {
        makeAutoObservable(this)
    }

    async getRooms(): Promise<IRooms[]> {
        const response: AxiosResponse<IRooms[]> = await api.get("room/list")
        return response.data
    }

    async getOneRoom(id: number): Promise<IRooms> {
        const response: AxiosResponse<IRooms> = await api.get(`room/detail/${id}`)
        return response.data
    }

    async createRooms(data: IRooms): Promise<void> {
        await api.post("room/create/", data)
    }

    async updateRooms(id: number, data: IRooms): Promise<void> {
        await api.post(`room/update/${id}`, data)
    }

    async deleteRooms(id: number): Promise<void> {
        await api.delete(`room/delete/${id}/`)
    }
}

const RoomStore = new Room()
export default RoomStore
