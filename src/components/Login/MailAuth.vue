<template>
        <el-form ref="ruleFormRef" style="max-width: 100%;" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="email" prop="email">
            <el-input v-model="ruleForm.email" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="code" prop="code">
            <el-input v-model="ruleForm.code" type="test" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button :disabled="codeobtainbtnenable" @click="obtainCode">{{ obtainBtnMsg }}</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import Auth from '@/api/auth';
import { useCurrentUserStore } from '@/stores/currentUser';
import { useRouter } from 'vue-router';
const router = useRouter()
const currentUser = useCurrentUserStore()
const ruleFormRef = ref<FormInstance>()
const obtain_MESSAGE = '获取验证码'
const obtaining_MESSAGE = '正在获取'
const obtainBtnMsg = ref(obtain_MESSAGE)
const codeobtainbtnenable = ref(false)
const checkUsername = (rule: any, value: string, callback: any) => {
    if (!value) {
        return callback(new Error('Please input the userName'))
    }
    setTimeout(() => {
        if (value.length < 10) {
            callback(new Error('length must be greater than 10'))
        } else {
            callback()
        }
    }, 100)
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('Please input the password'))
    } else {
        callback()
    }
}

const ruleForm = reactive<MailLoginUser>({
    email: '',
    code: ''
})

const rules = reactive<FormRules<MailLoginUser>>({
    email: [{ validator: checkUsername, trigger: 'blur' }],
    code: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            Auth.mailLogin(ruleForm).then(res => {
                currentUser.setValue(res.data.value)
                router.back()
           })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const obtainCode = () => {
    obtainBtnMsg.value = obtaining_MESSAGE
    codeobtainbtnenable.value = true
    Auth.getMailCode(ruleForm.email).then(res => {
        obtainBtnMsg.value = obtain_MESSAGE
        codeobtainbtnenable.value = false
    }).catch(e => {
        obtainBtnMsg.value = obtain_MESSAGE
        codeobtainbtnenable.value = false
    })
}
</script>
<style scoped>
</style>