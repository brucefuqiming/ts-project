<template>
  <div class="relation-list-container" :class="{showed: show}">
    <ul class="relation-list">
      <li class="line"></li>
      <li
        v-for="link in linksFormat"
        :key="link.id"
        :id="'relation-page-' + link.id"
        class="item"
        @click="onLinkClick(link.id, $event)"
      >
        <div class="relation-name">{{link.label}}</div>
        <div class="circle"></div>
        <div class="detail">
          <div class="relation-a">{{link.fromName}}</div>
          <div class="relation-arrow" :class="link.relationArrow"></div>
          <div class="relation-b">{{link.toName}}</div>
          <div class="relation-time">{{link.time}}</div>
          <div class="location" v-if="link.location">{{location}}</div>
          <!-- <div class="desc-full hidden" v-html="link.desc"></div> -->
          <div class="desc" v-html="link.desc"></div>
          <div class="c"></div>
        </div>
      </li>
      <li v-if="linksFormat.length < 1" class="no-result">暂无关系</li>
    </ul>
  </div>
</template>

<script>
import StringUtil from "@/utils/stringUtil";
import htmlparser from "@/utils/htmlparser";
import xss from "@/utils/xss";

export default {
  name: "RelationList",
  props: {
    links: {
      default: function() {
        return [];
      }
    },
    show: {
      default: false
    }
  },
  data() {
    return {
      activeId: false
    };
  },
  computed: {
    linksFormat() {
      return this.links.map(link => {
        return {
          ...link,
          realLength: StringUtil.getRealLength(link.desc),
          desc: xss(htmlparser.htmlDecode(link.desc), {
            whiteList: {
              a: ["href", "id"]
            },
            stripIgnoreTag: true // 过滤所有非白名单标签的HTML
          })
        };
      });
    }
  },
  methods: {
    onLinkClick(id, e) {
      if(e.target.nodeName == "A") {
        return ;
      }
      this.$emit("on-link-click", id);
    }
  }
};
</script>

<style lang="less" scope>
.relation-list-container {
  position: fixed;
  background: white;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  overflow-y: auto;
  z-index: 2;
  overflow-x: hidden;
  transition: all 0.3s ease;
  transform: translateY(100%);
  &.showed {
    transform: translateY(60px);
  }
}
a {
  color: inherit !important;
  border-bottom: 1px dashed #9da0a4;
  text-decoration: none !important;
}
.relation-list {
  padding: 24px 0;
  position: relative;
  .line {
    position: absolute;
    left: 67px;
    top: 44px;
    bottom: 0px;
    width: 1px;
    background: #ececec;
    padding: 0;
  }

  li {
    position: relative;
    margin-bottom: 40px;
    width: calc(~"100% - 40px");
    padding: 12px 24px;
    cursor: pointer;
    .relation-name {
      width: 60px;
      position: absolute;
      text-align: right;
      margin-left: -25px;
      word-wrap: break-word;
      //word-break: break-all;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
    .relation-time {
      font-size: 12px;
      line-height: 20px;
    }
    .circle {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: solid 2px #d8d8d8;
      position: absolute;
      left: 64px;
      top: 19px;
      background: white;
    }
    .detail {
      padding-left: 60px;

      .relation-a,
      .relation-b,
      .relation-arrow {
        display: inline-block;
      }

      .relation-arrow {
        width: 27px;
        height: 9px;
        background: url(../../assets/img/relation/arrow-right.svg);
        background-size: contain;
        margin-top: 5px;
        float: initial !important;

        &.left {
          transform: rotate(180deg);
        }

        &.both {
          background-image: url(../../assets/img/relation/arrow-both.svg);
        }
      }

      .location {
        background: url(../../assets/icon/position.svg);
        height: 12px;
        padding-left: 14px;
        line-height: 12px;
        margin: 0 0 8px;
        font-size: 12px;
      }

      .desc,
      .desc-full {
        padding-top: 4px;
        line-height: 2;
        margin-top: -3px;
      }

      // .icon-arrow-down{
      //   // float: right;
      // }
    }

    &.active {
      background-color: rgba(165, 165, 165, 0.1);
      cursor: default;

      .relation-name {
        color: #ff7963;
      }

      .relation-a,
      .relation-b,
      .relation-arrow {
        color: #ff7963;
      }
      .desc {
        display: none;
      }

      .desc-full {
        display: block;
      }

      .icon-arrow-down {
        transform: rotate(180deg);
      }
    }

    &.no-result {
      background: white;
      width: 100%;
      text-align: center;
      height: 100px;
      margin-bottom: -20px;
    }
  }
}
</style>
