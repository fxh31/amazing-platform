<template>
  <div class="test">
    df{{ moment().format("YYYY-MM-DD HH:mm:ss") }}
    <p>{{ y }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import moment from "moment";

const x = ref<number>(45);

const y = ref<string>("helddlo");
</script>

<style lang="less" scoped>
.test {
  background-color: yellowgreen;
}
</style>
