<template>
  <div class="agent-detail">
    <div class="title" v-if="isreadonly?false:!propParams">代理人信息</div>

    <applicants :isreadonly="true"></applicants>

    <div class="line"></div>

    <div class="agent-form-warp">
      <el-form
        ref="agentForm"
        :rules="agentFormRules"
        :model="agentFormData"
        class="details"
        label-position="right"
        label-width="200px"
      >
        <el-form-item label="代理人权限：" prop="power">
          <el-radio-group v-if="isEdit&&!currentEditAgent" v-model="agentFormData.power" size="small"
                          @change="resetFormData">
            <el-radio-button label="1">一般代理</el-radio-button>
            <el-radio-button label="2">特殊代理</el-radio-button>
          </el-radio-group>
          <p v-else>{{agentFormData.power | powers}}</p>
        </el-form-item>
        <el-form-item label="代理人类型：" prop="agentType">
          <el-radio-group v-if="isEdit" v-model="agentFormData.agentType" size="small">
            <el-radio :label="1">律师代理</el-radio>
            <el-radio :label="2">其他代理</el-radio>
          </el-radio-group>
          <p v-else>{{agentFormData.agentType | agentTypes}}</p>
        </el-form-item>
        <el-form-item v-if="agentFormData.power==2" label="特殊代理权限：" prop="powerDetail">
          <el-checkbox-group :disabled="!isEdit" v-model="powerDetailList">
            <el-checkbox label="1">代为提起仲裁请求</el-checkbox>
            <el-checkbox label="2">代为参加庭审、质证，辩论</el-checkbox>
            <el-checkbox label="3">代为和解、调解</el-checkbox>
            <el-checkbox label="4">代为主张、变更、放弃仲裁</el-checkbox>
            <el-checkbox label="5">代为签收法律文书</el-checkbox>
            <el-checkbox label="6">代为申请执行</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="执业证类型：" prop="lawyerType">
          <el-select v-if="isEdit" v-model="agentFormData.lawyerType" placeholder="请选择">
            <el-option label="实习律师证" :value="2"></el-option>
            <el-option label="律师执业证" :value="3"></el-option>
          </el-select>
          <p v-else>{{agentFormData.lawyerType | lawyerTypes}}</p>
        </el-form-item>
        <el-form-item label="执业证号：" prop="lawyerNo">
          <el-input v-if="isEdit" v-model="agentFormData.lawyerNo" placeholder="请输入正确的执业证号"></el-input>
          <p v-else>{{agentFormData.lawyerNo}}</p>
        </el-form-item>
        <el-form-item label="工作单位：" prop="workUnit">
          <el-input v-if="isEdit" v-model="agentFormData.workUnit" placeholder="请输入正确的工作单位"></el-input>
          <p v-else>{{agentFormData.workUnit}}</p>
        </el-form-item>
        <el-form-item label="职务：" prop="position">
          <el-input v-if="isEdit" v-model="agentFormData.position" placeholder="请输入职务"></el-input>
          <p v-else>{{agentFormData.position}}</p>
        </el-form-item>
        <el-form-item label="委托人：" prop="principalIds">
          <el-select v-if="isEdit" v-model="agentFormData.principalIds" placeholder="请选择">
            <el-option
              v-for="item in ApplicantsList"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            >
            </el-option>
          </el-select>
          <p v-else>{{agentFormData.principalNames}}</p>
        </el-form-item>
        <el-form-item v-if="!propParams" label="附件上传：" prop="" class="is-required">
          <el-row>
            <el-col :span="8">授权委托书</el-col>
            <el-col :span="8">律师执业证</el-col>
            <el-col :span="8">律师所函</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-upload
                ref="refattorneyKey"
                :disabled="!isEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="attorneyKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'attorneyKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'attorneyKey')"
                :class="{ 'upload-disable':agentFormData.attorneyKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
            <el-col :span="8">
              <el-upload
                ref="refofficeKey"
                :disabled="!isEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="officeKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'officeKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'officeKey')"
                :class="{ 'upload-disable':agentFormData.officeKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
            <el-col :span="8">
              <el-upload
                ref="refpractiseKey"
                :disabled="!isEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="practiseKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'practiseKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'practiseKey')"
                :class="{ 'upload-disable':agentFormData.practiseKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row v-if="isEdit">
            <p style="font-size: 12px;color: #999;">上传的附件应包含且不限于 代理人授权委托书；律师执业证（律师代理）、律师所函（律师代理）</p>
          </el-row>
        </el-form-item>
        <el-form-item v-else label="附件列表：" prop="">
          <p>{{agentFormData.filename}}</p>
        </el-form-item>
        <el-form-item v-if="isreadonly?false:!propParams">
          <el-button v-if="isEdit" type="primary" @click="handleSubmit('agentForm')">保存</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div>{{agentFormData.frontKey}}</div>-->
    <!--<hr>-->
    <!--<div>{{currentEditAgent}}</div>-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import * as validate from "assets/js/utils/validate";
  import applicants from 'modules/homePage/components/participantDetail'

  export default {
    components: {
      applicants,
    },
    props: {
      propParams: {
        type: Object
      },
      isreadonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isEdit: this.isreadonly ? false : this.$route.query.edit,
        attorneyKeyList: [],
        officeKeyList: [],
        practiseKeyList: [],
        dialogVisible: false,
        dialogImageUrl: '',
        uploadUrl: "/arb/file/upload",
        powerDetailList:[],
        agentFormData: {
          power: 1,
          agentType: 1,
          lawyerType: '',
          principalIds: '',
          attorneyKey: '',
          officeKey: '',
          practiseKey: '',
        },
        agentFormRules: {
          lawyerType: [
            {required: true, message: "请选择证照类型", trigger: "change"}
          ],
          lawyerNo: [
            {required: true, message: "请输入执业证号", trigger: "blur"}
          ],
          workUnit: [
            {required: true, message: "请输入工作单位", trigger: "blur"}
          ],
          position: [{required: true, message: "请输入职务", trigger: "blur"}],
          principalIds: [
            {required: true, message: "请选择委托人", trigger: "change"}
          ]
        },
      };
    },
    computed: {
      ...mapState('relateManageStore', {
        ApplicantsList: state => state.ApplicantsList,
        currentCaseId: state => state.currentCaseId,
        currentEditAgent: state => state.currentEditAgent
      }),
      ...mapState('homePageStore', {
        currentEditParticipant: state => state.currentEditParticipant
      })
    },
    created(){
      const t = this;
      if (t.propParams) {
        //案件详情下 需要把deeail中agent数据set给参与人 参与人会根据id自我请求
        t.$store.commit('homePageStore/SET_CURRENTEDITPARTICIPANT',t.propParams)
      }
    },
    mounted() {
      const t = this;
      if (t.isEdit) {
        t.$store.dispatch('relateManageStore/getRelateGetApplicants', t.currentCaseId)
      }
      if (t.propParams) {
        t.agentFormData = t.propParams;
        t.setInitData();
      } else {
        if (t.currentEditAgent) {
          //编辑 或 查看
          t.$store.dispatch(`relateManageStore/postRelateSeeAgent`, {
            caseId: t.currentCaseId,
            id: t.currentEditAgent.agentId
          })
            .then(res => {
              console.info(res);
              t.agentFormData = res.data;
              t.setInitData();
            })
        }
      }
    },
    // computed: {},
    methods: {
      setInitData() {
        const t = this;
        if(t.agentFormData.powerDetail.length>0){
          t.powerDetailList = t.agentFormData.powerDetail.split(',');
        }
        t.attorneyKeyList.push({url: 'data:image/jpg;base64,' + t.agentFormData.attorneyKeyBase || ''});
        t.officeKeyList.push({url: 'data:image/jpg;base64,' + t.agentFormData.officeKeyBase || ''});
        t.practiseKeyList.push({url: 'data:image/jpg;base64,' + t.agentFormData.practiseKeyBase || ''});
        // console.info('attorneyKeyList-----',t.attorneyKeyList)
      },
      handleAvatarSuccess(res, file, keyName) {
        // console.info(res,file,keyName)
        if(res.success){
          this.agentFormData[keyName] = res.data.fileId;
        }else{
          this.$refs['ref'+keyName].clearFiles();
          this.$message.error(res.message);
        }
      },
      beforeUpload(file) {
        const isImg = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImg) {
          this.$message.error('仅支持 jpeg、png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('大小不能超过 2MB!');
        }
        return isImg && isLt2M;
      },
      handleRemove(file, fileList, keyName) {
        setTimeout(() => {
          this.agentFormData[keyName] = '';
          this[keyName + 'List'] = [];
        }, 450)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      resetFormData(label) {
        const t = this;
        t.agentFormData = {
          power: label,
          agentType: 1,
          lawyerType: '',
          principalIds: '',
          attorneyKey: '',
          officeKey: '',
          practiseKey: '',
        };
        t.attorneyKeyList = t.officeKeyList = t.practiseKeyList = [];
      },
      handleSubmit(formName) {
        const t = this;
        t.$refs[formName].validate((valid) => {
          if (valid) {
            if (t.agentFormData.attorneyKey === '' || t.agentFormData.officeKey === '' || t.agentFormData.practiseKey === '') {
              t.$message({
                message: '请上传所有附件',
                type: 'error'
              });
              return;
            }
            t.agentFormData['powerDetail'] = t.powerDetailList.join(',');
            let paramsObj = {
              ...t.agentFormData,
              caseId: t.currentCaseId,
              agentId: t.currentEditAgent ? t.currentEditAgent.agentId : t.currentEditParticipant.id
            };

            this.$store
              .dispatch("relateManageStore/putRelateAddAgent", paramsObj)
              .then(res => {
                if (res.success) {
                  t.$message({
                    message: '添加成功',
                    type: 'success'
                  });
                  this.$router.go(-1)
                }
              });
          } else {
            return false;
          }
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .agent-detail {
    // background: #fff;
    width: 900px;
    margin: 0 auto;
    overflow: hidden;

    .title {
      color: #2b2c30;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      margin: 20px auto;
    }

    .agent-form-warp {
      background: #fff;
      padding: 50px 100px;
    }
  }
</style>

