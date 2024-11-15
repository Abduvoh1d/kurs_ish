import {makeAutoObservable} from "mobx";
import api from "../api";
import {IStudent} from "../types";
import {AxiosResponse} from "axios";

class Student {
    constructor() {
        makeAutoObservable(this)
    }

    async getStudent(): Promise<IStudent[]> {
        const response: AxiosResponse<IStudent[]> = await api('student/list')
        return response.data
    }

    async getOneStudent(id: number): Promise<IStudent> {
        const response: AxiosResponse<IStudent> = await api(`student/detail/${id}`)
        return response.data
    }

    async createStudent(data: IStudent) {
        await api.post('student/create/', data)
    }

    async deleteStudent(id: number) {
        await api.delete(`student/delete/${id}`)
    }
}

const StudentStore = new Student()
export default StudentStore