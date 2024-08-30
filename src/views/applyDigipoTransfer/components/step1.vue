<template>
  <div class="step1">
    <div class="form">
      <el-form
        ref="formDataRef"
        :model="formData"
        :rules="rules"
        label-width="400"
        class="demo-formData"
        status-icon
        label-position="top"
      >
        <div class="top-input">
          <el-form-item label="Maximum Transferable Amount" prop="name" class>
            <el-input
              v-model="formData.account_payable_amount"
              placeholder="Enter"
              disabled
            />
          </el-form-item>
        </div>
        <div class="bottom-input">
          <el-form-item label="Currency" prop="region">
            <el-select v-model="formData.currency" placeholder="Select" disabled>
              <el-option
                v-for="item in currencyEnum"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Number of Digipo" prop="name">
            <el-input
              v-model="formData.account_payable_amount"
              placeholder="Enter"
              disabled
            />
          </el-form-item>
          <el-form-item label="Transfer Amount Requested" prop="name">
            <el-input
              v-model="formData.account_payable_amount"
              placeholder="Enter"
            />
          </el-form-item>
          <el-form-item label="Digipo Recipient" prop="region">
            <el-select v-model="formData.currency" placeholder="Select">
              <el-option
                v-for="item in digipoRecipientEnum"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Digipo Assignment Purpose">
            <el-input
              v-model="textarea2"
              :autosize="{ minRows: 2, maxRows: 6 }"
              type="textarea"
              placeholder="Please input"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="info">
      <div class="title">Digipo Infomation</div>
      <div class="custom-table">
        <div class="top-info">
          <span>Digipo No. TAS-202408271549</span>
          <span style="color: #8a9baf">Digipo Maturity Date 2024-09-10</span>
        </div>
        <div class="table">
          <div class="grid">
            <div class="label">Digipo Amount:</div>
            <div class="value amount">1234</div>
          </div>
          <div class="grid">
            <div class="label">Currency</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Digipo Issuer</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Buyer</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Guarantor</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Account Receivable No.</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Tier of Digipo Transfer</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Days to Maturity</div>
            <div class="value">1234</div>
          </div>
          <div class="grid">
            <div class="label">Transfer Amount Requested</div>
            <div class="value amount">1234</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const formData = {

} 
const digipoRecipientEnum = ref([])
const currencyEnum = ref(['CNY', 'USD', 'JPY', 'GBP', 'EUR', 'AUD', 'CAD', 'NZD', 'SGD', 'CHF', 'MYR', 'THB', 'HKD', 'CNH', 'SEK', 'DKK', 'NOK', 'MXN', 'VND', 'BRL', 'PHP', 'COP', 'CLP', 'TWD', 'IDR', 'PKR', 'BDT', 'AED'])
</script>
<style lang="sass">
.step1 {
  height: 100%;
  overflow: auto;  
}
.form {
  background-color: #f7fbff;
  border-radius: 8px;
  margin-bottom: 20px;
  .bottom-input {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 24px;
    .el-form-item {
      width: 31%;
      margin-right: 16px;
    }
  }
  .top-input {
    box-sizing: border-box;
    padding: 16px 24px;
    flex: 0 0 100%;
    background: linear-gradient(73.6deg, #1a3966 0.64%, #5285cc 103.68%);
    border-radius: 8px 8px 0px 0px;
    .el-form-item {
      width: 31%;
      margin-right: 16px;
      .el-form-item__label {
        color: #fff;
      }
    }
  }

}
.custom-table {
  background: #f1f5fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 16px;
  .top-info {
    display: flex;
    justify-content: space-between;
  }
  .table {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    margin-top: 8px;
    border-top: 1px solid #d7dce4;
    border-left: 1px solid #d7dce4;
    .grid {
      width: 25%;
      border-right: 1px solid #d7dce4;
      border-bottom: 1px solid #d7dce4;
      padding: 12px;
      box-sizing: border-box;
    }
    .label {
      color: #8a9baf;
      margin-bottom: 4px;
    }
    .amount {
      color: #333;
      font-weight: bold;
    }
  }
}
</style>
