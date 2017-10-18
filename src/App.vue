<template>
  <div id="app">
    <el-row>
    <div class="header">
      <span>Qlik Snippets</span>
      <img @click="dialogVisible = true" src="./assets/info-icon.png" class="about"></img>
    </div>
    </el-row>
    <span class="line"></span>
    <!--<el-button type="text" @click="dialogVisible = true">Add snippet</el-button>-->

    <el-dialog
      title="Qlik Snippets"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose">
      <b>About</b>
      <br>
      <span>Currated list of useful Qlik expressions and script snippets</span>
      <br>
      <br>
      <b>Contribute</b>
      <br>
      <span>If you want to contribute please sent an email to <b>test@test.com</b> with the code and short description (having small qvw/qvf example file is always welcome)</span>
      <br>
      <br>
      <!--<span style="font-size: 12px;">*This site is not not affiliated with Qlik</span>-->
      <span slot="footer" class="dialog-footer">
        <span style="font-size: 12px; float: left;">This site is not not affiliated with Qlik</span>
        <el-button @click="dialogVisible = false">Close</el-button>
        <!--<el-button type="primary" @click="dialogVisible = false">Confirm</el-button>-->
      </span>
    </el-dialog>    
    
    <div class="bottom">
      <div class="snippets">
        <el-row>
          <el-col :span="24">
            <el-select class="grid-content bg-purple-dark" v-model="selected" filterable placeholder="Snippet Search" no-match-text="Nothing found" @change="searchChanged">
          <el-option
            v-for="snippet in snippets"
            :key="snippet.id"
            :label="snippet.name"
            :value="snippet.id"
            >
          </el-option>
        </el-select>
          </el-col>
        </el-row>
        <!--<br>-->
        <!--<br>-->
        <el-row>
          <el-col :span="24">
        <snippets  :snippets="snippets" :selected="selected" v-on:showCode="showCode" filter="true"/>
        </el-col>
        </el-row>
      </div>
      <span class="line1">&nbsp</span>
      <div v-if="selected" class="code">
        <b>Code</b> &nbsp <i @click="copyOk" class="el-icon-upload2 copy" title="Copy to clipboard"></i>
        <br>
        <code v-if="selected" class="qvcode" v-html="code.code"></code>
        <br>
        <br>
        <b>Description</b>
        <div v-html="code.description"></div>
        <br>
        <div v-if="code.references && code.references.length">
          <b>References</b>
          <br>
          <a class="reference" v-for="(reference, index) in code.references" :href="reference" target="_blank">Reference {{index + 1}}</a>      
          <br>
        </div>
        <br>
        <div v-if="code.qvw">
          <b>Example</b>
          <br>
          <a :href="code.qvw">Download</a>
        </div>        
      </div>
      <div v-else class="message code" >Select or search for snippet</div>
    </div>
  </div>
</template>

<script>
  import Snippets from './components/Snippets';
  import json from './data/snippets.json';
  // import json from 'https://storage.googleapis.com/qlik-snippets/snippets.json';
  // import vSelect from "vue-select";
  import axios from 'axios';

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
        selected: '',
        remoteData: false
      };
    },
    methods: {
      handleClose(done) {

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
      if (_this.remoteData == false) {
        _this.snippets = json;
        for (var i = 0; i < _this.snippets.length; i++) {
          _this.snippets[i].class = false;
        }
      }
      else {
        axios.get('https://s3.eu-west-2.amazonaws.com/qlik-snippets/snippets.json')
          .then(response => {
            _this.snippets = response.data;
            // console.log(response.data);
            for (var i = 0; i < _this.snippets.length; i++) {
              _this.snippets[i].class = false;
            }
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    },
    updated: function() {

    }
  };
</script>

<style>
  #app {
    font-family: 'QlikView Sans';
    height: 100%;
    overflow: hidden;
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  html {
    height: 100%;
  }

  body {
    margin: 0px;
    height: 100%;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .header {
    text-align: center;
    font-size: 50px;
    font-family: 'QlikView Sans';
    font-weight: bold;
    margin-top: 10px;
    height: 10%;
  }

  .code {
    float: left;
    width: 64%;
    overflow: hidden;
    margin-top: 10px;
  }

  .line1 {
    float: left;
    width: 1%;
    overflow: hidden;
    border-left: 1px solid #ccc;
  }

  .snippets {
    width: 34%;
    overflow: hidden;
    /*padding-left: 10px;*/
    margin-top: -1px;
    margin-left: 0px;
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

  .el-dialog__body {
    padding-bottom: 10px !important;
  }

  .el-select {
    width: 101%;
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

  .message {
    display: flex;
    justify-content: center;
    /*align-items: center;*/
    font-size: 30px;
    text-align: center;
  }

  .line {
    margin-top: 10px;
    display: block;
    width: 100%;
    border-top: 1px solid #ccc;
  }

  .bottom {
    /*margin-top: 10px;*/
    display: flex;
    height: 90%;
  }

  .about {
    width: 20px;
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }
</style>
