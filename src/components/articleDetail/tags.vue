<template>
  <div class='aricleDetailtags'>
    <ul>
        <li v-for="(tag,index) in TotagsData.tags" :key="index">
            <div 
                v-bind:class="['color-tag index-'+index%11]"
            ></div>
            <div class='tag-value'>{{tag}}</div>
        </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class AricleDetailTags extends Vue {
    @Prop() public TotagsData!: any;
}
</script>
<style lang="scss">
   .aricleDetailtags{
       margin-bottom:24px;
       ul{
           overflow:auto;
       li{
            position:relative;   
            float:left;
            color:rgb(51,51,51);
            font-size:12px;
            height:24px;
            text-align:center;
            box-shadow: 1px 1px 4px 0 rgba(215, 215, 215, 0.5);
            margin-right:12px;
            margin-top: 16px;
            .tag-value{
                
                    line-height:24px;
                    padding: 0 12px;
            }
            .color-tag{
                position:absolute;
                width:2px;
                height:24px;
            }
            .index-0{
                background-color:#ff968d;
            }
            .index-1{
                background-color:#ffa967;
            }
            .index-2{
                background-color:#ffc842;
            }
            .index-3{
                background-color:#ffed00;
            }
            .index-4{
                background-color:#c1ff6e;
            }
            .index-5{
                background-color:#64ec93;
            }
            .index-6{
                background-color:#20daee;
            }
            .index-7{
                background-color:#36acff;
            }
            .index-8{
                background-color:#6a57ff;
            }
            .index-9{
                background-color:#6a57ff;
            }
            .index-10{
                background-color:#9d56ff;
            }
       }
    
    }

    }
</style>