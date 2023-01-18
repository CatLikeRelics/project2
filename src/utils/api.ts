
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

    //发送注册邮箱验证码
    sendRegisterCode(Email: Email) {
        return request.get('/user/sendRegisterCode/' + Email)
    },

    //检验注册验证码
    registerValidation(Code: string) {
        return request.get('/user/registerValidation/' + Code)
    },

    //检查数据库是否有该邮箱（找回密码）
    retrieve(Email: Email) {
        return request.get('/user/retrieve/' + Email)
    },

    //验证找回验证码
    retrieveVerification(code: string) {
        return request.get('/user/verification/' + code)
    }
}

//POST请求
export const Post = {

    //注册
    register(user: User) {
        return request.post('/user/register', JSON.stringify(user))
    }

}

//Put请求
export const Put = {

    //修改密码
    resetPassword(password: string) {
        return request.put('/user/reset/' + password)
    }

}

