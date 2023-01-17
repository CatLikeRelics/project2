<template>
    <div style="height: 100vh; width: 100%;background-color:#f9fbff; " class="nav">
        <div class="shadow-ssm" style="width:100%; height:4rem;background-color: #3a77fd">
            <div class="pt-5 pr-12 w-full">
                <router-link to="/LoginAndRegister" style="color:white;font-size:1rem;float: right;">登录</router-link>
            </div>
        </div>
        <div style="height: 18rem;width: 25rem;  margin: 8rem auto; border-radius: 8px;box-shadow: 0 6px 32px -7px rgb(29 102 189 / 16%); " >
            <Transition name="slide-fade" mode="out-in">
                <component :is="componentNames" @Validation="nextValidation" @ResetPassword="nextResetPassword"></component>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, Transition } from "vue";
import { RouterLink } from "vue-router";
import Email from "../components/RetrievePassword/Email.vue";
import Validation from "../components/RetrievePassword/Validation.vue";
import ResetPassword from "../components/RetrievePassword/ResetPassword.vue"
 
const componentNames = ref<any>(Email)

function nextValidation() {
    componentNames.value = Validation 
}

function nextResetPassword(){
    componentNames.value = ResetPassword 
}

</script>

<style scope>
/* @media screen and (max-width:767px) {
    .nav{
        width: 102%;
    }
} */
</style>