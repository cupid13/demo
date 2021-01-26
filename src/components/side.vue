<template>
  <div>
    <!-- <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      v-for="item in navList"
      :key="item.name"
    >
      <el-submenu index="1">
         <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.title}}</span>
        </template>
          <el-menu-item :index="item.path">{{item.title}}</el-menu-item>
        </el-submenu>
    </el-menu> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // navList
    };
  },
  created() {
    console.log(this.router)
    // this.navList = JSON.parse(localStorage.getItem("routes"));
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style>
</style>
