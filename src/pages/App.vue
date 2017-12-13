<template>
  <div>
    <h2>22</h2>
    <img src="../assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld'
// import Vue from 'vue'
export default {
  name: 'app',
  data () {
    return {
      aa: 1
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    console.log(2)
  }
}
// let vm = new Vue({
//   el: '#app',
//   template: '<HelloWorld/>',
//   components: { HelloWorld }
// })
// var vm = new Vue({
//   el: '#app',
//   render: h => h(HelloWorld)
// })
// Vue.use({
//   vm
// })
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
