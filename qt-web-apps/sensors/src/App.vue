<template>
  <sensors-report :sensors="activeVehicle.sensors"></sensors-report>
</template>

<script>
import qt from './lib/qwebchannel.js';
import SensorsReport from './components/sensors-report.vue';

export default {
  name: 'app',
  components: {
    SensorsReport
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
            label: 'latency',
            value: 0,
            min: 0,
            max: 1000
          },
          {
            label: 'speed',
            value: 0,
            min: 0,
            max: 120
          },
          {
            label: 'throttle',
            value: 0,
            min: 0,
            max: 100
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
  },
  methods: {
    //
  }
}
</script>

<style lang="scss">
  html,
  body {
    margin: 0;
    padding: 5px;

    background-color: transparent;
  }

</style>
