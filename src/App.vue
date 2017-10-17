<template>
  <div id="app">
    <div class="header">
      <span>Qlik Snippets</span>
      <hr>
    </div>
    <!--<el-button type="text" @click="dialogVisible = true">Add snippet</el-button>-->

    <!--<el-dialog-->
    <!--  title="Add Snippet"-->
    <!--  :visible.sync="dialogVisible"-->
    <!--  size="tiny"-->
    <!--  :before-close="handleClose">-->
    <!--  <span>Add Snippet</span>-->
    <!--  <span slot="footer" class="dialog-footer">-->
    <!--    <el-button @click="dialogVisible = false">Cancel</el-button>-->
    <!--    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>-->
    <!--  </span>-->
    <!--</el-dialog>    -->
    
    <div>
      <div class="snippets">
        <el-select v-model="selected" filterable placeholder="Snippet Search" no-match-text="Nothing found" @change="searchChanged">
          <el-option
            v-for="snippet in snippets"
            :key="snippet.id"
            :label="snippet.name"
            :value="snippet.id"
            >
          </el-option>
        </el-select>
        <br>
        <br>
        <snippets  :snippets="snippets" :selected="selected" v-on:showCode="showCode" filter="true"/>
      </div>
      <div v-if="selected" class="code">
        <div v-html="code.description"></div>
        <br>
        <!--class="lui-icon lui-icon--copy" -->
        <!--<span -->
        <!--  aria-hidden="true" -->
        <!--  style="cursor: pointer;" -->
        <!--  v-if="selected" -->
        <!--  @click="copyOk" -->
        <!--  v-clipboard="code.code"  -->
        <!--  title="Copy to clipboard">-->
        <!--</span>-->
        &nbsp<a class="reference" v-for="(reference, index) in code.references" :href="reference" target="_blank">Reference {{index + 1}}</a>      
        <br>
        <br>
        <i @click="copyOk" class="el-icon-upload2 copy" title="Copy to clipboard"></i>
        <br>
        <code class="qvcode" v-html="code.code"></code>
      </div>
    </div>
  </div>
</template>

<script>
  import Snippets from './components/Snippets';
  import json from './data/snippets.json';
  // import json from 'https://storage.googleapis.com/qlik-snippets/snippets.json';
  // import vSelect from "vue-select";
  // import axios from 'axios';

  // import leonardoStyle from '../node_modules/leonardo-ui/dist/leonardo-ui.css';
  // import leonardoJS from '../node_modules/leonardo-ui/dist/leonardo-ui.js';

  import showdown from 'showdown';
  var converter = new showdown.Converter();

  export default {
    name: 'app',
    components: {
      Snippets
    },
    data() {
      return {
        snippets: [],
        dialogVisible: false,
        code: '',
        selected: ''
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      showCode: function(code) {
        // console.log('code app!');
        this.code = code;
        this.code.description = converter.makeHtml(this.code.description);

        // this.code.code = converter.makeHtml(this.code.code);

        if (this.selected != code.id) {
          this.selected = code.id;
        }
        else {
          this.selected = null;
          this.code = '';
        }
      },
      searchChanged: function() {
        var _this = this;

        for (var i = 0; i < _this.snippets.length; i++) {
          if (_this.snippets[i].id == _this.selected) {
            _this.code = _this.snippets[i];
            _this.code.description = converter.makeHtml(_this.code.description);
          }
        }
      },
      copyOk() {
        const h = this.$createElement;

        this.$notify({
          title: 'Success',
          message: 'Copied to clipboard',
          type: 'success',
          duration: 1000
        });
      },
    },
    mounted: function() {
      var _this = this;

      _this.snippets = json;
      for (var i = 0; i < _this.snippets.length; i++) {
        _this.snippets[i].class = false;
      }


      // axios.get('https://storage.googleapis.com/qlik-snippets/snippets.json', {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       crossdomain: true,
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json',

      //     }
      //   })
      //   .then(response => {
      //     _this.snippets = response.data;
      //     for (var i = 0; i < _this.snippets.length; i++) {
      //       _this.snippets[i].class = false;
      //     }
      //   })
      //   .catch(e => {
      //     this.errors.push(e);
      //   });
    },
    updated: function() {

    }
  };
</script>

<style>
  #app {
    font-family: 'QlikView Sans';
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }
  
  body {
    margin: 0px;
  }

  .header {
    text-align: center;
    font-size: 50px;
    font-family: 'QlikView Sans';
    font-weight: bold;
    margin-top: 10px;
  }

  .code {
    float: left;
    width: 65%;
    overflow: hidden;
  }

  .snippets {
    float: left;
    width: 35%;
    overflow: hidden;
  }

  code {
    background-color: #e8e8e8;
    /*display: inline-block;*/
    /*width: 100%;*/
    /*line-height: 2;*/
  }

  p {
    margin: 0px;
  }

  .qvcode {
    font-size: 16px;
  }

  .reference {
    padding-right: 10px;
    font-size: 12px;
  }

  .el-select-dropdown__list {
    font-family: 'QlikView Sans';
  }

  .el-select-dropdown__empty {
    font-family: 'QlikView Sans';
  }

  .el-input__inner {
    font-family: 'QlikView Sans';
    border-radius: 0px !important;
  }

  .el-select {
    width: 450px;
  }

  .notSelected {
    color: black;
    font-weight: bold;
    cursor: pointer;
  }

  @font-face {
    font-family: "QlikView Sans";
    src: url(./assets/qlikview-sans.ttf) format('truetype');
  }

  /*@font-face {*/

  /*  font-family: "LUI icons";*/

  /*  src: url(../node_modules/leonardo-ui/dist/lui-icons.woff) format('woff'),*/

  /*  url(../node_modules/leonardo-ui/dist/lui-icons.ttf) format('truetype');*/

  /*}*/

  .el-notification__group {
    font-family: 'QlikView Sans';
  }

  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .copy {
    cursor: pointer;
    font-size: 12px;
    color: gray;
  }
</style>
