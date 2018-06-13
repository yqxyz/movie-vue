<template>
  <el-row type="flex" align="center" justify="center">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
export default {
  name: 'Sign',
  data() {
    var validateName = (rule, value, callback) => {
      axios
        .post('/api/user/validate.do', qs.stringify({ userName: value }))
        .then(function(response) {
          if (response.data) {
            callback()
          } else {
            callback(new Error('用户名已注册'))
          }
        })
    }
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: [
          { validator: validateName, trigger: 'blur' },
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    save2localstorage(token) {
      localStorage.setItem('token', token)
    },
    submitForm(formName) {
      var vm = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          var form = this.ruleForm
          axios
            .post('/user/sign.do', qs.stringify(form))
            .then(function(response) {
              vm.save2localstorage(response.data.data)
              vm.$message({
                message: '注册成功,登录成功',
                type: 'success'
              })
              vm.$store.commit('getRates')
              vm.$store.commit('getRec')
              vm.$router.push({ path: '/' })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.el-button {
  width: 100%;
}
</style>
