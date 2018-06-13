<template>
  <el-container>
    <el-main>
      <el-row justify="center">
        <el-col v-for="(movie, index) in Movies" :key="index" @click.native="$router.push({path:'/movie/'+movie.id})">
          <el-card :body-style="{ padding: '0px'}" shadow="hover">
            <img :src="movie.imgName" class="image">
            <div class="movie">{{ movie.movieName }}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
    <el-aside width="250px" style="margin-right:185px">
      <h1>热门</h1>
    </el-aside>

  </el-container>

</template>
<script>
export default {
  data() {
    return {}
  },
  mounted: function() {
    if (localStorage.getItem('token') == null) {
      this.$message.error('认证失败，已跳转到登陆页面')
      this.$router.push({ path: '/login' })
    }
  },
  computed: {
    Movies() {
      return this.$store.getters.getRecMovie
    }
  }
}
</script>
<style lang="css" scoped>
.el-main {
  margin-left: 185px;
}
.el-col {
  width: 180px;
  margin: 10px;
}
a {
  text-decoration: none;
}
img {
  width: 160px;
  height: 220px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
}
.movie {
  padding-bottom: 5px;
  text-align: center;
}
</style>
