<template>
  <div class="article-source-author" > 
    <span>原作者：</span><span  v-html="TotitleData.authorName"></span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class SourceAuthor extends Vue {
  @Prop() public TotitleData!: any;
}
</script>
<style lang="scss" scoped>
  .article-source-author{
    color: #999999;
    font-size: 11px;
    line-height:22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>