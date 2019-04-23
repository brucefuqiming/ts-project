import StringUtils from '@/utils/stringUtil';
import { timeStantard } from '@/utils/dateUtil';
import { setUrlParam } from '@/utils/urlUtil';
import htmlparser from '@/utils/htmlparser';
import xss from '@/utils/xss';

const NODE_WIDTH = 60;
const NODE_OFFSET_TO_COLLISION = 10;
const LINK_COLOR = '#F5FBFF';
const LINK_LABELCOLOR = '#000000'; // #646F7D
const LINK_LABEL_BG_COLOR = '#F5FBFF';
const LINK_LABLE_BORDER = {width: 1, color: '#FFFFFF' };
const LINK_LINE_LENGTH = 150;
const LINK_ARROW_OFFSET_FROM_CENTER = 14;
const LINK_ARROW_WIDTH = 8;
const NINE_CATES = ['事件', '人物', '其他', '创造', '医学', '医疗', '地理' , '宗教', '无分类', '组织', '观念', '自然'];
function isValidImage(url: string) {
    return !StringUtils.isCrossOrigin(url) && url.indexOf('/online/common/img/icons/nine-cates') < 0;
}
function imageParse(item: any) {
    if (!item.imageUrl || !isValidImage(item.imageUrl)) {
        const category = parseType(item.typePaths);
        if (!category || NINE_CATES.indexOf(category) < 0) {
            return require(`../../../assets/icon/nine-cates/无分类.svg`);
        } else {
            return require(`../../../assets/icon/nine-cates/${category}.svg`);
        }
    }
    return setUrlParam(item.imageUrl, {w: 120, h: 120});
}

function insertIntoNodes(nodes: any, item: any) {
    const old = exists(nodes, item);
    if (old) {
        const catelist = Array.from(new Set([...old.catelist, ...item.catelist]));
        Object.assign(old, item, {
            catelist,
        });
    } else {
        nodes.push(item);
    }
}

function insertIntoLinks(links: any, item: any) {
    const old = exists(links, item);
    if (old) {
        // 箭头纠偏
        if (old.from === item.to && old.to === item.from) {
            switch (item.direction) {
                case '->':
                item.direction = '<-';
                break;
                case '<-':
                item.direction = '->';
                break;
            }
            // item.direction = old.direction;
            item.to = old.to;
            item.from = old.from;
            // item.relationArrow = old.relationArrow;
            // if(item.formated && old.formated) {
            //     item.formated.fromName = old.formated.fromName;
            //     item.formated.toName = old.formated.toName;
            // }
        }
        Object.assign(old, item);
    } else {
        links.push(item);
    }
}

function exists(list: any, item: any) {
    for (let i = 0; i < list.length; i ++) {
        if (list[i].id === item.id) {
            return list[i];
        }
    }
    return false;
}

function parseType(item: any) {
    if (!item || item.length === 0 || !item[0].name || item[0].name.split('/')[0] === 'lily') {
        return '其他';
    }
    return item[0].name.split('/')[0];
}

export default {
    parseImage: imageParse,
    parseAB(data: any) {
        const nodes: any = [], links: any = [];
        for (let i = 0; i < data.length; i ++) {
            if (i > 0) {
                break;
            }
            for (let j = 0; j < data[i].length; j ++) {
                const item = data[i][j];
                const nodefrom = {
                    id: item.fromId,
                    disambiguation: '',
                    name: item.fromName,
                    summary: xss(htmlparser.formatLink(item.summary), 'content'),
                    width: NODE_WIDTH,
                    offsetToCollision: NODE_OFFSET_TO_COLLISION,
                    position: {x: Math.random() * 1000, y: Math.random() * 1000},
                    backgroundImage: imageParse(item),
                    catelist: [],
                };
                // let nodeto = {
                //     id: item.toId,
                //     disambiguation: '',
                //     name: item.toName,
                //     summary: item.summary,
                //     width: NODE_WIDTH,
                //     offsetToCollision:NODE_OFFSET_TO_COLLISION,
                //     position: {x: Math.random() * 1000, y: Math.random() * 1000},
                //     backgroundImage: imageParse(item),
                //     catelist: [],
                // }
                insertIntoNodes(nodes, nodefrom);
                // insertIntoNodes(nodes, nodeto);
                item.allRelations.forEach((itemlink: any) => {
                    const link: any = {
                        id: itemlink.id,
                        from: item.fromId,
                        to: item.toId,
                        label: itemlink.relation,
                        color: LINK_COLOR,
                        labelColor: LINK_LABELCOLOR,
                        labelBgColor: LINK_LABEL_BG_COLOR,
                        labelBorder: LINK_LABLE_BORDER,
                        lineLength: LINK_LINE_LENGTH,

                        relationArrow: itemlink.direction === 'twoway' ? 'both' : itemlink.direction,
                        arrowOffsetFromCenter: LINK_ARROW_OFFSET_FROM_CENTER,
                        arrowWidth: LINK_ARROW_WIDTH,
                        prop: {
                            ...itemlink,
                            position: itemlink.geometry ? itemlink.geometry.geometry : [],
                            positionDesc: itemlink.geometry ? itemlink.geometry.desc : '',
                            relationDesc: xss(htmlparser.formatLink(itemlink.description), 'content'),
                            relationId: itemlink.id,
                            relationType: itemlink.relationType,
                            relationTypeGroup: itemlink.relationTypeGroup,
                            relationWeight: itemlink.relationWeight,
                            properties: itemlink.properties,
                        },
                        formated: {
                            fromName: item.fromName,
                            toName: item.toName,
                            from: item.fromId,
                            to: item.toId,
                            positionDesc: itemlink.geometry ? itemlink.geometry.desc : '',
                            desc: xss(htmlparser.formatLink(itemlink.description), 'content'),
                            time: timeStantard(itemlink.timepoint),
                        },
                    };
                    switch (link.relationArrow) {
                        case 'right':
                        link.direction = '->';
                        link.prop.direction = '->';
                        break;
                        case 'left':
                        link.direction = '<-';
                        link.prop.direction = '<-';
                        break;
                        case 'both':
                        link.direction = '<->';
                        link.prop.direction = '<->';
                        break;
                        case 'twoway':
                        link.direction = '<->';
                        link.prop.direction = '<->';
                        break;
                    }
                    insertIntoLinks(links, link);
                });
            }
        }
        return { nodes, links };
    },
    parse(data: any) {
        const nodes: any = [], links: any = [], category: any = [];
        const from = {
            // ...data,
            id: data.id,
            disambiguation: data.disambiguation,
            name: data.name,
            summary: xss(htmlparser.formatLink(data.summary), 'content'),
            locked: true,
            width: NODE_WIDTH,
            catelist: [],
            label: data.name,
            position: {x: 500, y: 200},
            backgroundImage: imageParse(data),
        };
        nodes.push(from);
        data.relationList.forEach((item: any) => {
            const link: any = {
                id: item.relations.relationId,
                from: from.id,
                to: item.id,
                label: item.relations.relation,
                color: LINK_COLOR,
                labelColor: LINK_LABELCOLOR,
                labelBgColor: LINK_LABEL_BG_COLOR,
                labelBorder: LINK_LABLE_BORDER,
                lineLength: LINK_LINE_LENGTH,

                direction: item.relations.direction,
                arrowOffsetFromCenter: LINK_ARROW_OFFSET_FROM_CENTER,
                arrowWidth: LINK_ARROW_WIDTH,
                prop: item.relations,
                formated: {
                    fromName: from.name,
                    toName: item.name,
                    from: from.id,
                    to: item.id,
                    positionDesc: item.relations.positionDesc,
                    desc: xss(htmlparser.formatLink(item.relations.relationDesc), 'content'),
                    time: timeStantard(item.relations.time),
                },
            };
            switch (link.direction) {
                case '->':
                link.relationArrow = 'right';
                break;
                case '<-':
                link.relationArrow = 'left';
                break;
                case '<->':
                link.relationArrow = 'both';
                break;
            }
            insertIntoLinks(links, link);

            const node: any = {
                // ...item,
                id: item.id,
                disambiguation: item.disambiguation,
                name: item.name,
                summary: xss(htmlparser.formatLink(item.summary), 'content'),
                width: NODE_WIDTH,
                offsetToCollision: NODE_OFFSET_TO_COLLISION,
                position: {x: 505, y: Math.random() * 205},
                backgroundImage: imageParse(item),
                catelist: [],
            };
            if (item.relations.relationType) {
                node.catelist.push(item.relations.relationType);
                if (category.indexOf(item.relations.relationType) < 0) {
                    category.push(item.relations.relationType);
                }
            }
            insertIntoNodes(nodes, node);
        });
        nodes[0].catelist = category;
        return { nodes, links };
    },

    merge(oldData: any, newData: any, currentNode = false) {
        const res = oldData;
        newData.nodes.forEach((node: any) => {
            insertIntoNodes(res.nodes, node);
        });

        newData.links.forEach((link: any) => {
            insertIntoLinks(res.links, link);
        });

        return res;
    },

    marbleEdgeToEditable(raw: any) {
        console.log(raw);
        return {
            name: raw.fromName,
            to: raw.toName,
            aId: raw.from,
            bId: raw.to,
            id: raw.id,
            relation: raw.label,
            direction: raw.direction,
            desc: raw.desc,
            time: raw.prop.time,
            location: {
              oid: '',
              desc: raw.positionDesc,
              geometry: raw.position,
            },
            property: raw.prop.properties,
            relationType: raw.prop.relationType,
            relationTypeGroup: raw.prop.relationTypeGroup,
        };
    },

    removeLink(data: any, linkId: any) {
        for (let i = 0; i < data.links.length; i ++) {
            if (data.links[i].id === linkId) {
                data.links.splice(i, 1);
                return;
            }
        }
    },

    getChildNodesAndChildLinks(node: any) {
        if (!node) {
            return [];
        }
        const nodes: any = [], links: any = [];
        node.edges.forEach((item: any) => {
            item.children.forEach((link: any) => {
                if (links.indexOf(link.id) < 0) {
                    links.push(link.id);
                }
                if (nodes.indexOf(link.from) < 0) {
                    nodes.push(link.from);
                }
                if (nodes.indexOf(link.to) < 0) {
                    nodes.push(link.to);
                }
            });
        });
        return {nodes, links};
    },
};
