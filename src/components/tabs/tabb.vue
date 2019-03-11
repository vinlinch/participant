<template>
  <div class="tabb">
    <el-row class="adds">
      <el-col :span="24">
        <el-button icon="el-icon-circle-plus-outline" @click="addcases">新增申请</el-button>
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
      <el-form-item label="仲裁委员会：">
        <el-select v-model="searchFrom.orgId" placeholder="请选择" @change="handleSelectOrgChange">
          <el-option v-for="item in orgList" :label="item.orgName" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="案件状态：">
        <el-select v-model="searchFrom.caseStatus" placeholder="请先选择仲裁委">
          <el-option v-for="item in orgStatus" :label="item.message" :value="item.code" :key="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="案件编号: ">
        <el-input style="width: 194px" v-model="searchFrom.caseId" placeholder="请输入案件编号"></el-input>
      </el-form-item>
      <el-form-item label="案号: ">
        <el-input style="width: 194px" v-model="searchFrom.caseNo" placeholder="请输入案号"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker
          type="daterange"
          v-model="searchFrom.startEnd"
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchFrom.page = 1;handleSearch()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row class="zc_tab">
      <el-col :span="24" class="tabs">
        <el-table :data="caseList">
          <el-table-column label="仲裁委员会" prop="orgName"></el-table-column>
          <el-table-column label="案件编号" prop="caseId"></el-table-column>
          <el-table-column label="案号" prop="caseNo"></el-table-column>
          <el-table-column label="创建时间" prop="createTime"></el-table-column>
          <el-table-column label="申请人" prop="applicantNames"></el-table-column>
          <el-table-column label="被申请人" prop="respondentNames"></el-table-column>
          <el-table-column label="标的额" prop="disputeFeeShow"></el-table-column>
          <el-table-column label="案件状态" prop="caseStatusName"></el-table-column>
          <el-table-column label="操作" width="140px">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.row.operation.isCallback" size="mini" @click="handleOperation(scope.row,'callback')">撤回申请</el-button>
              <el-button type="text" v-if="scope.row.operation.isLook" size="mini" @click="handleOperation(scope.row,'look')">查看详情</el-button>
              <el-button type="text" v-if="scope.row.operation.isEdit" size="mini" @click="handleOperation(scope.row,'edit')">修改信息</el-button>
              <el-button type="text" v-if="scope.row.operation.isConfirm" size="mini" @click="handleOperation(scope.row,'confirm')">{{scope.row.isConfirm}}提交申请</el-button>
              <el-button type="text" v-if="scope.row.operation.isDown" size="mini" @click="handleOperation(scope.row,'down')">下载仲裁文书</el-button>
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
    <el-dialog title="下载仲裁文书" :visible.sync="dialogDownloadShow" width="500px">
      <div class="down-warp">
        <el-table
          :data="downDatas"
          style="width: 100%">
          <el-table-column
            prop="fileName"
            label="仲裁文书名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="other"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleDownload(scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import {version} from 'punycode';

  export default {
    data() {
      return {
        dialogDownloadShow:false,
        downDatas:[
          {
            fileName:'仲裁文书',
            fileId:'1111'
          }
        ],
        downloadRow:{},
        orgStatus: [],
        searchFrom: {
          caseId: "",
          caseNo: "",
          caseStatus: "",
          orgId: "",
          size: 10,
          page: 1,
          start: "",
          end: "",
          startEnd: ''
        },
        currentPage: 1,
        total: 10,
        pagesize: 10,
        tableData: []
      };
    },
    computed: {
      ...mapState("relateManageStore", {
        orgList: state => state.orgList,
        currentCaseId: state => state.currentCaseId

      }),
      ...mapState("homePageStore", {
        caseList: state => state.caseList,
      })
    },
    mounted() {
      const t = this;
      //查询案件列表
      this.handleSearch()
      t.$store.dispatch('relateManageStore/getRelateGetOrg')
    },
    methods: {
      handleCurrentChange(val) {
        this.searchFrom.page = val
        console.log(val)
        this.handleSearch()
      },
      addcases() {
        this.$router.push("/relate");
      },
      handleSearch() {
        const t = this
        console.info('this.searchFrom.startEnd====',this.searchFrom.startEnd)
        this.searchFrom.start = this.searchFrom.startEnd[0]
        this.searchFrom.end = this.searchFrom.startEnd[1]
        t.$store.dispatch("homePageStore/getCasesList", this.searchFrom).then(res => {
          this.total = res.data.total
        });
      },
      handleSelectOrgChange() {
        const t = this;
        t.$store.dispatch('homePageStore/getCaseGetOrgStatus', t.searchFrom.orgId)
          .then(res => {
            console.info(res)
            t.orgStatus = res.data;
          })
      },
      handleOperation(row,flag){
        console.info('row-----',row)
        // console.info('flag-----',flag)
        const t = this;
        t.$store.commit('relateManageStore/SET_CURRENTCASEID', row.caseId)
        t.$store.commit('relateManageStore/SET_CURRENTSELECTORG', {orgId:row.orgId,orgName:row.orgName})
        // let flags = 'down'
        switch (flag) {
          case 'callback':{
            t.$store.dispatch('homePageStore/postCaseCallback', t.currentCaseId)
              .then(res => {
                console.info(res)
                if(res.success){
                  this.$message.success(res.message);
                }
              })
            break;
          }
          case 'look':{
            t.$store.commit('relateManageStore/SET_CURRENTCASEID', row.caseId)
            t.$router.push('/relate/case-detail')
            t.$router.push({
              path: "/relate/case-detail",
              query: {
                nosubmit: 1,
              }
            });
            break;
          }
          case 'edit':{
            t.$store.commit('relateManageStore/SET_CURRENTCASEID', row.caseId)
            t.$router.push('/relate/step-list?active=1')
            break;
          }
          case 'confirm':{
            t.$store.commit('relateManageStore/SET_CURRENTCASEID', row.caseId)
            t.$router.push('/relate/case-detail')
            break;
          }
          case 'down':{
            t.dialogDownloadShow = true;
            t.downloadRow = row;
            break;
          }
        }
      },
      handleDownload(row){
        const t = this;
        // console.info(t.downloadRow.reportKey)
        location.href = `/arb/file/downDocument?address=arbFile&fileId=${t.downloadRow.reportKey}`;
        // t.$store.dispatch('homePageStore/postFileDownDocument',paramsObj)
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>

