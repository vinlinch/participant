<template>
  <div class="participant-detail">
    <div class="title" v-if="isreadonly?false:!propParams">仲裁参与人信息</div>
    <div class="participant-form-warp">
      <el-form
        ref="participantForm"
        :rules="participantFormRules"
        :model="participantFormData"
        class="details"
        label-position="right"
        label-width="200px"
      >
        <el-form-item label="仲裁参与人类型：" prop="type">
          <el-radio-group v-if="isEdit&&!currentEditParticipant"  v-model="participantFormData.type" size="small" @change="resetFormData">
            <el-radio-button label="1">个人</el-radio-button>
            <el-radio-button label="2">企业</el-radio-button>
          </el-radio-group>
          <p v-else>{{participantFormData.type | participantsType}}</p>
        </el-form-item>
        <el-form-item label="仲裁参与人实名认证编号：" prop="verifyCode">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.verifyCode" placeholder="请输入仲裁参与人实名认证编号"></el-input>
          <p v-else>{{participantFormData.verifyCode}}</p>
        </el-form-item>

        <el-form-item v-if="participantFormData.type==1" label="仲裁参与人名称：" prop="name">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.name" placeholder="请输入仲裁参与人名称"></el-input>
          <p v-else>{{participantFormData.name}}</p>
        </el-form-item>
        <el-form-item v-if="participantFormData.type==2" label="仲裁参与人名称：" prop="orgName">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.orgName" placeholder="请输入仲裁参与人名称"></el-input>
          <p v-else>{{participantFormData.orgName}}</p>
        </el-form-item>

        <el-form-item v-if="participantFormData.type==2" label="证照类型：" prop="identifyType">
          <el-select v-if="isEdit&&!lessCanEdit" v-model="participantFormData.identifyType" placeholder="请选择">
            <el-option label="多证合一营业执照" :value="1"></el-option>
            <el-option label="税务登记证" :value="2"></el-option>
            <el-option label="组织机构代码证" :value="3"></el-option>
            <el-option label="营业执照" :value="4"></el-option>
          </el-select>
          <p v-else>{{participantFormData.identifyType | identifyTypes}}</p>
        </el-form-item>
        <el-form-item v-if="participantFormData.type==2" label="证照号码：" prop="identifyNo">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.identifyNo" placeholder="请输入正确的证照号码"></el-input>
          <p v-else>{{participantFormData.identifyNo}}</p>
        </el-form-item>
        <el-form-item v-if="participantFormData.type==2" label="证照地址：" prop="identifyAddress">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.identifyAddress" type="textarea" placeholder="请输入正确的证照地址"></el-input>
          <p v-else>{{participantFormData.identifyAddress}}</p>
        </el-form-item>
        <el-form-item v-if="participantFormData.type==2" label="法定代表人或负责人：" prop="name">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.name"></el-input>
          <p v-else>{{participantFormData.name}}</p>
        </el-form-item>

        <el-form-item label="性别：" prop="sex">
          <el-radio-group v-if="isEdit&&!lessCanEdit" v-model="participantFormData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
          <p v-else>{{participantFormData.sex | sexs}}</p>
        </el-form-item>
        <el-form-item label="证件类型：" prop="idCardType">
          <el-select v-if="isEdit&&!lessCanEdit" v-model="participantFormData.idCardType" placeholder="请选择">
            <el-option label="军官证" :value="1"></el-option>
            <el-option label="实习律师证" :value="2"></el-option>
            <el-option label="律师执业证" :value="3"></el-option>
            <el-option label="户口薄" :value="4"></el-option>
            <el-option label="护照" :value="5"></el-option>
            <el-option label="身份证" :value="6"></el-option>
            <el-option label="驾照" :value="7"></el-option>
          </el-select>
          <p v-else>{{participantFormData.idCardType | idCardTypes}}</p>
        </el-form-item>
        <el-form-item label="证件号码：" prop="idCardNo">
          <el-input v-if="isEdit&&!lessCanEdit" v-model="participantFormData.idCardNo" placeholder="请输入正确的证件号码"></el-input>
          <p v-else>{{participantFormData.idCardNo}}</p>
        </el-form-item>

        <el-form-item v-if="participantFormData.type==2" label="职务：" prop="position">
          <el-select v-if="isEdit&&!lessCanEdit" v-model="participantFormData.position" placeholder="请选择">
            <el-option label="主任" value="1"></el-option>
            <el-option label="总经理" value="2"></el-option>
            <el-option label="董事长" value="3"></el-option>
            <el-option label="行长" value="4"></el-option>
          </el-select>
          <p v-else>{{participantFormData.position | position}}</p>
        </el-form-item>
        <el-form-item v-if="participantFormData.type==2" label="联系人：" prop="linkMan">
          <el-input v-if="isEdit" v-model="participantFormData.linkMan"></el-input>
          <p v-else>{{participantFormData.linkMan}}</p>
        </el-form-item>


        <el-form-item v-if="participantFormData.type==1" label="联系地址：" prop="cardAddress">
          <el-input
            v-if="isEdit&&!lessCanEdit"
            v-model="participantFormData.cardAddress"
            type="textarea"
            placeholder="请输入正确的联系地址"
          ></el-input>
          <p v-if="isEdit&&!lessCanEdit" style="font-size: 12px;color: #999;">以身份证、护照等有效证件所载地址为准</p>
          <p v-else>{{participantFormData.cardAddress}}</p>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobiles">
          <el-input v-if="isEdit" v-model="participantFormData.mobiles" placeholder="请输入联系电话"></el-input>
          <p v-else>{{participantFormData.mobiles}}</p>
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="emails">
          <el-input v-if="isEdit" v-model="participantFormData.emails" placeholder="请输入联系邮箱"></el-input>
          <p v-else>{{participantFormData.emails}}</p>
        </el-form-item>
        <el-form-item label="线下送达地址：" prop="address">
          <el-input v-if="isEdit" v-model="participantFormData.address" type="textarea" placeholder="请输入线下送达地址"></el-input>
          <p v-else>{{participantFormData.address}}</p>
        </el-form-item>
        <el-form-item label="邮编：" prop="zipCode">
          <el-input v-if="isEdit" v-model="participantFormData.zipCode" placeholder="请输入邮编"></el-input>
          <p v-else>{{participantFormData.zipCode}}</p>
        </el-form-item>
        <el-form-item v-if="!propParams&&!isreadonly" label="附件上传：" prop="" class="is-required">
          <el-row>
            <el-col :span="12">身份证正面</el-col>
            <el-col :span="12">身份证反面</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-upload
                ref="reffrontKey"
                :disabled="!isEdit||lessCanEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="frontKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'frontKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'frontKey')"
                :class="{ 'upload-disable':participantFormData.frontKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-upload
                ref="refbehindKey"
                :disabled="!isEdit||lessCanEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="behindKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'behindKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'behindKey')"
                :class="{ 'upload-disable':participantFormData.behindKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row v-if="participantFormData.type==2">
            <el-col :span="12">营业执照</el-col>
            <el-col :span="12">职务证明</el-col>
          </el-row>
          <el-row v-if="participantFormData.type==2">
            <el-col :span="12">
              <el-upload
                ref="refidentifyKey"
                :disabled="!isEdit||lessCanEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="identifyKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'identifyKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'identifyKey')"
                :class="{ 'upload-disable':participantFormData.identifyKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
            <el-col :span="12">
              <el-upload
                ref="refpostKey"
                :disabled="!isEdit||lessCanEdit"
                :action="uploadUrl"
                list-type="picture-card"
                :limit="1"
                :file-list="postKeyList"
                :before-upload="beforeUpload"
                :on-success="(res,file)=>handleAvatarSuccess(res,file,'postKey')"
                :on-preview="handlePictureCardPreview"
                :on-remove="(file, fileList)=>handleRemove(file, fileList,'postKey')"
                :class="{ 'upload-disable':participantFormData.postKey !== '' }"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-col>
          </el-row>
          <el-row v-if="isEdit">
            <p v-if="participantFormData.type==1" style="font-size: 12px;color: #999;">上传的附件应包含且不限于仲裁参与人身份证件正面和反面</p>
            <p v-else style="font-size: 12px;color: #999;">上传的附件应包含且不限于仲裁参与人证照、仲裁参与人法定代表人或负责人身份证件正面和反面、法定代表人或负责人职务证明文件</p>
          </el-row>
        </el-form-item>
        <el-form-item v-else label="附件列表：" prop="">
          <p>{{participantFormData.filename}}</p>
        </el-form-item>
        <el-form-item v-if="isreadonly?false:!propParams">
          <el-button v-if="isEdit" type="primary" @click="handleSubmit('participantForm')">保存</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--<div>{{participantFormData.frontKey}}</div>-->
    <!--<hr>-->
    <!--<div>{{currentEditParticipant}}</div>-->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {mapState} from "vuex";
  import * as validate from "assets/js/utils/validate";

  export default {
    props: {
      propParams: {
        type: Object
      },
      isreadonly: {
        type: Boolean,
        default:false
      }
    },
    data() {
      return {
        lessCanEdit:false,
        isEdit:this.isreadonly?false:this.$route.query.edit,
        frontKeyList:[],
        behindKeyList:[],
        identifyKeyList:[],
        postKeyList:[],
        dialogVisible: false,
        dialogImageUrl: '',
        uploadUrl: "/arb/file/upload",
        participantFormData: {
          type: 1,
          sex: 1,
          frontKey: '',
          behindKey: '',
          identifyKey: '',
          postKey: ''
        },
        participantFormRules: {
          name: [
            {
              required: true,
              message: "请输入正确的仲裁参与人名称",
              trigger: "blur"
            },
            {min: 1, max: 20, message: "长度不超过20", trigger: "blur"}
          ],
          orgName: [
            {required: true, message: "仲裁参与人名称", trigger: "blur"},
            {min: 1, max: 50, message: "长度不超过50", trigger: "blur"}
          ],
          // type: [{ required: true, message: "请选择仲裁参与人类型", trigger: "change" }],
          idCardType: [
            {required: true, message: "请选择证件类型", trigger: "change"}
          ],
          position: [
            {required: true, message: "请选择职务", trigger: "change"}
          ],
          sex: [{required: true, message: "请选择性别！", trigger: "change"}],
          idCardNo: [
            {required: true, validator: validate.validateidCard, trigger: "blur"}
          ],
          identifyNo: [
            {required: true, message: "请输入证照号码！", trigger: "blur"}
          ],
          identifyAddress: [
            {required: true, message: "请输入证照地址", trigger: "blur"}
          ],
          cardAddress: [
            {
              required: true,
              message: "请输入正确的联系地址",
              trigger: "blur"
            },
            {min: 1, max: 50, message: "长度不超过50", trigger: "blur"}
          ],
          mobiles: [{required: true, validator: validate.validateTel, trigger: "blur"}],
          identifyType: [
            {required: true, message: "请选择证照类型", trigger: "change"}
          ],
          emails: [
            {required: true, validator: validate.validateEmail, trigger: "blur"},
            {min: 1, max: 50, message: "长度不超过50", trigger: "blur"}
          ],
          address: [
            {required: true, message: "请输入线下送达地址", trigger: "blur"},
            {min: 1, max: 50, message: "长度不超过50", trigger: "blur"}
          ]
        },
      };
    },
    computed: {
      ...mapState('homePageStore', {
        currentEditParticipant: state => state.currentEditParticipant
      })
    },
    mounted() {
      const t = this;
      if (t.propParams) {
        t.participantFormData = t.propParams;
        t.setInitData();
      } else {
        if (t.currentEditParticipant) {
          //编辑 或 查看
          let actionName = t.currentEditParticipant.type===1?'getParticipantsGetPersonal':'getSeearbitrateCom'
          t.$store.dispatch(`homePageStore/${actionName}`, t.currentEditParticipant.id || t.currentEditParticipant.agentId)
            .then(res => {
              console.info(res);
              if(res.code==10002){
                t.lessCanEdit = true;
              }
              t.participantFormData = res.data;
              t.setInitData();
            })
        }
      }
    },
    // computed: {},
    methods: {
      setInitData(){
        const t = this;
        t.frontKeyList.push({url:'data:image/jpg;base64,'+t.participantFormData.frontKeyBase || ''});
        t.behindKeyList.push({url:'data:image/jpg;base64,'+t.participantFormData.behindKeyBase || ''});
        t.identifyKeyList.push({url:'data:image/jpg;base64,'+t.participantFormData.identifyKeyBase || ''});
        t.postKeyList.push({url:'data:image/jpg;base64,'+t.participantFormData.postKeyBase || ''});
      },
      handleAvatarSuccess(res, file,keyName) {
        // console.info(res,file,keyName)
        if(res.success){
          this.participantFormData[keyName] = res.data.fileId;
        }else{
          this.$refs['ref'+keyName].clearFiles();
          this.$message.error(res.message);
        }
      },
      beforeUpload(file) {
        const isImg = (file.type === 'image/jpeg'||file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isImg) {
          this.$message.error('仅支持 jpeg、png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('大小不能超过 2MB!');
        }
        return isImg && isLt2M;
      },
      handleRemove(file, fileList,keyName) {
        setTimeout(()=>{
          this.participantFormData[keyName] = '';
          this[keyName+'List'] = [];
        },450)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      resetFormData(label){
        const t = this;
        t.participantFormData = {
            type: label,
            sex: 1,
            frontKey: '',
            behindKey: '',
            identifyKey: '',
            postKey: ''
        }
        t.frontKeyList = t.behindKeyList = t.identifyKeyList = t.postKeyList = [];
      },
      handleSubmit(formName) {
        const t = this;
        t.$refs[formName].validate((valid) => {
          if (valid) {
            if (t.participantFormData.type == 1) {
              //个人
              if(t.participantFormData.frontKey===''||t.participantFormData.behindKey===''){
                t.$message({
                  message: '请上传所有附件',
                  type: 'error'
                });
                return;
              }
              this.$store
                .dispatch("homePageStore/postAddarbitrate", t.participantFormData)
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
              //企业
              if(t.participantFormData.frontKey===''||t.participantFormData.behindKey===''||t.participantFormData.identifyKey===''||t.participantFormData.postKey===''){
                t.$message({
                  message: '请上传所有附件',
                  type: 'error'
                });
                return;
              }
              this.$store
                .dispatch("homePageStore/postAddarbitratecom", t.participantFormData)
                .then(res => {
                  if (res.success) {
                    t.$message({
                      message: '添加成功',
                      type: 'success'
                    });
                    this.$router.go(-1)
                  }
                });
            }
          } else {
            return false;
          }
        });
      },
    }
  };
</script>
<style lang="scss" scoped>
  .participant-detail {
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

    .participant-form-warp {
      background: #fff;
      padding: 50px 100px;
    }
  }
</style>

