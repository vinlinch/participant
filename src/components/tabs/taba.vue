<template>
  <div class="taba">
    <el-row class="adds">
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline" @click="addArbitrate">新增仲裁参与人</el-button>
      </el-col>
    </el-row>
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
      <el-form-item label="仲裁申请人类型:" @change="applytype">
        <el-select v-model="searchFrom.type" placeholder="不限">
          <el-option label="个人" :value="1"></el-option>
          <el-option label="企业" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="仲裁参与人名称: ">
        <el-input v-model="searchFrom.name" placeholder="请输入参与人名称"></el-input>
      </el-form-item>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="searchBtn">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row class="zc_tab">
      <el-col :span="24" class="titles">仲裁参与人信息</el-col>
      <el-col :span="24" class="tabs">
        <el-table :data="tableData">
          <el-table-column label="仲裁参与人ID" prop="id"></el-table-column>
          <el-table-column label="仲裁参与人名称" prop="name"></el-table-column>
          <el-table-column label="仲裁参与人类型" prop="type">
            <template slot-scope="scope">{{ scope.row.type|participantsType }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchFrom: {
        id: "",
        type:"",
        name: "",
        size: 10,
        page: 1,
      },
      addapply:false,
      currentPage: 1,
      pageTotal: 0,
      total:0,
      size:10,
      page: 1,
      seeid: "",
      typetabs:"",
      addid:"",
      tableData: []
    };
  },
  computed: {
    ...mapState({
      participantsList: state => state.participantsList
    })
  },
  mounted() {
    //获取接口查询信息
    this.getlist();
  },
  methods: {
    applytype(type){
      this.searchFrom.type = type;
      console.log(type)
    },
    searchBtn() {
      this.searchFrom.page=1;
      this.getlist();
    },
    addArbitrate() {//新增
      this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',null)
      this.$router.push({
        path: "/participant-detail",
        query: {
          edit: 1,
        }
      })
       this.getlist();
    },
    handleCurrentChange(val) {
      this.searchFrom.page = val
      this.getlist()
    },
    handleSee(index, row) {
      this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
      this.seeid = row.id;
      this.typetabs=row.type;
      this.$router.push("/participant-detail");
      // console.log(this.searchFrom.type)
    },
    handleEdit(index, row) {
      this.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',row)
      this.seeid = row.id;
      this.typetabs=row.type;
      this.$router.push({
        path: "/participant-detail",
        query: {
          edit: 1,
        }
      });
    },
    getlist() {
      const t = this;
      t.$store
        .dispatch("homePageStore/getParticipantsList", this.searchFrom)
        .then(res => {
          this.total = res.data.total;
          this.tableData = res.data.list;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

