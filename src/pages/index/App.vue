<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const src = '@public/ossweb-img/logo.png';
    return {
      src,
    };
  },
});
</script>

<template>
  <div>
    index
    <img
      alt="Vue logo"
      src="@assets/images/logo.png"
    >
    <img
      :src="src"
      alt=""
    >
    abbbcccww2235674446663
    <div class="test" />
  </div>
</template>
<style>
.test {
  width: 200px;
  height: 200px;
  background: url('@public/ossweb-img/logo.png') no-repeat;
  background-size: 100% 100%;
}
</style>
