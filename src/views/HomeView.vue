<script setup lang="ts">
import {ref} from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser';
import { useRouter } from 'vue-router';
const router = useRouter()
const currentUser = useCurrentUserStore()
function logout() {
    currentUser.logout()
    router.push({path:'/login'})
}

</script>

<template>
<div><button @click="logout">logout</button></div>
</template>
