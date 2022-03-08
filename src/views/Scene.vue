<template>
    <div id='scene'>

    </div>
</template>
<script>
import Base3d from '@/utils/Base3d.js'
export default {
    data () {
        return{
            panel:null
        }
    },
    created () {
        
    },
    mounted () {
        this.panel = new Base3d('#scene')
    }
}
</script>
<style scoped lang="less">

</style>