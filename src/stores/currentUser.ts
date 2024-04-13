import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUser', () => {
  
  const currentUser = ref<CurrentUser | null>(null)

  function isLogin():boolean { return !!currentUser.value }
  function setValue(value:CurrentUser) { 
    currentUser.value = value 
    localStorage.setItem('token',JSON.stringify(value))
  }
  function logout() {
    currentUser.value = null
    localStorage.removeItem('token')
  }

  function getToken() {
    return currentUser.value?.token
  }

  function getUserDetail() {
    return currentUser.value?.detail
  }

  return { isLogin, setValue, logout, getToken,getUserDetail}
})
