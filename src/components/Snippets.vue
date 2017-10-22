<template>
  <div class="snippetsList div_3">
      <snippet v-for="snippet in snippets" style="height: 50px" :snippet="snippet" :selected="selected" v-on:showCode="showCode" :key="snippet.id"></snippet>
  </div>
</template>

<script>
  import Snippet from './Snippet';

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
  .snippetsList {
    overflow-y: auto; 
    width: 100%;
  }
</style>
