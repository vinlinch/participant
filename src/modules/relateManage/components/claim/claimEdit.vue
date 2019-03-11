<template>
  <div class="claim">
    <!--<div class="title">合同1</div>-->
    <div class="card-box">
      <div class="index" slot="index"></div>
      <div class="claim-form-warp">
        <el-form :model="claimFormData" :rules="claimFormRules" ref="claimForm" label-width="140px">
          <el-form-item label="申请人" prop="principalIds">
            <el-select v-if="isEdit" v-model="claimFormData.principalIds" placeholder="请选择">
              <el-option
                v-for="item in ApplicantsList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              >
              </el-option>
            </el-select>
            <p v-else>{{ claimFormData.principalNames }}</p>
          </el-form-item>
          <el-form-item label="请求类型" prop="claimType">
            <el-radio-group v-if="isEdit" v-model="claimFormData.claimType">
              <el-radio :label="1">确认之诉</el-radio>
              <el-radio :label="2">给付之诉</el-radio>
              <el-radio :label="3">形成之诉</el-radio>
            </el-radio-group>
            <p v-else>{{ claimFormData.claimType | claimType }}</p>
          </el-form-item>
          <el-form-item label="请求标的额" prop="disputeFee">
            <el-input v-if="isEdit" v-model="claimFormData.disputeFee"></el-input>
            <p v-else>{{ claimFormData.disputeFee }}</p>
          </el-form-item>
          <el-form-item label="请求内容" prop="claimContent">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-if="isEdit" v-model="claimFormData.claimContent"></el-input>
            <p v-else>{{ claimFormData.claimContent }}</p>
            <p v-if="isEdit" style="font-size: 12px;color: #999;">还可以输入<span style="color: #4b4eff;">{{(600-claimFormData.claimContent.length)>0?(600-claimFormData.claimContent.length):0}}</span>/600字</p>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer" v-if="!propParams">
      <el-button v-if="isEdit" type="primary" @click="submitForm('claimForm')">提交</el-button>
      <el-button @click="$router.push('/relate/step-list?active=4')">返回</el-button>
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
      return {
        isEdit: true,
        claimFormData: {
          caseId: "",
          claimContent: "",
          claimId: "",
          claimType: 1,
          disputeFee: '',
          payItem: 0,
          principalIds: ""
        },
        claimFormRules: {
          principalIds: [
            {required: true, message: '请选择', trigger: 'blur'},
          ],
          disputeFee:[
            {required: true, message: '不能为空', trigger: 'blur'},
            { min: 1, max: 10, message: '最多输入10个字符', trigger: 'blur' }
          ],
          claimContent:[
            {required: true, message: '不能为空', trigger: 'blur'},
            { min: 1, max: 600, message: '最多输入600个字符', trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      ...mapState("relateManageStore", {
        ApplicantsList: state => state.ApplicantsList,
        currentEditclaim: state => state.currentEditclaim,
        currentCaseId: state => state.currentCaseId
      })
    },
    created() {
      const t = this;
      console.info('this.currentEditclaim=====', t.currentEditclaim)
      if(t.propParams){
        t.claimFormData = t.propParams
      }else{
        if (t.currentEditclaim) {
          t.claimFormData = t.currentEditclaim
        }
      }
      // console.info(t.$route.query.readonly)
      if (t.$route.query.readonly) {
        this.isEdit = false;
      }else{
        t.isEdit = !t.propParams;
      }

    },
    mounted() {
      //查询合同列表
      const t = this;
      t.$store.dispatch('relateManageStore/getRelateGetApplicants', t.currentCaseId)
    },
    methods: {
      submitForm(formName) {
        const t = this;
        t.$refs[formName].validate((valid) => {
          if (valid) {
            console.info(t.currentCaseId)
            t.claimFormData.caseId = t.currentCaseId;
            if(t.claimFormData.fileKeys == ''){
              t.$message.error("未上传证据！");
              return;
            }else{
              t.$store.dispatch('relateManageStore/postClaimAdd', t.claimFormData)
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
            }
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

  .claim {
    height: 100%;
    /*min-height: 100vh;*/

    .title {
      text-align: center;
      margin: 30px auto;
      font-size: 16px;
      font-weight: 400;
      color: #2B2C30;
    }

    .claim-form-warp {
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

