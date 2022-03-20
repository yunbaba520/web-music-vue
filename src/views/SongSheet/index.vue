<template>
    <div>
<h2>歌单</h2>
<song-sheet-options/>
<song-sheet-list/>
    </div>
</template>

<script>
import SongSheetOptions from './c_cpns/songsheet-options.vue'
import SongSheetList from './c_cpns/songsheet-list.vue'
    export default {
        components:{
            SongSheetOptions,
            SongSheetList
        }
    }
</script>

<style lang="less" scoped>

</style>