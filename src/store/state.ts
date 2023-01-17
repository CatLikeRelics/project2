import { defineStore } from "pinia";
import { ref } from "vue";

export const useState = defineStore('state',()=>{

    const dialogState = ref(false)



    function displayDialog(){
        dialogState.value = true
    }


    return { dialogState, displayDialog }

})