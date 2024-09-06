<template>
  <div class="step3">
    <div class="left-table">
      <div class="box" v-for="(item, index) in tableList" :key="index">
        <div class="top-info">
          <span class="no">Digipo No. {{ item.digipo_no }}</span>
          <span class="time">Digipo Maturity Date {{ (item.account_payable_maturity_date + '').slice(0,10) || '' }}</span>
        </div>
        <div class="bottom-table">
          <table
            cellspacing="0"
            cellpadding="0"
            class="row-bottom"
          >
            <tbody>
              <tr>
                <td class="info">
                  <span class="info-title">Transferor</span>
                </td>
                <td>
                  <span>SGD Supplier 24072201</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Digipo Recipient</span
                  >
                </td>
                <td>
                  <span>{{ item.digipo_Recipient || '' }}</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Digipo Issuer</span
                  >
                </td>
                <td>
                  <span>HKD Core Firm 24072201</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Digipo Available Amount</span
                  >
                </td>
                <td>
                  <span class="info-content">{{ item.account_payable_amount || '-' }}</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title"
                    >Transfer Amount Requested
                  </span>
                </td>
                <td>
                  <span class="info-content">4,000.00</span>
                </td>
              </tr>
              <tr>
                <td class="info">
                  <span class="info-title">Currency </span>
                </td>
                <td>
                  <span class="info-content">{{ item.currency }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-3">
    <el-checkbox label="I have read and understood all the contracts above. I agree to sign them." v-model="isCheck"/>
    <div>
      <el-button plain @click="goBack">Cancel</el-button>
      <el-button type="primary" @click="next" :disabled="!isCheck">Confirm Signing</el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter,useRoute } from "vue-router"
import { ref } from 'vue';
import supabase from "@/utils/supabase";
const emit = defineEmits(['sendNextStep'])
const tableList = ref([]);
const router = useRouter()
const route = useRoute()
const isCheck = ref(false)
const next = async () => {
  const { data,error } = await supabase
    .from("dg_asset")
    .update({status:"completed"})
    .eq("id",route.query.id)
  if(!error){
    emit('sendNextStep', 4)
  }
}
const goBack = () => {
  emit('sendNextStep', 2)
}
const getStepOneData = async ()=>{
  const id = route.query.id
  const {data,error} = await supabase.from("dg_asset").select("*").eq("id",id)
  if(!error && data.length){
    tableList.value = data
    emit("setSupplierId",tableList.value[0].supplier_id || '')
  }
}
getStepOneData()
</script>
<style lang="scss" scoped>
.step3 {
  display: flex;
  justify-content: center;
  .left-table {
    width: 50%;
    padding: 20px;
    .box {
      border: 1px solid #86a5f1;
      border-radius: 8px;
      padding: 16px;
      .top-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .time {
          color: #8a9baf;
        }
      }
      .bottom-table {

        .row-bottom {
          border: 1px solid #b6beca;
          border-bottom: 0;
          width: 100%;
          margin-top: 12px;
          background: #fff;
          td {
            border-right: 1px solid #b6beca;
            flex: 1;
            border-bottom: 1px solid #b6beca;
            box-sizing: border-box;
          }
        }
        td span {
          display: inline-block;
          margin: 9px 0 9px 16px;
        }
        .info {
          background-color: #d6effb !important;
          .info-title {
            box-sizing: border-box;
            color: #8a9baf;
          }
        }
      }
    }
  }
}
.footer-3 {
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -5px 5px 0px rgba(46, 90, 153, 0.1);
  bottom: 0px;
  left: 0px;
  line-height: 64px;
}
:deep(.el-button.is-disabled, .el-button.is-disabled:hover) {
  background-color: #C2C6CC;
}
</style>
