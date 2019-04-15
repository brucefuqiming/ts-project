<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="inputValue"  />
    <p v-for="(item, index) in list" :key="index">{{item}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Watch, Emit} from 'vue-property-decorator';
import { State, Mutation, Action, Getter } from 'vuex-class';
@Component
export default class HelloWorld extends Vue {
  public inputValue: string = 'default value';
  // @Model('change', { type: Boolean }) public readonly checked!: boolean;
  @State public list!: number[];
  // model: {
  //   prop: 'checked',
  //   event: 'change'
  // },
  // props: {
  //   checked: {
  //     type: Boolean
  //   },
  // }
  @Prop() private msg!: string;
  private onlyme: string = '123';
  // props:{
  //   msg: {
  //     type:string,
  //     default:'1234'
  //   }
  // };
  @Watch('inputValue') @Emit()
  public onChange(val: string, oldval: string): void {
    console.log(val, oldval);
  }
  // watch: {
  //   inputValue(val, oldval){
  //   }
  // },
  public testMethod(): void {
    console.log(this.msg);
  }
  public mounted() {
    console.log(this.list);
  }
}
</script>

<style scoped lang="scss">

</style>
