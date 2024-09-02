<template>
  <el-container>
    <el-header>
      <h2>Pending Tasks(Core)</h2>
    </el-header>

    <el-main>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Digipo Issuance" name="digipo-issuance">
          <div v-loading="loading" style="margin-top: 20px;">
            <el-table :data="dataListOne">
              <el-table-column
                width="50"
                key="no"
                type="index"
                label="No."
              ></el-table-column>
              <el-table-column
                key="Supplier"
                prop="supplier"
                label="Supplier"
              ></el-table-column>
              <el-table-column
                key="Buyer"
                prop="buyer"
                label="Buyer"
              ></el-table-column>
              <el-table-column
                key="Currency"
                prop="currency"
                label="Currency"
              ></el-table-column>
              <el-table-column
                key="Accounts Payable Amount"
                prop="account_payable_amount"
                label="Accounts Payable Amount"
              ></el-table-column>
              <el-table-column
                key="Digipo Maturity Date"
                prop="account_payable_maturity_date"
                label="Digipo Maturity Date"
              >
                <template v-slot="{ row }">
                  <div>
                    {{ row.account_payable_maturity_date.slice(0,10)}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                key="Status"
                prop="status"
                label="Status"
              ></el-table-column>
              <!-- 添加操作列 -->
              <el-table-column label="Action">
                <template v-slot="scope">
                  <el-button v-if="scope.row.status === 'issued'" type="primary" @click="openDialog(scope.row)">Issue Digipo</el-button>
                  <el-button v-else-if="scope.row.status === 'submit'" type="primary" @click="acceptPayable(scope.row)">Accept Payable</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane disabled label="Digipo Settlement" name="digipo-settlement">

        </el-tab-pane>
        <el-tab-pane disabled label="Transaction Review" name="transaction-review">

        </el-tab-pane>
      </el-tabs>
      <!-- 添加对话框 -->
      <el-dialog
        title="Issue Digipo"
        v-model="dialogVisible"
        width="30%"
        @close="dialogVisible = false"
      >
        <span>Confirm to Issue Digipo?</span>
        <template #footer>
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm">Confirm</el-button>
        </template>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import supabase from '@/utils/supabase.js'
export default {
  data() {
    return {
      loading:false,
      dialogVisible:false,
      activeTab: "digipo-issuance",
      digipoIssuanceList: [], // 准备数据源
      digipoSettlementList: [], // 准备数据源
      transactionReviewList: [], // 准备数据源
      colNameList:{
        'Account Payable No':'',
        'Supplier':'',
        'Buyer':'',
        'Functional Department':'',
        'Currency':'',
        'Accounts Payable Amount':'',
        'Digipo Maturity Date':'',
        'Acceptance Date':''
      },
      dataListOne:[],
      curId:'',
    };
  },
  mounted(){
    this.getTableData()
  },
  methods:{
    async getTableData(){
      try {
        this.loading = true
        let { data, error } = await supabase
          .from('dg_asset')
          .select('*')
          .in("status",["issued","submit"])
        if(!error) {
          this.dataListOne = data
        }  
      } finally {
        this.loading = false
      }
           
    },
    async acceptPayable(row){
      try {
        this.loading = true
        let { error } = await supabase
          .from('dg_asset')
          .update({ status: "confirm" })
          .eq("id",row.id)
          if(!error){
            this.loading = false
            this.getTableData()
          }
      } finally {
        this.loading = false
      }
    },
    openDialog(row) {
      this.dialogVisible = true;
      this.curId = row.id
      this.currentRow = row;
    },
    async handleConfirm() {
      // 变更状态
      let { data, error } = await supabase
        .from('dg_asset')
        .update({ status: "assign" })
        .eq("id", this.curId)
      if(!error){
        this.dialogVisible = false;
        // 刷新表格数据
        this.getTableData()
      }
    },
  }
};
</script>

<style scoped>
  .search-input {
    width: 200px;
    text-align: left;
    margin-left: 15px;
  }

  .align-left {
    display: flex;
  }

  .align-left button {
    margin-left: 20px;
  }
</style>