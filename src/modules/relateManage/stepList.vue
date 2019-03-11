<template>
  <div class="step-list">
    <full-screen :has-return-btn="false">
      <div slot="fs-container">
        <div class="select-org card-box">
          <div class="title" style="margin: 10px auto;">{{ currentSelectOrg.orgName }}</div>
        </div>
        <div class="process-step card-box">
          <!--<div class="title">申办进度</div>-->
          <el-steps :active="0" finish-status="success" simple style="margin-top: 20px;border-radius: 8px;">
            <el-step title="填写信息" ></el-step>
            <el-step title="提交申请" ></el-step>
            <el-step title="缴纳费用" ></el-step>
            <el-step title="仲裁庭审理" ></el-step>
            <el-step title="结案" ></el-step>
          </el-steps>
        </div>
        <div class="step-tabs card-box display-flex" @click="handleChangeTab">
          <div class="step-tab flex1" :class="{'step-tab--active':stepTabsActiveIndex==1}" data-index="1">申请人</div>
          <div class="step-tab flex1" :class="{'step-tab--active':stepTabsActiveIndex==2}" data-index="2">代理人</div>
          <div class="step-tab flex1" :class="{'step-tab--active':stepTabsActiveIndex==3}" data-index="3">被申请人</div>
          <div class="step-tab flex1" :class="{'step-tab--active':stepTabsActiveIndex==4}" data-index="4">请求</div>
          <div class="step-tab flex1" :class="{'step-tab--active':stepTabsActiveIndex==5}" data-index="5">合同</div>
          <div class="step-tab flex1" :class="{'step-tab--active':stepTabsActiveIndex==6}" data-index="6">证据</div>
        </div>
        <div class="step-tabs card-box">
          <component :is="currentCom"></component>
        </div>
        <div class="footer">
          <el-button type="primary"  @click="$router.push('/relate/case-detail')">提交仲裁申请</el-button>
          <el-button type="primary" @click="$router.push('/')">返回</el-button>
        </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
  import fullScreen from 'components/full-screen'
  import applicants from './components/applicants'
  import agent from './components/agent'
  import contract from './components/contract'
  import respondent from './components/respondent'
  import claim from './components/claim' //请求
  import evidence from './components/evidence'
  import {mapState} from 'vuex'

  export default {
    components: {
      fullScreen,
      applicants,
      agent,
      respondent,
      contract,
      claim,
      evidence
    },
    data() {
      return {
        currentCom:'',
        stepTabsActiveIndex:1,
        componentsList:['applicants','agent','respondent','claim','contract','evidence']
      }
    },
    computed: {
      ...mapState('relateManageStore', {
        currentSelectOrg: state => state.currentSelectOrg
      })
    },
    mounted() {
      // const t = this;
      let currentActiveIndex = this.$route.query.active||1
      this.stepTabsActiveIndex = currentActiveIndex;
      this.currentCom = this.componentsList[currentActiveIndex-1]
    },
    methods: {
      handleChangeTab(e){
        const t = this;
        t.stepTabsActiveIndex = e.target.dataset.index
        t.currentCom = t.componentsList[(e.target.dataset.index-1)];
        t.$router.push({query:{'active':t.stepTabsActiveIndex}})
      },
      handleToggle(index) {
        this.active = index
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";

  .step-list {
    height: 100%;
    min-height: 100vh;

    .card-box {
      text-align: center;
      .title {
        margin-top: 30px;
        font-size: 16px;
        color: #2B2C30;
      }
    }
    .select-org{
      padding: 10px;
      background-color: #F7F8FA;
      .title{
        font-size:16px;
        font-weight:400;
        color:#2B2C30;
      }
    }
    .process-step {
      /*height: 225px;*/
      text-align: center;
      padding: 20px;
      .title{
        margin-bottom: 10px;
      }
    }
    .step-tabs{
      max-width: 1200px;
      background-color: $bodyBgGrey;
      margin: 20px auto;
      padding: 0;

      .step-tab{
        text-align: center;
        position: relative;
        color: #2B2C30;
        height:42px;
        line-height:42px;
        font-size:16px;
        cursor: pointer;

        &:after{
          content: "";
          width: 0;
          height: 4px;
          border-radius: 8px;
          background: $mainColor;
          position: absolute;
          top: 100%;
          left: 50%;
          transition: all .2s;
        }
        &:hover:after{
          left: 33.3%;
          width: 33.3%;
        }
      }
      .step-tab--active{
        font-size: 22px;
        font-weight: bold;
        &:after{
          width: 33.3%;
          left: 33.3%;
        }
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

