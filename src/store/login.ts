import { makeAutoObservable } from "mobx"
import api from "../api"
import { ILogin, Token } from "../types"
import { AxiosResponse } from "axios"

class Login {
    constructor() {
        makeAutoObservable(this)
    }

    async login(data: ILogin) {
        const response: AxiosResponse<Token> = await api.post("/token", data).then((res) => {
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            return res
        })
        return response.data
    }
}

const LoginStore = new Login()
export default LoginStore
