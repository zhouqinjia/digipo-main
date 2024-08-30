<template>
  <div>
    <div class="page-title">
      <span class="title">Issue Digipo</span>
      <div>
        <el-button plain @click="showAddModel">Add</el-button>
      </div>
    </div>
    <div class="search-area">
    </div>
    <el-table :data="tableData" style="width: 98%; margin-top: 24px;">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="50" label="No."/>
      <!-- <el-table-column prop="date" label="Accounts Payable No." width="180" />
      <el-table-column prop="name" label="Transaction Reference" width="180" /> -->
      <el-table-column width="180" prop="supplier" label="Supplier" />
      <el-table-column width="180" prop="buyer" label="Buyer" />
      <el-table-column width="180" prop="currency" label="Currency" />
      <el-table-column width="300" prop="account_payable_amount" label="Account Payable Amount" />
      <el-table-column width="300" prop="account_payable_maturity_date" label="Accounts Payable Maturity Date" />
      <!-- <el-table-column width="180" prop="address" label="Paying Entity" />
      <el-table-column width="300" prop="address" label="Functional Department" />
      <el-table-column width="180" prop="address" label="Digipo Status" />
      <el-table-column width="180" prop="address" label="Financing Agent" />
      <el-table-column width="180" prop="address" label="Invoice Amount" />
      <el-table-column width="180" prop="address" label="Acceptance Date" />
      <el-table-column width="180" prop="address" label="Guarantor" />
      <el-table-column width="180" prop="address" label="Latest Operator" />
      <el-table-column width="180" prop="address" label="Creator" />
      <el-table-column width="180" prop="address" label="Creation Time" /> -->
      <el-table-column width="300" prop="underlying_transaction_contract_name" label="Underlying Transaction Contract Name" />
      <el-table-column width="300" prop="underlying_transaction_contract_no" label="Underlying Transaction Contract No." />
      <el-table-column width="300" prop="account_payable_maturity_date" label="Underlying Transaction Date" />
    </el-table>

    <el-dialog v-model="showModel" width="700">
      <div>
        <div class="title">
          Add
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
            <el-form-item label="Supplier" prop="name">
              <el-input v-model="formData.supplier" />
            </el-form-item>
            <el-form-item label="Buyer" prop="name">
              <el-input v-model="formData.buyer" />
            </el-form-item>
            <el-form-item label="Payment by Affiliate" prop="resource">
              <el-radio-group v-model="formData.payment_by_affilliate">
                <el-radio :value="false">NO</el-radio>
                <el-radio :value="true">YES</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Currency" prop="region">
              <el-select v-model="formData.currency" placeholder="Activity zone">
                <el-option v-for="item in currencyEnum" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="Accounts Payable Amount" prop="name">
              <el-input v-model="formData.account_payable_amount" />
            </el-form-item>
            <el-form-item label="Accounts Payable Maturity Date">
              <el-date-picker
                v-model="formData.account_payable_maturity_date"
                type="date"
                placeholder="Pick a date"
                clearable
                format="YYYY-MM-DD"
                value-format="x"
              />
            </el-form-item>
            <el-form-item label="Underlying Transaction Contract Name" prop="name">
              <el-input v-model="formData.underlying_transaction_contract_name" />
            </el-form-item>
            <el-form-item label="Underlying Transaction Contract No." prop="name">
              <el-input v-model="formData.underlying_transaction_contract_no" />
            </el-form-item>
            <el-form-item label="Signing Date of Basic Transaction Contract">
              <el-date-picker
                v-model="formData.sign_date"
                type="date"
                placeholder="Pick a date"
                clearable
                format="YYYY-MM-DD"
                value-format="x"
              />
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
import supabase from '../../utils/supabase.js'
const origin = {
  supplier: '',
  buyer: '',
  payment_by_affilliate: '',
  currency: '',
  account_payable_amount: '',
  account_payable_maturity_date: '',
  underlying_transaction_contract_name: '',
  underlying_transaction_contract_no: '',
  sign_date: '',
}
const tableData = ref([])
const currencyEnum = ref(['CNY', 'USD', 'JPY', 'GBP', 'EUR', 'AUD', 'CAD', 'NZD', 'SGD', 'CHF', 'MYR', 'THB', 'HKD', 'CNH', 'SEK', 'DKK', 'NOK', 'MXN', 'VND', 'BRL', 'PHP', 'COP', 'CLP', 'TWD', 'IDR', 'PKR', 'BDT', 'AED'])
const showModel = ref(false)
const formData = ref({
  ...origin
})
const rules = ref({})
const showAddModel = () => {
  showModel.value = true
}
const closeModel = () => {
  formData.value = {
    ...origin
  }
  showModel.value = false
}
const getTableData = async () => {
  
  let { data, error } = await supabase
  .from('dg_asset')
  .select('*')
  if(!error) {
    tableData.value = data
  }
          
}
const submitData = async () => {
  const { data, err } = await supabase.from('dg_asset').insert([{
    ...formData.value,
    account_payable_amount: formData.value.account_payable_amount*1
  }])
}

getTableData()
</script>

<style lang="sass" scoped>
  .page-title {
    .title {
      font-size: 20px;
      font-weight: 600;
      color: #2e5a99;
    }
    .el-button {
      border-color: #2E5A99;
      color: #2E5A99;
      padding: 8px 23px;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
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