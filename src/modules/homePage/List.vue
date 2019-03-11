<template>
  <div class="list">
    <!-- <div class="title" v-show="partners">仲裁参与人信息</div> -->
    <div class="arbitrateedit">
      <!-- 新增，编辑组件 -->
      <div v-if="isshows">
        <el-form
          v-show="gettypes"
          ref="arbitratetype"
          :rules="rules"
          :model="arbitratetype"
          label-position="right"
          label-width="200px"
        >
          <el-form-item label="仲裁参与人类型：" prop="type">
            <el-radio-group v-model="type" size="small" @change="getStyle">
              <el-radio-button label="1">个人</el-radio-button>
              <el-radio-button label="2">企业</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <!-- 个人 -->
        <el-form
          v-if="arbitrateforms"
          ref="arbitratetype"
          :rules="rules"
          :model="arbitratetype"
          class="details"
          label-position="right"
          label-width="200px"
        >
          <el-form-item v-if="typeones" label="仲裁参与人类型：" prop="type">
            <p>{{this.types|participantsType}}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人实名认证编号：" prop="verifyCode">
            <el-input v-model="arbitratetype.verifyCode" placeholder="请输入仲裁参与人实名认证编号"></el-input>
          </el-form-item>
          <el-form-item label="仲裁参与人名称：" prop="name">
            <el-input v-model="arbitratetype.name" placeholder="请输入仲裁参与人名称"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="arbitratetype.sex" @change="chooseSex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="证件类型：" prop="idCardType">
            <el-select v-model="arbitratetype.idCardType" placeholder="请选择">
              <el-option label="军官证" :value="1"></el-option>
              <el-option label="实习律师证" :value="2"></el-option>
              <el-option label="律师执业证" :value="3"></el-option>
              <el-option label="户口薄" :value="4"></el-option>
              <el-option label="护照" :value="5"></el-option>
              <el-option label="身份证" :value="6"></el-option>
              <el-option label="驾照" :value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="idCardNo">
            <el-input v-model="arbitratetype.idCardNo" placeholder="请输入正确的证件号码"></el-input>
          </el-form-item>
          <el-form-item label="身份证件地址：" prop="cardAddress">
            <el-input
              v-model="arbitratetype.cardAddress"
              type="textarea"
              placeholder="请输入正确的身份证件地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="mobiles">
            <el-input v-model="arbitratetype.mobiles" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱：" prop="emails">
            <el-input v-model="arbitratetype.emails" placeholder="请输入联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="送达地址：" prop="address">
            <el-input v-model="arbitratetype.address" type="textarea" placeholder="请输入送达地址"></el-input>
          </el-form-item>
          <el-form-item label="邮编：" prop="zipCode">
            <el-input v-model="arbitratetype.zipCode" placeholder="请输入邮编"></el-input>
          </el-form-item>
          <el-form-item label="附件上传">
            <p class="tip">仅支持png、jpg，文件大小不超过2M</p>
            <p class="pageInfo">
              <span>身份证正面</span>
              <span class="marginL">身份证反面</span>
            </p>
            <div class="uploadImg">
              <div class="upload">
                <div class="isActive">
                  <el-upload
                    ref="upload"
                    v-model="arbitratetype.frontKey"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :on-change="upChange"
                    :on-error="handleAvatarerror"
                    :on-success="handleSucess"
                    :limit="1"
                    :action="imageUrl"
                    v-bind:class="{ active: isActive2 }"
                  >
                    <img
                      v-if="arbitratetype.frontKey"
                      :src="'data:image/jpg;base64,'+IdenfileidUrl"
                      style="width:100%"
                    >
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" width="30%">
                    <img :src="dialogImageUrl" alt>
                  </el-dialog>
                </div>
                <div class="isActive marginLeft">
                  <el-upload
                    ref="upload2"
                    v-model="arbitratetype.behindKey"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    accept=".jpg, .png, .PDF"
                    :before-upload="beforeUpload"
                    :on-success="handleSucess2"
                    :on-change="upChange2"
                    :on-error="handleAvatarerror2"
                    :limit="1"
                    :action="imageUrl"
                    v-bind:class="{ active: isActive3 }"
                  >
                    <img
                      v-if="arbitratetype.behindKey"
                      :src="'data:image/jpg;base64,'+unIdenfileidUrl"
                      style="width:100%"
                    >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="arbitratesave('arbitratetype')">保存</el-button>
            <el-button @click="arbitratecancle">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 企业 -->
        <el-form
          v-if="!arbitrateforms"
          ref="arbitratetype"
          :rules="rules"
          :model="arbitratetype"
          class="details"
          label-position="right"
          label-width="200px"
        >
          <el-form-item v-if="typeones" label="仲裁参与人类型：" prop="type">
            <p>{{this.types|participantsType}}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人实名认证编号：" prop="verifyCode">
            <el-input v-model="arbitratetype.verifyCode" placeholder="请输入仲裁参与人实名认证编号"></el-input>
          </el-form-item>
          <el-form-item label="仲裁参与人名称：" prop="orgName">
            <el-input v-model="arbitratetype.orgName" placeholder="请输入仲裁参与人名称"></el-input>
          </el-form-item>
          <el-form-item label="证照类型：" prop="identifyType">
            <el-select v-model="arbitratetype.identifyType" placeholder="请选择">
              <el-option label="多证合一营业执照" :value="1"></el-option>
              <el-option label="税务登记证" :value="2"></el-option>
              <el-option label="组织机构代码证" :value="3"></el-option>
              <el-option label="营业执照" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证照号码：" prop="identifyNo">
            <el-input v-model="arbitratetype.identifyNo" placeholder="请输入正确的证件号码"></el-input>
          </el-form-item>
          <el-form-item label="证照地址：" prop="identifyAddress">
            <el-input
              v-model="arbitratetype.identifyAddress"
              type="textarea"
              placeholder="请输入正确的身份证件地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="法定代表人或负责人：" prop="name">
            <el-input v-model="arbitratetype.name"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-radio-group v-model="arbitratetype.sex" @change="chooseSex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="证件类型：" prop="idCardType">
            <el-select v-model="arbitratetype.idCardType" placeholder="请选择">
              <el-option label="军官证" :value="1"></el-option>
              <el-option label="实习律师证" :value="2"></el-option>
              <el-option label="律师执业证" :value="3"></el-option>
              <el-option label="户口薄" :value="4"></el-option>
              <el-option label="护照" :value="5"></el-option>
              <el-option label="身份证" :value="6"></el-option>
              <el-option label="驾照" :value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" prop="idCardNo">
            <el-input v-model="arbitratetype.idCardNo" placeholder="请输入正确的证件号码"></el-input>
          </el-form-item>
          <el-form-item label="职务：" prop="position">
            <el-select v-model="arbitratetype.position" placeholder="请选择">
              <el-option label="主任" :value="1"></el-option>
              <el-option label="总经理" :value="2"></el-option>
              <el-option label="董事长" :value="3"></el-option>
              <el-option label="行长" :value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人：" prop="linkMan">
            <el-input v-model="arbitratetype.linkMan"></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="mobiles">
            <el-input v-model="arbitratetype.mobiles" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="联系邮箱：" prop="emails">
            <el-input v-model="arbitratetype.emails" placeholder="请输入联系邮箱"></el-input>
          </el-form-item>
          <el-form-item label="送达地址：" prop="address">
            <el-input v-model="arbitratetype.address" type="textarea" placeholder="请输入送达地址"></el-input>
          </el-form-item>
          <el-form-item label="邮编：" prop="zipCode">
            <el-input v-model="arbitratetype.zipCode" placeholder="请输入邮编"></el-input>
          </el-form-item>
          <el-form-item label="附件上传">
            <p class="tip">仅支持png、jpg，文件大小不超过2M</p>
            <p class="pageInfo">
              <span>上传身份证正面</span>
              <span class="marginL">上传身份证反面</span>
            </p>
            <div class="uploadImg">
              <div class="upload">
                <div class="isActive">
                  <el-upload
                    ref="upload"
                    v-model="arbitratetype.frontKey"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                    :on-change="upChange"
                    :on-error="handleAvatarerror"
                    :on-success="handleSucess"
                    :limit="1"
                    :action="imageUrl"
                    v-bind:class="{ active: isActive2 }"
                  >
                    <img
                      v-if="arbitratetype.frontKey"
                      :src="'data:image/jpg;base64,'+IdenfileidUrl"
                      style="width:100%"
                    >
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" width="30%">
                    <img :src="dialogImageUrl" alt>
                  </el-dialog>
                </div>
                <div class="isActive marginLeft">
                  <el-upload
                    ref="upload2"
                    v-model="arbitratetype.behindKey"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove2"
                    :before-upload="beforeUpload"
                    :on-success="handleSucess2"
                    :on-change="upChange2"
                    :on-error="handleAvatarerror2"
                    :limit="1"
                    :action="imageUrl"
                    v-bind:class="{ active: isActive3 }"
                  >
                    <img
                      v-if="arbitratetype.behindKey"
                      :src="'data:image/jpg;base64,'+unIdenfileidUrl"
                      style="width:100%"
                    >
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <p class="pageInfo">
              <span>上传营业执照</span>
              <span class="marginL">上传职务证明</span>
            </p>
            <div class="uploadImg">
              <div class="upload">
                <div class="isActive">
                  <el-upload
                    ref="upload3"
                    v-model="arbitratetype.identifyKey"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove3"
                    :before-upload="beforeUpload"
                    :on-change="upChange3"
                    :on-error="handleAvatarerror3"
                    :on-success="handleSucess3"
                    :limit="1"
                    :action="imageUrl"
                    v-bind:class="{ active: isActive4 }"
                  >
                    <img
                      v-if="arbitratetype.identifyKey"
                      :src="'data:image/jpg;base64,'+IdenfileidUrl"
                      style="width:100%"
                    >
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible" width="30%">
                    <img :src="dialogImageUrl" alt>
                  </el-dialog>
                </div>
                <div class="isActive marginLeft">
                  <el-upload
                    ref="upload4"
                    v-model="arbitratetype.postKey"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    accept="image/png, image/jpeg"
                    :on-remove="handleRemove4"
                    :before-upload="beforeUpload"
                    :on-success="handleSucess4"
                    :on-change="upChange4"
                    :on-error="handleAvatarerror4"
                    :limit="1"
                    :action="imageUrl"
                    v-bind:class="{ active: isActive5 }"
                  >
                    <img
                      v-if="arbitratetype.postKey"
                      :src="'data:image/jpg;base64,'+postKeyUrl"
                      style="width:100%"
                    >
                    <i v-else class="el-icon-plus"></i>
                  </el-upload>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="arbitratesave('arbitratetype')">保存</el-button>
            <el-button @click="arbitratecancle">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 查看组件 -->
      <div v-if="!isshows" v-show="!seefalse">
        <el-form
          v-if="pesonalinfo"
          :model="arbitratetype"
          label-position="right"
          label-width="200px"
          class="details"
        >
          <el-form-item label="仲裁参与人ID：">
            <p>{{ arbitratetype.pid }}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人类型：">
            <p>{{this.types|participantsType}}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人实名认证编号：">
            <p>{{ arbitratetype.verifyCode }}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人名称：">
            <p>{{ arbitratetype.name }}</p>
          </el-form-item>
          <el-form-item label="性别：">
            <p>{{ arbitratetype.sex|sexs }}</p>
          </el-form-item>
          <el-form-item label="证件类型：">
            <p>{{ arbitratetype.idCardType|idCardTypes }}</p>
          </el-form-item>
          <el-form-item label="证件号码：">
            <p>{{ arbitratetype.idCardNo }}</p>
          </el-form-item>
          <el-form-item label="身份证件地址：">
            <p>{{ arbitratetype.cardAddress }}</p>
          </el-form-item>
          <el-form-item label="联系电话：">
            <p>{{ arbitratetype.mobiles }}</p>
          </el-form-item>
          <el-form-item label="联系邮箱：">
            <p>{{ arbitratetype.emails }}</p>
          </el-form-item>
          <el-form-item label="送达地址：">
            <p>{{ arbitratetype.address }}</p>
          </el-form-item>
          <el-form-item label="邮编：">
            <p>{{ arbitratetype.zipCode }}</p>
          </el-form-item>
          <el-form-item label="附件：">
            <p class="tip">仅支持png、jpg，文件大小不超过2M</p>
            <p class="pageInfo">
              <span>身份证正面</span>
              <span class="marginL">身份证反面</span>
            </p>
            <div class="uploadImg">
              <div class="upload">
                <div class="isActive">
                  <img :src="'data:image/jpg;base64,'+IdenfileidUrl">
                  <!-- <div class="mask">
                    <p class="exampleIcon">
                      <i class="el-icon-zoom-in"></i>
                    </p>
                    <p>查看示例</p>
                  </div>-->
                </div>
                <div class="isActive marginLeft">
                  <img :src="'data:image/jpg;base64,'+unIdenfileidUrl">
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="!propParams">
            <el-button type="primary" @click="arbitratecancle">返回</el-button>
          </el-form-item>
        </el-form>
        <!-- 查看企业 -->
        <el-form
          v-if="!pesonalinfo"
          :model="arbitratetype"
          label-position="right"
          label-width="200px"
          class="details"
        >
          <el-form-item label="仲裁参与人ID：">
            <p>{{ arbitratetype.cid }}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人类型：">
            <p>{{this.types|participantsType}}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人实名认证编号：">
            <p>{{ arbitratetype.verifyCode }}</p>
          </el-form-item>
          <el-form-item label="仲裁参与人名称：">
            <p>{{ arbitratetype.orgName }}</p>
          </el-form-item>
          <el-form-item label="证照类型：">
            <p>{{ arbitratetype.identifyType|identifyTypes }}</p>
          </el-form-item>
          <el-form-item label="证照号码：">
            <p>{{ arbitratetype.identifyNo }}</p>
          </el-form-item>
          <el-form-item label="证照地址：">
            <p>{{ arbitratetype.identifyAddress }}</p>
          </el-form-item>
          <el-form-item label="法定代表人或负责人：">
            <p>{{ arbitratetype.name }}</p>
          </el-form-item>
          <el-form-item label="性别：">
            <p>{{ arbitratetype.sex|sexs}}</p>
          </el-form-item>
          <el-form-item label="证件类型：">
            <p>{{ arbitratetype.idCardType|idCardTypes }}</p>
          </el-form-item>
          <el-form-item label="证件号码：">
            <p>{{ arbitratetype.idCardNo }}</p>
          </el-form-item>
          <el-form-item label="职务：">
            <p>{{ arbitratetype.position }}</p>
          </el-form-item>
          <el-form-item label="身份证件地址：">
            <p>{{ arbitratetype.cardAddress }}</p>
          </el-form-item>
          <el-form-item label="联系人：">
            <p>{{ arbitratetype.linkMan }}</p>
          </el-form-item>
          <el-form-item label="联系电话：">
            <p>{{ arbitratetype.mobiles }}</p>
          </el-form-item>
          <el-form-item label="联系邮箱：">
            <p>{{ arbitratetype.emails }}</p>
          </el-form-item>
          <el-form-item label="送达地址：">
            <p>{{ arbitratetype.address }}</p>
          </el-form-item>
          <el-form-item label="邮编：">
            <p>{{ arbitratetype.zipCode }}</p>
          </el-form-item>
          <el-form-item label="附件：">
            <p class="tip">仅支持png、jpg，文件大小不超过2M</p>
            <p class="pageInfo">
              <span>身份证正面</span>
              <span class="marginL">身份证反面</span>
            </p>
            <div class="uploadImg">
              <div class="upload">
                <div class="isActive">
                  <img :src="'data:image/jpg;base64,'+IdenfileidUrl">
                </div>
                <div class="isActive marginLeft">
                  <img :src="'data:image/jpg;base64,'+unIdenfileidUrl">
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <p class="pageInfo">
              <span>上传营业执照</span>
              <span class="marginL">上传职务证明</span>
            </p>
            <div class="uploadImg">
              <div class="upload">
                <div class="isActive">
                  <img :src="'data:image/jpg;base64,'+BusinessidUrl ">
                </div>
                <div class="isActive marginLeft">
                  <img :src="'data:image/jpg;base64,'+PostidUrl">
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="arbitratecancle">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    propParams: {
      type: Object
    }
  },
  data() {
    var validateTel = (rule, value, callback) => {
      //验证手机号
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let reg = /^1\d{10}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的联系电话"));
        }
      }
    };
    var validateEma = (rule, value, callback) => {
      //验证邮箱
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的联系邮箱"));
        }
      }
    };
    var validateidCard = (rule, value, callback) => {
      //验证证件号码
      if (value === "") {
        callback(new Error("请输入证件号码"));
      } else {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的证件号码"));
        }
      }
    };
    var validateidCards = (rule, value, callback) => {
      //验证证件号码
      if (value === "") {
        callback(new Error("请输入证照号码"));
      } else {
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的证照号码"));
        }
      }
    };
    return {
      currentPage: 1,
      isshows: false,
      seefalse: false,
      arbitrateforms: true,
      type: 1,
      types:1,
      partners:true,
      dialogImageUrl: "",
      dialogVisible: false,
      IdenfileidUrl: "",
      unIdenfileidUrl: "",
      PostidUrl: "",
      BusinessidUrl: "",
      IdenfileidbehindUrl: "",
      id: "",
      typeones: false,
      gettypes: false,
      pesonalinfo: true,
      isActive2: "",
      isActive3: "",
      isActive4: "",
      isActive5: "",
      upload: false,
      upload2: false,
      upload3: false,
      upload4: false,
      imageUrl: "/arb/file/upload",
      arbitratetype: {},
      fileId: "",
      fileinfo: {
        fileId: "",
        address: "arbFile"
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入正确的仲裁参与人名称",
            trigger: "blur"
          },
          { min: 1, max: 20, message: "长度不超过20", trigger: "blur" }
        ],
        orgName: [
          { required: true, message: "仲裁参与人名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度不超过20", trigger: "blur" }
        ],
        // type: [{ required: true, message: "请选择仲裁参与人类型", trigger: "change" }],
        idCardType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        position: [
          { required: true, message: "请选择职务", trigger: "change" }
        ],
        sex: [{ required: true, message: "请选择性别！", trigger: "change" }],
        idCardNo: [
          { required: true, validator: validateidCard, trigger: "blur" }
        ],
        identifyNo: [
          { required: true, validator: validateidCards, trigger: "blur" }
        ],
        cardAddress: [
          {
            required: true,
            message: "请输入正确的身份证件地址",
            trigger: "blur"
          },
          { min: 1, max: 100, message: "长度不超过100", trigger: "blur" }
        ],
        mobiles: [{ required: true, validator: validateTel, trigger: "blur" }],
        identifyType: [
          { required: true, message: "请选择证照类型", trigger: "change" }
        ],
        emails: [
          { required: true, validator: validateEma, trigger: "blur" },
          { min: 1, max: 50, message: "长度不超过50", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入送达地址", trigger: "blur" },
          { min: 1, max: 100, message: "长度不超过100", trigger: "blur" }
        ]
      },
      formline: {}
    };
  },
  computed: {
    ...mapState({
      participantsList: state => state.participantsList
    })
  },
  mounted() {
    this.id = this.$route.query.id;//申请人id
    this.agentId = this.$route.query.agentId;//代理人id
    this.types = this.$route.query.types;//申请人参与人类型 types 1：为个人 2：为企业
    this.isshows = this.$route.query.isshows;//编辑参与人 true:编辑 false：查看
    this.gettypes = this.$route.query.gettypes;//新增个人 企业切换头部
    // this.general = this.$route.query.general;
    // this.sees = this.$route.query.sees;
    const t = this;

    if(t.propParams){
      console.info('t.propParams=====',t.propParams)
      this.typeones = true;
      if(t.propParams.type === 1 || t.propParams.agentType >= 1){
        //个人
        this.arbitratetype = t.propParams;
        this.IdenfileidUrl = t.propParams.frontKeyBase;
        this.unIdenfileidUrl = t.propParams.behindKeyBase;

        this.pesonalinfo = true;
        this.arbitrateforms = true;

      }else{
        //企业
        this.arbitratetype = t.propParams;
        this.IdenfileidUrl = t.propParams.frontKeyBase;
        this.unIdenfileidUrl = t.propParams.behindKeyBase;
        this.PostidUrl = t.propParams.postKeyBase;
        this.BusinessidUrl = t.propParams.identifyKeyBase;

        this.pesonalinfo = false;
        this.arbitrateforms = false;
      }
    }else{
      if (this.id) {
        if (this.types == 1) {
          //查看仲裁个人
          this.typeones = true;
          t.$store
            .dispatch("homePageStore/getSeearbitrate", this.id)
            .then(res => {
              this.arbitratetype = res.data;
              this.IdenfileidUrl = res.data.frontKeyBase;
              this.unIdenfileidUrl = res.data.behindKeyBase;
            });

          this.pesonalinfo = true;
          this.arbitrateforms = true;
        } else {
          //查看仲裁企业
          this.typeones = true;
          t.$store
            .dispatch("homePageStore/getSeearbitrateCom", this.id)
            .then(res => {
              console.log(res.data);
              this.arbitratetype = res.data;
              this.IdenfileidUrl = res.data.frontKeyBase;
              this.unIdenfileidUrl = res.data.behindKeyBase;
              this.PostidUrl = res.data.postKeyBase;
              this.BusinessidUrl = res.data.identifyKeyBase;
            });
          this.pesonalinfo = false;
          this.arbitrateforms = false;
        }
      }
      else if(this.agentId){//为代理人id
        console.log(this.agentId)
        t.$store
          .dispatch("homePageStore/getSeearbitrate", this.agentId)
          .then(res => {
            this.arbitratetype = res.data;
            this.IdenfileidUrl = res.data.frontKeyBase;
            this.unIdenfileidUrl = res.data.behindKeyBase;
          });
      }
    }
  },
  // computed: {},
  methods: {
    beforeUpload(file) {
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error("上传图片不能大于2M");
        return false;
      }
    },
    handleRemove(file, fileList) {
      if (fileList.length < 1) {
        this.isActive2 = false;
      }
    },
    upChange(file, fileList) {
      if (fileList.length > 0) {
        this.isActive2 = true;
      }
    },
    handlePictureCardPreview(file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarerror() {
      this.$message.error("身份证正面面上传失败");
    },
    handleSucess(res) {
      console.log(res);
      this.upload = true;
      this.arbitratetype.frontKey = res.data.fileId;
      console.log(this.arbitratetype.frontKey);
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
      this.arbitratetype.behindKey = res.data.fileId;
      console.log(this.arbitratetype.behindKey);
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
      this.arbitratetype.identifyKey = res.data.fileId;
      console.log(this.arbitratetype.identifyKey);
    },
    handleRemove4(file, fileList) {
      if (fileList.length < 1) {
        this.isActive5 = false;
      }
    },
    upChange4(file, fileList) {
      if (fileList.length > 0) {
        this.isActive5 = true;
      }
    },
    handleAvatarerror4() {
      this.$message.error("职务文件上传失败");
    },
    handleSucess4(res) {
      console.log(res);
      this.upload4 = true;
      this.arbitratetype.postKey = res.data.fileId;
      console.log(this.arbitratetype.postKey);
    },
    // geturl() {
    //   this.$store
    //     .dispatch("homePageStore/getBaseStr", this.fileinfo)
    //     .then(res => {
    //       console.log(res);
    //       this.IdenfileidUrl = res.data.baseStr;
    //       this.unIdenfileidUrl = res.data.baseStr;
    //       // this.IdenfileidbehindUrl = res.data.baseStr;
    //     });
    // },
    getStyle(style) {
      this.type = style;
      const t = this;
      if (t.type == 1) {
        this.type = 1;
        this.arbitrateforms = true;
      } else {
        this.arbitrateforms = false;
      }
    },
    chooseSex(val) {
      this.arbitratetype.sex = val;
      console.log(val);
    },
    arbitratecancle() {
      this.$router.push("/home");
    },
    arbitratesave(formName) {
      //编辑新增保存
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            //编辑保存
            if (this.types == 1) {
              //个人
              this.$store
                .dispatch("homePageStore/getEditarbitrate", this.arbitratetype)
                .then(res => {
                  this.arbitratetype.id = res.data;
                  this.$router.push("/home");
                });
            } else {
              //企业
              this.$store
                .dispatch(
                  "homePageStore/getEditarbitratecom",
                  this.arbitratetype
                )
                .then(res => {
                  this.arbitratetype.id = res.data;
                  this.$router.push("/home");
                });
            }
          } else {
            //新增保存
            if (this.type == 1) {
              //个人
              this.$store
                .dispatch("homePageStore/getAddarbitrate", this.arbitratetype)
                .then(res => {
                  if (
                    valid &&
                    this.arbitratetype.frontKey &&
                    this.arbitratetype.behindKey
                  ) {
                    this.arbitratetype = res;
                    this.$router.push("/home");
                  } else {
                    this.$message({
                      type: "error",
                      message: "请上传证件"
                    });
                  }
                });
            } else {
              //新增企业
              this.typeones = false;
              this.$store
                .dispatch(
                  "homePageStore/getAddarbitratecom",
                  this.arbitratetype
                )
                .then(res => {
                  if (
                    valid &&
                    this.arbitratetype.frontKey &&
                    this.arbitratetype.behindKey &&
                    this.arbitratetype.identifyKey &&
                    this.arbitratetype.postKey
                  ) {
                    this.arbitratetype = res;
                    this.$router.push("/home");
                  } else {
                    this.$message({
                      type: "error",
                      message: "请上传证件"
                    });
                  }
                });
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.list {
  // background: #fff;
  width: 900px;
  margin: 0 auto;
  .title {
    color: #2b2c30;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin: 40px auto;
  }
  .arbitrateedit {
    background: #fff;
    padding: 50px 100px;
    .details {
      .tip {
        color: #ccc;
      }
      .uploadImg {
        overflow: hidden;
        .isActive {
          float: left;
          margin-right: 20px;
          width: 45%;
          //   .mask {
          //     position: absolute;
          //     top: 0;
          //     //border-radius: 6px;
          //     width: 100%;
          //     height: 100%;
          //     background: rgba(0, 0, 0, 0.5);
          // }
          .marginLeft {
            width: 50%;
            margin-left: 20px;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .pageInfo {
        .marginL {
          margin-left: 200px;
        }
      }
    }
  }
}
</style>

