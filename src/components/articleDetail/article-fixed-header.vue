<template>
  <div class="articleDetail-fixheader">
    <div class="go-back"></div>
    <div class="header-con" v-html="TotitleData.title"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class extends Vue {
  @Prop() public TotitleData!: any;
}
</script>

<style lang="scss" scoped>
  .articleDetail-fixheader{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    background-color: #fff;
    z-index: 1;
    .go-back{
      position: absolute;
      left: 12px;
      top: 6px;
      width: 12px;
      height: 32px;
      background-image: url("../../assets/icon/goback.png");
      background-repeat: no-repeat;
      background-size: 12px 22px;
      background-position: center;
    }
    .header-con{
      line-height: 44px;
      font-size: 18px;
      border-bottom: 1px solid #E9E9EB;
      letter-spacing:2px;
      text-align: center;
      padding: 0 56px;//32
      font-weight: bolder;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  } 
</style>


