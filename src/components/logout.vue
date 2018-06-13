<template>
  <el-row type="flex" align="center" justify="center">
    <el-button type="primary" @click="logout()">登陆</el-button>
  </el-row>
</template>
<script>
export default {
  name: 'Logout',
  methods: {
    logout() {
      localStorage.setItem('token', null)
    }
  }
}
</script>
