<template>
  <div class="relation-container" ref="container"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import NetChart from 'marble-net';
import DataParser from './dataParser/marbleParser';
import { b64toBlob } from '@/utils/dataUtil';
import Relation from '@/views/Relation/Relation.vue';
@Component
export default class Network extends Vue {
  @Prop() public nodeDraggable!: boolean;
  public data: any = { nodes: [], links: [] };
  public colors: any = [
    '#ff968d',
    '#ffa967',
    '#ffc842',
    '#ffed00',
    '#c1ff6e',
    '#64ec93',
    '#20daee',
    '#36acff',
    '#6a57ff',
    '#6a57ff',
    '#9d56ff',
  ];

  public nodeColor: any = 0x56e07b;
  public nodeHighlightColor: any = 0xff7800;
  public lineColor: any = 0x75a3e8;

  public highLightNodes: any = [];
  public highLightLinks: any = [];
  public currentId: any = null;
  public minZoom: any = 0.1;
  public maxZoom: any = 2.0;
  public chart: any = null;
  public infoBox: any = null;
  public $parent!: Relation;
    public mounted() {
      this.$nextTick(() => {
        this._initChart();
      });
    }

    public _initChart() {
      this.chart = new NetChart({
        container: this.$refs.container,
        dragToLock: true,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        layout: 'nebulas',
        minZoomLabel: 0.3,
        fixedLabel: false,
        forceCanvas: true,
        nodeDraggable: this.nodeDraggable,
        nodeRender: (node: any, PIXI: any) => {
          const graphic = new PIXI.Graphics();
          const style = this.getNodeStyle(node);
          if (this.currentId === node.id) {
            const bgsprite = new PIXI.Sprite.fromImage(
              require('../../assets/img/relation/node-bg-select.png'),
            );
            bgsprite.width = node.width + 100;
            bgsprite.height = node.width + 100;
            bgsprite.x = -bgsprite.width / 2;
            bgsprite.y = -bgsprite.width / 2;
            node.shape.addChildAt(bgsprite, 0);
            node.prepareImage();
          } else {
            const bgsprite = new PIXI.Sprite.fromImage(
              require('../../assets/img/relation/node-bg.png'),
            );
            bgsprite.width = node.width + 40;
            bgsprite.height = node.width + 40;
            bgsprite.x = -bgsprite.width / 2;
            bgsprite.y = -bgsprite.width / 2;
            node.shape.addChildAt(bgsprite, 0);
            node.prepareImage();
          }
          if (node.locked) {
            graphic.lineStyle(2, style.color);
            graphic.arc(0, 0, node.r - 6, 0, 2 * Math.PI);
            graphic.closePath();
            node.shape.addChild(graphic);
          }
          node.shape.hitArea = new PIXI.Circle(0, 0, node.r);

          const zoom = node.world.options.fixedLabel ? node.world.app.scale.x : 1;
          const textvisible = zoom > node.world.options.minZoomLabel;

          const textstyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0xffffff,
            align: 'center',
          });
          const text = new PIXI.Text(node.name, textstyle);
          text.scale.x = 1 / zoom;
          text.scale.y = 1 / zoom;
          const matrix = new PIXI.TextMetrics.measureText(node.name, textstyle);
          text.y = node.r + 8 / zoom;
          text.x = -matrix.width / (2 * zoom);
          text.alpha = textvisible ? 1 : 0;
          node.shape.addChild(text);

          const text2style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 10,
            fill: 0x999999,
            align: 'center',
          });
          const text2 = new PIXI.Text(node.disambiguation, text2style);
          text2.scale.x = 1 / zoom;
          text2.scale.y = 1 / zoom;
          const matrix2 = new PIXI.TextMetrics.measureText(
            node.disambiguation,
            text2style,
          );
          text2.y = node.r + 25 / zoom;
          text2.x = -matrix2.width / (2 * zoom);
          text2.alpha = textvisible ? 1 : 0;
          node.shape.addChild(text2);
          node.shape.alpha = style.opacity;
        },
        edgeLineRender: (edge: any, graphic: any, PIXI: any) => {
          const style = this.getLinkStyle(edge);
          graphic.lineStyle(edge.fixedWidth, style.color);
          graphic.moveTo(edge.fromPoint.x, edge.fromPoint.y);
          graphic.lineTo(edge.toPoint.x, edge.toPoint.y);
          graphic.closePath();
          edge.shape.alpha = style.opacity;
        },
        edgeLabelBgRender: (edge: any, graphic: any, PIXI: any) => {
          const labelPadding = [8, 4],
            radius = 12;
          const x = -edge.text.width / 2 - labelPadding[0],
            y = -edge.text.height / 2 - labelPadding[1],
            width = edge.text.width + labelPadding[0] * 2,
            height = edge.text.height + labelPadding[1] * 2;
          const bgColor1 = this.strToHex('#F0F9FF'),
            bgColor2 = this.strToHex('#A9B9C6'),
            bgColor3 = this.strToHex('#6F7A82');
          graphic.clear();
          if (edge.children && edge.children.length > 1) {
            const m1 = 4,
              m2 = 2;
            graphic.lineStyle(1, bgColor3);
            graphic.beginFill(bgColor3);
            graphic.drawRoundedRect(x + m1, y - m1, width, height, radius);
            graphic.closePath();
            graphic.endFill();

            graphic.lineStyle(1, bgColor2);
            graphic.beginFill(bgColor2);
            graphic.drawRoundedRect(x + m2, y - m2, width, height, radius);
            graphic.closePath();
            graphic.endFill();
          }
          graphic.lineStyle(1, bgColor1);
          graphic.beginFill(bgColor1);
          graphic.drawRoundedRect(x, y, width, height, radius);
          graphic.closePath();
          graphic.endFill();
        },
        onNodeClick: (node: any) => {
          this.clearHighLightLink();
          this.infoBox && this.infoBox.destroy();
          this.$emit('on-node-left-click', { node });
        },

        onNodeRightClick(node: any, e: any) {
          //   this.onNodeRightClick(node)
        },
        onEdgeClick: (link: any) => {
          this.clearHighLightLink();
          this.$emit('on-link-left-click', { link });
        },
        onEdgeRightClick(edgeGroup: any, e: any) {
          //   this.onLinkRightClick(link)
        },

        onClickNone: () => {
          this.reset();
          this.$emit('on-click-null');
          this.updateFilters();
          this.updateStyle();
        },
        onZoom: (scale: any) => {
          this.infoBox && this.infoBox.destroy();
          // this.reset();
          // this.onClickNull && this.onClickNull();
          // this.updateFilters();
          // this.updateStyle();
        },
        onMouseDown: () => {
          this.reset();
        },
        onTick() {
          // $circle.css({
          //   left: currentNode.x,
          //   top: currentNode.y,
          // })
        },
      });

      this.chart.filter.setFilter({
        nodeFilter: this.nodeFilter,
        //   edgeFilter: this.linkFilter
      });

      this.updateFilters({ animTime: 5 });
    }

    public strToHex(hexString: any) {
      return parseInt(hexString.replace('#', '0x'), 16);
    }

    public getNodeStyle(node: any) {
      const style = { color: 0xffffff, opacity: 1 };
      if (this.highLightLinks.length > 0) {
        let flag = false;
        for (let i = 0; i < this.highLightLinks.length; i++) {
          const link = this.getLinkById(this.highLightLinks[i]);
          if (link && (link.from === node.id || link.to === node.id)) {
            flag = true;
            break;
          }
        }
        if (!flag) {
          style.color = 0x999999;
          style.opacity = 0.2;
        }
      }
      if (node.locked === true) {
        style.color = 0xff7800;
      }
      return style;
    }

    public reset() {
      this.highLightLinks = [];
      this.infoBox && this.infoBox.destroy();
    }

    public getLinkStyle(link: any) {
      const style = { color: 0xdaf4ff, opacity: 1 };
      if (
        this.highLightLinks.length > 0 &&
        this.highLightLinks.indexOf(link.currentEdge.id) < 0
      ) {
        style.color = 0x999999;
        style.opacity = 0.2;
      }
      if (link.isHover) {
        style.color = 0xffd4af;
        style.opacity = 1;
      }
      return style;
    }

    public appendAB(data: any, from: any, to: any) {
      if (!DataParser || !data) {
        return;
      }
      this.clearHighLightLink();
      const networkData = DataParser.parseAB(data);
      if (from) {
        // 将新的点的坐标设为currentNode附近
        const pos = this.getNodeById(from).position;
        let x = pos.x;
        networkData.nodes.map((node: any) => {
          node.position = {
            x: (x += 300),
            y: pos.y,
          };
          if (node.id === to) {
            node.locked = true;
          }
        });
      }
      this.data = DataParser.merge(this.data, networkData);

      this.chart.appendNodes(this.data.nodes);
      this.chart.appendEdges(this.data.links);

      setTimeout((_: any) => {
        networkData.links.map((link: any) => {
          this.setHighLightLink(link.id);
          const cl = this.getLinkById(link.id);
          this.changeLink(cl, { id: link.id });
        });

        this.updateStyle();
        this.zoomToFit();
      }, 200);
    }

    // 添加数据
    public append(data: any, id ?: any) {
      if (!DataParser || !data) {
        return;
      }
      const networkData = DataParser.parse(data);
      if (id) {
        // 将新的点的坐标设为currentNode附近
        const pos = this.getNodeById(id).position;
        networkData.nodes.map((nodes: any) => {
          nodes.position = {
            x: pos.x + 5,
            y: pos.y + 5,
          };
        });
      }
      const node = id ? this.getNodeById(id) : null;
      this.data = DataParser.merge(this.data, networkData, node);
      this.chart.appendNodes(this.data.nodes);
      this.chart.appendEdges(this.data.links);
      // this.chart.replaceData(this.data);
      // this.chart.filter.updateFilter();
    }

    // 初始化数据
    public initData(data: any) {
      this.data = data;
      this.data.nodes.forEach((node: any) => {
        node.backgroundImage = DataParser.parseImage({...node, imageUrl: node.backgroundImage});
      });
      this.chart.appendNodes(this.data.nodes);
      this.chart.appendEdges(this.data.links);
      this.zoomToFit();
    }

    // 相同节点多条关系切换
    public changeLink(link: any, tobe: any) {
      link.switchChild(tobe.id);
    }

    // 获取所有节点
    public getNodes() {
      return this.exportData().nodes || [];
    }

    // 获取图上关系
    public getLinks() {
      return this.exportData().links || [];
    }

    // 获取所有关系
    public getAllLinks() {
      return this.data.links;
    }

    // 根据id获取特定关系
    public getLinkById(id: any) {
      return this.chart.findEdge(id) || {};
    }

    // 根据id获取特定节点
    public getNodeById(id: any) {
      return this.chart.findNode(id) || {};
    }

    // 锁节点
    public lockNode(id: any) {
      const node = this.getNodeById(id);
      node.setLock(true);
    }

    // 解锁节点
    public unlockNode(id: any) {
      const node = this.getNodeById(id);
      node.setLock(false);
    }

    // 隐藏节点
    public hideNode(id: any) {
      const node = this.getNodeById(id);
      node.hide();
      node._hide_ = true;
    }

    // 删除关系
    public removeLink(id: any) {
      this.chart.removeEdge(id);
      DataParser.removeLink(this.data, id);
    }

    // updateFilter
    public updateFilters(props = { animTime: 0.3 }) {
      this.chart.filter.updateFilter(props);
    }

    // updateStyle
    public updateStyle() {
      this.chart.updateStyle();
    }

    public setHighLightLink(id: any) {
      const i = this.highLightLinks.indexOf(id);
      if (i < 0) {
        this.highLightLinks.push(id);
      } else {
        this.highLightLinks.splice(i, 1);
      }
      this.updateStyle();
    }

    public clearHighLightLink() {
      this.highLightLinks = [];
      this.updateFilters();
      this.updateStyle();
    }

    public exportData() {
      const data = this.chart.dataSets.exportData();
      return { nodes: data.nodes, links: data.edges };
    }

    public exportImage() {
      return new Promise((resolve, reject) => {
        const image = this.chart.exportImage();
        image.onload = () => {
          const base64 = image.src;
          const pngFile = b64toBlob(base64);
          resolve(pngFile);
        };
      });
    }

    public panToEdge(id: any, cb: any, time: any) {
      this.chart.controller.panToEdge(id, { onComplete: cb, animTime: time });
    }

    public zoomToFit() {
      const i = new Date().getTime();
      const interval = setInterval((_: any) => {
        const rect = this.chart.rootContainer.getLocalBounds();
        this.chart.controller.zoomToFit(rect, { padding: 180 });
        if (new Date().getTime() - i > 1000) {
          clearInterval(interval);
        }
      }, 200);
    }
    public nodeFilter(node: any, links: any) {
      if (this.$parent) {
        return this.$parent.nodeFilter(node, links);
      }
      return true;
    }
    public linkFilter() {
      return true;
    }
  }
</script>

<style>
</style>
