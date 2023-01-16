<template>
    <div class="py-12 px-20">
        <div class="">
            <p><a class="text-3a77fd text-2xl">| </a>找回密码</p>
        </div>
        <el-form :model="resetUser" :rules="resetRules" ref="resetForm" label-position="top" class="py-8"
            @keyup.enter.native="Reset">
            <el-form-item label="重置密码" prop="password">
                <el-input v-model="resetUser.password" type="password" show-password
                    placeholder="密码必须由大小字母、数字、特殊字符组合"></el-input>
            </el-form-item>
            <el-form-item class="pt-3">
                <el-button type="primary" class="w-full bg-primary ml-15" size="large" @click="Reset">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, type FormInstance, ElMessage, ElMessageBox, type Action } from 'element-plus';
import request from '@/utils/request';
import { useUserStore } from '@/store/store';
import router from '@/router';
import type { Email } from '@/utils/api';

const resetForm = ref<FormInstance>()
const resetUser = ref({ password: '' })
const userStore = useUserStore()
const { RetrievePasswordEmail } = userStore 


const validateLoginPassword = (rule: any, value: any, callback: any) => {
    const passwordreg = /(?=.\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/;
    if (!passwordreg.test(value)) {
        callback(new Error("密码必须由大小字母、数字、特殊字符组合"))
    } else {
        callback()
    }
}

const resetRules = reactive({
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
            validator: validateLoginPassword, trigger: 'blur'
        }
    ]
})



function Reset() {
    resetForm.value?.validate((valid) => {
        if (valid) {

            const password = resetUser.value.password
            

            request.put('/user/reset/' + password).then(response => {
                if (response.data == true) {
                    
                    userStore.removeEmail(RetrievePasswordEmail as Email)
                    ElMessageBox.alert('密码重置成功,快去去登录吧!', '重置成功', {
                        confirmButtonText: '去登录',
                        callback: (action: Action) => {
                            router.push('/LoginAndRegister')
                        },
                    })
                }
            })
        } else {
            ElMessage.error('请输入密码！')
        }
    })
}

</script>

<style scope>

</style>