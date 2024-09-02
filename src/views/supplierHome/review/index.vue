<template>
  <el-container>
    <el-header class="header">
      <el-icon @click="goBack"><ArrowLeft /></el-icon>
      <h2 style="margin-left: 20px; font-weight: bold;">Review</h2>
    </el-header>
    <div v-loading="loading">
      <el-main>
        <div class="info-header">
          <h3 class="title">Invoice Information</h3>
          <el-button type="primary" @click="openAddInvoiceDialog">Add Invoice</el-button>
        </div>
        <el-table :data="invoiceList" style="margin-top: 20px;">
          <el-table-column type="index" label="No." width="50" />
          <el-table-column prop="invoice_no" label="Invoice No." />
          <el-table-column prop="currency" label="Currency" />
          <el-table-column prop="invoice_amount" label="Invoice Amount" />
          <el-table-column prop="buyer_name" label="Buyer" />
          <el-table-column prop="supplier_name" label="Supplier" />
          <el-table-column prop="invoice_type" label="Invoice Type" />
          <el-table-column prop="issuance_date" label="Invoice Issuance Date" >
            <template v-slot="{ row }">
              {{ row.issuance_date.slice(0,10) }}
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
    <div class="footer">
      <el-button type="primary" plain @click="goBack">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit">Submit</el-button>
    </div>
  </el-container>
  <el-dialog
    title="Add Invoice"
    v-model="addInvoiceDialogVisible"
    width="40%"
    @close="addInvoiceDialogVisible = false"
    class="add-invoice-dialog"
    center
  >
    <div class="form">
      <el-form ref="addInvoiceForm" :model="addInvoiceFormData">
        <el-form-item label="Invoice Type">
          <el-input v-model="addInvoiceFormData.invoice_type"></el-input>
        </el-form-item>
        <el-form-item label="Invoice No">
          <el-input v-model="addInvoiceFormData.invoice_no"></el-input>
        </el-form-item>
        <el-form-item label="Invoice Issuance Date">
          <el-date-picker
            style="width:300px"
            v-model="addInvoiceFormData.issuance_date"
            type="date"
            placeholder="Pick a date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Supplier">
          <el-select style="width: 300px" v-model="addInvoiceFormData.supplier_name" placeholder="Please select">
            <el-option
              v-for="item in suppliers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Buyer">
          <el-select style="width: 300px" v-model="addInvoiceFormData.buyer_name" placeholder="Please select">
            <el-option
              v-for="item in buyers"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Currency">
          <el-input v-model="addInvoiceFormData.currency"></el-input>
        </el-form-item>
        <el-form-item label="Invoice Amount">
          <el-input v-model="addInvoiceFormData.invoice_amount"></el-input>
        </el-form-item>
      </el-form>
    
    </div>
    <template #footer>
      <el-button @click="addInvoiceDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="submitInvoice">Submit</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter,useRoute } from "vue-router"
import supabase from '@/utils/supabase.js'
const router = useRouter()
const route = useRoute()
const invoiceList = ref([]);
const addInvoiceDialogVisible = ref(false)
const addInvoiceFormData = ref({
  invoice_type: '',
  invoice_no: '',
  issuance_date: '',
  supplier_name: '',
  buyer_name: '',
  currency: '',
  invoice_amount: '',
  supplier_id:'',
  buyer_id:''
})
const loading = ref(false)
const suppliers = ref([])
const buyers = ref([])

const getInvoiceListBySupplierId = async ()=>{
  try {
    if(!route.query.id) return
    loading.value = true
    let { data: dg_invoices, error } = await supabase
      .from('dg_invoice')
      .select('*')
      .eq("supplier_id",route.query.id)
    if (!error) {
      invoiceList.value = dg_invoices
    }   
  } finally {
    loading.value = false
  }
   
}
const handleSubmit = async ()=>{
  try {
    loading.value = true
    let { data: dg_invoices, error } = await supabase
      .from("dg_asset")
      .update({ status: "submit" })
      .eq("id",route.query.id)
    if (!error) {
      goBack()
    }
  } finally {
    loading.value = false
    goBack()
  }
  
}
const getBuyerEnum = async () => {
  let { data: dg_buyer, error } = await supabase
  .from('dg_buyer')
  .select('*')
  if (!error) {
    buyers.value = dg_buyer.map(item=>({ 
      value:item.name,
      label:item.name,
      id:item.id
    }))
  }    
}

const getSupplierEnum = async () => {
  let { data: dg_supplier, error } = await supabase
  .from('dg_supplier')
  .select('*')
  if (!error) {
    suppliers.value = dg_supplier.map(item=>({ 
      value:item.name,
      label:item.name,
      id:item.id
    }))
  }    
}
const goBack = ()=>{
  router.go(-1)
}
const openAddInvoiceDialog = ()=>{
  addInvoiceDialogVisible.value = true
}
const submitInvoice = async () => {
  try {
    addInvoiceFormData.value.supplier_id = suppliers.value.find(s=>s.value === addInvoiceFormData.value.supplier_name).id || ''
    addInvoiceFormData.value.buyer_id = buyers.value.find(b=>b.value === addInvoiceFormData.value.buyer_name).id || ''
    let { data: dg_invoices, error } = await supabase
    .from('dg_invoice')
    .insert([addInvoiceFormData.value])
    .select()
  } catch (error) {
    console.log(error)
  } finally {
    addInvoiceDialogVisible.value = false
    getInvoiceListBySupplierId()
  }
};
function handleAction(row) {
  console.log('Action clicked for row:', row);
}
// 页面初始化
getInvoiceListBySupplierId()
getBuyerEnum()
getSupplierEnum()
</script>
<style lang="scss">
.add-invoice-dialog {
  max-width:680px ;
}
</style>
<style lang="scss" scoped>

.header{
  display: flex;
  align-items: center;
  i {
    cursor: pointer;
  }
}
.footer{
  display: flex;
  justify-content: center;
}
.info-header{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form {
  display:flex;
  justify-content:center;
  align-items:center;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-form-item {
    display:flex;
    flex-direction: column;
    align-items:flex-start;
    flex: 0 0 48%;
    :deep(.el-date-editor.el-input) {
      width: 100% !important;
    }
    :deep(.el-input__wrapper) {
      width:278px !important;
    }
    .el-input {
      width:300px
    }
  }
}

  
</style>