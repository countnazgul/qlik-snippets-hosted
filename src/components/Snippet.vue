<template>
    <div v-on:click="showCode" v-bind:class="{'selected': snippet.class, 'notSelected': !snippet.class, 'snippetlist': 1, 'div_2': 1 } ">{{snippet.name}} ({{snippet.type}})</div>
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
                var _this = this;

                if (newVal == _this.snippet.id) {
                    _this.snippet.class = true;
                }
                else {
                    _this.snippet.class = false;
                }

                _this.$forceUpdate();
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
        color: red;
        font-weight: bold;
        cursor: pointer;
    }
</style>
