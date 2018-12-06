<template>
  <div class="gauge">
    <div>
      {{min}} - {{max}}
    </div>
    <div class="needle-frame">
      <div v-if="needleOffset !== null" class="needle" :style="'transform: rotate(' + needleOffset + 'deg)'"></div>
    </div>
    <div class="value">{{value}}</div>
    <div>{{label}}</div>
  </div>
</template>

<script>

const gaugeOffset = 0;
const minDeg = 0 + gaugeOffset;
const maxDeg = 180 - gaugeOffset;
const gaugeSteps = maxDeg - minDeg;
let stepDegrees = 1;

export default {
  name: 'gauge',
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    label: {
      type: String
    },
  },
  data () {
    return {
      needleOffset: null
    }
  },
  mounted: function () { 
    const vm = this;

    vm.updateGauge();
  },
  watch: {
    value: function() {
      const vm = this;

      vm.updateGauge();
    }
  },
  methods: {
    updateGauge: function() {
      const vm = this;
      const stepCount = vm.max - vm.min;

      vm.needleOffset = minDeg;
      stepDegrees = gaugeSteps / stepCount;
      vm.needleOffset = minDeg + (stepDegrees * vm.value);
    }
  }
}

</script>

<style lang="scss" scoped>
  $size: 45px;

  .gauge {
    color: white;
  }

  .needle-frame {
    position: relative;

    width: $size * 2;
    height: $size;
    overflow: hidden;

    &:after {
      position: absolute;
      bottom: -5px;
      left: 50%;

      display: block;
      width: 10px;
      height: 10px;

      content: '';

      background-color: red;
      border-radius: 50%;
      transform: translateX(-50%);
    }
  }

  .needle {
    position: absolute;
    bottom: -$size;
    left: 0;

    display: inline-block;
    width: $size * 2;
    height: calc(#{$size} * 2);

    background-image: radial-gradient(90px, rgba(101, 101, 101, .05), rgba(101, 101, 101, .7));
    border-radius: $size * 2;

    transition: transform 500ms;

    &:before {
      position: relative;
      top: calc(50% - 0px);

      display: block;
      width: 50%;
      height: 4px;

      content: '';

      background-color: red;
      transform: translateY(-50%);
    }
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

</style>
