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
    <el-table :data="tableData" style="width: 98%; margin-top: 24px;" v-loading="loading">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column type="index" width="50" label="No."/>
      <!-- <el-table-column prop="date" label="Accounts Payable No." width="180" />
      <el-table-column prop="name" label="Transaction Reference" width="180" /> -->
      <el-table-column width="180" prop="supplier" label="Supplier" />
      <el-table-column width="180" prop="buyer" label="Buyer" />
      <el-table-column width="180" prop="currency" label="Currency" />
      <el-table-column width="300" prop="account_payable_amount" label="Account Payable Amount" />
      <el-table-column width="300" prop="account_payable_maturity_date" label="Accounts Payable Maturity Date">
        <template v-slot="{row}">
          <div>{{row.account_payable_maturity_date.slice(0,10)}}</div>
        </template>
      </el-table-column>
      <el-table-column width="300" prop="underlying_transaction_contract_name" label="Underlying Transaction Contract Name" />
      <el-table-column width="300" prop="underlying_transaction_contract_no" label="Underlying Transaction Contract No." />
      <el-table-column fixed="right" label="Action" min-width="120">
        <template #default="scope">
          <el-button
            text
            type="primary"
            size="small"
            @click.prevent="deleteAsset(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
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
              <el-select
                v-model="supplierObj"
                placeholder="Select"
              >
                <el-option
                  v-for="item in supplierEnum"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Buyer" prop="name">
              <el-select
                v-model="buyerObj"
                placeholder="Select"
              >
                <el-option
                  v-for="item in buyerEnum"
                  :key="item.id"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="Payment by Affiliate" prop="resource">
              <el-radio-group v-model="formData.payment_by_affilliate">
                <el-radio :value="false">No</el-radio>
                <el-radio :value="true">Yes</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Currency" prop="region">
              <el-select v-model="formData.currency" placeholder="Select">
                <el-option v-for="item in currencyEnum" :key="item" :label="item" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="Accounts Payable Amount" prop="name">
              <el-input v-model="formData.account_payable_amount" placeholder="Enter"/>
            </el-form-item>
            <el-form-item label="Accounts Payable Maturity Date">
              <el-date-picker
                v-model="formData.account_payable_maturity_date"
                type="date"
                placeholder="Select"
                clearable
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
              />
            </el-form-item>
            <el-form-item label="Underlying Transaction Contract Name" prop="name">
              <el-input v-model="formData.underlying_transaction_contract_name" placeholder="Enter"/>
            </el-form-item>
            <el-form-item label="Underlying Transaction Contract No." prop="name">
              <el-input v-model="formData.underlying_transaction_contract_no" placeholder="Enter"/>
            </el-form-item>
            <el-form-item label="Signing Date of Basic Transaction Contract">
              <el-date-picker
                v-model="formData.sign_date"
                type="date"
                placeholder="Select"
                clearable
                format="YYYY-MM-DD"
                value-format="YYYY/MM/DD"
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
import { ElMessage } from 'element-plus'
import supabase from '../../utils/supabase.js'
const origin = {
  supplier_id: '',
  buyer_id: '',
  supplier: '',
  buyer: '',
  payment_by_affilliate: null,
  currency: '',
  account_payable_amount: null,
  account_payable_maturity_date: null,
  underlying_transaction_contract_name: '',
  underlying_transaction_contract_no: '',
  sign_date: null,
}
const tableData = ref([])
const loading = ref(false)
const currencyEnum = ref(['CNY', 'USD', 'JPY', 'GBP', 'EUR', 'AUD', 'CAD', 'NZD', 'SGD', 'CHF', 'MYR', 'THB', 'HKD', 'CNH', 'SEK', 'DKK', 'NOK', 'MXN', 'VND', 'BRL', 'PHP', 'COP', 'CLP', 'TWD', 'IDR', 'PKR', 'BDT', 'AED'])
const buyerEnum = ref([])
const supplierEnum = ref([])
const showModel = ref(false)
const supplierObj = ref(null)
const buyerObj = ref(null)
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

const getBuyerEnum = async () => {
  
  let { data: dg_buyer, error } = await supabase
  .from('dg_buyer')
  .select('*')
  if (!error) {
    buyerEnum.value = dg_buyer
  }    
}

const getSupplierEnum = async () => {
  
  let { data: dg_supplier, error } = await supabase
  .from('dg_supplier')
  .select('*')
  if (!error) {
    supplierEnum.value = dg_supplier
  }    
}

const getTableData = async () => {
  loading.value = true
  let { data, error } = await supabase
  .from('dg_asset')
  .select('*')
  if(!error) {
    tableData.value = data
    loading.value = false
  }
          
}
const submitData = async () => {
  const { data, err } = await supabase.from('dg_asset').insert([{
    ...formData.value,
    account_payable_amount: formData.value.account_payable_amount*1,
    supplier_id: supplierObj.value?.id,
    supplier: supplierObj.value?.name,
    buyer_id: buyerObj.value?.id,
    buyer: buyerObj.value?.name,
    status:'issued'
  }])
  if (!err) {
    ElMessage({
      message: 'Add Success.',
      type: 'success'
    })
    closeModel()
    getTableData()
  }
}
const deleteAsset = async (row) => {
  const { error } = await supabase
  .from('dg_asset')
  .delete()
  .eq('id', row.id)
  if (!error) {
    ElMessage({
      message: 'Delete Success.',
      type: 'success'
    })
    getTableData()
  }  
}
getTableData()
getBuyerEnum()
getSupplierEnum()
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