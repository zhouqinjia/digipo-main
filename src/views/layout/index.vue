<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <el-dropdown placement="bottom-start">
          <div class="name"> 
            <span>userName</span> 
            <ArrowDown style="width: 16px; height: 16px;"/>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">Logout </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/home"
            class="el-menu-vertical-demo"
            :router="true"
          >
            <el-menu-item index="/issueDigipo">
              <el-icon><document /></el-icon>
              <span>Issue Digipo</span>
            </el-menu-item>
            <el-menu-item index="/home">
              <el-icon><document /></el-icon>
              <span>Core Home</span>
            </el-menu-item>
            <el-menu-item index="/supplierHome">
              <el-icon><document /></el-icon>
              <span>Supplier Home</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useRoute,useRouter } from "vue-router"
import supabase from '../../utils/supabase.js'
import { ElMessage } from 'element-plus'
import { getCurrentInstance } from 'vue'
const route = useRoute()
const router = useRouter()
onMounted(()=>{
  initRouter()
})
const initRouter = ()=>{
  const { path } = route
  if(path){
    router.push(path)
  }
}

const vm = getCurrentInstance()?.proxy
const logout = async () => {
  await supabase.auth.signOut()
  vm.$router.push('/login')
  ElMessage({
    message: 'Logout success.',
    type: 'success'
  })
}
</script>
<style lang="scss" scoped>
  .common-layout, .el-container {
    height: 100%;
  }
  .header {
    background-color: #193966;
    height: 48px;
    display: flex;
    justify-content: flex-end;
    .name {
      color:#fff;
      margin-right: 30px;
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        margin-right: 8px;
      }
    }
  }
  .el-aside {
    box-shadow: 2px 2px 10px 0 rgba(46,90,153,.1);
  }
  .el-menu {
    width: 200px;
    background-color: #fff;
    height: 100%;
    border-right: none;
  }
  .el-main {
    margin: 20px;
    background-color: #fff;
    border-radius: 8px;
  }
</style>
