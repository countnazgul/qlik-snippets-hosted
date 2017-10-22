<template>
  <div id="app" v-bind:style="styleApp">
    

    <el-row>
      <el-col :span="24">
        <div class="grid-content header">
          <span>Qlik Snippets</span>
          <img @click="dialogVisible = true" src="./assets/info-icon.png" class="about"></img>
          <span class="line"></span>        
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-row>
          <div style="margin-top: 5px;" class="grid-content bg-purple">Mini Header</div>
        </el-row>
        <el-row  style="margin-top: 5px;">
          <div class="div_1"  v-bind:style="div1">
          <snippets  :snippets="snippets" :selected="selected" v-on:showCode="showCode" filter="true" class="bg-purple-dark"/>          
          </div>
        </el-row>
        
      </el-col>
      <el-col :span="19">        
        <el-row >
          Content
          <span class="line1">&nbsp</span>Content
        </el-row></el-col>
    </el-row>   
    <el-row>
      <el-col :span="24">
        <div>test</div>
      </el-col>
    </el-row>    




    <!--<el-row>-->
    <!--  <el-col :span="24">-->
    <!--    <div class="grid-content header">-->
    <!--      <span>Qlik Snippets</span>-->
    <!--      <img @click="dialogVisible = true" src="./assets/info-icon.png" class="about"></img>-->
    <!--      <span class="line"></span>        -->
    <!--    </div>-->
    <!--  </el-col>-->
    <!--</el-row>-->
    <!--<el-row>-->
    <!--  <el-col :span="5">-->
    <!--    <el-row>-->
    <!--      <div style="margin-top: 5px;" class="grid-content bg-purple">Mini Header</div>-->
    <!--    </el-row>-->
    <!--    <el-row  style="margin-top: 5px;">-->
    <!--      <div class="grid-content bg-purple-dark"></div>-->
    <!--      <snippets  :snippets="snippets" :selected="selected" v-on:showCode="showCode" filter="true" class="bg-purple-dark"/>          -->
    <!--    </el-row>-->
        
    <!--  </el-col>-->
    <!--  <el-col :span="19">        -->
    <!--    <el-row >-->
    <!--      Content-->
    <!--      <span class="line1">&nbsp</span>Content-->
    <!--    </el-row></el-col>-->
    <!--</el-row>   -->
    <!--<el-row>-->
    <!--  <el-col :span="24">-->
    <!--    <div>test</div>-->
    <!--  </el-col>-->
    <!--</el-row>    -->
    
      
    
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
        remoteData: false,
        styleApp: {
          height: '0px'
        },
        div1: {
          height: '0px'
        }
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
      getWindowHeight(event) {
        var _this = this;
        _this.styleApp.height = document.documentElement.clientHeight + 'px';
        _this.div1.height = (document.documentElement.clientHeight - 132) + 'px';
      }
    },
    mounted: function() {
      var _this = this;

      this.$nextTick(function() {
        // window.addEventListener('resize', this.getWindowWidth);
        window.addEventListener('resize', this.getWindowHeight);

        //Init
        // this.getWindowWidth()
        this.getWindowHeight();
      });

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
  .el-row {
    margin-bottom: 0px !important;
  }

  .line {
    margin-top: 10px;
    display: block;
    width: 100%;
    border-top: 1px solid #ccc;
  }

  .line1 {
    margin-left: 10px;
    float: left;
    width: 1%;
    overflow: hidden;
    border-left: 1px solid #ccc;
    height: 100vh;
  }

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

  /*html {*/

  /*  height: 100%;*/

  /*}*/

  /*body {*/

  /*  margin: 0px;*/

  /*  height: 100%;*/

  /*  min-height: 100%;*/

  /*  position: absolute;*/

  /*  top: 0;*/

  /*  left: 0;*/

  /*  right: 0;*/

  /*  bottom: 0;*/

  /*  overflow: auto;*/

  /*  display: flex;*/

  /*  flex-direction: column;*/

  /*}*/

  html,
  body {

    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    margin: 0px;
  }

  .header {
    text-align: center;
    font-size: 50px;
    font-family: 'QlikView Sans';
    font-weight: bold;
    margin-top: 10px;
    /*height: 10%;*/
  }

  .code {
    float: left;
    width: 64%;
    overflow: hidden;
    margin-top: 10px;
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

  .about {
    width: 20px;
    float: right;
    margin-right: 10px;
    cursor: pointer;
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }


            .div_1
            {

                /*height: 520px;*/
                /*width: 350px;*/
                /*margin: auto;*/
                /*border: 1px black solid;*/
                overflow-y: auto;
                overflow-x: hidden;
            }

            .div_3
            {
                float: left;
                /*height: 350px;*/
                /*width: 500px;*/
                /*margin: auto;*/
                /*border: 1px black solid;*/
                overflow-y: auto;
                overflow-x: hidden;
            }

            .div_2
            {
                height: 100px;
                /*width: 100px;*/
                border: 1px solid #A2A2A2;
                /*float: left;*/
                overflow-x: hidden;
            }


</style>
