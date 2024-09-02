<template>
  <div class="tranfer-detail">
    <div class="page-title">
      <span class="title">Apply Digipo Transfer</span>
    </div>
    <div class="page-content">
      <div class="step-progress">
        <el-steps style="max-width: 1980px" :active="activeStep" align-center>
          <el-step  description="Confirm Digipo Information" />
          <el-step  description="Trade Documents for Digipo Transfer" />
          <el-step  description="Contract Signing" />
          <el-step  description="Complete" />
        </el-steps>
      </div>
      <div class="step-area">
        <step1 v-if="activeStep === 1"/>
        <step2 v-if="activeStep === 2"/>
        <step3 v-if="activeStep === 3"/>
        <step4 v-if="activeStep === 4"/>
      </div>
    </div>
    <div class="footer">
      <el-button @click="back">Back</el-button>
      <el-button type="primary" @click="next">Next</el-button>
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
const activeStep = ref(2)
const next = () => {
  if (activeStep.value < 4) {
    activeStep.value = activeStep.value + 1
  }
}
const back = () => {
  if (activeStep.value === 1) {
    router.push('/applyDigipoTransfer')
  } else {
    activeStep.value = activeStep.value - 1
  }
}
</script>
<style lang="sass" scoped>
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
  .step-progress {
    margin-top: 50px;
    .el-step__main {
      margin-top: 16px;
      color: #000;
    }
    .el-step__description.is-finish {
      color: #000;
    }
  }
  .step-area {
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 16px;
    left: 0px;
    text-align: center;
    box-shadow: 0px -5px 5px 0px rgba(46, 90, 153, 0.1);
    height: 64px;
    box-sizing: border-box;
    padding-top: 12px;
    background-color: #fff;
    .el-button {
      padding: 8px 23px;
    }
  }
</style>