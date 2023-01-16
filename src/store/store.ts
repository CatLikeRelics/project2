import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Email, User } from '@/utils/api'

export const useUserStore = defineStore('user', () => {

    const RetrievePasswordEmail: Email[] = reactive([

    ])

    const RegisterEmail: Email[] = reactive([

    ])

    const Users: User[] = reactive([
        
    ])

    function addEmail(email: Email) {
        RetrievePasswordEmail.push(email)
    }

    function removeEmail(email: Email) {
        const i = RetrievePasswordEmail.indexOf(email)
        if (i != 0) {
            RetrievePasswordEmail.splice(i, 1)
        }
    }

    function addRegisterEmail(email: Email) {
        RegisterEmail.push(email)
    }

    function removeRegisterEmail(email: Email) {
        const i = RegisterEmail.indexOf(email)
        if (i != 0) {
            RegisterEmail.splice(i, 1)
        }
    }

    function addRegisterUsers(User: User) {
        const ret = Users.find(item => item.email === User.email);
        const i = Users.find(u => u.userName === User.userName)
        if (ret || i) {
            removeRegisterUsers(User);
            Users.push({
                userName: User.userName,
                email: User.email,
                password: User.password
            })
        } else {
            Users.push({
                userName: User.userName,
                email: User.email,
                password: User.password
            })
        }
    }

    function removeRegisterUsers(User: User) {
        const ret = Users.find(u => u.email === User.email);
        const i = Users.find(u => u.userName === User.userName)
        if (ret || i) {
            Users.splice(0,1);
        }
    }




    return { RetrievePasswordEmail, RegisterEmail, Users, addEmail, removeEmail, addRegisterEmail, removeRegisterEmail, addRegisterUsers, removeRegisterUsers, }

})