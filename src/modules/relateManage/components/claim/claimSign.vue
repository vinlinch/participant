<template>
  <div class="claim-sign">
    <!--<div class="title">仲裁申请书签署</div>-->
    <div class="sign-pdf">
      <iframe style="width: 100%;height:100%;border: none;" :src="'data:application/pdf;base64,'+imgBase64"></iframe>
    </div>
    <div class="footer">
      <el-button type="primary" v-if="signStatus===0" @click="handleSign">签署</el-button>
      <el-button type="primary" @click="$router.push('/relate/step-list?active=4')">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import * as AT from "../../store/actionTypes";

  export default {
    components: {},
    data() {
      return {
        imgBase64:'',
        signStatus:1
      };
    },
    computed: {
      ...mapState("relateManageStore", {
        currentCaseId: state => state.currentCaseId
      })
    },
    mounted() {
      //查询合同列表
      this.getClaimReview();
    },
    methods: {
      getClaimReview(){
        const t = this;
        t.$store.dispatch('relateManageStore/getClaimReview', t.currentCaseId)
          .then(res=>{
            console.info(res)
            t.imgBase64 = res.data.baseStr;
            t.signStatus = res.data.status;
          })
      },
      handleSign(formName) {
        const t = this;
        t.$store.dispatch('relateManageStore/postClaimSign', t.currentCaseId)
          .then(res=>{
            console.info(res)
            if(res.success){
              t.$message.success(res.message);
              t.getClaimReview();
            }
          })
      },
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../assets/scss/helpers.scss";

  .claim-sign {
    height: 100%;
    min-height: 100vh;

    .sign-pdf{
      width: 90%;
      height: 86vh;
      margin: 10px auto;
    }

    .footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      height: 50px;
      padding: 10px;
      text-align: center;
    }
  }
</style>

