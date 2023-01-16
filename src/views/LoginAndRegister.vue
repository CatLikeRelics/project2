
<template>

    <div class="container" :class="{ 'sign-up-mode': signUpMode }">
        <div class="forms-container">
            <div class="signin-signup">
                <Transition name="slide-fade" mode="out-in">
                    <component :is="componentName" class="component" @Register="dialog" ref="Reset"/>
                </Transition>
            </div>
        </div>
        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h4>啥，你还没有账号？</h4>
                    <p>快注册一个吧</p>
                    <button @click="toRegister" class="btn ">注册</button>
                </div>
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h4>啥，你已经有账号了？</h4>
                    <p>那快去登录吧</p>
                    <button @click="toLogin" class="btn ">登录</button>
                </div>
            </div>
        </div>
    </div>


    <el-dialog v-model="dialogTableVisible" title="邮箱验证" :width="dialogWidth">
        <el-form class="dialogForm" label-position="top" :rules="registerValidationRules" :model="registerValidation"
            ref="registerVaildationForm">
            <el-form-item label="请输入验证码" prop="validationCode" class="validationCodeForm">
                <el-input v-model="registerValidation.validationCode" placeholder="验证码区分大小写"
                    class="dialog-input"></el-input>
                <el-button type="primary" class="dialog-btn" @click="sendCode" :disabled="send">{{ (timer === 0 ?
                        '发送验证码' : `${timer}s后重新获取`)
                }}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="bg-primary w-full " @click="register">下一步</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>

<script lang="ts" setup>
import request from '@/utils/request';
import { useIntervalFn } from '@vueuse/shared';
import { ElDialog, ElForm, ElFormItem, ElInput, ElButton, ElMessage, type FormInstance, ElMessageBox, type Action } from 'element-plus';
import { onMounted, reactive, ref, Transition } from 'vue';
import Login from '../components/LoginRegister/Login.vue'
import Register from '../components/LoginRegister/Register.vue'
import { useUserStore } from '@/store/store';
import {  Get, type Email, type User } from '@/utils/api';
import router from '@/router';

const signUpMode = ref(false)
const componentName = ref(Login)
const dialogTableVisible = ref(false)
const dialogWidth = ref("30%")
const timer = ref(0)
const send = ref(false)
const userStore = useUserStore()
const { RegisterEmail, Users } = userStore



const registerVaildationForm = ref<FormInstance>()
const registerValidation = ref({ validationCode: '' })

const registerValidationRules = reactive({
    validationCode: [
        {
            required: true,
            message: '验证码不能为空...',
            trigger: 'blur'
        }
    ]
})

function toRegister() {
    signUpMode.value = true
    componentName.value = Register;
}

function toLogin() {
    signUpMode.value = false
    componentName.value = Login;
}

function dialog() {
    dialogTableVisible.value = true;
}

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
    Get.sendRegisterCode(RegisterEmail as Email).then(response =>{
    // request.get('/user/sendRegisterCode/' + RegisterEmail).then(response => {
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


function register() {
    registerVaildationForm.value?.validate((valid) => {
        if (valid) {
            const code = registerValidation.value.validationCode
            Get.registerValidation(code).then(response =>{
            // request.get('/user/registerValidation/' + code).then(response => {
                if (response.data == true) {
                    console.log(response.data)
                    const user = Users[0]
                    request.post('/user/register', JSON.stringify(user)).then(response => {
                        if (response.data == 1) {
                            dialogTableVisible.value = false
                            userStore.removeRegisterUsers(user)
                            ElMessageBox.alert('注册成功,快去去登录吧!', '注册成功', {
                                confirmButtonText: 'OK',
                                callback: (action: Action) => {
                                    toLogin()
                                },
                            })
                        }
                    })

                } else {
                    ElMessage.error('验证码错误')
                }

            })
        } else {
            ElMessage.error('请输入验证码！')
        }
    })
}

onMounted(() => {
    const width = document.documentElement.clientWidth
    if (width <= 767) {
        dialogWidth.value = "90%"
    }
})

</script>

<style scope>
.container {
    position: relative;
    /* width: 100%; */
    max-width: 100vw;
    background-color: #FFFF;
    min-height: 100vh;
    overflow: hidden;
}

.forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.signin-signup {
    position: absolute;
    top: 40%;
    transform: translate(-50%, -50%);
    left: 70%;
    width: 30%;
    transition: 1s 0.7s ease-in-out;

}

.panels-container {
    /* position: absolute; */
    height: 100%;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: space-between;

}

.container::before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    /* top: 5%; */
    right: 62%;
    transform: translateY(-50%);
    background-image: linear-gradient(-50deg, #4481eb 0%, #04befe 100%);
    border-radius: 50%;
    transition: 2.5s ease-in-out;
    z-index: 1;

}

.panel {
    text-align: center;
    z-index: 6;
}

.left-panel {
    padding: 3rem 0 0 4rem;
}

.right-panel {
    padding: 3rem 4rem 0 0;
}

.panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
}

.panel h4 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
}

.panel p {
    font-size: 1rem;
    padding: 0 0;
}

.btn {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    border-radius: 50px;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 0.8rem;
}


.right-panel .content {
    transform: translateX(800px);
}

/* 动画 */

.container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 36%;
}

.container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
}

.container.sign-up-mode .signin-signup {
    left: 36%;
    top: 45%;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
}

.container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
}

.container.sign-up-mode .left-panel {
    pointer-events: none;
}

.slide-fade-enter-active {
    transition: all 1.5s ease-out;
}

.slide-fade-leave-active {
    transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

.dialogForm {
    margin: 0 30px;
}

.validationCodeForm {
    display: flex;
}

.dialog-input {
    display: flex;
    float: left;
    flex-grow: 1;
    width: 13rem;

}

.dialog-btn {
    flex-grow: 1;
    width: 6rem;
    margin-left: 0.25rem;
    background-color: #3bacfb;
}

@media screen and (max-width:1200px) {
    .dialog-btn {
        flex-grow: 1;
        width: 6rem;
        margin: 5px 0 0 0;
        background-color: #3bacfb;
    }
}


@media screen and (max-width: 768px) {
    .container {
        position: relative;
        /* width: 100%; */
        max-width: 100vw;
        background-color: #FFFF;
        min-height: 100vh;
        overflow: hidden;
    }

    .container:before {
        content: "";
        position: absolute;
        height: 2000px;
        width: 2000px;
        transform: translate(52%, -87%);
        background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
        transition: 1s ease-in-out;
        border-radius: 50%;
        z-index: 6;
    }

    .signin-signup {
        position: absolute;
        top: 55%;
        transform: translate(-50%, -50%);
        left: 50%;
        width: 95%;
        transition: 1s 0.7s ease-in-out;
        z-index: 9;
    }

    .panels-container {
        /* position: absolute; */
        height: 100%;
        width: 100%;
        /* top: 0; */
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

    }

    .left-panel {
        width: 100%;
        padding: 3rem 0;
    }

    .right-panel {
        width: 100%;
        padding: 30rem 0 0 0;
    }

    .container.sign-up-mode:before {
        transform: translate(48%, 30%);
    }

    .container.sign-up-mode .signin-signup {
        width: 95%;
        left: 50%;
        top: 40%;
    }

    .slide-fade-enter-active {
        transition: all 2s ease-out;
    }

    .slide-fade-leave-active {
        transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .dialog-input {
        display: flex;
        float: left;
        width: 9.5rem;
        padding-right: 0.25rem;
    }

    .dialog-btn {
        flex-grow: 1;
        width: 6rem;
        margin: 0;
        background-color: #3bacfb;
    }


    @media(max-height : 750px) {

        .container:before {
            content: "";
            position: absolute;
            height: 2000px;
            width: 2000px;
            transform: translate(52%, -90%);
            background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
            transition: 2.5s ease-in-out;
            border-radius: 50%;
            z-index: 6;
        }

        .right-panel {
            width: 100%;
            padding: 20rem 0 0 0;
        }

        .container.sign-up-mode:before {
            transform: translate(48%, 22%);
        }

        .container.sign-up-mode .signin-signup {
            width: 95%;
            left: 50%;
            top: 40%;
        }

    }
}
</style>