<template>
<div class="login_box login_in">
    <h2>登 录</h2>
    <el-form
    ref="loginFormRef"
    :rules="LoginFormRules"
    :model="loginForm"
    label-width="auto"
    class="login_form form"
    >
    <el-form-item prop="uName">
        <el-input id="username" v-model="loginForm.uName" prefix-icon="el-icon-user" placeholder="请输入用户名/邮箱"></el-input>
    </el-form-item>

    <el-form-item prop="password">
        <el-input
        id="password"
        type="password"
        v-model="loginForm.password"
        prefix-icon="el-icon-unlock"
        placeholder="请输入密码"
        show-password
        ></el-input>
    </el-form-item>

    <el-form-item class="btns">
        <el-button class="btn" type="primary"  @click="login">登&nbsp;&nbsp;&nbsp;录</el-button>
    </el-form-item>
    <p style="color:#FFE401">没有账号？<a style="color:#FFE401" href="javascript:" @click="Signup">立即注册</a></p>
    </el-form>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
        loginBtn: {
            disable : true
        },
      loginForm: {
        uName: '',
        password: '',
        testcode: '',
      },
      LoginFormRules: {
        uName: [
          { required: true, message: '请用用户名/邮箱', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在2 到 16 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    Signup(){
        this.$router.replace('/signup')
    },
    login() {
        this.$router.push('/home')     
    }
    //账号密码携带验证码登录
    // login() {
    //   this.loginBtn.disable = false
      
    //   this.$refs.loginFormRef.validate({
        // if(j_number=='wanger'){
        // }
      // }

        

              
        // async (valid) => {
        // if (!valid) return
        //       this.loginBtn.disable = false;
        //       this.$router.push('/home')

        // await this.$http
        //   .post('/apis/users/login', this.loginForm)
        //   .then((data) => {
        //     let res = data.data
        //     if (res.code == 400) {
        //     } else if (res.code == 200 && res.msg !== '验证码错误') {
        //       this.$message.success(res.msg)
        //       window.sessionStorage.setItem('token', res.token)
        //       this.$router.push('/home')
        //     } else {
        //       this.$message.error(res.msg)
        //     }
        //   })
      // }
//       )
//     },
  },
}
</script>

<style lang="less" scoped>

.login_box {
  box-sizing: content-box;
  position:fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%,-50%,0);
  width: 450px;
//   height: 400px;
  background:rgba(255, 255, 255,.6);
  border-radius: 8px;
  padding: 40px 30px 40px;
  h2{
    font-size: 34px;
    font-weight: 900;
    color: #FFE401;
    margin-bottom: 20px;
  }
  input{
  width: 100%;
  margin-bottom: 20px;
  } 
}
.btn{
  display: inlen-block;
  width: 100%;
  height: 50px;
  text-align: center;
  // line-height: 50px;
  border-radius: 30px;
  border: none;
  color: #fff;
  outline: none;
  background-color: #FFE401;
  font-size: 24px;
  margin-right:20px;
}
.btn:hover{
  background-color: #FFE401;
}
/deep/ .el-input__inner{
    height: 50px;
    margin-bottom: 5px;
 }
 .el-button--primary{
    background-color: #FFE401;
    border-color: #FFE401;
  }
  .el-button--primary:hover{
    transform: translateY(-2px);
    background-color: #FFE401;
    border-color: #FFE401;  
  }
  .el-button--primary:focus{
    background-color: #FFE401;
    border-color: #FFE401;  
  }
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:hover{
    background-color: #FFE401;
    border-color: #FFE401;  
  }

</style>
