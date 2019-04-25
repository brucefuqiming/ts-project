<template>
  <div class="box">
    <h1 class="relation-title" v-if="title">{{title}}</h1>
    <div class="relation-tool">
      <div class="tool-btn-relation" @click="listToggle"></div>
      <relation-list
        v-bind:links="linkList"
        v-bind:show="listShow"
        v-on:on-link-click="onListItemClick"
      />
    </div>
    <network
      ref="network"
      v-on:on-node-left-click="onNodeLeftClick"
      v-on:on-link-left-click="onLinkLeftClick"
      v-on:on-click-null="onClickNull"
      v-bind:node-draggable="false"
    />
    <info-box
      v-on:change-link="onLinkChange"
      v-bind:node="currentNode"
      v-bind:link="currentLink"
      :types="currentType"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit, Model, Provide, Inject } from 'vue-property-decorator';
import Network from '../../components/dls-network/marbleNetwork.vue';
import InfoBox from '../../components/dls-network/infoBox/infoBox.vue';
import RelationList from '../../components/relationList/relationList.vue';

import EntryService from '../../services/EntryService';

import StringUtil from '@/utils/stringUtil';
import hybrid from '@/utils/hybrid';
import App from '@/App.vue';
import { Route } from 'vue-router';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate', // for vue-router 2.2+
]);

@Component({
  components: {
    Network,
    InfoBox,
    RelationList,
  },
})
export default class Relation extends Vue {
  public title: any = '';
  public currentNode: any = null;
  public currentLink: any = null;
  public currentType: string = '';
  public selectPath: any = [];
  public linkList: any = [];
  public listShow: any = false;
  public currentId: any = null;
  public relationGraph: any = null;
  public $refs!: {
    network: Network,
  };
  public $parent!: App;
  @Prop() private id!: string;
  @Prop() private networkId!: string;
  @Watch('$route')
  public routeChange(to: Route, from: Route) {
    this.$setTitle(this.title + '_关系图谱');
  }
  public async mounted() {
    this.$parent.resizeApp();
    if (this.networkId) {
      const resp = await EntryService.getRelationGragh(this.networkId);
      console.log(resp);

      this.title = resp.title;
      this.$setTitle(this.title + '_关系图谱');
      this.relationGraph = resp.relationGraph;
      for (let i = 0; i < this.relationGraph.nodes.length; i++) {
        this.addPath(this.relationGraph.nodes[i].id);
      }
      this.$nextTick(() => {
        this.$refs.network.initData(this.relationGraph);
        this.setListData();
      });

      console.log('natworkIdresp', resp);
      hybrid.registerShareData({
        title: '全历史 | ' + this.title, // 分享标题
        link: window.location.href, // 分享链接
        desc: '世有万象，史有千面，用关系图谱皆可盘，快来换个角度看世界。', // 分享描述
        imgUrl: location.origin + require('@/assets/img/share/relation.png'), // 分享图标
      });
    } else if (this.id) {
      this.currentId = this.id;
      const data = await this.retriveNode(this.id);
      this.addPath(this.id);
      this.$nextTick(() => {
        this.$refs.network.append(data);
        this.$refs.network.updateFilters();
        this.$refs.network.zoomToFit();
        this.setListData();
      });

      hybrid.registerShareData({
        title: `全历史 | ${data.name}的关系图谱`, // 分享标题
        link: window.location.href, // 分享链接
        desc: '世有万象，史有千面，用关系图谱皆可盘，快来换个角度看世界', // 分享描述
        imgUrl: location.origin + require('@/assets/img/share/relation.png'), // 分享图标
      });
    }

    this.$eventTrack.sendTracking({
      actionType: 'show',
    });
  }
  public async onNodeLeftClick(node: any) {
    this.currentNode = node.node;
    this.currentType = 'node';

    this.$eventTrack.sendTracking({
      actionType: 'click',
      params: {
        modName: 'KGSPanel',
        clickAction: 'show',
        clickList: 'relationGraphPoint',
        id: this.currentNode.id,
      },
    });

    // let id = node.node.id;
    // this.currentId = id;
    // let data = await this.retriveNode(id);
    // this.addPath(id);
    // this.$refs.network.append(data);

    // this.setListData();
  }
  public onLinkLeftClick(link: string) {
    this.currentLink = link.link;
    this.currentType = 'link';

    this.$eventTrack.sendTracking({
      actionType: 'click',
      params: {
        modName: 'KGSPanel',
        clickAction: 'show',
        clickList: 'graphRelation',
        id: this.currentLink.id,
      },
    });
  }
  public onClickNull() {
    this.currentType = '';
  }
  public onLinkChange(link: string, prev: any) {
    this.$refs.network.clearHighLightLink();
    this.$refs.network.setHighLightLink(prev.id);
    this.$refs.network.changeLink(link, prev);
    this.currentLink = this.$refs.network.getLinkById(prev.id);
  }
  public setListData() {
    this.linkList = this.$refs.network.getLinks().map((link: any) => {
      return { ...link, ...link.formated };
    });
  }
  public listToggle() {
    this.listShow = !this.listShow;
    if (this.listShow) {
      this.$eventTrack.sendTracking({
        actionType: 'click',
        params: {
          modName: 'KGSPanel',
          clickAction: 'show',
          clickList: 'relationList',
        },
      });
    }
  }
  public onListItemClick(id: any) {
    this.listShow = false;
    const link = this.$refs.network.getLinkById(id);
    this.$refs.network.clearHighLightLink();
    this.$refs.network.setHighLightLink(id);
    this.$refs.network.changeLink(link, {id});
    this.$refs.network.panToEdge(
      id,
      (_: any) => {
        this.currentLink = this.$refs.network.getLinkById(id);
        this.currentType = 'link';
      },
      0.5,
    );
  }
  public async retriveNode(id: any) {
    const resp = await EntryService.getRelation(id);
    return resp;
  }
  public addPath(id: any) {
    if (this.selectPath.indexOf(id) < 0) {
      this.selectPath.push(id);
    }
  }
  public removePath(id: any) {
    const i = this.selectPath.indexOf(id);
    if (i >= 0) {
      this.selectPath.splice(i, 1);
    }
  }
  public nodeFilter(node: any, links: any) {
    const id = node.id;
    if (!links) {
      links = node.edges;
    }
    // console.log({search: this.searchNodes, id})
    if (this.currentId === id) {
      return true;
    }
    if (this.selectPath.indexOf(id) >= 0) {
      return true;
    }
    if (this.isLinked(id, this.currentId)) {
      return true;
    }
    return false;
  }
  public isLinked(id1: any, id2: any) {
    const links = this.$refs.network.getAllLinks();
    for (let i = 0; i < links.length; i++) {
      if (
        (links[i].from === id1 && links[i].to === id2) ||
        (links[i].from === id2 && links[i].to === id1)
      ) {
        return true;
      }
    }
    return false;
  }
}
</script>

<style lang='scss'>
.box {
  width: 100%;
  position: absolute;
  .relation-title {
    position: fixed;
    z-index: 1;
    color: #ffffff;
    font-weight: 500;
    font-size: 15px;
    text-align: center;
    width: 100%;
    margin-top: 14px;
  }
}
.relation-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-image: linear-gradient(to bottom, #2e3b4e, #0d0d13 52%, #0d0d13);
  .netLinkInfo-box {
    position: fixed;
  }
  .atobNetLinkInfo-li {
    margin-bottom: 80px;
  }
  .atobNetLinkInfo-description * {
    font-weight: 400 !important;
  }
}
.network-pop-panel {
  position: fixed;
  background: #ffffff;
  width: 100%;
  bottom: 0;
  padding-bottom: 40px;
  animation: appear 0.3s;
  animation-direction: both;
  .network-panel-title {
    padding: 10px 60px 10px 20px;
    font-size: 20px;
    border-bottom: 1px solid #eee;
    word-break: break-word;
    position: relative;
    a {
      border-bottom: none;
      font-weight: bold;
      .to-entry {
        position: absolute;
        font-size: 14px;
        font-weight: normal;
        border-bottom: 1px dashed #9DA0A4;
        right: 16px;
        bottom: 10px;
      }
    }
  }
  .network-panel-desc {
    padding: 10px 20px;
    max-height: 170px;
    overflow-y: scroll;
    line-height: 1.71;
    & > * {
      font-weight: 400 !important;
    }
  }
}
.relation-tool {
  .tool-btn-relation {
    background: no-repeat center;
    background-size: contain;
    z-index: 3;
    width: 49px;
    height: 49px;
    right: 4px;
    position: absolute;
    top: 4px;
    background-image: url(../../assets/icon/list.png);
  }
}
</style>

