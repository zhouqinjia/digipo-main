<template>
  <div class="tranfer-detail">
    <div class="page-title">
      <span class="title">Apply Digipo Transfer</span>
    </div>
    <div class="page-content">
      <div class="step-progress">
        <el-steps style="max-width: 1980px" :active="activeStep" align-center>
          <el-step  ref="ref1" description="Confirm Digipo Information" />
          <el-step  ref="ref2" description="Trade Documents for Digipo Transfer" />
          <el-step  ref="ref3" description="Contract Signing" />
          <el-step  ref="ref4" description="Complete" />
        </el-steps>
      </div>
      <div class="step-area">
        <step1 v-if="activeStep === 1" @sendNextStep="getStep" @setSupplierId="setSupplierId"/>
        <step2 v-if="activeStep === 2" @sendNextStep="getStep" :supplierId="curSupplierId"/>
        <step3 v-if="activeStep === 3" @sendNextStep="getStep"/>
        <step4 v-if="activeStep === 4"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
import step1 from './components/step1'
import step2 from './components/step2'
import step3 from './components/step3'
import step4 from './components/step4'
const router = useRouter()
const activeStep = ref(1)
const getStep = (step) => {
  activeStep.value = step
}
const curSupplierId = ref('')
const setSupplierId = (val)=>{
  curSupplierId.value = val
}
</script>
<style lang="scss" scoped>
.tranfer-detail {
  height: 100%;
  overflow: hidden;
  // transform: translate(0, 0);
  position: relative;
}
.page-title {
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  color: #2e5a99;
  background-color: #fff;
  position: absolute;
  top: 0; 
  left: 0;
  z-index: 99;
  padding-bottom: 20px;
}
.page-content {
  height: calc(100% - 80px);
  overflow-y:auto; 
}
  :deep(.step-progress) {
    margin-top: 50px;
    .el-step__main {
      margin-top: 16px;
      color: #000;
    }
    .el-step__description.is-finish {
      color: #000;
      font-weight: 600;
    }
  }
  .step-area {
    margin-top: 20px;
    padding-bottom: 20px;
  }
</style>