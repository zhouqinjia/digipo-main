<template>
  <el-container>
    <el-header class="header">
      <el-icon @click="goBack"><ArrowLeft /></el-icon>
      <h2 style="margin-left: 20px; font-weight: bold;">Review</h2>
    </el-header>

    <el-main>
      <div class="info-header">
        <h3 class="title">Invoice Information</h3>
        <el-button type="primary">Add</el-button>
      </div>
      <el-table :data="invoiceList" style="margin-top: 20px;">
        <el-table-column type="index" label="No." width="50" />
        <el-table-column prop="invoiceNo" label="Invoice No." />
        <el-table-column prop="invoiceCode" label="Invoice Code" />
        <el-table-column prop="currency" label="Currency" />
        <el-table-column prop="invoiceAmount" label="Invoice Amount" />
        <el-table-column prop="excludingTaxAmount" label="Excluding Tax Amount" />
        <el-table-column prop="buyer" label="Buyer" />
        <el-table-column prop="supplier" label="Supplier" />
        <el-table-column prop="invoiceType" label="Invoice Type" />
        <el-table-column prop="verificationMethod" label="Verification Method" />
        <el-table-column prop="verificationResult" label="Verification Result" />
        <el-table-column prop="invoiceIssuanceDate" label="Invoice Issuance Date" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"
const router = useRouter()
const invoiceList = ref([
  // 示例数据
  {
    invoiceNo: 'INV-001',
    invoiceCode: 'CODE-001',
    currency: 'USD',
    invoiceAmount: '1000',
    excludingTaxAmount: '800',
    buyer: 'Buyer 1',
    supplier: 'Supplier 1',
    invoiceType: 'Standard',
    verificationMethod: 'Manual',
    verificationResult: 'Verified',
    invoiceIssuanceDate: '2023-01-01'
  },
  // 更多数据...
]);

function goBack() {
  router.go(-1)
}

function handleAction(row) {
  console.log('Action clicked for row:', row);
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  i {
    cursor: pointer;
  }
  
}
.info-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>