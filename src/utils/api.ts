
import request from "./request";
import QS from "qs"


export interface User {
    userName: string;
    email: string;
    password?: string;
}

export interface Email {
    email?: string;
}

//Get请求
export const Get = {

    //注册邮箱验证
    sendRegisterCode(Email : Email){
        return request.get('/user/sendRegisterCode/' + Email)
    },

    //检验验证码
    registerValidation(Code : string){
        return request.get('/user/registerValidation/' + Code)
    },
}

