<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import Login from '../components/LoginRegister/Login.vue'
import Register from '../components/LoginRegister/Register.vue'


const signUpMode = ref(false)
const componentName = ref(Login)
const dialogTableVisible = ref(false)
const dialogWidth = ref("35%")



function toRegister() {

  signUpMode.value = true;
  componentName.value = Register;

}
function toLogin() {

  signUpMode.value = false;
  componentName.value = Login;

}

function dialog() {
  dialogTableVisible.value = true;
}

onMounted(()=>{
  const width = document.documentElement.clientWidth
  if(width <= 767){
    dialogWidth.value = "90%"
  }
})


</script>

<template>

  <div class="container" :class="{ 'sign-up-mode': signUpMode }">
    <div class="forms-container">
      <div class="signin-signup">
        <Transition name="slide-fade" mode="out-in">
          <component :is="componentName" class="component" @Register="dialog" />
        </Transition>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h4>啥，你还没有账号？</h4>
          <p>快注册一个吧</p>
          <button @click="toRegister" class="btn transparent">注册</button>
        </div>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h4>啥，你已经有账号了？</h4>
          <p>那快去登录吧</p>
          <button @click="toLogin" class="btn transparent">登录</button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" title="邮箱验证" :width="dialogWidth" >
    <el-form class="dialogForm" label-position="top">
      <el-form-item label="请输入验证码"  >
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>



</template>


<style scoped>
.container {
  position: relative;
  width: 109.9%;
  background-color: #ffffff;
  min-height: 100vh;
  overflow: hidden;
}

@media(max-width: 100vw) {
  .container {
    max-width: 100vw;
  }
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
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5;
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-color: #4d84e2;
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}



.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: 5%;
  right: 58%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
  transition: 2.5s ease-in-out;
  border-radius: 50%;
  z-index: 6;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6;
}

.left-panel {
  pointer-events: all;
  padding: 2rem 40% 50rem 12%;
}

.right-panel {
  pointer-events: none;
  padding: 3rem 40% 50rem 17%;
}

.panel .content {
  color: #fff;
  transition: transform 0.9s ease-in-out;
  transition-delay: 0.6s;
}

.panel.right-panel .content {
  position: absolute;
  right: 10%;
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

.btn.transparent {
  margin: 0;
  background: none;
  border: 2px solid #fff;
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

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2;
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1;
}

.container.sign-up-mode .right-panel .image,
.container.sign-up-mode .right-panel .content {
  transform: translateX(0%);
}

.container.sign-up-mode .left-panel {
  pointer-events: none;
}

.container.sign-up-mode .right-panel {
  pointer-events: all;
}

/* 组件切换 */
.slide-fade-enter-active {
  transition: all 1.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 1.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


.dialogForm {
  margin: 0 30px;
}



@media screen and (max-width: 767px) {

  .container {
    position: relative;
    width: 109.9%;
    background-color: #ffffff;
    min-height: 100vh;
    overflow: hidden;
  }

  .signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 90%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
  }

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

  .panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: 70%;
  }

  .left-panel {
    pointer-events: all;
    padding: 7rem 25% 50rem 12%;

  }

  .container.sign-up-mode:before {
    transform: translate(48%, 30%);
  }



  .container.sign-up-mode .signin-signup {
    left: 50%;
    top: 45%;
  }

  .container.sign-up-mode .right-panel {
    pointer-events: all;

  }

  .panel.right-panel .content {
    position: absolute;
    bottom: 4rem;
    right: 20%;
  }

  @media(max-height : 750px) {

    .signin-signup {
      position: absolute;
      top: 55%;
      transform: translate(-50%, -50%);
      left: 50%;
      width: 90%;
      transition: 1s 0.7s ease-in-out;
      display: grid;
      grid-template-columns: 1fr;
      z-index: 5;
    }

    .container.sign-up-mode:before {
      transform: translate(48%, 22%);
    }

    .container.sign-up-mode .signin-signup {
      left: 50%;
      top: 40%;
    }
  }

}
</style>