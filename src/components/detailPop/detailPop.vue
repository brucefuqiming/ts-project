<template>
  <popup v-bind:show="show" v-on:close-pop="close">
    <div class="loading" v-if="loading">
      <div class="loading-icon"></div>
    </div>
    <div class="float-container" v-else>
      <div class="success" v-if="success">
        <div class="title-container">{{title}}</div>
        <div class="desc-container" v-html="desc"></div>
      </div>
      <div class="fail" v-else>
        <img class="fail-icon" :src="require('@/assets/icon/alert.png')">
        <div class="fail-title1">目标内容暂不存在</div>
        <div class="fail-title2">你可访问PC端【全历史】创建相关内容</div>
      </div>
      <div class="next-container" @click="wakeup">打开APP查看详情</div>
    </div>
  </popup>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {  State, Getter, Action, Mutation } from 'vuex-class';
import Popup from '../popUp/popUp.vue';
import StringUtil from '@/utils/stringUtil';
import htmlparser from '@/utils/htmlparser';
@Component({
  components: {
    Popup,
  },
})
export default class DetailPop extends Vue {
    @State((state) => state.detailPopup.loading) public loading: any;
    @State((state) => state.detailPopup.id) public id: any;
    @State((state) => state.detailPopup.show) public show: any;
    @State((state) => state.detailPopup.title) public title: any;
    @State((state) => state.detailPopup.image) public image: any;
    @State((state) => state.detailPopup.succes) public success: any;
      get desc() {
        const formatDesc = htmlparser.removeReferences(this.$store.state.detailPopup.desc);
        if (this.$store.state.detailPopup.image) {
          return `<img class="head-img" src="${
            this.$store.state.detailPopup.image
          }" />${StringUtil.subStr(formatDesc, 100)}`;
        } else {
          return StringUtil.subStr(formatDesc, 140);
        }
      }
    public close() {
      this.$store.commit('setDetailPopup', { show: false });
    }
    public wakeup() {
      this.$eventTrack.sendTracking({
        actionType: 'click',
        params: {
          modName: 'AHLinkPreview',
          clickAction: 'click',
          clickList: 'downloadButton',
        },
      });
      this.wakeupApp();
    }
}
</script>

<style lang="scss" scope>
.icon-close {
  width: 39px;
  height: 39px;
  position: absolute;
  right: 10px;
  top: 10px;
  background: url("../../assets/icon/x.png");
}
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  height: 100px;
  width: calc(100% - 80px);
  text-align: center;
  .loading-icon {
    width: 200px;
    height: 200px;
    background: url(../../assets/icon/loading.svg);
    background-position: 0px 0px;
    background-size: 200px 200px;
    transform: scale(0.5);
    transform-origin: top;
    display: inline-block;
  }
}
.float-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  width: calc(100% - 60px);
  box-sizing: border-box;
  .title-container {
    padding: 20px 0 0 20px;
    font-weight: 500;
    font-size: 17px;
  }
  .desc-container {
    font-size: 13px;
    margin: 10px 20px;
    height: 80px;
    line-height: 20px;
    letter-spacing: 1px;
    overflow: hidden;
    .head-img {
      width: 80px;
      height: 80px;
      float: left;
      margin-right: 10px;
      object-fit: cover;
      object-position: top;
      border-radius: 4px;
    }
  }
  .next-container {
    text-align: center;
    border-top: 1px solid #ececec;
    line-height: 35px;
    height: 35px;
  }
  .fail {
    .fail-icon {
      width: 40px;
      height: 40px;
      margin: 24px auto 0;
      display: block;
    }
    .fail-title1 {
      font-weight: 500;
      font-size: 17px;
      letter-spacing: 1px;
      text-align: center;
      margin-top: 20px;
    }
    .fail-title2 {
      font-size: 13px;
      text-align: center;
      margin-top: 7px;
      margin-bottom: 26px;
    }
  }
}
</style>
