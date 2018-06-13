<template>
  <el-container class="app">
    <el-header>
      <Header/>
    </el-header>
    <router-view class="view" />
    <el-footer/>
  </el-container>
</template>
<script>
import Header from './components/header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
<style lang="css" scoped>
.app {
  background: #f5f5f5;
  min-height: 710px;
}
.view {
  padding-top: 30px;
}
</style>
