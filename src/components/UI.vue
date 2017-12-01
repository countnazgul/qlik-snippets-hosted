<template>
<div id="app" v-bind:style="styleApp" >
    <router-view></router-view>
    <el-row> 
        <el-col :span="24">
            <div class="grid-content header">
                <router-link to="/" @click.native="headerClick" class="mainLink"><span>Qlik Snippets</span></router-link>
                <router-link to="/documentation"><img src="../assets/info-icon.png" class="about"></img></router-link>
                  

                <!--<div class="about"><router-link to="/documentation">About</router-link></div>-->
                <span class="line"></span>
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="7" style="margin-top: 0px;">
            <el-row>
                <el-select class="grid-content" v-model="selected" filterable placeholder="Search" no-match-text="Nothing found" @change="searchChanged" style="margin-top: -1px">
                    <el-option v-for="snippet in snippets" :key="snippet.id" :label="snippet.name" :value="snippet.id">
                    </el-option>
                </el-select>
            </el-row>
            <el-row style="border-right: 1px solid #ccc;">
                <div class="div_1" v-bind:style="div1">
                    <snippets :snippets="snippets" :selected="selected" v-on:showCode="showCode" filter="true" class="" />
                </div>
            </el-row>
        </el-col>
        <el-col :span="17">
            <el-row>
                <!--<span class="line1">&nbsp</span>-->
                <div v-if="selected" class="code">
                    <b>Code</b> &nbsp <i v-clipboard="code.code"  @success="copyOk" @error="copyNotOk" class="el-icon-upload2 copy" title="Copy to clipboard"></i>
                    <br>
                    <pre v-if="selected" class="qvcode" v-html="code.code" style="background-color: #e8e8e8;"></pre>
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
                        <br>
                        <br>
                    </div>
                    <div v-if="code.contributor">
                        <b>Contributor</b>
                        <br>
                        <a :href="code.contributor.link">{{code.contributor.name}}</a>
                    </div>                    
                </div>
                <el-col :span="23" v-else class="message code">
                    <div>Select or search for snippet</div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>

    <!--<el-dialog title="Qlik Snippets (v0.6.1)" :visible.sync="dialogVisible" size="small" :before-close="handleClose">-->
    <!--    <b>About</b>-->
    <!--    <br>-->
    <!--    <span>Currated list of useful Qlik expressions and script snippets</span>-->
    <!--    <br>-->
    <!--    <br>-->
    <!--    <b>Contribute</b>-->
    <!--    <br>-->
    <!--    <span>If you want to contribute please sent an email to <b>admin@qlik-snippets.com</b> with the code and short description (having small qvw/qvf example file is always welcome)</span>-->
    <!--    <br>-->
    <!--    <br>-->
    <!--    <span slot="footer" class="dialog-footer">-->
    <!--    <span style="font-size: 12px; float: left;">This site is not not affiliated with Qlik | <a href="https://twitter.com/countnazgul" target="_blank">@countnazgul</a></span>-->
    <!--    <el-button @click="dialogVisible = false">Close</el-button>-->
    <!--    </span>-->
    <!--</el-dialog>-->
    
</div>
</template>

<script>
  import Snippets from './Snippets';
  import json from '../data/snippets.json';
  import axios from 'axios';

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
        isLoaded: true,
        styleApp: {
          height: '0px'
        },
        div1: {
          height: '0px',
          'margin-top': '5px'
        }
      };
    },
    methods: {
      handleClose(done) {

      },
      headerClick: function() {
        this.selected = null;
      },
      showCode: function(code) {
        // console.log('code app!');
        this.code = code;
        this.code.description = converter.makeHtml(this.code.description);

        // this.code.code = converter.makeHtml(this.code.code);

        // console.log(this.selected,code.id);
        if (this.selected != code.id) {
          this.selected = code.id;
          this.$router.push({ name: 'Snippets', params: { id: code.id.toString() } });
        }
        else {
          this.selected = null;
          this.code = '';
          this.$router.push({ path: '/' });
        }
      },
      searchChanged: function() {
        var _this = this;

        for (var i = 0; i < _this.snippets.length; i++) {
          if (_this.snippets[i].id == _this.selected) {
            _this.code = _this.snippets[i];
            _this.$router.push({ name: 'Snippets', params: { id: _this.selected } });
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
      copyNotOk() {
        const h = this.$createElement;

        this.$notify({
          title: 'Error',
          message: 'Copy to clipboard failed',
          type: 'error',
          duration: 2000
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
      //console.log(_this.$route)

      // if(_this.$route.name == 'Rest') {
      //   _this.rest = false; 
      // }

      

      this.$nextTick(function() {
        var _this = this;
        var routerId = _this.$route.params.id;

        // if (newVal == true) {
          if (_this.$route.params.id) {


            var exists = false;

            for (var i = 0; i < _this.snippets.length; i++) {
              // console.log(exists);
              if (_this.snippets[i].id.toString() == _this.$route.params.id.toString()) {
                _this.code = _this.snippets[i];
                _this.code.description = converter.makeHtml(_this.code.description);
                exists = true;
              }
            }

            if (exists == true) {
              _this.selected = _this.$route.params.id;
            }
            else {
              _this.$router.push({ path: '/' });

              this.$notify({
                title: 'Error',
                message: "Snippet (id = " + routerId + ") do not exists :(",
                type: 'error',
                duration: 4000
              });
            }
          }

          // window.addEventListener('resize', this.getWindowWidth);
          window.addEventListener('resize', this.getWindowHeight);

          //Init
          // this.getWindowWidth()
          this.getWindowHeight();
        // }
      });

      if (_this.remoteData == false) {
        
        json.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        });        
        
        _this.snippets = json;
        for (var i = 0; i < _this.snippets.length; i++) {
          _this.snippets[i].class = false;
        }
      }
      else {
        axios.get('https://ldb-extract-countnazgul.c9users.io:8081/getsnippets')
          .then(response => {
            _this.snippets = response.data;
            // console.log(response.data);
            for (var i = 0; i < _this.snippets.length; i++) {
              _this.snippets[i].class = false;
            }

            _this.isLoaded = true;
          })
          .catch(e => {
            this.errors.push(e);
          });
      }
    },
    watch: {
      isLoaded: function(newVal, oldVal) {

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
    margin-left: 2px;
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
  }

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
    /*width: 64%;*/
    overflow: hidden;
    margin-top: 10px;
    margin-left: 10px;
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
    width: 100%;
  }

  .notSelected {
    color: black;
    font-weight: bold;
    cursor: pointer;
  }

  @font-face {
    font-family: "QlikView Sans";
    src: url(../assets/qlikview-sans.ttf) format('truetype');
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

  .div_1 {

    /*height: 520px;*/
    /*width: 350px;*/
    /*margin: auto;*/
    /*border: 1px black solid;*/
    overflow-y: auto;
    overflow-x: hidden;
  }

  .div_3 {
    float: left;
    /*height: 350px;*/
    /*width: 500px;*/
    /*margin: auto;*/
    /*border: 1px black solid;*/
    overflow-y: auto;
    overflow-x: hidden;
  }

  .div_2 {
    height: 100px;
    /*width: 100px;*/
    /*border: 1px solid #A2A2A2;*/
    /*float: left;*/
    overflow-x: hidden;
  }


  .mainLink {
    /*background-color: indianred;*/
    cursor: pointer;
    text-decoration-line: none !important;
    text-decoration-color: black !important;
    color: black !important;
  }
</style>
