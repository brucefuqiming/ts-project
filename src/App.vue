<template>
  <div ref="app" id="app" @click="onClick">
    <!-- <nav-bar/> -->
    <a href="javascripg:;">123</a>
    <keep-alive :exclude="['Book', 'Relation', 'abpath', 'Map']">
      <router-view class="root-view"></router-view>
    </keep-alive>
    <el-button type="primary">测试</el-button>
    <!-- <detail-popup/> -->
    <!-- <download-popup/> -->
  </div>
</template>

<script lang="ts">
// import DetailPopup from './components/detailPop/detailPop';
// import DownloadPopup from './components/downloadPop/downloadPop';
// import NavBar from './components/navBar/nav-bar';
import { getUrlQueryMessage } from '@/utils/urlUtil';
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace,
} from 'vuex-class';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
@Component({
  // components: {
  //   DetailPopup,
  //   NavBar,
  //   DownloadPopup,
  // },
})
export default class App extends Vue {
  public $refs!: { // strictPropertyInitialization 需要对所有的实际属性赋值 所以需要加感叹号
    app: HTMLDivElement,
  };
  @State public navShow!: boolean;
  @Watch('navShow')
  public navShowChange(val: boolean): void {
    this.resizeApp();
  }
  @Watch('$route')
  public routeChange(to: Route, from: Route) {
    this.resizeApp();
  }
  public mounted() {
    // this.$message.success('成功了');
    this.resizeApp();
  }
  public  specialEventTrack(url: string) {
    // this.$eventTrack.sendTracking();
    const params: any = getUrlQueryMessage(url) || {};
    const urlParam = url.replace(/https?:\/\/[^/]*\//gi, '').split('/');
    if (url.indexOf('/family/subIndex') >= 0) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'familyCard',
            id: params.id,
            clickAction: 'show',
            clickList: 'appTipsPage',
          },
        });
      } else if (url.indexOf('/relation') >= 0) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'customLandingPage',
            id: params.networkId,
            clickAction: 'click',
            clickList: 'mainBody',
          },
        });
      } else if (url.indexOf('/book/read') >= 0) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'bookCard',
            id: params.id,
            clickAction: 'click',
            clickList: 'mainBody',
          },
        });
      } else if (url.indexOf('/map/detail') >= 0) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'timeMapCard',
            id: urlParam && urlParam.length >= 3 ? urlParam[3] : null,
            clickAction: 'click',
            clickList: 'mainBody',
          },
        });
      } else if (url.indexOf('/cluster') >= 0) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'careercard',
            id: params.id,
            clickAction: 'click',
            clickList: 'appTipsPage',
          },
        });
      }
    }
  public  normalEventTrack(dom: HTMLImageElement) {
      if (dom.tagName.toUpperCase() === 'IMG' && dom.getAttribute('preview')) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'artCard',
            mediaID: dom.src.replace(/https?:\/\/[^/]*\//gi, '/'),
            clickAction: 'show',
            clickList: 'fullScreenImage',
          },
        });
      } else if (dom.classList.contains('dls-video-box')) {
        this.$eventTrack.sendTracking({
          actionType: 'click',
          params: {
            modName: 'videoCard',
            clickAction: 'click',
            clickList: 'mainBody',
          },
        });
      }
    }
    public needBlock(dom: any): boolean | HTMLLinkElement {
      let d = dom;
      while (d && d.nodeName !== 'BODY') {
        this.normalEventTrack(d);
        if (d.nodeName === 'A') {
          return d;
        }
        d = d.parentNode;
      }
      return false;
    }
    public onClick(e: Event) {
      const d = this.needBlock(e.target) as HTMLLinkElement;
      if (d) {
        e.preventDefault();
        let url = d.getAttribute('href')!;
        this.specialEventTrack(url);
        url = url.replace(/https?:\/\/[^/]*\//gi, '/');
        this.$router.push(url);
      }
    }
    public resizeApp() {
      const rootDom = this.$refs.app.querySelector('.root-view') as HTMLDivElement;
      if (rootDom) {
        rootDom.style.minHeight =
          window.innerHeight - (this.navShow ? 60 : 0) + 'px';
      }
    }

}
</script>
<style lang="scss">
body{
  width: 500px;
  height: 500px;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  margin-top: -10px;
}

.c {
  clear: both;
}

#nprogress .spinner {
  display: none;
}

* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  #app {
    .root-view {
      position: relative;
    }
  }
}
/* 处理维基样式 */
html {
  -webkit-tap-highlight-color: rgb(255, 255, 255);
  overflow-x: hidden;
  color: #333333;
  body {
    overflow-x: hidden;
    #detail-text {
      .home-article {
        img {
          // width: 100% !important;
          // height: auto;
        }
        .quotebox {
          width: 100% !important;
          float: none !important;
          margin: 0 !important;
          margin-bottom: 6px !important;
        }
        .reflist {
          column-count: 1 !important;
        }
        .my-table-box {
          width: 100%;
          overflow-x: auto;
        }
        table {
          overflow-x: auto;
          width: 100% !important;
          float: none !important; // display: block;
        }
        div.tright,
        div.tleft {
          float: none;
          margin: 6px auto !important;
          background-color: transparent !important;
          .thumbinner {
            background-color: transparent !important;
            max-width: 100% !important;
            .tsingle {
              background-color: transparent !important;
              max-width: 100% !important;
            }
          }
          > * {
            margin: 0 auto;
          }
        }
        ul:not(.gallery) {
          margin: 0;
          padding-left: 22px;
        }
        ul.gallery {
          padding: 0 !important;
          margin: 0 !important;
          li.gallerybox {
            width: 49% !important;
            div {
              width: 100% !important;
              .thumb,
              .gallerytext {
                width: 100% !important;
              }
            }
          }
        }
        .infobox {
          float: none;
        }
      }
      iframe {
        max-width: 100%;
        min-width: 100%;
        width: 0;
        pointer-events: none;
      }
    }
  }
}
#aricleDetail {
  overflow: hidden;
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  .articleDetail-title {
    font-size: 28px;
  }
}
.hint {
  font-size: 11px;
  color: rgb(153, 153, 153);
  margin-bottom: 16px;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  color: inherit !important;
  border-bottom: 1px dashed #9da0a4;
  text-decoration: none !important;
}
.dls-relation-in-article .dls-relation-in-article-thumb {
  background-image: linear-gradient(to bottom, #2e3b4e, #0d0d13 52%, #0d0d13);
  border: 2px solid white;
  position: relative;
  cursor: pointer;
  -webkit-transition: border 0.1s ease;
  transition: border 0.1s ease;
  img {
    outline: none;
    max-width: 100%;
  }
  .mask-see-more {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
}
.cke-btn-more-info {
  width: auto;
  line-height: 28px;
  opacity: 1;
  border-radius: 2px;
  background-image: -webkit-linear-gradient(344deg, #f77800, #ff6f6f);
  background-image: linear-gradient(106deg, #f77800, #ff6f6f);
  font-size: 12px;
  color: #ffffff !important;
  text-shadow: 0 2px 4px rgba(199, 83, 34, 0.4);
  padding: 0 8px;
  height: auto;
  right: 10px;
  top: 10px;
  position: absolute;
  cursor: pointer;
}
.dls-capture,
.dls-image-capture {
  text-align: center;
  font-size: 12px;
  color: #666;
}
.dls-timemap-in-article-thumb,
.dls-family-in-article-thumb {
  iframe {
    max-width: 100%;
    min-width: 100%;
    width: 0;
    pointer-events: none;
  }
}
.dls-image-block img {
  width: 100% !important;
  margin-bottom: 4px;
}
.dls-timeline-in-article {
  position: relative;
  width: 100%;
  .timeline-in-artcle-list {
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    .timeline-item {
      list-style: none !important;
      position: relative;
      padding-bottom: 20px;
      margin-left: 20px;
      .side-line {
        content: "";
        display: block;
        position: absolute;
        top: 19px;
        bottom: -8px;
        z-index: -1;
        left: -33px;
        border-left: 1px dashed #999999;
      }
      .time {
        font-size: 28px;
        line-height: 1.14;
        letter-spacing: 0.9px;
        color: #000000;
        margin-bottom: 8px;
        position: relative;
        display: inline-block;
        .circle {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          position: absolute;
          left: -39px;
          top: 9px;
          border: 2px solid #333333;
          background: white;
        }
        .time-string {
          display: inline-block;
        }
      }
      .title {
        font-size: 22px;
        line-height: 1.45;
        letter-spacing: 0.9px;
        text-align: left;
        color: #333;
        margin-bottom: 6px;
      }
      .desc {
        margin-top: 0px;
        font-size: 14px;
        line-height: 2;
        letter-spacing: 1px;
        text-align: justify;
        color: #666;
      }
      .position-desc {
        line-height: 20px;
      }
      .position-desc-img {
        display: inline-block;
        width: 16px;
        height: 19px;
        background-image: url(assets/icon/position.svg);
        background-repeat: no-repeat;
        background-size: 19.5px;
        margin-right: 1px;
        background-position-x: -2px;
        margin-top: 1px;
      }
      .position-desc-text {
        display: inline-block;
        font-size: 14px;
        line-height: 1.43;
        letter-spacing: 1px;
        text-align: left;
        color: #666666;
      }
    }
  }
}
.dls-card-in-article {
  width: calc("100% - 18px");
  padding: 8px;
  border: 1px solid #ececec;
  position: relative;
  display: block;
  color: #333;
  .dls-article-card-thumb {
    display: inline-block;
    width: 104px;
    height: 104px;
    margin-right: 8px;
    background: url(assets/icon/cluster-thumb.png) center no-repeat;
    background-size: contain;
    vertical-align: top;
  }
  .dls-article-card-detail {
    position: relative;
    display: inline-block;
    width: calc("100% - 119px");
    .dls-article-card-title {
      font-size: 22px;
      line-height: 24px;
      display: block;
      padding-bottom: 8px;
    }
    .dls-article-card-desc {
      line-height: 18px;
      font-size: 12px;
      display: block;
      height: 54px;
      font-family: Arial, Helvetica, sans-serif;
      color: #666;
    }
  }
}
.info-box {
  .info-item {
    .key {
      line-height: 29px !important;
    }
  }
}
.dls-timemap-in-article-thumb {
  iframe {
    pointer-events: none;
    max-width: 100%;
    min-width: 100%;
    width: 0;
    pointer-events: none;
  }
}
</style>
