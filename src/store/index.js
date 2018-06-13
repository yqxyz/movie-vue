import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)
export default new vuex.Store({
  state: {
    movies: [],
    rates: [],
    allRates: [],
    rec: []
  },
  getters: {
    getMovie: state => id => {
      for (let x in state.movies) {
        if (state.movies[x].id + '' === id) {
          return state.movies[x]
        }
      }
      return []
    },
    getRecMovie: state => {
      let Arrays = new Array()
      for (let x = 0; x < state.movies.length; x++) {
        for (let y = 0; y < state.rec.length; y++) {
          if (state.movies[x].id === state.rec[y].itemID) {
            Arrays.push(state.movies[x])
          }
        }
      }
      return Arrays
    },
    getMoviePage: state => obj => {
      let Arrays = new Array()
      for (let x = 0; x < obj.size; x++) {
        let i = (obj.page - 1) * obj.size + x
        if (state.movies[i] !== undefined) {
          Arrays.push(state.movies[i])
        }
      }
      return [Arrays, state.movies.length]
    },
    getRate: state => id => {
      for (let x in state.rates) {
        if (state.rates[x].movieId + '' === id) {
          return state.rates[x].rate
        }
      }
      return null
    },
    getAllRate: state => id => {
      for (let x in state.allRates) {
        if (state.allRates[x][0] + '' === id) {
          return state.allRates[x]
        }
      }
      return [0, 0, 0]
    }
  },
  mutations: {
    getMovies: state => {
      axios.get('/api/movie/list.do').then(function(respone) {
        state.movies = respone.data.data
      })
    },
    getRec: state => {
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
      axios
        .get('/api/jwt/movie/recommend.do')
        .then(function(respone) {
          state.rec = respone.data.data
        })
        .catch(function(error) {
          localStorage.removeItem('token', '')
          console.log(error)
        })
    },
    getAllRate: state => {
      axios.get('/api/rate/all.do').then(function(respone) {
        state.allRates = respone.data.data
      })
    },
    getRates(state) {
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
      axios
        .get('/api/jwt/rate/list.do')
        .then(function(respone) {
          state.rates = respone.data.data
        })
        .catch(function(error) {
          localStorage.removeItem('token')
          console.log(error)
        })
    }
  },
  actions: {}
})
