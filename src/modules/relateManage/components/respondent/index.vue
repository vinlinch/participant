<template>
  <div class="respondent">
    <!--<div class="title">被申请人信息</div>-->
    <div style="text-align: right">
      <el-button icon="el-icon-circle-plus-outline" @click="handleApplicants">新增申请人</el-button>
    </div>
    <div class="applicants-table-warp card-box">
      <el-table
        :data="respondentList"
      >
        <el-table-column label="仲裁参与人ID" prop="id"></el-table-column>
        <el-table-column label="仲裁参与人名称" prop="name"></el-table-column>
        <el-table-column label="仲裁参与人类型" prop="type">
          <template slot-scope="scope">{{ scope.row.type|participantsType }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleSee(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteRelateDelApplicant(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-if="searchresult" class="search-participants">
        <el-form
          ref="searchFrom"
          :model="searchFrom"
          class="details"
          :inline="true"
          label-position="right"
          label-width="120px"
        >
          <el-form-item label="仲裁参与人ID: ">
            <el-input v-model="searchFrom.id" placeholder="请输入参与人ID"></el-input>
          </el-form-item>
          <el-form-item label="仲裁参与人名称: ">
            <el-input v-model="searchFrom.name" placeholder="请输入参与人名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getParticipantsData">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table
          v-show="parttables"
          :data="participantsData"
        >
          <el-table-column label="仲裁参与人ID" prop="id"></el-table-column>
          <el-table-column label="仲裁参与人名称" prop="name"></el-table-column>
          <el-table-column label="仲裁参与人类型" prop="type">
            <template slot-scope="scope">{{ scope.row.type|participantsType }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleputRelateAddApplicant(scope.row.id)">添加</el-button>
              <el-button type="text" size="mini" @click="handleSee(scope.$index, scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
          <el-pagination
          class="pages"
          layout="total, prev, pager, next"
          :current-page.sync="searchFrom.page"
          :page-size="searchFrom.size"
          :total="total"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {
    components: {},
    data() {
      return {
        searchFrom: {
          id: "",
          type: "",
          name: "",
          size: 10,
          page: 1,
        },
        total:0,
        participantsData:[],
        listtemp:[],
        searchresult:false,
        parttables:false,
      }
    },
    computed: {
      ...mapState('relateManageStore', {
        respondentList: state => state.respondentList,
        currentCaseId: state => state.currentCaseId
      })
    },
    mounted() {
      const t = this;
      t.$store.dispatch('relateManageStore/getRelateGetRespondents',t.currentCaseId)
    },
    methods: {
      getParticipantsData(){
        this.parttables=true
        const t = this;
        t.$store.dispatch("homePageStore/getParticipantsList", t.searchFrom)
          .then(res => {
            this.total = res.data.total;
            this.participantsData = res.data.list;
          });
      },
      handleApplicants(){
       this.searchresult=true
      },
       handleCurrentChange(val) {
      this.searchFrom.page = val;
      console.log(val);
      this.getParticipantsData();
    },
      handleSee(index, row) {
        this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
        this.$router.push("/participant-detail");
    },
      handleputRelateAddApplicant(id){
        const t = this;
        console.info(t.currentCaseId,id)
        t.$store.dispatch("relateManageStore/putRelateAddRespondents", {caseId:t.currentCaseId,id:id})
          .then(res => {
            console.info(res)
          });
      },
      handleDeleteRelateDelApplicant(id){
        const t = this;
        console.info(t.currentCaseId,id)
        t.$store.dispatch("relateManageStore/DeleteRelateDelRespondents", {caseId:t.currentCaseId,id:id})
          .then(res => {
            console.info(res)
          });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../../../assets/scss/helpers.scss";

  .respondent {
    height: 100%;
    min-height: 100vh;

    .title {
      font-size: 32px;
      color: #2B2C30;

    }

    .card-box {
      .title {
        margin-top: 30px;
        font-size: 16px;
        color: #2B2C30;
      }
    }

    .applicants-table-warp {
      margin-top: 20px;

      .search-participants {
        padding: 10px;
      }
    }
  }
</style>

