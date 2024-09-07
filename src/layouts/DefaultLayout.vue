<template>

  <div class="app-wrapper">

    <Calendar />

  </div>

</template>

<script setup>
import Calendar from '@/views/Calendar.vue';

</script>


<style lang="scss">
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: -moz-available; /* WebKit-based browsers will ignore this. */
  min-height: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  min-height: 100vh;
}
</style>
