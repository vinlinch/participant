/* eslint-disable*/
export const validateTel = (rule, value, callback) => {
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

export const validateEmail = (rule, value, callback) => {
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

export const validateidCard = (rule, value, callback) => {
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
// export const validateidCards = (rule, value, callback) => {
//   //验证证件号码
//   if (value === "") {
//     callback(new Error("请输入证照号码"));
//   } else {
//     let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
//     if (reg.test(value)) {
//       callback();
//     } else {
//       callback(new Error("请输入正确的证照号码"));
//     }
//   }
// };