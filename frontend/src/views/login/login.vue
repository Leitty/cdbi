<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { requestLogin } from '@/api/api';
import { adminViewRouter } from '@/router/index';
import { getToken,setToken } from '@/utils/auth';
export default {
  data () {
      return {
        logining: false,
        ruleForm2: {
          account: 'guest',
          checkPass: 'p@ssw0rd'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true

      };
  },
  methods:{
      handleSubmit2(){
          /*
          后台校验
          */
        var that = this
        var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
        requestLogin(loginParams)
        .then((res) => {
          //校验成功，比对身份生成相应的路由，跳转到首页
          this.$store.dispatch('SetUserName', loginParams.username)
          this.$store.dispatch('SetUserToken',res.token)
          setToken(res.token)
          //跳转到首页
          this.$router.push({ path: '/index' });
          })
        .catch(function (error) {
          //校验失败，留在登陆页面，报错
          that.$router.push({ path: '/login' });
          alert("用户名密码错误")
          console.log(error);
          })
      }
  }

}

</script>


<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
