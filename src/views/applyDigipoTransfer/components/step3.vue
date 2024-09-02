<template>
  <div class="step3">
    <div class="left-table">
      <div class="box" v-for="(item, index) in tableList" :key="index">
        <div class="top-info">
          <span class="no">Digipo No. {{ item.digipo_no }}</span>
          <span class="time">Digipo Maturity Date {{ item.digipo_maturity_date }}</span>
        </div>
        <div class="bottom-table">
          <table
            cellspacing="0"
            cellpadding="0"
            class="row-bottom"
          >
            <tbody>
              <tr>
                <td class="info">
                  <span class="info-title">Transferor</span>
                </td>
                <td>
                  <span>SGD Supplier 24072201</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Digipo Recipient</span
                  >
                </td>
                <td>
                  <span>SGD Supplier 24072204</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Digipo Issuer</span
                  >
                </td>
                <td>
                  <span>HKD Core Firm 24072201</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Digipo Available Amount</span
                  >
                </td>
                <td>
                  <span class="info-content">4,000.00</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Transfer Amount Requested
                  </span>
                </td>
                <td>
                  <span class="info-content">4,000.00</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title">Currency </span>
                </td>
                <td>
                  <span class="info-content">USD</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="right-pdf">这里是pdf</div>
  </div>
  <div class="footer-3">
    <el-checkbox label="I have read and understood all the contracts above. I agree to sign them." v-model="isCheck"/>
    <div>
      <el-button plain>Cancel</el-button>
      <el-button type="primary" @click="next" :disabled="!isCheck">Confirm Signing</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const tableList = ref([
  {
    digipo_no: 1234,
    digipo_maturity_date: 2024-8-20,
  },
]);
const isCheck = ref(false)
const next = () => {
  // 调接口 通过跳转下一步
}
</script>
<style lang="scss" scoped>
.step3 {
  display: flex;
  .left-table {
    width: 50%;
    padding: 20px;
    .box {
      border: 1px solid #86a5f1;
      border-radius: 8px;
      padding: 16px;
      .top-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          color: #8a9baf;
        }
      }
      .bottom-table {
        .row-bottom {
          border: 1px solid #b6beca;
          border-bottom: 0;
          width: 100%;
          margin-top: 12px;
          background: #fff;
          td {
            border-right: 1px solid #b6beca;
            flex: 1;
            border-bottom: 1px solid #b6beca;
            box-sizing: border-box;
          }
        }
        td span {
          display: inline-block;
          margin: 9px 0 9px 16px;
        }
        .info {
          background-color: #d6effb !important;
          .info-title {
            box-sizing: border-box;
            color: #8a9baf;
          }
        }
      }
    }
  }
}
.footer-3 {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -5px 5px 0px rgba(46, 90, 153, 0.1);
  bottom: 0px;
  left: 0px;
  line-height: 64px;
}
:deep(.el-button.is-disabled, .el-button.is-disabled:hover) {
  background-color: #C2C6CC;
}
</style>
