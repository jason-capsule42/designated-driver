<template>
  <div id="dashboard">
    <gauge
      v-for="(g, index) in gauges"
      :key="index"
      :label="g.label"
      :value="g.value"
      :min="g.min"
      :max="g.max">
    </gauge>
  </div>
</template>

<script>
import Gauge from './gauge.vue';

export default {
  name: 'dashboard',
  props: ['gauges'],
  components: {
    Gauge
  },
  data () {
    return {
      latencyCurrent: 650,
      latencyMin: 0,
      latencyMax: 1000,
      vehicleSpeedCurrent: 55,
      vehicleSpeedMin: 0,
      vehicleSpeedMax: 120,
      throttleCurrent: 150,
      throttleMin: 0,
      throttleMax: 180
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
    position: absolute;
    bottom: 0;
    left: 50%;
    flex-direction: row;

    display: flex;
    overflow: hidden;

    background-color: rgba(47, 47, 47, 1.00);
    transform: translate(-50%);

    .gauge {
      margin: 10px;
    }
  }

</style>
