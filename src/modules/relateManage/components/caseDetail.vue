<template>
  <div class="case-detail">
    <div class="title">案件详情</div>
    <div class="process">
      <el-steps :active="1" finish-status="success" simple style="margin-top: 20px;border-radius: 8px;">
        <el-step title="填写信息" ></el-step>
        <el-step title="提交申请" ></el-step>
        <el-step title="缴纳费用" ></el-step>
        <el-step title="仲裁庭审理" ></el-step>
        <el-step title="结案" ></el-step>
      </el-steps>
    </div>
    <div class="case-warp" v-if="caseDetail">
      <div class="title">案件概况</div>
      <div class="card-box" style="padding: 50px 100px;">
        <el-form ref="form" label-width="200px">
          <el-form-item label="案号：">
            <p>{{caseDetail.arbCase.caseNo}}</p>
          </el-form-item>
          <el-form-item label="案件编号：">
            <p>{{caseDetail.arbCase.caseId}}</p>
          </el-form-item>
          <el-form-item label="申请人：">
            <p>{{caseDetail.arbCase.applicantNames}}</p>
          </el-form-item>
          <el-form-item label="代理人：">
            <p>{{caseDetail.arbCase.agentNames}}</p>
          </el-form-item>
          <el-form-item label="被申请人：">
            <p>{{caseDetail.arbCase.respondentNames}}</p>
          </el-form-item>
          <el-form-item label="仲裁费：">
            <p>{{caseDetail.arbCase.arbitrationFeeShow}}</p>
          </el-form-item>
          <el-form-item label="案件进度：">
            <p>{{caseDetail.arbCase.caseStatusName}}</p>
          </el-form-item>
        </el-form>
      </div>

      <div class="title" v-if="caseDetail.applicants.length>0">申请人</div>
      <div v-for="(item,index) in caseDetail.applicants" :key="item.pid">
        <applicants :propParams="item"></applicants>
        <div class="line"></div>
      </div>

      <div class="title" v-if="caseDetail.agents.length>0">代理人</div>
      <div v-for="(item,index) in caseDetail.agents" :key="index">
        <agent :propParams="item"></agent>
        <div class="line"></div>
      </div>

      <div class="title" v-if="caseDetail.respondents.length>0">被申请人</div>
      <div v-for="(item,index) in caseDetail.respondents" :key="item.pid">
        <applicants :propParams="item"></applicants>
        <div class="line"></div>
      </div>

      <div class="title">请求</div>
      <div v-for="(item,index) in caseDetail.claims" :key="item.claimId">
        <claimEdit :propParams="item">
          <slot name="index">{{index}}1111</slot>
        </claimEdit>
        <div class="line"></div>
      </div>
      <claim :isDisabled="1"></claim>

      <div class="title" v-if="caseDetail.contracts.length>0">合同</div>
      <div v-for="(item,index) in caseDetail.contracts" :key="item.contractId">
        <contractEdit :propParams="item"></contractEdit>
        <div class="line"></div>
      </div>

      <div class="title">证据</div>
      <evidence :isDisabled="1"></evidence>
      <div v-for="(item,index) in caseDetail.evidences" :key="item.evidenceId">
        <evidenceEdit :propParams="item"></evidenceEdit>
        <div class="line"></div>
      </div>
    </div>
    <div class="footer">
      <el-button v-if="!$route.query.nosubmit" type="primary" @click="handleSign">提交仲裁申请</el-button>
      <el-button type="primary" @click="handleReturn">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import applicants from '../../homePage/components/participantDetail'
  import agent from '../components/agent/agentDetail'
  import claimEdit from '../components/claim/claimEdit'
  import claim from '../components/claim'
  import contractEdit from '../components/contract/contractEdit'
  import evidence from '../components/evidence'
  import evidenceEdit from '../components/evidence/evidenceEdit'

  export default {
    components: {
      applicants,
      agent,
      claimEdit,
      claim,
      contractEdit,
      evidence,
      evidenceEdit
    },
    data() {
      return {
        imgBase64:''
      };
    },
    computed: {
      ...mapState("relateManageStore", {
        currentCaseId: state => state.currentCaseId,
        caseDetail: state => state.caseDetail
      })
    },
    created(){
      const t = this;
      t.$store.commit('relateManageStore/SET_CASEDETAIL', null)
    },
    mounted() {
      //获取案件详情
      const t = this;
      t.$store.dispatch('relateManageStore/getCaseDetail', t.currentCaseId)
    },
    methods: {
      handleReturn(){
        const t = this;
        if(t.$route.query.nosubmit){
          t.$router.push('/home')
        }else{
          t.$router.go(-1);
        }
      },
      handleSign(formName) {
        const t = this;
        t.$store.dispatch('relateManageStore/postCaseConfirm', t.currentCaseId)
          .then(res=>{
            console.info(res)
            if(res.success){
              t.$message.success(res.message);
            }
          })
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../assets/scss/helpers.scss";

  .case-detail {
    height: 100%;
    min-height: 100vh;
    padding-bottom:70px;

    .title{
      margin: 10px auto;
      font-size: 20px;
      text-align: center;
    }
    .case-warp{
      width: 900px;
      margin: 0 auto;

      .title{
        text-align: left;
        padding-left: 40px;
      }
    }
    .process{
      width: 1000px;
      margin: 0 auto;
      background-color: #fff;
      padding: 10px;
      .el-steps{
        margin-top: 0!important;
      }
    }
    .footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      height: 50px;
      padding: 10px;
      text-align: center;
    }
  }
</style>

