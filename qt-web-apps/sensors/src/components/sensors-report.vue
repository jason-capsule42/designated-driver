<template>
  <ul id="sensors-report" class="status-list">
    <li  v-for="(s, index) in sensors" :key="index" :class="s.state">
      <div class="icon">
        <i class="fas fa-check"></i>
      </div>
      <div>{{s.label}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'sensor-report',
  props: ['sensors'],
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
  .status-list {
    padding: 0;
    margin: 0;

    list-style-type: none;

    li {
      align-items: center;
      flex-direction: row;

      display: flex;
      width: 100px;
      height: 30px;
      padding: 5px 15px;
      margin-bottom: 5px;

      background-color: rgba(0, 0, 0, .5);
      box-shadow: 0 5px 5px 0 rgba(0,0,0,.15);
      border-radius: 20px;

      .icon {
        margin-right: 5px;
      }
    }

    .active {
      .icon {
        color: rgba(146, 174, 149, 1.00);
      }
    }

    .error {
      background-color: rgba(225, 105, 101, 1.00);
    }
  }

</style>
