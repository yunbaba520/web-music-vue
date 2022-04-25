<template>
  <div class="created-wrap">
    <h2>关注列表</h2>
    <div class="list">
      <template v-for="item in userFollows" :key="item.userId">
        <singer-item :img="item.avatarUrl" :name="item.nickname"></singer-item>
      </template>
    </div>
  </div>
</template>

<script>
import SingerItem from '../../../components/singer-item.vue'
import { mapState } from "vuex";

export default {
  
  computed: {
    ...mapState(["userFollows"]),
  },
  components: {
    SingerItem
  },
  methods: {
    
  },
};
</script>

<style lang="less" scoped>
.created-wrap {
  width: 1360px;
  margin: 0 auto;
  .list {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    justify-items: center;
    
  }
}
</style>
