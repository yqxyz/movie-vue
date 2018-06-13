module.exports = {
  devServer: {
    host: "localhost",
    port: 80,
    proxy: {
      "/**.do": {
        target: "http://localhost:8080"
      }
    }
  }
};
