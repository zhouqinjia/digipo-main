<template>
  <el-container>
    <el-header>
      <h2>Pending Tasks(Supplier)</h2>
    </el-header>

    <el-main>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Transaction Review" name="transaction-review">
          <div v-loading="loading" style="margin-top: 20px;">
            <el-table :data="dataListOne">
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
              <!-- 添加操作列 -->
              <el-table-column label="Action">
                <template v-slot="scope">
                  <el-button type="primary" @click="toReview(scope.row)">Review</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane disabled label="Digipo Settlement" name="digipo-settlement">

        </el-tab-pane>
        <el-tab-pane disabled label="Digipo Issuance" name="digipo-issuance">

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
      curId:''
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
          .eq("status","assign")
        if(!error) {
          this.dataListOne = data
        }  
      } finally {
        this.loading = false
      }
           
    },
    toReview(row) {
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