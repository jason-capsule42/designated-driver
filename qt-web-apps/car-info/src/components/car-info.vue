<template>
  <div id="car-info">
    <section id="car-type">
      <div class="label">
        <div class="title">
          {{vehicle.makeModel}}
        </div>
        <div>
          {{vehicle.type}}
        </div>
      </div>
    </section>
    <section id="fuel-guage">
      <i class="icon fas fa-gas-pump"></i>
      <div>
        <div class="label">
          Fuel Level
        </div>
        <div :class="[{'alert': vehicle.fuelLevel < 20},{'warn': vehicle.fuelLevel >= 20 && vehicle.fuelLevel < 50},{'safe': vehicle.fuelLevel >= 50}]">
          {{vehicle.fuelLevel}}%
        </div>
      </div>
    </section>
    <!-- <section>
      Auto
    </section> -->
  </div>
</template>

<script>
export default {
  name: 'peak-car-info',
  props: ['vehicle'],
  components: {
    //
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
  #car-info {
    flex-direction: row;

    display: flex;

    section {
      &:not(:last-child) {
        padding-right: 40px;

        border-right: solid 1px rgba(255, 255, 255, .4);
      }

      &:not(:first-child) {
        padding-left: 40px;
      }
    }

    #fuel-guage {
      align-items: center;
      flex-direction: row;

      display: flex;

      text-align: left;

      .icon {
        margin-right: 10px;

        font-size: 25px;
      }

      .alert {
        color: rgba(225, 105, 101, 1.00);
      }

      .warn {
        color: rgba(245, 230, 82, 1.00);
      }

      .safe {
        color: rgba(144, 211, 152, 1.00);
      }
    }
  }

</style>
