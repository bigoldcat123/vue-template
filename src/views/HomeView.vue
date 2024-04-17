<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser';
import { useRouter } from 'vue-router';
import auth from '@/api/auth';
import server from '@/api';
const router = useRouter()
const currentUser = useCurrentUserStore()
function logout() {
    auth.logout().then(res => {
        currentUser.logout()
        router.push({ path: '/login' })
    })
}
const ws = new WebSocket('/ws',currentUser.getToken())
ws.onopen = (e) => {
    console.log(e);
    ws.send("hello")
}
ws.onmessage = (e) => {
    console.log(e.data);
}
ws.onerror = (e) => {
    console.log(e);
}
// server.post('/no',{
//     id:'1',
//     testName:'x',
//     email:'xx@som',
//     phone:'1111111111'
// }).then(res => {
//     console.log(res);
    
// })
</script>

<template>
    <div>{{ currentUser.getToken() }}</div>
    <div>{{ currentUser.getUserDetail() }}</div>
    <div><button @click="logout">logout</button></div>
</template>
