<template>
  <div class="contract">
    <!--<div class="title">合同信息</div>-->
    <div style="text-align: right">
      <el-button icon="el-icon-circle-plus-outline" @click="handleToAdd">新增合同信息</el-button>
    </div>
    <div class="applicants-table-warp card-box">
      <el-table :data="contractList">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="产品编号" prop="productType"></el-table-column>
        <el-table-column label="借款利率" prop="interestRate">
          <!--<template slot-scope="scope">{{ scope.row.power|powers }}</template>-->
        </el-table-column>
        <el-table-column label="待还金额" prop="deptMoney">
          <!--<template slot-scope="scope">{{ scope.row.agentType|agentTypes }}</template>-->
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleToDetail(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import * as AT from "../../store/actionTypes";

  export default {
    components: {},
    data() {
      return {};
    },
    computed: {
      ...mapState("relateManageStore", {
        contractList: state => state.contractList,
        currentCaseId: state => state.currentCaseId
      })
    },
    mounted() {
      //查询合同列表
      const t = this;
      t.$store.dispatch("relateManageStore/getRelateGetContract", t.currentCaseId);
    },
    methods: {
      handleToAdd(){
        this.$store.commit('relateManageStore/'+AT.SET_CURRENTEDITCONTRACT,{})
        this.$router.push('/relate/contract-edit')
      },
      handleEdit(row){
        console.info(row)
        this.$store.commit('relateManageStore/'+AT.SET_CURRENTEDITCONTRACT,row)
        this.$router.push('/relate/contract-edit');
      },
      handleToDetail(row){
        this.$store.commit('relateManageStore/'+AT.SET_CURRENTEDITCONTRACT,row)
        this.$router.push('/relate/contract-edit?readonly=1');
      },
      handleDelete(row){
        console.info(row)
        this.$store.dispatch('relateManageStore/deleteContractDel',{caseId:this.currentCaseId,contractId:row.contractId})
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../assets/scss/helpers.scss";

  .contract {
    height: 100%;
    min-height: 100vh;

    .title {
      font-size: 32px;
      color: #2b2c30;
    }
  }

  .card-box {
    .title {
      margin-top: 30px;
      font-size: 16px;
      color: #2b2c30;
    }
  }

  .applicants-table-warp {
    margin-top: 20px;

    .search-participants {
      padding: 10px;
    }
  }
</style>

