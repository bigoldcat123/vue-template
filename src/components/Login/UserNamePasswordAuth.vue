<template>
        <el-form ref="ruleFormRef" style="max-width: 100%;" :model="ruleForm" status-icon :rules="rules" label-width="auto"
        class="demo-ruleForm">
        <el-form-item label="username" prop="username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
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

const ruleForm = reactive<DaoLoginUser>({
    username: '',
    password: ''
})

const rules = reactive<FormRules<DaoLoginUser>>({
    username: [{ validator: checkUsername, trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            Auth.daoLogin(ruleForm).then((res) => {
                currentUser.setValue(res.data.value)
                router.back()
            }).catch((err) => {
                console.log(err);
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style scoped>
</style>