<template>
  <el-row type="flex" justify="center">
    <el-col :span="8">
      <el-card :body-style="{ padding: '0px'}" shadow="hover">
        <div>
          <img :src="movie.imgName" v-if="movie" class="image">
        </div>
        <div class="right">{{ movie.movieName }}</div>
        <div class="block right" v-if="rate">
          {{rate[2]}} 人评价
          <el-rate v-if="rate1 | rate1 === 0" v-model="rate1" disabled text-color="#ff9900" show-score :allow-half="true" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
          你的评价
          <el-rate v-model="value" :disabled="isread" :allow-half="true" @change="changeHandler" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      value1: null
    }
  },
  computed: {
    movie() {
      return this.$store.getters.getMovie(this.$route.params.id)
    },
    value: {
      get: function() {
        return this.$store.getters.getRate(this.$route.params.id)
      },
      set: function(newValue) {
        this.value1 = newValue
      }
    },
    isread() {
      if (this.value === null) {
        return false
      }
      return true
    },
    rate() {
      return this.$store.getters.getAllRate(this.$route.params.id)
    },
    rate1: {
      get: function() {
        return Number(this.rate[1].toFixed(1))
      },
      set: function() {
        if (this.rate[1] === 0) {
          return 0
        }
      }
    }
  },
  methods: {
    changeHandler(value) {
      if (this.$store.getters.getRate(this.$route.params.id) === null) {
        this.changeHandlerMethod(value)
      }
    },
    changeHandlerMethod(value) {
      this.addaxiosinterceptor()
      let vm = this
      axios
        .post(
          '/api/rate/save.do',
          qs.stringify({ movieId: vm.movie.id, rate: value })
        )
        .then(function(response) {
          vm.$store.commit('getRates')
        })
        .catch(function(error) {
          vm.$message.error('认证失败，已跳转到登陆页面')
          console.log(error)
          vm.$router.push({ path: '/login' })
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
.el-col {
  margin: 10px;
}
img {
  width: 160px;
  height: 220px;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  float: left;
}
.right {
  padding-top: 5px;
  float: right;
  width: 290px;
}
</style>
