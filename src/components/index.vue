<template>
  <div class="login_container">
      
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.login_container {
  width: 100%;
  height: 100%;
  position:absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #2b4b6b;
  background: url("../assets/images/bg_login.jpeg") no-repeat;
  background-size: 100% 100%;
}

</style>