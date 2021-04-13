<template>
  <el-container class="hello">
    <el-container>
      <el-aside style="width:80px;background:#fff">
        <div class="userinfo">
            <div class="pic">
                <img src="../assets/images/pic.webp" alt="">
            </div>
            <p class="user">admin</p>
        </div>
        <el-menu
          text-color="#666"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :collapse-transition="true"
          :router="true"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
        >
           <el-menu-item :index="'/'+item.menu_url" v-for="item in menulist" :key="item.menu_id">
              <span slot="title">{{item.menu_name}}</span>
            </el-menu-item>
        </el-menu>
        <div class="setting">
          
        </div>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>


      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [
        {
          'menu_id':1,
          'menu_url':'userinfo',
          'menu_name':'消息',
          'parent_id':0,
          'leven':0,
        },
        {
          'menu_id':2,
          'menu_url':'purview',
          'menu_name':'联系人'
        },
        {
          'menu_id':3,
          'menu_url':'setting',
          'menu_name':'群组'
        }
      ],
      isCollapse: false,
      //被激活的链接地址
      activePath: '',
    }
  },
  created() {
  
  },
  methods: {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
  computed:{
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang= 'less' scoped>
.hello{
  display: flex;
  position:fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
  width: 86%;
  height: 86%;
  border-radius: 15px;
  background: rgba(255, 255, 255,.6);
  overflow: hidden;
}
.userinfo{
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    margin-top: 20px;
    .pic{
        width: 50px;
        border-radius: 50%;
        overflow: hidden;
        img{
          display: block;
            width: 50px;
            height: 50px;
        }
    }
    p{
        font-size: 14px;
        width: 100%;
    }
}
</style> 