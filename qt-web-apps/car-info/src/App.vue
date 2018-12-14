<template>
  <car-info :vehicle="activeVehicle"></car-info>
</template>

<script>
import qt from './lib/qwebchannel.js';
import CarInfo from './components/car-info.vue';

export default {
  name: 'app',
  components: {
    CarInfo
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
    generateNewGaugeData: function() {
      const vm = this;

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
  html,
  body {
    padding: 5px;
    margin: 0;

    background-color: transparent;
  }

</style>
