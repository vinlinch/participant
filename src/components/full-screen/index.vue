<template>
  <div class="full-screen">
    <div v-if="hasHeader" class="header display-flex">
      <div class="logo flex1" @click="$router.push('/')"><img src="../../assets/images/logo-1.png" style="padding: 0 5px;background-color:#fff;" alt=""></div>
      <div v-if="hasReturnBtn" class="return flex1"><a :href="returnUrl">返回</a></div>
    </div>
    <div class="fs-container">
      <slot name="fs-container"></slot>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    hasReturnBtn: {
      type: Boolean,
      default:true
    },
    hasHeader: {
      type: Boolean,
      default:true
    },
  },
  computed:{
    returnUrl(){
      return window.__BASEURL__+'/customer-boss/index.html'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/helpers.scss";

  .full-screen {
    .header {
      box-sizing: border-box;
      background-color: #2A2B51;
      height: 40px;
      line-height: 40px;
      color:#fff;

      .logo{
        padding-left: 100px;
        cursor: pointer;
      }
      .return{
        text-align: right;
        padding-right: 100px;
        cursor: pointer;
        a{
          color:#fff;
        }
      }
    }
    .fs-container{
      padding-bottom: 50px;
    }
  }
</style>
