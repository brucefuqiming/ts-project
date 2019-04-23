<template>
  <div class="navbar-container" :class="{dark: theme == 'dark'}" v-show="show">
    <div class="navbar-filter"></div>
    <div class="navbar">
      <div class="back-btn" v-if="routefrom" @click.passive="goBack">
        <span class="back-btn-arrow"></span>
        返回
      </div>
      <div @click="openApp" class="logo-box" v-else>
        <span class="logo">
          <span class="logo-img"></span>
        </span>
        <span class="logo-name">全历史</span>
        <span class="logo-slogon">换个角度看世界</span>
      </div>
      <button @click="openApp" class="download-btn">打开APP</button>
    </div>
    <div class="navbar-empty"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {  State, Getter, Action, Mutation } from 'vuex-class';
@Component
export default class NavBar extends Vue {
  @State((state) => state.routeFrom) public routefrom: any;
  @State((state) => state.navShow) public show: any;
  @State((state) => state.navTheme) public theme: any;
  public goBack() {
    this.$eventTrack.sendTracking({
      actionType: 'click',
      params: {
        modName: 'topBanner',
        clickAction: 'click',
        clickList: 'backButton',
      },
    });
    if (window.history.length > 1) {
      this.$router.go(-1);
    } else {
      this.$store.commit('setRouteFrom', null);
    }
  }
  public openApp() {
    this.$eventTrack.sendTracking({
      actionType: 'click',
      params: {
        modName: 'topBanner',
        clickAction: 'click',
        clickList: 'downloadButton',
      },
    });
    this.wakeupApp();
  }
}
</script>

<style lang="scss">
.navbar-container {
  // background: #ffffff;
  .navbar-filter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 9;
    background: linear-gradient(
      360deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.75) 98%
    );
    filter: blur();
  }
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: 10;
    box-shadow: 0 0 1px 0px #999;
    background: linear-gradient(
      360deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(255, 255, 255, 0.75) 98%
    );
    .back-btn {
      line-height: 60px;
      float: left;
      margin-left: 20px;
      font-size: 15px;
      padding-left: 20px;
      .back-btn-arrow {
        background: url(../../assets/icon/nav-back.png);
        display: inline-block;
        height: 82px;
        width: 49px;
        transform: scale(0.25);
        position: absolute;
        left: 15px;
        top: 20px;
        transform-origin: left top;
      }
    }
    .download-btn {
      float: right;
      padding: 8px 12px;
      color: #fc664a;
      line-height: 18px;
      margin: 12px 20px 0 0;
      background: rgba(255, 255, 255, 0.8);
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.09);
      border-radius: 39px;
      border: 2px solid rgba(252, 102, 74, 1);
    }
    .logo-box {
      float: left;
      margin: 8px 0 0 19px;
      .logo {
        width: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.17);
        border-radius: 10px;
        display: inline-block;
        .logo-img {
          background: url(../../assets/icon/logo-ah.svg);
          width: 51px;
          height: 35px;
          display: inline-block;
          margin-top: -6px;
          transform: scale(0.5);
          margin: 4px 0 0 -3px;
        }
      }
      .logo-name {
        vertical-align: top;
        font-weight: 600;
        color: rgba(14, 14, 14, 1);
        font-size: 16px;
        margin-left: 12px;
        display: inline-block;
        margin-top: 3px;
      }
      .logo-slogon {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.5);
        line-height: 25px;
        letter-spacing: 4px;
        font-size: 9px;
        margin-left: -48px;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }
  .navbar-empty {
    position: relative;
    width: 100%;
    height: 60px;
  }
  &.dark {
    background: #2e3b4e;
    .navbar-filter {
      background: #2e3b4e;
    }
    .navbar {
      background: linear-gradient(
        360deg,
        rgba(255, 255, 255, 0.2) 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      .back-btn {
        color: #ffffff;
        .back-btn-arrow {
          background: url(../../assets/icon/nav-back-black.png);
        }
      }
      .logo-box {
        .logo-name {
          color: #ffffff;
          text-shadow: 0px 2px 20px rgba(0, 0, 0, 0.5);
        }
        .logo-slogon {
          color: #ffffff;
        }
      }
      .download-btn {
        border-color: #ffffff;
        color: #ffffff;
        background: transparent;
      }
    }
  }
}
</style>
