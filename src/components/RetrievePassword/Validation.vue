<template>
    <div class="py-12 px-16">
        <div class="">
            <p><a class="text-3a77fd text-2xl">| </a>找回密码</p>
        </div>
        <el-form :model="validationUser" :rules="validationRules" ref="validationForm" label-position="top" class="py-8"
            @keyup.enter.native="nextResetPassword">
            <el-form-item label="请输入验证码" prop="validationCode">
                <el-input v-model="validationUser.validationCode" placeholder="验证码区分大小写"
                    class="flex float-left w-44 pr-1"></el-input>
                <el-button type="primary" class="w-24 bg-primary " @click="sendCode" :disabled="send">{{ (timer === 0 ?
                        '发送验证码' : `${timer}s后重新获取`)
                }}</el-button>
            </el-form-item>
            <el-form-item class="pt-3">
                <el-button type="primary" class="w-full bg-primary ml-15" size="large"
                    @click="nextResetPassword">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, reactive, ref, } from 'vue';
import { useIntervalFn } from '@vueuse/core'
import { ElForm, ElFormItem, ElInput, ElButton, type FormInstance, ElMessage } from 'element-plus';
import request from '@/utils/request';
import { useUserStore } from '@/store/store';
import { Get } from '@/utils/api';

const validationForm = ref<FormInstance>()
const validationUser = ref({ validationCode: '' })
const UserStore = useUserStore()
const timer = ref(0)
const send = ref(false)

const { pause, resume } = useIntervalFn(() => {
    if (timer.value <= 0) {
        send.value = false
        pause()
    } else {

        timer.value--
    }
}, 1000,
    {
        immediate: false
    }
)

function sendCode() {

    if (timer.value === 0) {
        send.value = true
        timer.value = 60
        resume()
    } else {
        return
    }
    const { RetrievePasswordEmail } = UserStore
    const email = RetrievePasswordEmail
    console.log(email)
    request.get('/user/sendResetCode/' + email).then(response => {
        if (response.code == 200) {
            ElMessage({
                message: '验证码已发送',
                type: 'success',
            })
        } else {
            ElMessage.error('验证码发送失败')
        }
    })



}

const validationRules = reactive({
    validationCode: [ 
        {
            required: true,
            message: '验证码不能为空...',
            trigger: 'blur'
        }
    ]
})







const emits = defineEmits(['ResetPassword'])

function nextResetPassword() {
    validationForm.value?.validate((valid)=>{
        if (valid) {
            const code = validationUser.value.validationCode
            Get.retrieveVerification(code).then(response=>{
            // request.get('/user/verification/' + code).then(response=>{
                if (response.data == true){
                    
                    emits('ResetPassword')
                } else{
                    ElMessage.error('验证码错误')
                }
            })
        } else {
            ElMessage.error('请输入验证码！')
        }
    })

}


</script>

<style scope>

</style>