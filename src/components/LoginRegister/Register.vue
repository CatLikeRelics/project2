<template>
    <el-form :model="registerUser" :rules="registerRules" ref="registerForm" label-position="right" label-width="80px"
        class="mt-5 bg-white pt-5 pl-8 pb-5 pr-5 rounded-s shadow-s" >
        <el-form-item label="用户名" prop="name">
            <el-input v-model="registerUser.name" placeholder="2 ~ 16个字符" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerUser.email" placeholder="请使用已注册邮箱，以便找回密码" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="registerUser.password" type="password" placeholder="密码必须由大小字母、数字、特殊字符组合" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
            <el-input v-model="registerUser.password2" type="password" placeholder="再次输入密码" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleRegister" class="w-full bg-primary ml-8" >注册</el-button>
        </el-form-item>
    </el-form>


</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, type FormInstance } from 'element-plus';
import request from '@/utils/request';
import { useUserStore } from '@/store/store';
import type { Email,User } from '@/utils/api';


const registerForm = ref<FormInstance>()
const registerUser = ref({
    name: '',
    email: '',
    password: '',
    password2: '',
})

const UserStore = useUserStore()
const {RegisterEmail} = UserStore


const validateRegisterPassword = (rule: any, value: any, callback: any) => {
    const passwordreg = /(?=.\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/;
    if (!passwordreg.test(value)) {
        callback(new Error('密码必须由大小字母、数字、特殊字符组合'))
    } else {
        callback()
    }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error('请再次输入密码...'))
    } else if (value !== registerUser.value.password) {
        callback(new Error('两次输入的密码不一致...'))
    } else {
        callback()
    }
}

const registerRules = ref({
    name: [
        {
            required: true,
            message: '用户名不能为空...',
            trigger: 'blur'
        },
        {
            min: 2,
            max: 16,
            message: '长度在2 ~ 16个字符...',
            trigger: 'blur'
        }
    ],
    email: [
        {
            required: true,
            message: '邮箱不能为空...',
            trigger: 'blur'
        },
        {
            type: 'email',
            message: '请输入正确邮箱格式...',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '密码不能为空...',
            trigger: 'blur'
        },
        {
            min: 6,
            max: 18,
            message: '密码长度为6 ~ 18...',
            trigger: 'blur'
        },
        {
            validator: validateRegisterPassword, trigger: 'blur'
        }
    ],
    password2: [
        {
            required: true,
            message: '密码不能为空...',
            trigger: 'blur'
        },
        {
            min: 6,
            max: 18,
            message: '密码长度为6 ~ 18...',
            trigger: 'blur'
        },
        {
            validator: validatePass2, trigger: 'blur'
        }
    ]
})

const emits = defineEmits(['Register'])

function handleRegister() {
    registerForm.value?.validate((valid) => {
        if (valid) {
            
            request.get("/user/register/" + registerUser.value.name + "/" + registerUser.value.email).then(response => {
                if (response.data == 400) {
                    UserStore.removeRegisterEmail(RegisterEmail as Email)
                    UserStore.addRegisterEmail(registerUser.value.email as Email)
                    const User = {
                        userName: registerUser.value.name,
                        email: registerUser.value.email,
                        password: registerUser.value.password,
                    }
                    UserStore.addRegisterUsers(User as User)
                    emits('Register')
                    registerUser.value.name = ''
                    registerUser.value.email = ''
                    registerUser.value.password = ''
                    registerUser.value.password2 = ''
                } else if (response.data == 401) {
                    ElMessage.error('邮箱已注册')
                } else if (response.data == 402) {
                    ElMessage.error('用户名已注册')
                } else if (response.data == 403) {
                    ElMessage.error('邮箱与用户名已注册')
                }
            })
        }
    })
}



</script>

<script scope>

</script>
    