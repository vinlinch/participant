<template>
  <div class="evidence">
    <!--<div class="title">合同1</div>-->
    <div class="card-box">
      <!--<div>{{evidenceFormData}}</div>-->
      <div class="evidence-form-warp">
        <!--<div>{{evidenceFormData.fileKeys}}</div>-->
        <!--<br>-->
        <!--<div>{{evidenceFormData.fileList}}</div>-->
        <!--<div>{{fileList}}</div>-->
        <el-form :model="evidenceFormData" :rules="evidenceFormRules" ref="evidenceForm" label-width="140px">
          <el-form-item label="证据提供方" prop="princialIds">
            <el-select v-if="isEdit" v-model="evidenceFormData.princialIds" placeholder="请选择">
              <el-option
                v-for="item in ApplicantsList"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              >
              </el-option>
            </el-select>
            <p v-else>{{ evidenceFormData.principalNames }}</p>
          </el-form-item>
          <el-form-item label="证据名称" prop="name">
            <el-input v-if="isEdit" v-model="evidenceFormData.name"></el-input>
            <p v-else>{{ evidenceFormData.name }}</p>
          </el-form-item>
          <el-form-item label="有无原件" prop="hasOriginal">
            <el-radio-group v-if="isEdit" v-model="evidenceFormData.hasOriginal">
              <el-radio :label="1">有</el-radio>
              <el-radio :label="0">没有</el-radio>
            </el-radio-group>
            <p v-else>{{ evidenceFormData.hasOriginal | hasOriginal }}</p>
          </el-form-item>
          <el-form-item label="证明内容" prop="content">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-if="isEdit"
                      v-model="evidenceFormData.content"></el-input>
            <p v-else>{{ evidenceFormData.content }}</p>
            <p v-if="isEdit" style="font-size: 12px;color: #999;">还可以输入<span style="color: #4b4eff;">{{(600-evidenceFormData.content.length)>0?(600-evidenceFormData.content.length):0}}</span>/600字
            </p>
          </el-form-item>
          <el-form-item label="证据附件上传" class="is-required">
            <el-upload
              style="text-align: left"
              :disabled="!isEdit"
              accept="image/*,.doc, .docx,.pdf"
              action="/arb/file/upload"
              :before-upload="beforeUpload"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="10"
              :on-exceed="handleExceed"
              :on-success="handleUpdSuccess"
              :file-list="fileList"
            >
              <el-button size="small" icon="el-icon-upload" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">支持doc/docx/pdf/png/jpg/jpeg格式,文件大小不能超过2M</div>
            </el-upload>
            <!--<el-input type="textarea" v-if="isEdit" v-model="evidenceFormData.content"></el-input>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer" v-if="!propParams">
      <el-button v-if="isEdit" type="primary" @click="submitForm('evidenceForm')">提交</el-button>
      <el-button @click="$router.push('/relate/step-list?active=6')">返回</el-button>
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
        fileList: [],
        isEdit: true,
        imgDialogShow: false,
        dialogImageUrl: '',
        evidenceFormData: {
          caseId: "",
          content: "",
          hasOriginal: 1,
          evidenceId: "",
          fileKeys: [],
          itemId: "",
          name: "",
          princialIds: ""
        },
        evidenceFormRules: {
          princialIds: [
            {required: true, message: '请选择', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {min: 1, max: 50, message: '最多输入50个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {min: 1, max: 600, message: '最多输入600个字符', trigger: 'blur'}
          ]
        }
      };
    },
    computed: {
      ...mapState("relateManageStore", {
        ApplicantsList: state => state.ApplicantsList,
        currentEditevidence: state => state.currentEditevidence,
        currentCaseId: state => state.currentCaseId
      })
    },
    created() {
      const t = this;
      // console.info('this.currentEditevidence=====', t.currentEditevidence)
      let tempobj = {};
      if(t.propParams) {
        tempobj = t.propParams
      }else{
        if(t.currentEditevidence){
          tempobj = t.currentEditevidence;;
        }
      }


      if (typeof tempobj.fileKeys == 'string') {
        tempobj.hasOriginal = parseInt(tempobj.hasOriginal);
        tempobj.fileKeys = tempobj.fileKeys.split(',');
        t.fileList = tempobj.filenames.map(item=>{console.info(item);return {name:item.fileName,fileId:item.fileId}});
        t.evidenceFormData = tempobj;
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
      if(t.isEdit){
        t.$store.dispatch('relateManageStore/getRelateGetApplicants', t.currentCaseId)
      }
    },
    methods: {
      submitForm(formName) {
        const t = this;
        t.$refs[formName].validate((valid) => {
          if (valid) {
            t.evidenceFormData.caseId = t.currentCaseId;
            if (t.evidenceFormData.fileKeys.length === 0 || t.evidenceFormData.fileKeys === '') {
              t.$message.error("未上传证据！");
            } else {
              if (t.isEdit) {
                //新增模式 数组转字符串
                t.evidenceFormData.fileKeys = t.evidenceFormData.fileKeys.join(',');
              }
              t.$store.dispatch('relateManageStore/postEvidenceAdd', t.evidenceFormData)
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
      },
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      // handlePreview(file) {
      //   console.log(file);
      // },
      handleExceed(files, fileList) {
        this.$message.warning('仅能上传一份仲裁申请书，请删除后再上传');
      },
      beforeRemove(file, fileList) {
        const t = this;
        console.info('file-----',file)
        // return t.$confirm(`确定移除 ${file.name}？`);
        let fileId = file.response?file.response.data.fileId:file.fileId;
        let cindex = t.evidenceFormData.fileKeys.indexOf(fileId)
        t.evidenceFormData.fileKeys.splice(cindex, 1);
        console.info('t.evidenceFormData.fileKeys',t.evidenceFormData.fileKeys)
      },
      handleUpdSuccess(response) {
        const t = this;
        if (response.success) {
          t.evidenceFormData.fileKeys.push(response.data.fileId)
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../../../../assets/scss/helpers.scss";

  .evidence {
    height: 100%;
    /*min-height: 100vh;*/

    .title {
      text-align: center;
      margin: 30px auto;
      font-size: 16px;
      font-weight: 400;
      color: #2B2C30;
    }

    .evidence-form-warp {
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

