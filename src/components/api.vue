<template>
  <el-row type="flex" align="center" justify="center">
    <el-col :span="6">
      <h1>{{ msg }}</h1>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
// import qs from 'qs'
export default {
  name: 'Api',
  data() {
    return {
      msg: ''
    }
  },
  mounted: function() {
    var vm = this
    this.addaxiosinterceptor()
    axios
      .post('/api/jwt/movie/recommend.do')
      .then(function(response) {
        vm.msg = response.data
      })
      .catch(function(error) {
        localStorage.removeItem('token')
        vm.open4()
        console.log(error)
        vm.$router.push({ path: '/login' })
      })
  },
  methods: {
    open4() {
      this.$message.error('认证失败，已跳转到登陆页面')
    },
    open() {
      const h = this.$createElement

      this.$notify.error({
        title: '错误',
        message: h('i', { style: 'color: teal' }, '认证失败')
      })
    },
    addaxiosinterceptor() {
      axios.interceptors.request.use(
        function(config) {
          const authorization = localStorage.getItem('token')
          config.headers.Authorization = authorization
          return config
        },
        function(error) {
          return Promise.reject(error)
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
</style>
