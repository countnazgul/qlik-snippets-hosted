<template>
    <div class="main">
        <div class="docsContainer">
            <div class="docs"><router-link to="/">Home</router-link></div>
            <div v-html="code" class="docs"></div>
        </div>
    </div>
</template>

<script>
    import docs from '../data/documentation.json';
    import showdown from 'showdown';
    var converter = new showdown.Converter();

    export default {
        name: 'Documentation',
        data() {
            return {
                code: '',
            };
        },
        mounted: function() {
            var _this = this;
            var documentation = docs.docs.replace('VVVV', docs.version);
            _this.code = converter.makeHtml(documentation);
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @font-face {
        font-family: "QlikView Sans";
        src: url(../assets/qlikview-sans.ttf) format('truetype');
    }

    /** {*/

    /*    padding: 0;*/

    /*    margin: 0;*/

    /*}*/

    .main {
        display: flex;
        text-align: center;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 0 3%;
        align-items: center; /* align vertical */        
    }

    .docsContainer {
        font-family: 'QlikView Sans';
    }

    .docs {
        text-align: left;
    }
</style>
