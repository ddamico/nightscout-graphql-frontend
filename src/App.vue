<template>
  <div id="app">
    <nightscout-dashboard></nightscout-dashboard>
  </div>
</template>

<script>
import NightscoutDashboard from './components/NightscoutDashboard'

export default {
  name: 'app',
  components: {
    NightscoutDashboard
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
