<template>
  <div id="app">
    <hello-world :msg="msg" ref="helloworld"></hello-world>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  public $refs!: { // strictPropertyInitialization 需要对所有的实际属性赋值 所以需要加感叹号
    helloworld: HelloWorld,
  };
  public isActive: boolean = false;
  public msg: string = 'test';
  public created() {
    console.log('created');
  }

  public mounted() {
    this.$refs.helloworld.testMethod();
  }
}
</script>

<style lang="scss">
</style>
