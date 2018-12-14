<template>
  <div id="app" :class="activeVehicle.mode">
    <div class="window-row">
      <div class="window">
        <peak-carinfo :vehicle="activeVehicle"></peak-carinfo>
      </div>
      <div class="window">
        <sensors-report :sensors="activeVehicle.sensors"></sensors-report>
        <div id="actions">
          <div class="button">
            <i class="fas fa-circle-notch"></i>
          </div>
          <div class="button">
            <i class="fas fa-undo"></i>
          </div>
          <div class="button small">
            <i class="fas fa-times"></i>
          </div>
        </div>
        <div id="rear-camera" class="camera-feed">
          <div class="label left">
            <div class="title">
              Exterior Camera
            </div>
            <div>
              Rear
            </div>
          </div>
        </div>
      </div>
      <div class="window">top right</div>
    </div>
    <div class="window-row">
      <div class="window">
        <div class="camera-feed fullscreen">
          <div class="label right">
            <div class="title">
              Exterior Camera
            </div>
            <div>
              Left
            </div>
          </div>
        </div>
      </div>
      <div class="window">
        <div class="camera-feed fullscreen"></div>
        <dashboard :mode="activeVehicle.mode" :gauges="activeVehicle.gauges"></dashboard>
      </div>
      <div class="window">
        <div class="camera-feed fullscreen">
          <div class="label left">
            <div class="title">
              Exterior Camera
            </div>
            <div>
              Right
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qt from './lib/qwebchannel.js';
import PeakCarinfo from './components/peak-car-info.vue';
import SensorsReport from './components/sensors-report.vue';
import Dashboard from './components/dashboard.vue';

export default {
  name: 'app',
  components: {
    PeakCarinfo,
    SensorsReport,
    Dashboard
  },
  data () {
    return {
      activeVehicle: {
        mode: 'peak',
        makeModel: '2018 Toyota Prius',
        type: 'Passenger Vehicle',
        sensors: [
          {
            label: 'Lidar',
            state: 'active'
          },
          {
            label: 'Radar',
            state: 'error'
          },
          {
            label: 'GPS',
            state: 'active'
          },
          {
            label: 'Sonar',
            state: 'active'
          }
        ],
        fuelLevel: 75,
        gauges: [
          {
            label: 'Latency',
            value: 0,
            min: 0,
            max: 1000,
            warnValue: 200,
            alertValue: 500
          },
          {
            label: 'Speed',
            value: 0,
            min: 0,
            max: 120,
            warnValue: 60,
            alertValue: 80
          },
          {
            label: 'Throttle',
            value: 0,
            min: 0,
            max: 100,
            warnValue: 50,
            alertValue: 75
          }
        ]
      }
    }
  },
  mounted: function () { 
    const vm = this;

    // const wsUri = "ws://localhost:12345";
    // window.loggedin = false;

    // window.onload = function() {
    //   var socket = new WebSocket(wsUri);

    //   socket.onclose = function() {
    //     console.error("web channel closed");
    //   };
    //   socket.onerror = function(error) {
    //     console.error("web channel error: " + error);
    //   };
    //   socket.onopen = function() {
    //     window.channel = new qt.QWebChannel(socket, function(channel) {
    //       Connect gauges
    //       channel.objects.application.displayNum.connect(function(number) {
    //         vm.updateSpeedometer(number)
    //       });
    //     });
    //   }
    // }

    vm.generateNewGaugeData();
  },
  methods: {
    togglePower: function() {
      const vm = this;

      if (vm.running) {
        channel.objects.application.powerOff();
        vm.running = false;
      } else {
        channel.objects.application.powerOn();
        vm.running = true;
      }
    },
    generateNewGaugeData: function() {
      const vm = this;

      for (let i = 0; i < vm.activeVehicle.gauges.length; i++) {
        let min = Math.ceil(vm.activeVehicle.gauges[i].min);
        let max = Math.floor(vm.activeVehicle.gauges[i].max);

        vm.activeVehicle.gauges[i].value = Math.floor(Math.random() * (max - min)) + min;
      }

      // Fuel
      if (vm.activeVehicle.fuelLevel > 0) {
        vm.activeVehicle.fuelLevel--;
      } else {
        vm.activeVehicle.fuelLevel = 100;
      }

      setTimeout(function(){
        vm.generateNewGaugeData();
      }, 1000);
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;

    color: white;
    text-align: center;

    background-color: black;
  }

  #app {
    .button {
      display: block;
      width: 50px;
      height: 50px;
      margin: 0 auto;

      font-size: 25px;
      line-height: 50px;

      background-color: rgba(255, 255, 255, .3);
      border-color: rgba(255, 255, 255, .4);
      border-style: solid;
      border-width: 2px;
      border-radius: 50%;

      cursor: pointer;
    }

    .gauge-test {
      display: block;
      width: 100px;
      padding: 10px 20px;
      margin: 0 auto;

      color: darken(greenyellow, 30%);
      font-size: 20px;
      font-weight: bold;

      background-color: greenyellow;
      border: solid 3px darken(greenyellow, 30%);
    }
  }

  .peak {
    $bg-lite: rgba(149, 166, 153, 1.00);
    $bg-dark: rgba(83, 92, 85, 1.00);
    .window {
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#7abcff+0,4096ee+100 */
      background: $bg-lite; /* Old browsers */
      background:    -moz-linear-gradient(top, $bg-lite 0%, $bg-dark 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, $bg-lite 0%,$bg-dark 100%); /* Chrome10-25,Safari5.1-6 */
      background:         linear-gradient(to bottom, $bg-lite 0%,$bg-dark 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
  }

  .camera-feed {
    $bg-lite: rgba(60, 64, 64, 1.00);
    $bg-dark: rgba(39, 42, 46, 1.00);

    background: $bg-lite; /* Old browsers */
    background:    -moz-linear-gradient(top, $bg-lite 0%, $bg-dark 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, $bg-lite 0%,$bg-dark 100%); /* Chrome10-25,Safari5.1-6 */
    background:         linear-gradient(to bottom, $bg-lite 0%,$bg-dark 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

    &.fullscreen {
      width: 100%;
      height: 100%;
    }

    .label {
      $offset: 40px;

      position: absolute;
      bottom: $offset;

      &.left {
        left: $offset;
      }

      &.right {
        right: $offset;

        text-align: right;
      }
    }

    &#rear-camera {
      position: absolute;
      bottom: 10px;
      left: 10px;

      width: calc(100% - 20px);
      height: 50%;
    }
  }

  .window-row {
    flex-direction: row;

    display: flex;
    margin-top: 3px;

    &:first-child {
      margin-bottom: 3px;
    }

    .window {
      position: relative;

      width: calc(100% / 3);
      height: calc(50vh - 6px);
      margin-left: 3px;

      &:last-child {
        margin-right: 3px;
      }
    }
  }

  .label {
    text-align: left;

    .title {
      font-weight: bold;
    }
  }

  #car-info {
    position: absolute;
    bottom: 40px;
    left: 40px;
  }

  #sensors-report {
    position: absolute;
    top: 30px;
    left: 30px;
  }

  #actions {
    position: absolute;
    top: 30px;
    right: 30px;
    flex-direction: row;

    display: flex;

    .button:not(:first-child) {
      margin-left: 10px;
    }
  }

  #dashboard {
    position: absolute;
    bottom: 100px;
    left: 50%;
  }

</style>
