<template>
  <div class="articleDetail-title">
    <div class="title-con" v-html="TotitleData.title"></div>
    <!-- <h3 v-html="TotitleData.title"></h3> -->
    <div class="author-article-message">
      <span
        class="userImg"
        v-if="TotitleData.authorInfo&&TotitleData.authorInfo.avatar"
        :style="{backgroundImage:'url('+TotitleData.authorInfo.avatar+')'}"
      ></span>
      <span class="userImg-default userImg" v-else></span>
      <span class="authorName" v-if="TotitleData.authorInfo">{{TotitleData.authorInfo.name}}</span>
      <span class="create-time" v-if="TotitleData.createTime">{{timeClear(TotitleData.createTime)}}</span>
      <span
        class="create-time"
        v-else-if="TotitleData.lastEditTime"
      >{{timeClear(TotitleData.lastEditTime)}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class AricleDetailTitle extends Vue {

  @Prop() public TotitleData!: any;
    public timeClear(str: string) {
      const time = str.split(' ');
      return time[0].replace(/-/gi, '.');
    }

}
</script>
<style lang="scss">
.articleDetail-title {
  margin-top: 20px;
  .title-con {
    font-size: 20px;
    color: #333333;
    line-height: 28px;
    font-weight: bolder;
  }
  .author-article-message {
    margin-top: 12px;
    position: relative;
    margin-bottom: 14px;
    line-height: 30px;
    color: #333;
    font-size: 15px;
    height: 45px;
    border-bottom: 1px solid #ececec;
    .userImg {
      display: inline-block;
      width: 30px;
      height: 30px;
      border-radius: 100px;
      background-size: cover;
      vertical-align: middle;
      margin-right: 12px;
    }
    .userImg-default {
      background-image: url('../../assets/icon/user-default.png');
    }
    .create-time {
      float: right;
      color: #666;
      font-size: 12px;
    }
  }
}
</style>