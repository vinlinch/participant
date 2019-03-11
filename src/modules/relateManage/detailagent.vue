<template>
  <div class="detailagent">
    <div class="title">代理人信息</div>
    <div v-if="propParams">
      <list :propParams="propParams"></list>
    </div>
    <div v-else>
      <list></list>
    </div>
    <div class="arbitrateedit">
      <!-- 编辑 -->
      <el-form
        v-if="general"
        ref="arbitratetypes"
        :rules="rules"
        :model="arbitratetypes"
        label-position="right"
        label-width="200px"
        class="general"
      >
        <el-form-item label="代理人权限：" prop="power">
          <el-radio-group v-model="arbitratetypes.power" size="small" @change="getStyle">
            <el-radio-button label="1">一般代理</el-radio-button>
            <el-radio-button label="2">特殊代理</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div v-if="powertypes">
          <el-form-item label="代理人类型：" prop="agentType">
            <el-radio-group v-model="arbitratetypes.agentType" @change="chooseagentType">
              <el-radio :label="1">律师代理</el-radio>
              <el-radio :label="2">其他代理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="执业证类型：" prop="lawyerType">
            <el-select v-model="arbitratetypes.lawyerType" placeholder="请选择">
              <el-option label="实习律师证" :value="2"></el-option>
              <el-option label="律师执业证" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执业证号：" prop="lawyerNo">
            <el-input v-model="arbitratetypes.lawyerNo" placeholder="请输入正确的执业证号"></el-input>
          </el-form-item>
          <el-form-item label="工作单位：" prop="workUnit">
            <el-input v-model="arbitratetypes.workUnit" placeholder="请输入正确的工作单位"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-input v-model="arbitratetypes.position" placeholder="请输入职务"></el-input>
          </el-form-item>
          <el-form-item label="委托人：" prop="principalIds">
            <el-select v-model="arbitratetypes.principalIds" placeholder="请选择">
              <el-option
                v-for="item in principalIds"
                :key="item.type"
                :label="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附件上传">
            <p class="tip">仅支持pdf、png、jpg文件大小不超过2M</p>
            <div class="uploadImg">
              <div class="upload" style="overflow:hidden;display:flex">
                <div class="isActive">
                  <el-upload
                    ref="upload"
                    drag
                    v-model="arbitratetypes.attorneyKey"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :on-change="upChange"
                    :on-error="handleAvatarerror"
                    :on-success="handleSucess"
                    :limit="1"
                    :on-exceed="handleExceed"
                    :action="imageUrl"
                    :file-list="fileList"
                    :before-remove="beforeRemove"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text" style="padding:0 35px">上传授权委托书</div>
                  </el-upload>
                </div>
                <div class="isActive">
                  <el-upload
                    ref="upload2"
                    drag
                    v-model="arbitratetypes.officeKey"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove2"
                    :before-remove="beforeRemove"
                    :before-upload="beforeUpload"
                    :on-success="handleSucess2"
                    :on-change="upChange2"
                    :on-error="handleAvatarerror2"
                    :limit="1"
                    :action="imageUrl"
                    :file-list="fileList"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text" style="padding:0 35px">上传律师执业证</div>
                  </el-upload>
                </div>
                <div class="isActive">
                  <el-upload
                    ref="upload3"
                    drag
                    v-model="arbitratetypes.practiseKey"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove3"
                    :before-remove="beforeRemove"
                    :before-upload="beforeUpload"
                    :on-change="upChange3"
                    :on-error="handleAvatarerror3"
                    :on-success="handleSucess3"
                    :limit="1"
                    :action="imageUrl"
                    :file-list="fileList"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text" style="padding:0 35px">上传律师所函</div>
                  </el-upload>
                </div>
              </div>
              <p class="tipdetail">*上传的附件应包含且不限于 代理人授权委托书；律师执业证（律师代理）、律师所函（律师代理）</p>
            </div>
          </el-form-item>
        </div>
        <div v-if="!powertypes">
          <el-form-item label="代理人类型：" prop="agentType">
            <el-radio-group v-model="arbitratetypes.agentType" @change="chooseagentType">
              <el-radio :label="1">律师代理</el-radio>
              <el-radio :label="2">其他代理</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="特殊代理权限：" prop="powerDetail">
            <el-checkbox-group v-model="arbitratetypes.powerDetail" @change="handleChange">
              <!-- <el-checkbox :label="1">代为提起仲裁请求</el-checkbox>
              <el-checkbox :label="2">代为参加庭审、质证，辩论</el-checkbox>
              <el-checkbox :label="3">代为和解、调解</el-checkbox>
              <el-checkbox :label="4">代为主张、变更、放弃仲裁</el-checkbox>
              <el-checkbox :label="5">代为签收法律文书</el-checkbox>
              <el-checkbox :label="6">代为申请执行</el-checkbox>-->
              <el-checkbox
                class="checkbox"
                v-for="option in pows"
                :checked="checked"
                :label="option.key"
                :key="option.key"
              >{{option.title}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="执业证类型：" prop="lawyerType">
            <el-select v-model="arbitratetypes.lawyerType" placeholder="请选择">
              <el-option label="实习律师证" :value="2"></el-option>
              <el-option label="律师执业证" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="执业证号：" prop="lawyerNo">
            <el-input v-model="arbitratetypes.lawyerNo" placeholder="请输入正确的执业证号"></el-input>
          </el-form-item>
          <el-form-item label="工作单位：" prop="workUnit">
            <el-input v-model="arbitratetypes.workUnit" placeholder="请输入正确的工作单位"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-input v-model="arbitratetypes.position" placeholder="请输入职务"></el-input>
          </el-form-item>
          <el-form-item label="委托人：" prop="principalIds">
            <el-select v-model="arbitratetypes.principalIds" placeholder="请选择">
              <el-option
                v-for="item in principalIds"
                :key="item.type"
                :label="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="附件上传">
            <p class="tip">仅支持pdf、png、jpg文件大小不超过2M</p>
            <div class="uploadImg">
              <div class="upload" style="overflow:hidden;display:flex">
                <div class="isActive">
                  <el-upload
                    ref="upload"
                    drag
                    v-model="arbitratetypes.attorneyKey"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :on-change="upChange"
                    :on-error="handleAvatarerror"
                    :on-success="handleSucess"
                    :limit="1"
                    :action="imageUrl"
                    :file-list="fileList"
                    :before-remove="beforeRemove"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text" style="padding:0 35px">上传授权委托书</div>
                  </el-upload>
                </div>
                <div class="isActive">
                  <el-upload
                    ref="upload2"
                    drag
                    v-model="arbitratetypes.officeKey"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove2"
                    :before-upload="beforeUpload"
                    :on-success="handleSucess2"
                    :on-change="upChange2"
                    :on-error="handleAvatarerror2"
                    :limit="1"
                    :action="imageUrl"
                    :file-list="fileList"
                    :before-remove="beforeRemove"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text" style="padding:0 35px">上传律师执业证</div>
                  </el-upload>
                </div>
                <div class="isActive">
                  <el-upload
                    ref="upload3"
                    drag
                    v-model="arbitratetypes.practiseKey"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove3"
                    :before-upload="beforeUpload"
                    :on-change="upChange3"
                    :on-error="handleAvatarerror3"
                    :on-success="handleSucess3"
                    :limit="1"
                    :action="imageUrl"
                    :file-list="fileList"
                    :before-remove="beforeRemove"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text" style="padding:0 35px">上传律师所函</div>
                  </el-upload>
                </div>
              </div>
              <p class="tipdetail">*上传的附件应包含且不限于 代理人授权委托书；律师执业证（律师代理）、律师所函（律师代理）</p>
            </div>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" @click="agentsave('arbitratetypes')">保存</el-button>
          <el-button @click="cancles">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 查看 -->
      <el-form
        v-if="!general"
        v-show="seeform"
        ref="arbitratetypes"
        :rule="rules"
        :model="arbitratetypes"
        label-position="right"
        label-width="200px"
        class="general"
        style="background:none"
      >
        <el-form-item label="代理人权限：">
          <p>{{ arbitratetypes.power|powers }}</p>
        </el-form-item>
        <el-form-item label="代理人类型：">
          <p>{{ arbitratetypes.agentType|agentTypes }}</p>
        </el-form-item>
        <el-form-item label="执业证类型：">
          <p>{{ arbitratetypes.lawyerType|lawyerTypes }}</p>
        </el-form-item>
        <el-form-item label="执业证号：">
          <p>{{ arbitratetypes.lawyerNo }}</p>
        </el-form-item>
        <el-form-item label="工作单位：">
          <p>{{ arbitratetypes.workUnit }}</p>
        </el-form-item>
        <el-form-item label="职务：">
          <p>{{ arbitratetypes.position }}</p>
        </el-form-item>
        <el-form-item label="委托人：">
          <p>{{ arbitratetypes.principalIds }}</p>
        </el-form-item>
        <el-form-item label="附件：">
          <ul v-for="(item,id) in fileList" :key="id" class="files">
            <li>{{item.name}}</li>
          </ul>
        </el-form-item>
        <el-form-item>
          <p class="tipdetail">*上传的附件应包含且不限于 代理人授权委托书；律师执业证（律师代理）、律师所函（律师代理）</p>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cancles">返回</el-button>
        </el-form-item>
      </el-form>
      <!-- <el-form>

      </el-form>-->
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import list from "modules/homePage/List";
import { isArray, isRegExp } from 'util';
export default {
  components: {
    list
  },
  props: {
    propParams: {
      type: Object
    }
  },
  data() {
    return {
      fileList: [],
      fileLists: [],
      List:[],
      attorneyKey:true,
      checkArr: [],
      pows: [
        {
          title: "代为提起仲裁要求",
          key: "1"
        },
        {
          title: "代为参加庭审、质证，辩论",
          key: "2"
        },
        {
          title: "代为和解、调解",
          key: "3"
        },
        {
          title: "代为主张、变更、放弃仲裁",
          key: "4"
        },
        {
          title: "代为签收法律文书",
          key: "5"
        },
        {
          title: "代为申请执行",
          key: "6"
        }
      ],
      rules: {
        lawyerType: [
          { required: true, message: "请选择证照类型", trigger: "change" }
        ],
        lawyerNo: [
          { required: true, message: "请输入执业证号", trigger: "blur" }
        ],
        workUnit: [
          { required: true, message: "请输入工作单位", trigger: "blur" }
        ],
        position: [{ required: true, message: "请输入职务", trigger: "blur" }],
        principalIds: [
          { required: true, message: "请选择委托人", trigger: "change" }
        ]
      },
      arbitratetype: {},
      arbitratetypes: {
        power: 1,
        agentType: 1
      },
      dictOptions: [],
      principalIds: [
        {
          type: "",
          name: "",
          id: ""
        }
      ],
      checked: false,
      seeid: "",
      typetabs: "",
      types: 1,
      power: 1,
      agentType: 1,
      general: false,
      seeform: false,
      special: false,
      powertypes: true,
      sees: false,
      dialogImageUrl: "",
      dialogVisible: false,
      isActive2: "",
      isActive3: "",
      isActive4: "",
      isActive5: "",
      upload: false,
      upload2: false,
      upload3: false,
      upload4: false,
      imageUrl: "/arb/file/upload"
    };
  },
  computed: {
    ...mapState("relateManageStore", {
      ApplicantsList: state => state.ApplicantsList,
      currentCaseId: state => state.currentCaseId
    })
  },
  //  created(){
  //  this.optionss()
  // },
  mounted() {
    this.id = this.$route.query.id;//申请人id
    this.agentId = this.$route.query.agentId;//代理人agentId
    this.types = this.$route.query.types;//参与人类型 types 1：为个人 2：为企业
    this.general = this.$route.query.general;//编辑代理人 true：为代理人编辑界面
    this.sees = this.$route.query.sees;//查看代理人 true 为代理人查看界面
    const t = this;

    if(t.propParams){
      this.general = false;
      this.seeform = true;

      this.arbitratetypes = t.propParams;

      this.fileList = t.propParams.filenames.map((strs, uid) => {
        return { name:strs, uid: uid }
      });
    }else{
      if (this.id) {
        this.general = true;
      } else if (this.agentId) {
        if (this.sees) {
          console.log(t.currentCaseId, this.agentId);
          this.general = false;
          this.seeform = true;
        } else {
          this.general = true;
          this.seeform = false;
        }
        t.$store
          .dispatch("relateManageStore/putRelateSeeAgent", {
            caseId: t.currentCaseId,
            id: this.agentId
          })
          .then(res => {
            this.arbitratetypes = res.data;
            // this.lists=res.data.filenames;
            // console.log(this.lists)
            // for(var i in this.lists){

            //    let strs=this.lists[i]
            //      console.log(strs)
            // }

            this.fileList = res.data.filenames.map((strs, uid) => {
              return { name:strs, uid: uid }

            });

            console.log(this.fileList)


            // for (let item of this.fileList.entries()) {
            //   console.log(item[0], item[1].name);

            // }
            //  for(var i in this.fileList){
            //     console.log(this.fileList[i].uid,this.fileList[i].name)
            //  }
//           　this.fileList.forEach((name,key)=>{
// 　　　　　　   console.log(key+'='+name);
// 　　　　     });
            console.log(this.fileList[0].uid,this.fileList[0].name)
          });
      }
    }
    this.optionss();
  },
  methods: {
    optionss() {
      const t = this;
      t.$store
        .dispatch("relateManageStore/getRelateGetApplicants", t.currentCaseId)
        .then(res => {
          this.principalIds = t.ApplicantsList;
        });
    },
    handleChange() {
      this.isCheckedAll = this.checkArr.length;
      console.log(this.checkArr.length);
    },
    beforeUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error("上传图片不能大于2M");
        return false;
      }
      console.log(file.name);
      console.log("33", this.fileList.name);
    },
    handleRemove(file, fileList) {
      if (fileList.length < 1) {
        this.isActive2 = false;
      }
    },
    handleExceed(file, fileList) {
      this.$message.warning("仅能上传一份授权委托书，请删除后再上传");
    },
    upChange(file, fileList) {
      if (fileList.length > 0) {
        this.isActive2 = true;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarerror() {
      this.$message.error("身份证正面面上传失败");
    },
    handleSucess(res, file, fileList) {
      console.log(res);
      this.upload = true;
      this.arbitratetypes.attorneyKey = res.data.fileId;
      // if(this.arbitratetypes.attorneyKey)
    },
    handleRemove2(file, fileList) {
      if (fileList.length < 1) {
        this.isActive3 = false;
      }
    },
    upChange2(file, fileList) {
      if (fileList.length > 0) {
        this.isActive3 = true;
      }
    },
    handleAvatarerror2() {
      this.$message.error("身份证反面上传失败");
    },
    handleSucess2(res) {
      console.log(res);
      this.upload2 = true;
      this.arbitratetypes.officeKey = res.data.fileId;
      console.log(this.arbitratetypes.officeKey);
    },
    handleRemove3(file, fileList) {
      if (fileList.length < 1) {
        this.isActive4 = false;
      }
    },
    upChange3(file, fileList) {
      if (fileList.length > 0) {
        this.isActive4 = true;
      }
    },
    handleAvatarerror3() {
      this.$message.error("营业执照上传失败");
    },
    handleSucess3(res) {
      console.log(res);
      this.upload3 = true;
      this.arbitratetypes.practiseKey = res.data.fileId;
      console.log(this.arbitratetypes.practiseKey);
    },
    cancles() {
      this.$router.go(-1);
    },
    chooseagentType(val) {
      this.arbitratetypes.agentType = val;
      console.log(val);
      // if(this.arbitratetypes.agentType==1){
      //   this.general
      // }
    },
    getStyle(style) {
      this.arbitratetypes.power = style;
      if (this.arbitratetypes.power == 1) {
        this.powertypes = true;
      } else {
        this.powertypes = false;
      }
    },
    agentsave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const t = this;
          if (this.id) {
            t.$store
              .dispatch("relateManageStore/putRelateAddAgent", {
                caseId: t.currentCaseId,
                agentId: this.id,
                id: this.id,
                agentType: this.arbitratetypes.agentType,
                attorneyKey: this.arbitratetypes.attorneyKey,
                lawyerNo: this.arbitratetypes.lawyerNo,
                lawyerType: this.arbitratetypes.lawyerType,
                officeKey: this.arbitratetypes.officeKey,
                position: this.arbitratetypes.position,
                power: this.arbitratetypes.power,
                powerDetail: this.arbitratetypes.powerDetail,
                practiseKey: this.arbitratetypes.practiseKey,
                principalIds: this.arbitratetypes.principalIds,
                workUnit: this.arbitratetypes.workUnit
              })
              .then(res => {
                if (
                  valid &&
                  this.arbitratetypes.attorneyKey &&
                  this.arbitratetypes.officeKey &&
                  this.arbitratetypes.practiseKey
                ) {
                  this.arbitratetypes = res;
                  this.$message({
                    type: "success",
                    message: "添加成功！"
                  });
                  this.$router.go(-1);
                } else {
                  this.$message({
                    type: "error",
                    message: "请上传证件"
                  });
                }
              });
          } else {
            t.$store
              .dispatch("relateManageStore/putRelateEditAgent", {
                agentId: this.agentId,
                caseId: t.currentCaseId,
                agentType: this.arbitratetypes.agentType,
                id: this.agentId,
                attorneyKey: this.arbitratetypes.attorneyKey,
                lawyerNo: this.arbitratetypes.lawyerNo,
                lawyerType: this.arbitratetypes.lawyerType,
                officeKey: this.arbitratetypes.officeKey,
                position: this.arbitratetypes.position,
                power: this.arbitratetypes.power,
                powerDetail: this.arbitratetypes.powerDetail,
                practiseKey: this.arbitratetypes.practiseKey,
                principalIds: this.arbitratetypes.principalIds,
                workUnit: this.arbitratetypes.workUnit
              })
              .then(res => {
                if (
                  valid &&
                  this.arbitratetypes.attorneyKey &&
                  this.arbitratetypes.officeKey &&
                  this.arbitratetypes.practiseKey
                ) {
                  this.arbitratetypes = res;
                  this.$message({
                    type: "success",
                    message: "编辑成功！"
                  });
                  this.$router.go(-1);
                } else {
                  this.$message({
                    type: "error",
                    message: "请上传证件"
                  });
                }
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detailagent {
  width: 900px;
  margin: 0 auto;
  .title {
    color: #2b2c30;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 40px auto;
  }
  // .arbitrateedit {
  //   padding: 50px 100px;
  // }
  .tip {
    color: #9fa0a4;
  }
  .tipdetail {
    color: #d20000;
  }
  .upload {
    margin: 20px auto;
    .files li {
      float: left;
    }
  }
  .upload .isActive {
    width: 180px;
    margin-right: 20px;
  }
  .el-form-item__content {
    margin-left: 80px;
  }
  .general {
    background-color: #fff;
    padding: 20px 0;
    margin-top: 50px;
  }
}
</style>
