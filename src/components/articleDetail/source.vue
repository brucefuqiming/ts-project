<template>
  <div class="article-source">
    <span>来源：</span><span v-html="TotitleData.websiteName"></span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class ArticleSource extends Vue {
  @Prop() public TotitleData!: any;
}
</script>
<style lang="scss" scoped>
  .article-source{
    margin-top: 24px;
    color: #999999;
    font-size: 11px;
    line-height:22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
