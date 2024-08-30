<template>
  <div class="login">
    <div class="login-form">
      <div class="title">Login to Your Account</div>
      <div class="form">
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          label-position="top"
        >
          <el-form-item label="Account" prop="account">
            <el-input v-model="ruleForm.account" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Log in
        </el-button>  
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import supabase from '../../utils/supabase.js'
import { ElMessage } from 'element-plus'

const vm = getCurrentInstance()?.proxy
const ruleFormRef = ref(null)

const ruleForm = reactive({
  account: '',
  password: '',
})

const rules = reactive({
  account: [{ required: true, message: 'Please input account', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password',  trigger: 'blur' }],
})


const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      try {
        // 调用接口进行登录
        const { data, error } = await supabase.auth.signInWithPassword({
          email: ruleForm.account,
          password: ruleForm.password,
        })
    
        // 登录结果显示
        if (error) {
          ElMessage({
            message: error,
            type: 'error'
          })
        } else {
          ElMessage({
            message: 'Login success.',
            type: 'success'
          })
          vm?.$router.push('/home')
        }
      } catch (error) {
        console.log(error)
        ElMessage({
          message: 'Login false.',
          type: 'error'
        })
      }
    } else {
      console.log('error submit!')
    }
  })
}

</script>
<style lang="sass">
.login {
  height: 100%;
  background-image: url('./login-bgc.svg');
  overflow: auto;
  background-repeat: no-repeat;
  position: relative;
  background-size: cover;
  background-position: center;
}
  .login-form {
    width: 400px;
    position: absolute;
    top: 50%;
    left: 80%;
    transform: translate(-50%, -50%);
    margin-bottom: 32px;
    background-color: #fff;
    padding: 41px 25px;
    border-radius: 16px;
    .title {
      color: #000;
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 30px;  
    }
    .footer {
      margin-top: 36px;
      .el-button {
        width: 100%;
        border-radius: 24px;
      }
    }
  }
</style>