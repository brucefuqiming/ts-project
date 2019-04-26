<template>
  <div id="aricleDetail" ref="testDiv">
    <aricle-detail-title :TotitleData="detailData"></aricle-detail-title>
    <aricleDetailCotent v-if="type==1" :Contenttext="Contenttext"></aricleDetailCotent>
    <articleSource v-if="refer.websiteName" :TotitleData="refer"></articleSource>
    <sourceAuthor v-if="refer.authorName" :TotitleData="refer"></sourceAuthor>
    <sourceAddress v-if="refer.originalUrl" :TotitleData="refer"></sourceAddress>
    <aricleDetailTags ref="test" :TotagsData="detailData"></aricleDetailTags>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import {  State, Getter, Action, Mutation } from 'vuex-class';
import articleSource from '../components/articleDetail/source.vue';
import sourceAuthor from '../components/articleDetail/source-author.vue';
import sourceAddress from '../components/articleDetail/source-address.vue';
import aricleDetailTitle from '../components/articleDetail/title.vue';
import aricleDetailCotent from '../components/articleDetail/content.vue';
import aricleDetailTags from '../components/articleDetail/tags.vue';
import ArticleService from '../services/ArticleService';
import articleParser from '../utils/articleParser';
import htmlparser from '../utils/htmlparser';
import xss from '../utils/xss';
import StringUtil from '../utils/stringUtil';
import hybrid from '../utils/hybrid';
import { Route } from 'vue-router';
import { SetDetailPopupPayload } from '../store/mutations';
import { ArticleResp } from './interface';

@Component({
  components: {
    aricleDetailTitle,
    aricleDetailCotent,
    aricleDetailTags,
    articleSource,
    sourceAuthor,
    sourceAddress,
  },
})
export default class Article extends Vue {
  public name: string = 'Article';
  public Contenttext: string = '';
  public detailData: object = {};
  public refer: any = {};
  public images: [] = [];
  public nodes: [] = [];
  public entryid: string = '';
  public title: string = '';
  public type: number = 1;
  public thumb: string = '';
  public $refs!: {
    test: aricleDetailTags,
    testDiv: HTMLDivElement,
  };
  @Mutation public setDetailPopup!: (payload: SetDetailPopupPayload) => void;
  @Prop() private aid!: string;
  @Watch('$route')
  public routeChange(ro: Route, from: Route) {
    this.$setTitle(this.title + '_文章');
  }
  public validate() {
    return false;
  }

  public mounted() {
    // const Dom = document.querySelector('#aricleDetail') as HTMLDivElement;
    // Dom.innerHTML = '';
    ArticleService.getArticleDetail(this.aid).then((resp: ArticleResp) => {
      this.detailData = resp;
      this.refer = resp.refer;
      if (this.refer && this.refer.originalUrl) {
        this.refer.originalUrl =
          '从' + StringUtil.getDomainName(this.refer.originalUrl) + '添加';
      }
      this.Contenttext = this.htmlchange(resp.content);
      this.nodes = resp.nodes || [];
      this.title = resp.title || '';
      this.type = resp.type;
      this.thumb = resp.thumb;
      this.$setTitle(resp.title + '_文章');
      this.$previewRefresh();
    })
    .then((_) => {
      hybrid.registerShareData({
        // your code zhengkun
        title: this.title + ' | 全历史文章', // 分享标题
        desc: StringUtil.subStr(this.Contenttext, 100), // 分享描述
        imgUrl: this.thumb ? this.thumb : require('@/assets/img/share/index.png'), // 分享图标
      });
    });
    this.$eventTrack.sendTracking({
      actionType: 'show',
      params: {
        articleID: this.aid,
      },
    });
  }
  public activated() {
    this.$eventTrack.sendTracking({
      actionType: 'show',
      params: {
        articleID: this.aid,
      },
    });
  }
  public htmlchange(str: string) {
    const html = xss(htmlparser.htmlDecode(str), 'content');
    return articleParser.resolveSpecialImport(html);
  }
}
</script>