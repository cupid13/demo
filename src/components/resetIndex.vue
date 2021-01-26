<template>
  <div>
    <el-container>
      <el-header>   
        <Head/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Side />
        </el-aside>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Head from "./head";
import Side from "./side";
import Main from "./main";
export default {
  components: {
    Side,
    Main,
    Head
  },
  data() {
    return {};
  },
};
</script>

<style>
.el-header {
    padding: 0;
    margin: 0;
    height: 80px;
    line-height: 80px;
    background-color: aquamarine
}
</style>
