<template>
  <div class="article-source-address" >
    <span v-html="TotitleData.originalUrl"></span>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class SourceAddress extends Vue {
  @Prop() public TotitleData!: any;
}
</script>
<style lang="scss" scoped>
  .article-source-address{
    color: #999999;
    font-size: 11px;
    line-height:22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 1px;
  }
</style>