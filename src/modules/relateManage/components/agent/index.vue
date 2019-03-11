<template>
  <div class="agent">
    <!--<div class="title">代理人信息</div>-->
    <div style="text-align: right">
      <el-button icon="el-icon-circle-plus-outline" @click="handleApplicants">新增代理人</el-button>
    </div>
    <div class="applicants-table-warp card-box">
      <el-table :data="ApplicantsList">
        <el-table-column label="仲裁参与人ID" prop="agentId"></el-table-column>
        <el-table-column label="代理人名称" prop="name"></el-table-column>
        <el-table-column label="代理人权限" prop="power">
          <template slot-scope="scope">{{ scope.row.power|powers }}</template>
        </el-table-column>
        <el-table-column label="代理人类型" prop="agentType">
          <template slot-scope="scope">{{ scope.row.agentType|agentTypes }}</template>
        </el-table-column>
        <el-table-column label="委托人" prop="principalNames"></el-table-column>
        <el-table-column label="操作" width="240px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleSees(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDeleteAgent(scope.$index, scope.row)">删除</el-button>
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
        <el-table v-show="parttables" :data="participantsData">
          <el-table-column label="仲裁参与人ID" prop="id"></el-table-column>
          <el-table-column label="仲裁参与人名称" prop="name"></el-table-column>
          <el-table-column label="仲裁参与人类型" prop="type">
            <template slot-scope="scope">{{ scope.row.type|participantsType }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleputRelateAddApplicant(scope.$index, scope.row)"
              >添加</el-button>
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
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      searchFrom: {
        id: "",
        type: 1,
        name: "",
        size: 10,
        page: 1
      },
      total: 0,
      participantsData: [],
      listtemp: [],
      searchresult: false,
      parttables: false,
      seeid: "",
      seeids: "",
      typetabs: "",
      types:1,
      power: 1,
      agentType :1,
      general:false
    };
  },
  computed: {
    ...mapState("relateManageStore", {
      ApplicantsList: state => state.ApplicantsList,
      currentCaseId: state => state.currentCaseId
    })
  },
  mounted() {
    //查询代理人列表
    const t = this;
    t.$store.dispatch("relateManageStore/getRelateGetAgent", t.currentCaseId);
    console.log('查询代理人列表',t.currentCaseId)
  },
  methods: {
    getParticipantsData() {//查询
      this.parttables = true;
      const t = this;
      t.$store
        .dispatch("homePageStore/getParticipantsList", t.searchFrom)
        .then(res => {
          console.log( t.searchFrom.type)
          this.total = res.data.total;
          this.participantsData = res.data.list;
        });
    },
    handleCurrentChange(val) {
      this.searchFrom.page = val;
     // console.log(this.searchFrom.page);
      this.getParticipantsData();
    },
    handleApplicants() {
      this.searchresult = true;
    },
    handleSees(index, row) {//代理人查看
      // this.seeids = row.agentId
      this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
      this.$store.commit('relateManageStore/SET_CURRENTEDITAGENT',row)
      this.$router.push({
        path: "/relate/agent-detail",
      })
    },
    handleSee(index, row) {//仲裁查看
      this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
      this.$router.push("/participant-detail");
    },
    handleEdit(index,row){//代理人编辑
        const t = this;
      this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
      this.$store.commit('relateManageStore/SET_CURRENTEDITAGENT',row)
          this.$router.push({
          path: "/relate/agent-detail",
          query: {
           edit:1
          }
        })
    },
     handleputRelateAddApplicant(index,row){//添加关联代理人
        const t = this;
       this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
       this.$store.commit('relateManageStore/SET_CURRENTEDITAGENT',null)
          this.$router.push({
          path: "/relate/agent-detail",
          query: {
            edit:1
          }
        });
      },
    handleDeleteAgent(index,row) {//删除代理人
      const t = this
      this.seeid=row.agentId
      console.info(t.currentCaseId, row.agentId);
      t.$store
        .dispatch("relateManageStore/DeleteRelateDelAgent", {
          caseId: t.currentCaseId,
          id: row.agentId
        })
        .then(res => {
          console.info(res);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/scss/helpers.scss";

.agent {
  height: 100%;
  min-height: 100vh;

  .title {
    font-size: 32px;
    color: #2b2c30;
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
}
</style>

