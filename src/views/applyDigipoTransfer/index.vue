<template>
  <div>
    <div class="page-title">
      <span class="title">Apply Digipo Transfer</span>
    </div>
    <div class="search-area">
    </div>
    <el-table :data="tableData" style="width: 98%; margin-top: 24px;" v-loading="loading">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column type="index" width="50" label="No."/>
      <el-table-column width="180" prop="digiop_no" label="Digipo No." />
      <el-table-column width="180" prop="account_receivable" label="Account Receivable" />
      <el-table-column width="180" prop="financing_agent" label="Financing Agent" />
      <el-table-column width="250" prop="tier_of_digipo_transfer" label="Tier of Digipo Transfer" />
      <el-table-column width="180" prop="buyer" label="Buyer" />
      <el-table-column width="180" prop="currency" label="Currency" />
      <el-table-column width="300" prop="account_payable_amount" label="Account Payable Amount" />
      <el-table-column width="300" prop="account_payable_maturity_date" label="Accounts Payable Maturity Date" />
      <el-table-column width="300" prop="underlying_transaction_contract_name" label="Underlying Transaction Contract Name" />
      <el-table-column width="300" prop="underlying_transaction_contract_no" label="Underlying Transaction Contract No." />
      <el-table-column width="300" prop="account_payable_maturity_date" label="Underlying Transaction Date" />
      <el-table-column fixed="right" label="Action" min-width="120">
        <template #default="scope">
          <!-- v-if="scope.row.status === 'acknowledge'" -->
          <el-button
            plain
            type="primary"
            size="small"
            @click="transfer(scope.row)"
          >
            Transfer
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import supabase from '../../utils/supabase.js'
const tableData = ref([])
const loading = ref(false)

const vm = getCurrentInstance()?.proxy
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
const transfer = () => {
  vm.$router.push('/transferDetail')
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
</style>