<template>
    <div v-on:click="showCode" v-bind:class="{'selected': snippet.class, 'notSelected': !snippet.class, 'snippetlist': 1, 'div_2': 1 } ">{{snippet.name}} ({{snippet.type}}) 
    <!--{{ class() }}-->
    
    </div>
</template>

<script>
    export default {
        name: 'Snippet',
        props: ['snippet', 'selected'],
        data() {
            return {
                // msg: 'Welcome to Your Vue.js App'
            };
        },
        methods: {
            showCode: function() {
                this.$emit('showCode', this.snippet);
            }
        },
        watch: {
            selected: function(newVal, oldVal) {
                // console.log(newVal, oldVal)
                // console.log(newVal, oldVal);
                var _this = this;

                if (newVal == _this.snippet.id) {
                    _this.snippet.class = true;
                }
                else {
                    _this.snippet.class = false;
                }

                _this.$forceUpdate();
            },
            '$route': function() {
                // var _this = this;
                // console.log(_this.$route.params.id);
            }
        },
        mounted: function() {
            var _this = this;
            
            //     // _this.selected = _this.snippet.id.toString();
            //     if(_this.selected > 0) {
            if (_this.selected.toString() == _this.snippet.id.toString()) {
                // console.log(_this.snippet)
                // this.$emit('showCode', _this.snippet);
                _this.snippet.class = true;
                _this.$forceUpdate();
                // console.log(_this.snippet);
                //             this.$emit('showCode', _this.snippet);
                //             // console.log(_this.selected.toString(), _this.snippet.id.toString());
                //             //  _this.snippet.class = true;
                //             //  console.log(_this.snippet.class)
                //         }
            }
        },
        computed: {
            class() {
                
                // return this.value === 'Y' ? 'checked' : 'unchecked'
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .snippetlist {
        font-size: 14px;
        font-weight: normal;
        height: 40px;
        padding-left: 9px;
    }

    .selected {
        color: #6cb33f;
        font-weight: bold;
        cursor: pointer;
    }
</style>
