<template>
    <div>
        <div class="container">
            <component :is="authList[currentAuth]"></component>
        </div>
        <div class="bottombtns">
            <button class=" border-2 p-1 rounded-md hover:shadow-lg" @click="currentAuth = 0"> password</button>
            
            <button class=" border-2 p-1 rounded-md hover:shadow-lg" @click="currentAuth = 1"> mail</button>
        </div>
    </div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import UserNamePasswordAuth from '@/components/Login/UserNamePasswordAuth.vue';
import MailAuth from '@/components/Login/MailAuth.vue';
const authList = [UserNamePasswordAuth, MailAuth]
const currentAuth = ref(0)
console.log(import.meta.env);

</script>
<style scoped>
.container {
    width: 300px;
    margin: 0 auto;
}
.bottombtns {
    width: 400px;
    margin: 0 auto;
}
</style>