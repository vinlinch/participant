import Vue from 'vue'
import filterSample from './sample'
// import moment from 'moment'
// const timeFormat = time => {
//   return moment(time).format('YYYY-MM-DD HH:mm:ss')
// }

Vue.filter('filterSample', filterSample)
const participantsType = (val) => {
  switch (val) {//仲裁类别
    case 1: {
      return '个人';
    }
    case 2: {
      return '企业';
    }
  }
};
const sexs = (val) => {//性别
  switch (val) {
    case 0: {
      return '女';
    }
    case 1: {
      return '男';
    }
  }
};
const powers = (val) => {//代理人权限
  switch (val) {
    case 1: {
      return '一般代理';
    }
    case 2: {
      return '特殊权限';
    }
  }
};
const agentTypes = (val) => {//代理人类型
  switch (val) {
    case 1: {
      return '律师代理';
    }
    case 2: {
      return '其他代理';
    }
  }
};
const lawyerTypes = (val) => {//执业证类型
  switch (val) {
    case 2: {
      return '实习律师证';
    }
    case 3: {
      return '律师执业证';
    }
  }
};
const idCardTypes = (val) => {//证件类型
  switch (val) {
    case 1:{
      return '军官证';
    }
    case 2: {
      return '实习律师证';
    }
    case 3:{
      return '律师执业证';
    }
    case 4:{
      return '户口薄';
    }
    case 5:{
      return '护照';
    }
    case 6:{
      return '身份证';
    }
    case 7:{
      return '驾照'
    }
  }
};
const identifyTypes = (val) => {//证照类型
  switch (val) {
    case 1: {
      return '多证合一营业执照';
    }
    case 2: {
      return '税务登记证';
    }
    case 3:{
      return '组织机构代码证';
    }
    case 4:{
      return '营业执照';
    }
  }
};

//有无原件
const hasOriginal = (val) => {
  switch (val) {
    case 1: {
      return '有';
    }
    case 0: {
      return '没有';
    }
  }
};

//职务
const position = (val) => {
  switch (parseInt(val)) {
    case 1: {
      return '主任';
    }
    case 2: {
      return '总经理';
    }
    case 3: {
      return '董事长';
    }
    case 4: {
      return '行长';
    }
  }
};

//案由
const anyou = (val) => {
  switch (val) {
    case 'MJJDJFHTTY': {
      return '民间借贷纠纷';
    }
    case 'XEJKHTJFUI': {
      return '小额借款合同纠纷';
    }
  }
};

//请求类型
const claimType = (val) => {
  switch (parseInt(val)) {
    case 1: {
      return '确认之诉';
    }
    case 2: {
      return '给付之诉';
    }
    case 3: {
      return '形成之诉';
    }
  }
};

export default {
  participantsType,
  sexs,
  idCardTypes,
  identifyTypes,
  powers,
  agentTypes,
  lawyerTypes,
  // timeFormat
  hasOriginal,
  position,
  anyou,
  claimType
}
