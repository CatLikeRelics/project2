<template>
    <el-menu class="el-menu-demo pl-80" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="1">主页</el-menu-item>
        <div class="flex-grow-0 w-3/5" />
        <el-sub-menu index="2" class="mr-12">
            <template #title>user</template>
            <el-menu-item index="2-1" @click="LogOut">退出登录</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

user
<script lang="ts" setup>
import router from '@/router';
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

function LogOut() {
    localStorage.removeItem('token')
    router.push('/LoginAndRegister')
}
</script>

<style scope>


</style>