<template>
  <div class="relate-manage">
    <full-screen>
      <div slot="fs-container">
        <div class="process-step card-box">
          <!--<div class="title">申办进度</div>-->
          <el-steps :active="0" finish-status="success" simple style="margin-top: 20px;border-radius: 8px;">
            <el-step title="填写信息"></el-step>
            <el-step title="提交申请"></el-step>
            <el-step title="缴纳费用"></el-step>
            <el-step title="仲裁庭审理"></el-step>
            <el-step title="结案"></el-step>
          </el-steps>
        </div>
        <div class="select-org card-box">
          <div class="title">{{ currentSelectOrg.orgName }}</div>
          <el-button type="primary" class="btn-select-org" @click="dialogSelectOrg.isshow = true">选择仲裁委</el-button>
        </div>
        <div class="to-apply card-box">
          <div class="div-accept">
            <el-checkbox v-model="isAccept">
              我已同意
              <el-button type="text" @click="dialogXieyi.isshow = true">《用户服务协议》</el-button>
            </el-checkbox>
          </div>
          <el-button type="primary" class="btn-select-org" :disabled="!isAccept||!currentSelectOrg.orgCode"
                     @click="handleBeginCase">开始申请
          </el-button>
        </div>
        <div class="select-org card-box" style="height: 80px;">
          <div class="title">申办须知</div>
        </div>
        <div class="process-step card-box" style="text-align: left;">
          <p style="text-align: center;">
            <img src="../../assets/images/shenbanxuzhi.png" alt="" style="width: 1200px">
          </p>
        </div>
      </div>
    </full-screen>
    <div>
      <!--<component :is="currentView"></component>-->
    </div>
    <el-dialog
      title="选择仲裁委"
      :visible.sync="dialogSelectOrg.isshow"
      width="30%"
    >
      <div>
        <el-radio-group v-model="currentSelectOrg">
          <el-radio v-for="org in orgList" :key="org.orgCode" :label="org">{{ org.orgName }}</el-radio>
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSelectOrg.isshow = false">取 消</el-button>
        <el-button type="primary" @click="dialogSelectOrg.isshow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="用户服务协议"
      :visible.sync="dialogXieyi.isshow"
      width="1200px"
    >
      <div>
        <img src="../../assets/images/fuwuxieyi.png" alt="" style="width: 1100px">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogXieyi.isshow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import fullScreen from 'components/full-screen'
  import {mapState} from 'vuex'

  export default {
    components: {
      fullScreen
    },
    data() {
      return {
        dialogSelectOrg: {
          isshow: false
        },
        dialogXieyi: {
          isshow: false
        },
        currentSelectOrg: {
          orgName: '请选择仲裁委'
        },
        isAccept: false
      }
    },
    computed: {
      ...mapState('relateManageStore', {
        orgList: state => state.orgList,
        // currentSelectOrg: state => state.currentSelectOrg
      })
    },
    mounted() {
      const t = this;
      t.$store.dispatch('relateManageStore/getRelateGetOrg')
    },
    methods: {
      handleBeginCase() {
        const t = this;
        t.$store.commit('relateManageStore/SET_CURRENTSELECTORG', t.currentSelectOrg)
        t.$store.dispatch('relateManageStore/putCaseAddCase', t.currentSelectOrg.id)
          .then(res => {
            if (res.success) {
              t.$router.push('/relate/step-list')
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";

  .relate-manage {
    height: 100%;
    min-height: 100vh;

    .card-box {
      .title {
        margin-top: 30px;
        font-size: 16px;
        color: #2B2C30;
      }
    }

    .process-step {
      /*height: 225px;*/
      text-align: center;
    }

    .select-org {
      height: 193px;
      background-color: $bodyBgGrey;
      text-align: center;

      .btn-select-org {
        margin-top: 50px;
      }
    }

    .to-apply {
      text-align: center;
      height: 160px;

      .div-accept {
        margin: 30px 0 20px 0;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        font-weight: 400;
        color: #2B2C30;
      }
    }
  }
</style>

