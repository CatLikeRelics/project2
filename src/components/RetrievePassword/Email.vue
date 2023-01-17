<template>
  <div class="py-12 px-16">
    <div class="">
      <p><a class="text-3a77fd text-2xl">| </a>找回密码</p>
    </div>
    <el-form :model="retrieveUser" :rules="emailRules" ref="emailForm" label-position="top" class="py-8" @keyup.enter.native="">
      <el-form-item label="请输入邮箱" prop="email">
        <el-input v-model="retrieveUser.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item class="pt-3">
        <el-button type="primary" class="w-full bg-primary ml-15" size="large" @click="nextValidation">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, type FormInstance, ElMessage } from 'element-plus';
import request from '@/utils/request';
import { useUserStore } from '@/store/store';
import type { Email } from '@/utils/api';


const emailForm = ref<FormInstance>()
const retrieveUser = ref({ email: '' })
const emailStore = useUserStore()

const email = (rule: any, value: any, callback: any) => {
  const emailreg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
  if (!emailreg.test(value)) {
    callback(new Error("邮箱格式不正确"))
  } else {
    callback()
  }
}

const emailRules = reactive ({
  email:[
    {
      required: true, 
      trigger: 'blur',
      message: '邮箱不能为空...'
    },
    {
      validator: email,
      message: '请输入正确邮箱格式...',
      trigger: 'blur'
    }
  ]
})

const emits = defineEmits(['Validation'])

function nextValidation() {
  emailForm.value?.validate((valid)=>{
    if(valid) {
      const email  = retrieveUser.value.email
      
      request.get('/user/retrieve/' + email).then(response=>{
        if(response.data == true){
          emailStore.addEmail(email as Email)
          emits('Validation')
        } else{
          ElMessage.error('邮箱不存在')
        } 
      })
    } else {
      ElMessage.error('请输入邮箱！')
      return false;
    }
  })

}



</script>

<style scope>

</style>