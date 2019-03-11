<template>
  <div class="home">
    <full-screen>
      <div slot="fs-container">
        <div slot="content">
          <ul class="contents">
            <li v-for="(tab,index) in tabs" :key="index" :class="{active:active==index}"
                @click="handleToggle(index,tab.viewName)">{{ tab.type }}
            </li>
          </ul>
          <component :is="currentView"></component>
        </div>
      </div>
    </full-screen>
  </div>
</template>
<script>
  import fullScreen from 'components/full-screen'
  import taba from 'components/tabs/taba.vue'
  import tabb from 'components/tabs/tabb.vue'

  export default {
    components: {
      fullScreen,
      taba,
      tabb
    },
    data() {
      return {
        active: 1,
        currentView: 'tabb',
        show: true,
        tabs: [
          {
            type: '仲裁参与人管理',
            viewName: 'taba'
          },
          {
            type: '案件管理',
            viewName: 'tabb'
          }
        ]
      }
    },
    methods: {
      handleToggle(index, viewName) {
        this.active = index
        this.currentView = viewName
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home {
    background: #f7f8fd;
    height: 100%;
    min-height: 100vh;

    .contents {
      background: #fff;
      width: 100%;
      color: #999;
      text-align: center;
      border-bottom:1px solid #e5e5e5;

      li {
        display: inline-block;
        padding: 8px 30px;
        font-size: 25px;
        cursor: pointer;
      }

      li.active {
        color: #000;
      }
    }
  }
</style>

