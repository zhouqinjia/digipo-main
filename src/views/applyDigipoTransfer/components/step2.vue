<template>
  <div>
    <div class="contract-info">
      
    </div>
    <div class="invoice-info">
      <div class="label-area">
        <span class="label">Invoice Information</span>
        <div>
          <el-button plain @click="showInvoiceModel">Manually Enter Invoice</el-button>
        </div>
      </div>
      <div v-loading="loading" class="table-area">
        <el-table :data="invoiceList" style="width: 98%; margin-top: 24px;">
          <el-table-column type="index" width="50" label="No."/>
          <el-table-column width="180" prop="invoice_no" label="Invoice No." />
          <el-table-column width="180" prop="currency" label="Currency" />
          <el-table-column width="180" prop="invoice_amount" label="Invoice Amount" />
          <el-table-column width="180" prop="buyer_name" label="Buyer" />
          <el-table-column width="180" prop="supplier_name" label="Supplier" />
          <el-table-column width="180" prop="invoice_type" label="Invoice Type" />
          <!-- <el-table-column width="180" prop="verification_result" label="Verification Result" /> -->
          <el-table-column width="180" prop="issuance_date" label="Invoice Issuance Date">
            <template v-slot="{ row }">
              {{ row.issuance_date.slice(0,10) }}
            </template>
          </el-table-column>
          <el-table-column width="180" label="Upload File">
            <template v-slot="{row}">
              <template v-if="row.fileList.length">
                <div v-for="file in row.fileList" :key="file.name">
                  <el-button type="text" class="file-name" @click="downLoadFile($event,row.invoice_no,file.name)">
                    {{ file.name || '-' }}
                  </el-button>
                </div>
              </template>
              <template v-else>
                <div>-</div>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      title="Add Invoice"
      v-model="showModel"
      width="40%"
      @close="showModel = false"
      class="add-invoice-dialog"
      center
      :close-on-click-modal="false"
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
            <el-select style="width: 300px"  v-model="addInvoiceFormData.currency" placeholder="Please select">
              <el-option
                v-for="item in currencyEnum"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Invoice Amount">
            <el-input v-model="addInvoiceFormData.invoice_amount"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <!-- 使用 input[type="file"] 元素进行文件选择 -->
        <input type="file" ref="fileInput" style="display: none" @change="handleFileChange" />
        <!-- 通过按钮触发文件选择 -->
        <button v-loading="uploading" class="action-button" @click="triggerFileInput(false)">Upload File</button>
        <!-- 新增显示文件列表的无序列表 -->
        <ul class="file-list">
          <li v-for="file in files" :key="file.id">
            {{ file.name }}
          </li>
        </ul>
      </div>
      <template #footer>
        <el-button @click="showModel = false">Cancel</el-button>
        <el-button type="primary" @click="submitInvoice">Submit</el-button>
      </template>
    </el-dialog>
    <div class="footer">
      <el-button @click="back">Back</el-button>
      <el-button @click="back">Previous</el-button>
      <el-button type="primary" @click="next">Confirm Transfer</el-button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from "vue-router"
import supabase from '@/utils/supabase'
import { BUCKETNAME,FILEFOLDERPREFIX} from "@/utils/const"
const route = useRoute()
const tableData = ref([])
const showModel = ref(false)
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
const invoiceList = ref([])
const rules = ref({})
const invoiceTypeEnum  = ref([
  'Cross-border Invoice', 
  // 'Utilities Invoice', 'Utilities Invoice', 'Utilities Invoice'
])
const loading = ref(false)
const currencyEnum = ref(['CNY', 'USD', 'JPY', 'GBP', 'EUR', 'AUD', 'CAD', 'NZD', 'SGD', 'CHF', 'MYR', 'THB', 'HKD', 'CNH', 'SEK', 'DKK', 'NOK', 'MXN', 'VND', 'BRL', 'PHP', 'COP', 'CLP', 'TWD', 'IDR', 'PKR', 'BDT', 'AED'])
const showInvoiceModel = () => {
  showModel.value = true
}
const closeModel = () => {
  showModel.value = false
}
const submitData = () => {}
const emit = defineEmits(['sendNextStep'])
const prop = defineProps(['supplierId'])
const files = ref([])
const fileInput = ref(null)
const suppliers = ref([])
const buyers = ref([])
const uploading = ref(false)
const back = () => {
  emit('sendNextStep', 1)
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
const next = () => {
  if (invoiceList.value.length === 0) {
    ElMessage({
      message: 'Invoice information of the current digipo must be filled and cannot be empty.',
      type: 'error'
    })
  } else {
    // 调接口 通过跳转下一步
    emit('sendNextStep', 3)
  }
}
const getInvoiceListBySupplierId = async ()=>{
  try {
    if(!route.query.id) return
    loading.value = true
    let { data: dg_invoices, error } = await supabase
      .from('dg_invoice')
      .select('*')
      .eq("creator_id",route.query.id)
    if (!error) {
      for(let item of dg_invoices){
        if(item.invoice_no){
          const {error,data} = await supabase.storage.from(BUCKETNAME).list(FILEFOLDERPREFIX + item.invoice_no)
          if (error) {
            item.fileList = {}
          } else {
            item.fileList = data
          }
        }
      }
      invoiceList.value = dg_invoices
    }   
  } finally {
    loading.value = false
  }
}
const submitInvoice = async () => {
  try {
    addInvoiceFormData.value.supplier_id = suppliers.value.find(s=>s.value === addInvoiceFormData.value.supplier_name).id || ''
    addInvoiceFormData.value.buyer_id = buyers.value.find(b=>b.value === addInvoiceFormData.value.buyer_name).id || ''
    addInvoiceFormData.value.creator_id = route.query.id || ''
    let {  error } = await supabase
    .from('dg_invoice')
    .insert([addInvoiceFormData.value])
    .select()
  } catch (error) {
    console.log(error)
  } finally {
    showModel.value = false
    getInvoiceListBySupplierId()
  }
};
// 文件上传
const triggerFileInput = ()=>{
  fileInput.value.click()
}

const handleFileChange = (e)=>{
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    uploadFile(selectedFile)
  }
  fileInput.value.value = ''
}
const uploadFile = async (file)=>{
  uploading.value = true
  const { data, error } = await supabase.storage.from(BUCKETNAME)
    .upload(`${FILEFOLDERPREFIX + addInvoiceFormData.value.invoice_no}/${file.name}`, file)
  if (error) {
    console.error('文件上传失败', error.message)
  } else {
    console.log('文件上传成功', data)
    await getFiles()
  }
  uploading.value = false
}
const getFiles = async ()=>{
  const { data, error } = await supabase.storage.from(BUCKETNAME).list(FILEFOLDERPREFIX + addInvoiceFormData.value.invoice_no);
  if (error) {
    console.error('获取文件列表失败', error.message);
  } else {
    files.value = data;
  }
}
const downLoadFile = async (e,no,fileName)=>{
  if(!no || !fileName) return
  const { data, error } = await supabase.storage.from(BUCKETNAME)
      .download(`${FILEFOLDERPREFIX + no}/${fileName}`)
  if (error) {
    console.error('文件下载失败', error.message)
  } else {
    const blob = new Blob([data])
    const link = document.createElement("a")
    link.download = fileName
    link.style.display = "none"
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  }
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
  .footer {
    text-align: center;
  }
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