<script setup lang="ts">
import { ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser';
import { useRouter } from 'vue-router';
import auth from '@/api/auth';
const router = useRouter()
const currentUser = useCurrentUserStore()
function logout() {
    auth.logout().then(res => {

        currentUser.logout()
        router.push({ path: '/login' })
    })
}

</script>

<template>
    <div>{{ currentUser.getToken() }}</div>
    <div>{{ currentUser.getUserDetail() }}</div>
    <div><button @click="logout">logout</button></div>
</template>
