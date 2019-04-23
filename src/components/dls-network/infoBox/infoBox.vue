<template>
  <section v-if="types == 'link'" class="netLinkInfo-box panel-relation">
    <div class="atobNetLinkInfo-li" :id="linkFormated.id">
      <div class="atobNetLinkInfo-title">
        <span v-if="linkFormated.cluster.prev" @click="arrowClick(-1)" class="leftArrow"></span>
        <span :title="linkFormated.formated.fromName">{{linkFormated.formated.fromName}}</span>
        <span class="relationDesc">
          <span :class="linkFormated.relationArrow">
            <span class="left-icon"></span>
            <span class="right-icon"></span>
          </span>
          <span class="desc-text">{{linkFormated.label}}</span>
        </span>
        <span :title="linkFormated.formated.toName">{{linkFormated.formated.toName}}</span>
        <span v-if="linkFormated.cluster.next" class="rightArrow" @click="arrowClick(1)"></span>
      </div>
      <div class="atobNetLinkInfo-content">
        <div>
          <span v-if="linkFormated.formated.positionDesc" class="geometryDesc">
            <span class="geometry-icon"></span>
            {{ linkFormated.formated.positionDesc }}
          </span>
          <span
            v-if="linkFormated.formated.time"
            class="startTimeAndEndTime"
          >{{ linkFormated.formated.time }}</span>
        </div>
        <div class="atobNetLinkInfo-description" v-html="linkFormated.formated.desc">
          <div v-if="linkFormated.prop.properties" class="atobNetLinkInfo-properties">
            <ul class="content">
              <li v-for="item in linkFormated.prop.properties" :key="item.key">
                <span class="key">{{ item.key }}:</span>
                <span v-for="v in item.value" :key="v" class="value">{{ v }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="network-pop-panel" v-else-if="types == 'node'">
    <div class="network-panel-title cp">
      <a :href="'/detail/' + node.id">
        {{node.name}}
        <span class="to-entry">查看词条</span>
      </a>
    </div>
    <div class="network-panel-desc" v-html="node.summary"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class Infobox extends Vue {
  @Prop() public node!: object;
  @Prop() public link!: any;
  @Prop() public types!: string;
  get linkFormated() {
    const i = this.getLinkPosition();
    return {
      ...this.link.currentEdge,
      cluster: {
        prev: this.link.children[i - 1],
        next: this.link.children[i + 1],
      },
    };
  }
  public getLinkPosition() {
    const link: any = this.link;
    if (!link || !link.children) {
      return 0;
    }
    for (let i = 0; i < link.children.length; i++) {
      if (link.children[i].id === link.currentEdge.id) {
        return i;
      }
    }
    return -1;
  }
  public arrowClick(direction: any) {
    let prev = [];
    const i = this.getLinkPosition();
    const suffix = direction > 0 ? 1 : -1;
    prev = this.link.children[i + suffix];
    this.$emit('change-link', this.link, prev);
  }
}
</script>

<style lang="scss" scope>
@keyframes appear {
  from {
    transform: translate(0, 300px);
  }
  to {
    bottom: translate(0, 0);
  }
}
.node-detail-container {
  position: fixed;
  bottom: 0;
  background: #beb4b4;
  z-index: 11;
  animation: appear 0.3s;
  width: 100%;
  .title {
    font-size: 20px;
    margin: 10px 8px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .to-entry {
    position: absolute;
    top: 13px;
    right: 10px;
    color: #999999;
    cursor: pointer;
  }
  .desc {
    margin: 10px 8px;
    max-height: 96px;
    overflow-x: hidden;
    overflow-y: visible;
    margin-bottom: 16px;
  }
}

.netLinkInfo-box {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 1;
  max-height: 250px;
  animation: appear 0.3s;

  .atobNetLinkInfo-title {
    height: 56px;
    margin: 10px 10px 12px;
    border-bottom: 1px solid #ececec;
    text-align: center;
    position: relative;

    > span {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      line-height: 56px;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 1px;
      color: #000000;
    }

    .leftArrow {
      // float: left;
      width: 20px;
      background-image: url(../../../assets/img/relation/leftarrow.png);
      position: absolute;
      top: 10px;
      left: 0;
      cursor: pointer;
      height: 28px;
      cursor: pointer;

      &.hide {
        opacity: 0.2;
      }
    }

    .rightArrow {
      // float: right;
      width: 20px;
      background-image: url(../../../assets/img/relation/leftarrow.png);
      transform: rotateY(180deg);
      position: absolute;
      top: 10px;
      right: 0;
      height: 28px;
      cursor: pointer;

      &.hide {
        opacity: 0.2;
      }
    }

    .relationDesc {
      position: relative;
      text-align: center;
      line-height: 3;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: #ff7963;
      min-width: 30px;
      height: 30px;
      margin: -30px 5px 0;
      overflow: visible;
      .desc-text {
        overflow: hidden;
        display: inline-block;
        max-width: 90px;
        text-overflow: ellipsis;
      }
    }

    .icon {
      display: inline-block;
      width: 50px;
      height: 100%;
      font-size: 12px;
      text-align: center;
      line-height: 3;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: #ff7963;
      position: absolute;
      top: 0;
      left: 50%;
      display: block;
      margin-left: -25px;
    }

    .left-icon {
      width: 26px;
      height: 10px;
      display: inline-block;
      position: absolute;
      left: -5px;
      top: 5px;
      z-index: 10;
      overflow: visible;
      background: url(../../../assets/img/relation/arrow-right.svg);
      transform: rotate(180deg);
    }

    .right-icon {
      width: 26px;
      height: 10px;
      display: inline-block;
      position: absolute;
      right: -5px;
      top: 6px;
      z-index: 10;
      overflow: visible;
      background: url(../../../assets/img/relation/arrow-right.svg);
    }

    .both {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 9px;
      /* background: #ff7963; */
      left: 0;
      overflow: visible;
      border-bottom: 3px #ff7963 solid;
      .right-icon {
        display: inline-block;
      }
      .left-icon {
        display: inline-block;
      }
    }

    .left {
      .both,
      .right-icon {
        display: none;
      }
    }
    .right {
      .both,
      .left-icon {
        display: none;
      }
    }
  }

  .atobNetLinkInfo-content {
    margin: 12px 10px 14px 10px;
    font-weight: 400 !important;
    div:nth-of-type(1) {
      span {
        display: inline-block;
      }

      .geometryDesc {
        font-size: 12px;

        letter-spacing: 0.8px;
        color: #333333;
        line-height: 17px;
        .geometry-icon {
          background-image: url(../../../assets/icon/position.svg);
          width: 16px;
          height: 19px;
          vertical-align: middle;
        }
        // margin-right: 10px;
      }

      .startTimeAndEndTime {
        font-size: 12px;
        line-height: 17px;
        letter-spacing: 1px;
        color: #000000;
      }
    }

    > div:nth-of-type(2) {
      position: relative;
      max-height: 110px;
      font-size: 14px;

      letter-spacing: 1px;
      color: #333333;
      margin-top: 8px;
      line-height: 1.71;
      overflow: auto;
      word-wrap: break-word;
      //word-break: break-all;
      // padding-right: 10px;
    }
  }
  .atobNetLinkInfo-properties {
    margin: 10px 10px 12px;

    li {
      .key {
        margin-right: 5px;
      }
    }
  }
}
a {
  color: inherit !important;
  border-bottom: 1px dashed #9da0a4;
  text-decoration: none !important;
}
</style>
