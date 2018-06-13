<template>
  <el-container>
    <el-main>
      <el-row justify="center">
        <el-col v-for="(movie, index) in MoviesPage[0]" :key="index" @click.native="$router.push({path:'/movie/'+movie.id})">
          <el-card :body-style="{ padding: '0px'}" shadow="hover">
            <img :src="movie.imgName" class="image">
            <div class="movie">{{ movie.movieName }}</div>
          </el-card>
        </el-col>
      </el-row>
      <el-row type="flex" align="center" justify="center">
        <el-col>
          <el-pagination background layout="prev, pager, next" @current-change="currentChangeHandler" :total="MoviesPage[1]" :page-size="obj.size">
          </el-pagination>
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
    return {
      obj: { page: 1, size: 8 }
    }
  },
  computed: {
    MoviesPage() {
      return this.$store.getters.getMoviePage(this.obj)
    }
  },
  methods: {
    currentChangeHandler(page) {
      this.obj.page = page
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
