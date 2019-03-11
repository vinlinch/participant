<template>
  <div class="contract">
    <!--<div class="title">合同1</div>-->
    <div class="card-box">
      <div class="contract-form-warp">
        <el-form :model="contractFormData" :rules="contractFormRules" ref="contractForm" label-width="140px">
          <el-form-item label="产品类型编号" prop="productType">
            <el-input v-if="isEdit" v-model="contractFormData.productType" auto-complete="on"></el-input>
            <p v-else>{{ contractFormData.productType }}</p>
          </el-form-item>
          <el-form-item label="借款起始日期" prop="borrowTime">
            <el-date-picker v-if="isEdit" type="date" placeholder="选择日期" v-model="contractFormData.borrowTime"
                            style="width: 100%;"></el-date-picker>
            <p v-else>{{ contractFormData.borrowTime }}</p>
          </el-form-item>
          <el-form-item label="借款本金" prop="capitalMoney">
            <el-input v-if="isEdit" v-model="contractFormData.capitalMoney"></el-input>
            <p v-else>{{ contractFormData.capitalMoney }}</p>
          </el-form-item>
          <el-form-item label="利息" prop="interest">
            <el-input v-if="isEdit" v-model="contractFormData.interest"></el-input>
            <p v-else>{{ contractFormData.interest }}</p>
          </el-form-item>
          <!--<el-form-item label="实际发放金额" prop="realMoney">-->
            <!--<el-input v-if="isEdit" v-model="contractFormData.realMoney"></el-input>-->
            <!--<p v-else>{{ contractFormData.realMoney }}</p>-->
          <!--</el-form-item>-->
          <el-form-item label="借款利率" prop="interestRate">
            <el-input v-if="isEdit" v-model="contractFormData.interestRate">
              <template slot="append">/年</template>
            </el-input>
            <p v-else>{{ contractFormData.interestRate }}</p>
          </el-form-item>
          <el-form-item label="借款到期日期" prop="expireTime">
            <el-date-picker v-if="isEdit" type="date" placeholder="选择日期" v-model="contractFormData.expireTime"
                            style="width: 100%;"></el-date-picker>
            <p v-else>{{ contractFormData.expireTime }}</p>
          </el-form-item>
          <!--<el-form-item label="分期还款日期" prop="payTime">-->
            <!--<el-date-picker v-if="isEdit" type="date" placeholder="选择日期" v-model="contractFormData.payTime"-->
                            <!--style="width: 100%;"></el-date-picker>-->
            <!--<p v-else>{{ contractFormData.payTime }}</p>-->
          <!--</el-form-item>-->
          <el-form-item label="分期数" prop="stages">
            <el-input v-if="isEdit" v-model="contractFormData.stages"></el-input>
            <p v-else>{{ contractFormData.stages }}</p>
          </el-form-item>
          <el-form-item label="居间服务费" prop="intermediaryFee">
            <el-input v-if="isEdit" v-model="contractFormData.intermediaryFee"></el-input>
            <p v-else>{{ contractFormData.intermediaryFee }}</p>
          </el-form-item>
          <el-form-item label="已还款期数" prop="currentStage">
            <el-input v-if="isEdit" v-model="contractFormData.currentStage"></el-input>
            <p v-else>{{ contractFormData.currentStage }}</p>
          </el-form-item>

          <el-form-item label="已还本金" prop="paiedMoney">
            <el-input v-if="isEdit" v-model="contractFormData.paiedMoney"></el-input>
            <p v-else>{{ contractFormData.paiedMoney }}</p>
          </el-form-item>
          <el-form-item label="已还利息" prop="paiedInterest">
            <el-input v-if="isEdit" v-model="contractFormData.paiedInterest"></el-input>
            <p v-else>{{ contractFormData.paiedInterest }}</p>
          </el-form-item>
          <el-form-item label="罚息金额" prop="deptInterest">
            <el-input v-if="isEdit" v-model="contractFormData.deptInterest"></el-input>
            <p v-else>{{ contractFormData.deptInterest }}</p>
          </el-form-item>
          <el-form-item label="罚息利率" prop="deptInterestRate">
            <el-input v-if="isEdit" v-model="contractFormData.deptInterestRate"></el-input>
            <p v-else>{{ contractFormData.deptInterestRate }}</p>
          </el-form-item>
          <el-form-item label="待还金额" prop="deptMoney">
            <el-input v-if="isEdit" v-model="contractFormData.deptMoney"></el-input>
            <p v-else>{{ contractFormData.deptMoney }}</p>
          </el-form-item>
          <el-form-item label="其他费用" prop="otherMoney">
            <el-input v-if="isEdit" v-model="contractFormData.otherMoney"></el-input>
            <p v-else>{{ contractFormData.otherMoney }}</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer" v-if="!propParams">
      <el-button v-if="isEdit" type="primary" @click="submitForm('contractForm')">提交</el-button>
      <el-button @click="$router.push('/relate/step-list?active=5')">返回</el-button>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";

  export default {
    components: {},
    props: {
      propParams: {
        type: Object
      }
    },
    data() {
      let ruleLength = {
        validator: (rule, value, callback) => {
          if (value) {
            if (value.toString().length >= 0 && value.toString().length <= 10) {
              callback();
            } else {
              callback(new Error('最多输入10个字符'));
            }
          } else {
            callback();
          }
        },
        trigger: "blur"
      };
      let ruleRequiredAndTen = [
        {required: true, message: "不能为空", trigger: "blur"},
        ruleLength
      ];
      return {
        isEdit: true,
        contractFormData: {
          productType: '',
          borrowTime: '',
          capitalMoney: '',
          caseId: this.currentCaseId,
          contractId: '',
          currentStage: '',
          deptInterest: '',
          deptInterestRate: '',
          deptMoney: '',
          disputeMoney: '',
          expireTime: '',
          interest: '',
          interestRate: '',
          intermediaryFee: '',
          otherMoney: '',
          paiedInterest: '',
          paiedMoney: '',
          payTime: '',
          realMoney: '',
          stages: ''
        },
        contractFormRules: {
          productType: ruleRequiredAndTen,
          borrowTime: {required: true, message: "不能为空", trigger: "blur"},
          requireAndten: {required: true, message: "不能为空", trigger: "blur"},
          capitalMoney: ruleRequiredAndTen,
          caseId: ruleRequiredAndTen,
          contractId: ruleRequiredAndTen,
          currentStage: ruleRequiredAndTen,
          deptInterest: ruleLength,
          deptInterestRate: ruleLength,
          deptMoney: ruleRequiredAndTen,
          disputeMoney: ruleRequiredAndTen,
          expireTime: {required: true, message: "不能为空", trigger: "blur"},
          interest: ruleRequiredAndTen,
          interestRate: ruleRequiredAndTen,
          intermediaryFee: ruleLength,
          otherMoney: ruleLength,
          paiedInterest: ruleRequiredAndTen,
          paiedMoney: ruleRequiredAndTen,
          payTime: {required: true, message: "不能为空", trigger: "blur"},
          realMoney: ruleRequiredAndTen,
          stages: ruleRequiredAndTen
        }
      };
    },
    computed: {
      ...mapState("relateManageStore", {
        currentEditContract: state => state.currentEditContract,
        currentCaseId: state => state.currentCaseId
      })
    },
    created() {
      const t = this;
      if(t.propParams){
        t.contractFormData = t.propParams
      }else{
        if (t.currentEditContract) {
          t.contractFormData = t.currentEditContract
        }
      }
      console.info('this.contractFormData=====', t.contractFormData)
      if (t.$route.query.readonly) {
        this.isEdit = false;
      }else{
        t.isEdit = !t.propParams;
      }

    },
    mounted() {
      //查询合同列表
      const t = this;

    },
    methods: {
      submitForm(formName) {
        const t = this;
        t.$refs[formName].validate((valid) => {
          if (valid) {
            console.info(t.currentCaseId)
            t.contractFormData.caseId = t.currentCaseId;
            t.$store.dispatch('relateManageStore/postContractAdd', t.contractFormData)
              .then((res) => {
                // console.info('res------',res)
                if (res.success) {
                  t.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.$router.go(-1)
                }
              })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      text-align: center;
      margin: 30px auto;
      font-size: 16px;
      font-weight: 400;
      color: #2B2C30;
    }

    .contract-form-warp {
      width: 90%;
      padding-left: 100px;
      padding-top: 30px;
    }

    .footer {
      margin: 30px auto;
      text-align: center;

      .el-button {
        display: inline-block;
      }
    }

    .card-box {
      .title {
        margin-top: 30px;
        font-size: 16px;
        color: #2b2c30;
      }
    }
  }
</style>

