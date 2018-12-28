
<template>
<el-row class="container">
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo" :class="isCollapse?'logo-collapse-width':'logo-width'">
				{{ isCollapse?'':sysName }}
		</el-col>
    <el-col :span="10" >
      <div class="menu" @click.prevent="collapse">
					<i class="el-icon-menu"></i>
				</div>
    </el-col>

    <el-col :span="4" class="usetting">
      <!-- <i class="el-icon-setting"></i> -->
      <span class="demonstration">{{ UserName }}</span>
      <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <i class="el-icon-setting el-icon--right" style="color: #fff;"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  @click.native.prevent="handleUser">个人信息</el-dropdown-item>
        <el-dropdown-item  @click.native.prevent="Logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    </el-col>    
  </el-col>


  <el-col :span="24" class="main">
    <aside :class="isCollapse?'el-menu-collapse':'el-menu-vertical'">
    <el-menu :default-active="this.$store.getters.routers.path"  @open="handleOpen" @close="handleClose" :collapse="isCollapse" :collapse-transition="false" router>
      <template v-for="item in this.$store.getters.routers" v-if="!item.hidden">
    　　<el-submenu :index="item.name" :key="item.name">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
    　　</el-submenu>
　　　</template>
    </el-menu>    
    </aside>

    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <el-col :span="24" class="content-breadcrumb">
          <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{ path: item.path }">
								{{ item.name }}
							</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">
							<router-view></router-view>
        </el-col>
      </div>
    </section>
  </el-col>
</el-row>


</template>

<script>
import { removeToken } from '@/utils/auth';

export default {
  data() {
    return {
      isCollapse: false,
      sysName: 'CDBI',
      UserName:this.$store.getters.username,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(this.$store.getters.routers)
      // console.log(this.$router.options.routes)
      // console.log(this.$store.getters.routers.path)
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    collapse:function(){
				this.isCollapse=!this.isCollapse;
			},
    handleChange(val) {
        // console.log(val);
      },
    handleUser(){
      this.$router.push({ path: '/UserInfo' });
    },
    Logout(){
      this.$router.push({ path: '/login' });
      this.$store.dispatch('SetUserName', '')
      this.$store.dispatch('SetUserToken','')
      removeToken()
    },
    handleMain(){

      this.$router.push({ path: '/main' });
    }
  }
};
</script>

<style scoped>
.container {
    position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
    }  
.header {
      height: 60px;
			line-height: 60px;
			background: #3a88d6;
			color: #fff;
}
.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(255, 255, 255, 0.3);
				border-right-width: 1px;
				border-right-style: solid;
			}
.logo-width{
				width:230px;
			}
.logo-collapse-width{
				width:65px
			}
.menu{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
.usetting{
    text-align: right;
    padding-right: 35px;
    float: right;
}
/* .aside{
    padding-left:20px;
		padding-right:20px;
} */
.el-menu-vertical {
    text-align: left;
    width: 230px;
    min-height: 400px;
  }
.el-menu-collapse {
    width: 60px;
    min-height: 400px;
  }  

.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			/* overflow: hidden; */
}
.content-container{
    flex:1;
    padding: 20px;
    overflow-y: scroll;
}
.content-breadcrumb{
    /* text-align: right; */
    width: 200px;
    float: right;
	  color: #0069f3;
}
.content-wrapper{
    background-color: #fafafa;
    box-sizing: border-box;
}
</style>
