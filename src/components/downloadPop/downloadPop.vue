<template>
  <popup v-bind:show="show" v-on:close-pop="close">
    <div class="float-container">
      <div class="content-container">即将打开全历史APP</div>
      <div class="next-container">
        <button class="cancel-btn float-button" @click="close">取消</button>
        <button class="next-btn float-button" @click="goDownload">前往</button>
      </div>
    </div>
  </popup>
</template>

<script lang="ts">
import Popup from '../popUp/popUp.vue';
import { mapState } from 'vuex';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {  State, Getter, Action, Mutation } from 'vuex-class';
@Component({
  components: {
    Popup,
  },
})
export default class DownloadPopup extends Vue {
  @State((state) => state.downloadPopup.show) public show!: boolean;
  public close(e: Event) {
    e.stopPropagation();
    this.$store.commit('setDownloadPopup', { show: false });
  }
  public goDownload(e: Event) {
    e.stopPropagation();
    this.$eventTrack.sendTracking({
      actionType: 'click',
      params: {
        modName: 'appTipsPage',
        clickList: 'downloadButton',
        clickAction: 'click',
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
.float-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  width: calc(100% - 80px);
  .content-container {
    font-size: 15px;
    margin: 10px;
    height: 96px;
    overflow: hidden;
    text-align: center;
    padding-top: 40px;
    box-sizing: border-box;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .next-container {
    text-align: center;
    border-top: 1px solid #e9e9e9;
    line-height: 44px;
    height: 44px;
    .float-button {
      width: 50%;
      height: 100%;
      float: left;
      font-size: 15px;
      color: #333;
      border: none;
      background: none;
      &.next-btn {
        float: right;
        border-left: 1px solid #e9e9e9;
        color: #4769ff;
      }
    }
  }
}
</style>
