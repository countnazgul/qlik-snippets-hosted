<template>
  <div class="hello">
    <div v-for="snippet in snippets">
      <snippet :snippet="snippet" :selected="selected" v-on:showCode="showCode"></snippet>
    </div>

  </div>
</template>

<script>
  import Snippet from './Snippet';
  // import axios from 'axios';


  export default {
    name: 'Snippets',
    props: ['snippets', 'selected'],
    components: {
      Snippet
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      };
    },
    methods: {
      showCode: function(code) {
        // console.log(code);
        this.$emit('showCode', code);
      }
    },
    mounted: function() {
      // axios.get('https://httpbin.org/ip')
      //   .then(function(response) {
      //     console.log(response.data);
      //   })
      //   .catch(function(error) {
      //     console.log(error.message);
      //   });      
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
