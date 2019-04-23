<template>
  <transition name="fade">
    <div class="popup-mask" v-show="show" @click.passive="close">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component
export default class Popup extends Vue {
  @Prop({default: true}) public show!: boolean;
  public close(e: Event) {
    const target = e.target as Element;
    if (target.classList.contains('popup-mask')) {
      e.stopPropagation();
      this.$emit('close-pop');
    }
  }
}
</script>

<style lang="scss">
.popup-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 11;
}
</style>
