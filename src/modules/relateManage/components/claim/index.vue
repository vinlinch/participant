<template>
  <div class="claim">
    <!--<div class="title" v-if="isEdit">请求信息</div>-->
    <div style="text-align: right" v-if="isEdit">
      <el-button icon="el-icon-circle-plus-outline" @click="handleToAdd">新增请求项</el-button>
    </div>
    <div class="applicants-table-warp card-box" v-if="isEdit">
      <el-table :data="claimList">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="请求内容" prop="claimContent"></el-table-column>
        <el-table-column label="申请人" prop="principalNames"></el-table-column>
        <el-table-column label="请求类型" prop="claimType">
          <template
            slot-scope="scope"
          >{{scope.row.claimType==1?'确认之诉':scope.row.claimType==2?'给付之诉':'形成之诉'}}</template>
        </el-table-column>
        <el-table-column label="请求标的额" prop="disputeFee"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleToDetail(scope.row)">查看</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="claim-form-warp">
      <el-form
        :model="cliamIndexFormData"
        :rules="claimIndexFormRules"
        ref="claimForm"
        label-width="140px"
      >
        <el-form-item label="案由" prop="code">
          <el-select v-if="isEdit" v-model="cliamIndexFormData.code" placeholder="请选择">
            <el-option
              v-for="item in claimListresons"
              :label="item.name"
              :value="item.code"
              :key="item.briefId"
            ></el-option>
          </el-select>
          <p v-else>{{ cliamIndexFormData.code | anyou }}</p>
        </el-form-item>
        <el-form-item label="争议标的总额" prop="disputeFee">
          <el-input v-if="isEdit" v-model="cliamIndexFormData.disputeFee"></el-input>
          <p v-else>{{ cliamIndexFormData.disputeFee }}</p>
        </el-form-item>
        <el-form-item label="事实和理由" prop="reason">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 10}"
            v-if="isEdit"
            v-model="cliamIndexFormData.reason"
          ></el-input>
          <p v-else>{{ cliamIndexFormData.reason }}</p>
          <p v-if="isEdit" style="font-size: 12px;color: #999;">还可以输入
            <span
              style="color: #4b4eff;"
            >{{(600-cliamIndexFormData.reason.length)>0?(600-cliamIndexFormData.reason.length):0}}</span>/600字
          </p>
        </el-form-item>
        <el-form-item v-if="isEdit">
          <el-button type="primary" @click="submitForm('claimForm')">保存</el-button>
          <el-button @click="resetForm('claimForm')">重置</el-button>
        </el-form-item>
        <el-form-item label="仲裁申请书上传" class="is-required">
          <el-upload
            ref="refupload"
            style="text-align: left"
            :disabled="!isEdit"
            accept="pdf"
            action="/arb/claim/uploadBook"
            :data="{caseId:currentCaseId}"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" icon="el-icon-upload" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">仅支持pdf格式，大小不能超过1M</div>
          </el-upload>
          <div class="tools">
            <el-button
              v-if="!reasonInfo.applyKey&&fileList.length===1"
              type="primary"
              size="small"
              icon="el-icon-document"
              @click="$router.push('/relate/claim-sign')"
            >签署</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as AT from "../../store/actionTypes";

export default {
  components: {},
  props: {
    isDisabled: {
      type: Number
    }
  },
  data() {
    return {
      reasonInfo: {
        applyKey: ""
      },
      isEdit: true,
      fileList: [],
      cliamIndexFormData: {
        caseId: "",
        disputeFee: "",
        reason: "",
        briefId: ""
      },
      claimIndexFormRules: {
        code: [{ required: true, message: "请选择", trigger: "blur" }],
        disputeFee: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 1, max: 10, message: "最多输入10个字符", trigger: "blur" }
        ],
        reason: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 1, max: 600, message: "最多输入600个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("relateManageStore", {
      claimListresons: state => state.claimListresons,
      claimList: state => state.claimList,
      currentCaseId: state => state.currentCaseId
    })
  },
  mounted() {
    //查询合同列表
    const t = this;
    t.isEdit = !t.isDisabled;
    t.$store.dispatch("relateManageStore/getClaimList", t.currentCaseId);
    t.$store.dispatch("relateManageStore/postClaimGetBrief", t.claimListresons);
    t.$store
      .dispatch("relateManageStore/postClaimGetReason", {
        caseId: t.currentCaseId
      })
      .then(res => {
        console.info(res);
        res.data.disputeFee = res.data.disputeFee.toString();
        t.reasonInfo = t.cliamIndexFormData = res.data;
        if (res.data.applyKey) {
          t.fileList.push({
            name: res.data.applyKeyName,
            fileId: res.data.applyKey
          });
        }
      });
  },
  methods: {
    handleToAdd() {
      this.$store.commit("relateManageStore/" + AT.SET_CURRENTEDITCLAIM, null);
      this.$router.push("/relate/claim-edit");
    },
    handleEdit(row) {
      console.info(row);
      this.$store.commit("relateManageStore/" + AT.SET_CURRENTEDITCLAIM, row);
      this.$router.push("/relate/claim-edit");
    },
    handleToDetail(row) {
      this.$store.commit("relateManageStore/" + AT.SET_CURRENTEDITCLAIM, row);
      this.$router.push("/relate/claim-edit?readonly=1");
    },
    handleDelete(row) {
      console.info(row);
      this.$store.dispatch("relateManageStore/deleteClaimDel", {
        caseId: this.currentCaseId,
        claimId: row.claimId,
        itemId: row.itemId
      });
    },
    submitForm(formName) {
      const t = this;
      t.$refs[formName].validate(valid => {
        if (valid) {
          console.info(t.currentCaseId);
          t.cliamIndexFormData.caseId = t.currentCaseId;

          t.$store
            .dispatch(
              "relateManageStore/postClaimSaveReason",
              t.cliamIndexFormData
            )
            .then(res => {
              // console.info('res------',res)
              if (res.success) {
                t.$message({
                  message: res.message,
                  type: "success"
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      console.info(res,file);
      if(res.success){
        this.fileList.push({name:file.name});
        this.reasonInfo.applyKey = '';
      }else{
        this.$refs['refupload'].clearFiles();
        this.$message.error(res.message);
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.$store.dispatch("relateManageStore/deleteClaimDelBook", {
        caseId: this.currentCaseId,
      });
      this.fileList = [];
    },
    handlePreview(file) {
      this.$router.push("/relate/claim-sign");
    },
    handleExceed(files, fileList) {
      this.$message.warning("仅能上传一份仲裁申请书，请删除后再上传");
    },
    beforeRemove(file, fileList) {
      console.info(fileList)
      return this.$confirm(`确定移除 ${file.name}？`);
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
    font-size: 32px;
    color: #2b2c30;
  }
  .el-select {
    width: 100% !important;
  }
  .claim-form-warp {
    background-color: #fff;
    padding: 15px;
    padding-left: 100px;
    text-align: left;

    .el-form {
      width: 90%;
    }
  }
  .tools {
    text-align: left;
  }
}

.card-box {
  .title {
    margin-top: 30px;
    font-size: 16px;
    color: #2b2c30;
  }
}

.applicants-table-warp {
  margin-top: 20px;

  .search-participants {
    padding: 10px;
  }
}
</style>

