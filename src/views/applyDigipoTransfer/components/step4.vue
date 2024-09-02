<template>
  <div class="contain">
    <span class="text">Completed</span>
    <el-button type="primary" @click="goBack">Back</el-button>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goBack = () => {
  router.go(-1);
}
</script>
<style lang="scss" scoped>
.contain{
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .text{
    font-size: 40px;
    color: #29c66c;
  }
  .el-button{
    margin-top: 20px;
  }
}
</style>