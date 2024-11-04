import {makeAutoObservable} from "mobx";
import {IRooms} from "../types";
import api from "../api";
import {AxiosResponse} from "axios";

class Room {
    constructor() {
        makeAutoObservable(this)
    }

    async getRooms(): Promise<IRooms[]> {
        const response: AxiosResponse<IRooms[]> = await api.get('room/list')
        console.log(response.data)
        return response.data
    }

    async createRooms(data: IRooms): Promise<void> {
        await api.post('room/create' , data)
    }
}

const RoomStore = new Room()
export default RoomStore