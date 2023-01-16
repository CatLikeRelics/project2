<template>

  <el-form :model="loginUser" :rules="loginRules" ref="loginForm" @keyup.enter.native="handleLogin"
    class=" mt-5 bg-white pt-5 pl-10 pb-5 pr-5 rounded-s shadow-s">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="loginUser.email" placeholder="邮箱区分大小写" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="loginUser.password" type="password" placeholder="Enter Password..." show-password/>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleLogin" type="primary" class="w-full bg-primary ml-13">登录</el-button>
    </el-form-item>
    <div class="text-right text-12 text-333" >
            <p>忘记密码？ <router-link to="/Retreve" class="text-#409eff">找回密码</router-link></p>
          </div>
  </el-form>


</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage, type FormInstance } from 'element-plus'
import router from '@/router';


const loginForm = ref<FormInstance>()
const loginUser = ref({
  email: '',
  password: '',
})

const validateLoginPassword = (rule: any, value: any, callback: any) => {
  const passwordreg = /(?=.\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/;
  if (!passwordreg.test(value)) {
    callback(new Error("密码必须由大小字母、数字、特殊字符组合"))
  } else {
    callback()
  }
}

const loginRules = ref({
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
      validator: validateLoginPassword, trigger: 'blur'
    }

  ]
})



function handleLogin() {
  loginForm.value?.validate((valid) => {
    if (valid) {
      const token = {
        'email':loginUser.value.email,
        'password':loginUser.value.password
      }
      localStorage.token = JSON.stringify(token)
      router.push({path:'/index'})
    } else {
      ElMessage.error('请输入邮箱或密码')
      return false
    }
  })
}


</script>
<style>

</style>