<template>
  <div id="dashboard">
    <gauge
      v-for="(g, index) in gauges"
      :key="index"
      :mode="mode"
      :label="g.label"
      :value="g.value"
      :min="g.min"
      :max="g.max"
      :warnValue="g.warnValue"
      :alertValue="g.alertValue">
    </gauge>
  </div>
</template>

<script>
import Gauge from './gauge.vue';

export default {
  name: 'dashboard',
  props: ['mode','gauges'],
  components: {
    Gauge
  },
  data () {
    return {
      //
    }
  },
  mounted: function () { 
    //
  },
  methods: {
    //
  }
}

</script>

<style lang="scss" scoped>
  #dashboard {
    flex-direction: row;

    display: flex;
    overflow: hidden;

    // transform: translate(-50%);

    .gauge-wrapper {
      margin: 0 10px;
    }
  }

</style>
