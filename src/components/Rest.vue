<template>
    <div>
        {{ code }}
    </div>
</template>

<script>
    import json from '../data/snippets.json';
    
    export default {
        name: 'Rest',
        data() {
            return {
                code: ''
            };
        },
        mounted: function() {
            var _this = this;
            var id = _this.$route.params.id;
            
            var exists = false;
            for(var i = 0; i < json.length; i++) {
                if( json[i].id == id ) {
                    exists = true;
                    _this.code = json[i].code;
                }
            }
            
            if( exists == false ) {
                _this.code = 'The specified snippet id do not exists!';
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
