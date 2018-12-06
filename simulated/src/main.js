import Vue from 'vue';
import App from './App.vue';

// Expose jQuery as a global $ and jQuery
require('expose-loader?$!jquery');
require('expose-loader?jQuery!jquery');

new Vue({
  el: '#app',
  render: h => h(App)
});
