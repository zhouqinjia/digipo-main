<template>
  <el-container>
    <el-header>
      <h2>Pending Tasks(Supplier)</h2>
    </el-header>

    <el-main>
      <el-tabs v-model="activeTab" @tab-change="changeTab">
        <el-tab-pane label="Transaction Review" name="transaction-review">
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
                <template v-slot="{ row }">
                  <el-button v-if="row.status === 'assign'" type="primary" @click="toReview(row)">Review</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Digipo Acknowledgement" name="digipo-acknowledgement">
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
              <template v-slot="{ row }">
                <el-button v-loading="btnLoading" v-if="row.status === 'confirm'" type="primary" @click="confirmToAcknowledge(row)">Acknowledge Digipo</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
      activeTab: "transaction-review",
      digipoIssuanceList: [], // 准备数据源
      digipoSettlementList: [], // 准备数据源
      transactionReviewList: [], // 准备数据源
      dataListOne:[],
      curId:'',
      btnLoading:false
    };
  },
  mounted(){
    this.getTableData("assign")
  },
  methods:{
    confirmToAcknowledge(row){
      this.$confirm("Confirm to Acknowledge?", "Tips", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type:'info'
      }).then(async ()=>{
        this.btnLoading = true
        await supabase
          .from('dg_asset')
          .update({status:"acknowledge"})
          .eq("id",row.id)
        this.btnLoading = false
      }).catch(()=>{}).finally(()=>{
        getTableData("assign")
      })
    },
    changeTab(val){
      if(val){
        switch(val){
          case 'transaction-review':
            this.getTableData("assign")
            break;
          case 'digipo-acknowledgement':
            this.getTableData("confirm")
            break;
          default:
            break;  
        }
      }
    },
    async getTableData(type){
      this.dataListOne = []
      try {
        this.loading = true
        let { data, error } = await supabase
          .from('dg_asset')
          .select('*')
          .eq("status",type)
        if(!error) {
          this.dataListOne = data
        }  
      } finally {
        this.loading = false
      }
           
    },
    toReview(row) {
      console.log(row)
      this.$router.push({
        path: "/supplierReview",
        query:{
          id:row.id
        }
      })
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