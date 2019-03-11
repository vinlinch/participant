<template>
  <div class="evidence">
    <!--<div class="title" v-if="!isDisabled">证据信息</div>-->
    <div style="text-align: right" v-if="!isDisabled">
      <el-button icon="el-icon-circle-plus-outline" @click="handleToAdd">新增证据项</el-button>
    </div>
    <div class="applicants-table-warp card-box">
      <el-table :data="evidenceList">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="证据提供方" prop="principalNames"></el-table-column>
        <el-table-column label="证据附件唯一标识" prop="itemId"></el-table-column>
        <el-table-column label="证据名称" prop="name"></el-table-column>
        <el-table-column label="有无原件" prop="hasOriginal">
          <template slot-scope="scope">{{scope.row.hasOriginal==1?'有':'没有'}}</template>
        </el-table-column>
        <el-table-column label="操作" v-if="!isDisabled">
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
    props:{
      isDisabled:{
        type: Number
      }
    },
    data() {
      return {};
    },
    computed: {
      ...mapState("relateManageStore", {
        evidenceList: state => state.evidenceList,
        currentCaseId: state => state.currentCaseId
      })
    },
    mounted() {
      //查询合同列表
      const t = this;
      t.$store.dispatch("relateManageStore/getEvidenceList", t.currentCaseId);
    },
    methods: {
      handleToAdd(){
        this.$store.commit('relateManageStore/'+AT.SET_CURRENTEDITEVIDENCE,{})
        this.$router.push('/relate/evidence-edit');
      },
      handleEdit(row){
        console.info(row)
        this.$store.commit('relateManageStore/'+AT.SET_CURRENTEDITEVIDENCE,row)
        this.$router.push('/relate/evidence-edit');
      },
      handleToDetail(row){
        this.$store.commit('relateManageStore/'+AT.SET_CURRENTEDITEVIDENCE,row)
        this.$router.push('/relate/evidence-edit?readonly=1');
      },
      handleDelete(row){
        console.info(row)
        this.$store.dispatch('relateManageStore/deleteEvidenceDel',{caseId:this.currentCaseId,evidenceId:row.evidenceId,itemId:row.itemId})
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../assets/scss/helpers.scss";

  .evidence {
    height: 100%;
    /*min-height: 100vh;*/

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

