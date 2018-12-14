<template>
<div class="gauge-wrapper" :class="mode">
  <div class="gauge">
    <div class="needle-backdrop">
      <div class="needle" >
        <svg>
          <circle cx="100" cy="100" r="95" />
        </svg>
      </div>
    </div>
    <div class="needle-wrapper" :style="'transform: rotate(' + needleOffset + 'deg)'">
      <div class="needle" :class="[{'warn': value >= warnValue && value < alertValue},{'alert': value >= alertValue}]">
        <svg>
          <circle cx="100" cy="100" r="95" />
        </svg>
      </div>
    </div>
  </div>
  <div class="value">{{value}}</div>
  <div class="label">{{label}}</div>
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
    mode: {
      type: String
    },
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
    warnValue: {
      type: Number
    },
    alertValue: {
      type: Number
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

      let offset = 180;

      stepDegrees = gaugeSteps / stepCount;
      offset = offset + (stepDegrees * vm.value);

      vm.needleOffset = offset;
    }
  }
}

</script>

<style lang="scss" scoped>
  $size: 200px;

  .gauge-wrapper {
    position: relative;

    width: $size;
    height: $size / 2 + 50px;

    &.teleoperation {
      svg {
        stroke-width: 10px;
      }
    }

    &:not(.teleoperation) {
      svg {
        stroke-width: 5px;
      }
    }
  }

  .gauge {
    position: relative;

    width: $size;
    height: $size / 2;
    overflow: hidden;
  }

  .needle-wrapper,
  .needle-backdrop {
    position: absolute;
    top: 0;
    left: 0;

    width: $size;
    height: $size;

    color: white;

    transition: transform 500ms;

    .needle {
      width: $size;
      height: $size / 2;
      overflow: hidden;
    }

    svg {
      width: $size;
      height: $size;

      fill: transparent;
      stroke-width: 10px;
    }
  }

  .needle-backdrop {
    svg {
      stroke: rgba(255, 255, 255, .15);
    }
  }

  .needle-wrapper {
    svg {
      transition: stroke 250ms;

      stroke: rgba(59, 248, 255, 1.00);
    }

    .warn {
      svg {
        stroke: rgba(245, 230, 82, 1.00);;
      }
    }

    .alert {
      svg {
        stroke: rgba(225, 105, 101, 1.00);;
      }
    }
  }

  .value {
    font-size: 50px;
    text-align: center;

    transform: translateY(-50px);
  }

  .label {
    position: absolute;
    bottom: 0;

    width: $size;

    color: rgba(139, 138, 137, 1.00);
    font-weight: bold;
    text-align: center;
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
