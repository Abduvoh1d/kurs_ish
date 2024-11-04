import {makeAutoObservable} from "mobx";
import api from "../api";
import {AxiosResponse} from "axios";
import {IUserCreate, IUsers} from "../types";

class Users {
    constructor() {
        makeAutoObservable(this)
    }

    async getUsers(): Promise<IUsers[]> {
        const response: AxiosResponse<IUsers[]> = await api.get('user/list')
        console.log(response.data)
        return response.data
    }

    async oneUser(id: number): Promise<IUsers>{
        const response:AxiosResponse<IUsers> = await api.get(`user/detail/${id}`)
        return response.data
    }

    async createUser(data: IUserCreate): Promise<void> {
        await api.post('user/create' , data)
    }


}

const UserStore = new Users()
export default UserStore