<template>
  <div class="aricleDetail-content" v-html="getTocotentDataContent"></div>
</template>
<script lang="ts">
import htmlParser from '../../utils/htmlparser';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class AricleDetailCotent extends Vue {
    @Prop() public Contenttext!: any;
    get getTocotentDataContent() {
      return htmlParser.formatLink(this.Contenttext);
    }
}
</script>
<style lang="scss" scope>
.aricleDetail-content {
  color: #4a4a4a;
  font-size: 15px;
  letter-spacing: 1px;
  line-height: 29px;
  .table-con {
    width: 100%;
    overflow-x: auto;
  }
  .paragraph {
    line-height: 1.9;
    font-size: 15px;
    word-wrap: break-word;
    width: 100%; // overflow-x: auto;
    p {
      margin-bottom: 16px;
    }
  }
  blockquote {
    border-left: 4px solid rgba(204, 204, 204, 1);
    margin-left: 0;
    padding-left: 10px;
    color: rgba(51, 51, 51, 1);
  }
  table {
    overflow-x: auto;
    width: 100% !important;
    float: none !important; // display: block;
  }
  .dls-timeline-in-article {
    .timeline-in-artcle-list {
      padding-top: 0;
    }
    .title {
      font-size: 18px !important;
      font-weight: bold;
      margin-bottom: 6px;
    }
  }
  .time-string {
    font-weight: bold;
    font-size: 16px;
  }
  .dls-timeline-in-article-image-item {
    background-repeat: no-repeat;
    background-size: cover;
  }
  .dls-timemap-in-article {
    iframe {
      pointer-events: none;
    }
  }
  .dls-timemap-in-article,
  .dls-family-in-article,
  .dls-relation-in-article {
    a {
      border-bottom: none;
    }
  }
  .dls-book-in-article {
    width: calc("100% - 60px");
    background: #f6f6f6;
    height: 100px;
    padding: 14px 26px;
    border-left: 4px solid #cccccc;
    margin-bottom: 4px;
    position: relative;
    box-sizing: content-box;
    .clicka {
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-bottom: none;
      color: transparent !important;
      position: absolute;
    }
    .left {
      width: 70px;
      height: 92px;
      position: relative;
      display: inline-block;
      background-color: #efefef;
      border: solid 1px #ececec;
      background-size: cover;
      background-position: center;
      margin-right: 10px;
      padding: 2px 4px;
      color: transparent;
      pointer-events: none;
      .bg {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;
      }
      .holder {
        height: 58px;
        width: 38px;
        max-width: 38px;
        max-height: 58px;
        white-space: normal;
        line-height: normal;
        word-wrap: break-word;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        overflow: hidden;
        opacity: 0.6;
      }
      &.color-0 {
        background-color: #ad7062;
        color: rgba(255, 255, 255, 0.6);
      }
      &.color-1 {
        background-color: #c39867;
        color: rgba(255, 255, 255, 0.6);
      }
      &.color-2 {
        background-color: #baad6d;
        color: rgba(255, 255, 255, 0.6);
      }
      &.color-3 {
        background-color: #75987b;
        color: rgba(255, 255, 255, 0.6);
      }
      &.color-4 {
        background-color: #7998b9;
        color: rgba(255, 255, 255, 0.6);
      }
    }
    .right {
      position: relative;
      display: inline-block;
      height: 98px;
      font-size: 12px;
      vertical-align: top;
      overflow: hidden;
      width: calc("100% - 105px");
      pointer-events: none;
      float: none !important;
      .addBookItemTitle {
        margin: 0;
        font-size: 18px;
        color: #333333 !important;
        display: block;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
        p {
          margin: 0;
        }
      }
      .author {
        display: block;
        color: #333333 !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: all;
      }
      .volumn {
        display: block;
        color: #333333 !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        pointer-events: none;
      }
    }
  }
  ul {
    li {
      list-style-type: disc;
      margin-left: 44px;
    }
  }
  ol {
    li {
      list-style-type: decimal;
      margin-left: 44px;
    }
  }
  img {
    display: block;
    margin: 4px 0;
    width: 100% !important;
    height: auto !important;
  }
  h1,
  h2,
  h3 {
    padding-top: 13px;
    padding-bottom: 5px;
  }
  .dls-capture {
    margin-bottom: 10px;
  }
  * {
    max-width: 100% !important;
  }
  table {
    width: 100% !important;
    overflow-x: auto;
    float: none !important;
    display: table;
    border: 1px solid #a2a9b1;
    border-collapse: collapse;
  }
  .thumb {
    overflow-x: scroll !important;
  }
}
</style>