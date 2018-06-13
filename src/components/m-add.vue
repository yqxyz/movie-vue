<template>
  <el-row type="flex" justify="center">

    <el-col :span="4">
      <el-input v-model="input" placeholder="电影名" />

      <el-upload ref="upload" :headers="headers" :data="movieName" :on-exceed="handleExceed" :on-change="handleChange" :on-success="handleSuccess" :file-list="fileList" :auto-upload="false" :limit="1" class="upload-demo" action="/api/jwt/movie/upload.do">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button size="small" type="success" @click="submitUpload">上传图片和电影名</el-button>
        <div slot="tip" class="el-upload__tip">只能上传一个jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      fileList: [],
      input: ''
    }
  },
  computed: {
    movieName() {
      return { movieName: this.input }
    },
    headers() {
      return { authorization: localStorage.getItem('token') }
    }
  },
  methods: {
    handleChange(file, fileList) {
      if (file.size > 512000) {
        this.$message.warning(`文件大小超过500k`)
        this.$refs.upload.clearFiles()
      }
    },
    submitUpload() {
      if (this.input === '') {
        this.$message.warning(`请填写用户名`)
      } else {
        this.$refs.upload.submit()
      }
    },
    handleSuccess(response, file, fileList) {
      this.input = ''
      this.$refs.upload.clearFiles()
      this.$store.commit('getMovies')
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    }
  }
}
</script>

<style lang="css" scoped>
.el-input {
  margin-bottom: 10px;
}
.el-button {
  margin-left: 12px;
}
</style>
