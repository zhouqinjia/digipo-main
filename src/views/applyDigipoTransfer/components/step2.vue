<template>
  <div>
    <div class="invoice-info">
      <div class="label-area">
        <span class="label">Invoice Information</span>
        <div>
          <el-button plain @click="showInvoiceModel">Manually Enter Invoice</el-button>
        </div>
      </div>
      <div class="table-area">
        <el-table :data="tableData" style="width: 98%; margin-top: 24px;">
          <el-table-column type="index" width="50" label="No."/>
          <el-table-column width="180" prop="digiop_no" label="Invoice No." />
          <el-table-column width="180" prop="account_receivable" label="Invoice Code" />
          <el-table-column width="180" prop="financing_agent" label="Currency" />
          <el-table-column width="180" prop="tier_of_digipo_transfer" label="Invoice Amount" />
          <el-table-column width="180" prop="buyer" label="Excluding Tax Amount" />
          <el-table-column width="180" prop="currency" label="Buyer" />
          <el-table-column width="300" prop="account_payable_amount" label="Supplier" />
          <el-table-column width="300" prop="account_payable_maturity_date" label="Invoice Type" />
          <el-table-column width="300" prop="underlying_transaction_contract_name" label="Verification Method" />
          <el-table-column width="300" prop="underlying_transaction_contract_no" label="Verification Result" />
          <el-table-column width="300" prop="account_payable_maturity_date" label="Invoice Issuance Date" />
        </el-table>
      </div>
    </div>
    <el-dialog v-model="showModel" width="700">
      <div>
        <div class="title">
          Manually Enter Invoic
        </div>
        <div class="form">
          <el-form
            ref="formDataRef"
            :model="formData"
            :rules="rules"
            label-width="400"
            class="demo-formData"
            status-icon
            inline
            label-position="top"
          >
            <el-form-item label="Invoice Type" prop="name">
              <el-select
                v-model="formData.invoice_type"
                placeholder="Select"
              >
                <el-option
                  v-for="item in invoiceTypeEnum"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Invoice No." prop="name">
              <el-input v-model="formData.invoice_no" placeholder="Enter"/>
            </el-form-item>
            <el-form-item label="Invoice Issuance Date">
              <el-date-picker
                v-model="formData.invoice_issuance_date"
                type="date"
                placeholder="Select"
                clearable
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
              />
            </el-form-item>
            <el-form-item label="supplier." prop="name">
              <el-input v-model="formData.supplier" placeholder="Enter"/>
            </el-form-item>
            <el-form-item label="buyer" prop="name">
              <el-input v-model="formData.buyer" placeholder="Enter"/>
            </el-form-item>
            <el-form-item label="Currency" prop="region">
              <el-select v-model="formData.currency" placeholder="Select">
                <el-option v-for="item in currencyEnum" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="Invoice Amount" prop="name">
              <el-input v-model="formData.invoice_amount" placeholder="Enter"/>
            </el-form-item>
          </el-form>
        </div>
        <div class="footer">
          <el-button plain @click="closeModel">Cancel</el-button>
          <el-button type="primary" @click="submitData">Confirm</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const tableData = ref([])
const showModel = ref(false)
const formData = ref({
  invoice_Type: null,
  invoice_no: '',
  invoice_issuance_date: '',
  supplier: '',
  buyer: '',
  currency: null,
  invoice_amount: null
})
const rules = ref({})
const invoiceTypeEnum  = ref([
  'Cross-border Invoice', 
  // 'Utilities Invoice', 'Utilities Invoice', 'Utilities Invoice'
])
const currencyEnum = ref(['CNY', 'USD', 'JPY', 'GBP', 'EUR', 'AUD', 'CAD', 'NZD', 'SGD', 'CHF', 'MYR', 'THB', 'HKD', 'CNH', 'SEK', 'DKK', 'NOK', 'MXN', 'VND', 'BRL', 'PHP', 'COP', 'CLP', 'TWD', 'IDR', 'PKR', 'BDT', 'AED'])
const showInvoiceModel = () => {
  showModel.value = true
}
const closeModel = () => {}
const submitData = () => {}
</script>
<style lang="sass" scoped>
.invoice-info {
  margin-top: 20px;
  .label-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      color: #2e5a99;
      font-weight: bold;
    }
  }
}
.el-dialog__body {
  .title {
    font-size: 20px;
    font-weight: 600;
    text-align: CENTER;
    color: #2e5a99;
    line-height: 26px;
    margin-top: 26px;
    margin-bottom: 16px;
  } 
  .form {
    padding: 8px;
    .el-form--inline.el-form--label-top {
      justify-content: space-between;
    }
    .el-form {
      width: 100%;
    }
    .el-form-item {
      flex: 0 0 48%;
      margin-right: 0px;
      :deep(.el-date-editor.el-input) {
        width: 100% !important;
      }
    }
  }
  .footer {
    text-align: center;
  }
}
</style>