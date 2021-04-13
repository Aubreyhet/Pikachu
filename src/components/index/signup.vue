<template>
<div class="Signup_box Signup_in">
    <h2>注 册</h2>
    <el-form
    ref="SignupFormRef"
    :rules="SignupFormRules"
    :model="SignupForm"
    label-width="auto"
    class="Signup_form form"
    >
    <el-form-item prop="uName">
        <el-input 
        id="username" 
        @blur="compareName"
        v-model="SignupForm.uName" 
        prefix-icon="el-icon-user" 
        placeholder="请输入用户名">
        </el-input>
    </el-form-item>

    <el-form-item prop="email">
        <el-input 
        id="email" 
        v-model="SignupForm.email" 
        prefix-icon="el-icon-message" 
        placeholder="请输入邮箱">
        </el-input>
    </el-form-item>


    <el-form-item prop="password">
        <el-input
        id="password"
        type="password"
        v-model="SignupForm.password"
        prefix-icon="el-icon-unlock"
        placeholder="请输入密码"
        show-password
        ></el-input>
    </el-form-item>


    <el-form-item prop="checkPass">
        <el-input
        type="password"
        v-model="SignupForm.checkPass"
        prefix-icon="el-icon-warning-outline"
        placeholder="确认密码"
        show-password
        autocomplete="off"
        ></el-input>
    </el-form-item>


    <!-- <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
  </el-form-item> -->

    <el-form-item class="btns">
        <el-button class="btn" type="primary" @click="Signup('SignupForm')">注&nbsp;&nbsp;&nbsp;册</el-button>
    </el-form-item>
    <p style="color:#FFE401">拥有账号？<a style="color:#FFE401" href="javascript:" @click="Login">立即登录</a></p>
    </el-form>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.SignupForm.checkPass !== '') {
            this.$refs.SignupFormRef.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.SignupForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      SignupForm: {
        uName: '',
        email:'',
        password: '',
        checkPass:''
      },
      SignupFormRules: {
        uName: [
          { required: true, message: '请用用户名/手机号', trigger: 'blur'},
          {
            min: 2,
            max: 10,
            message: '长度在2 到 10 个字符',
            trigger: ['blur', 'change'],
          }
        ],


        email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur'},
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],


        password: [
            { validator: validatePass, trigger: 'blur' },
            
          ],

        checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
      },
    }
  },
  methods: {
    Login(){
        this.$router.replace('/login')
    },

    Signup() {
      console.log(this.SignupForm)
      this.$refs.SignupFormRef.validate(async (valid) => {
        console.log(this.SignupForm)
        console.log(valid)
        if (!valid) return
        console.log(this.SignupForm)
        await this.$http
          .post('/apis/userSignUp', this.SignupForm)
          .then((data) => {
            if (data.data.code !== 201) {
              this.$message.error(data.data.msg)
            }
            this.$message.success(data.data.msg)
            this.$refs.SignupFormRef.resetFields()
          })
      })
    },

    //输入用户名提示用户改用户名是否被占用 发起对服务器的请求
    compareName(){
      var nameLen = this.SignupForm.uName.length;
      if(nameLen >= 2 && nameLen <= 10 && nameLen != ''){
        this.$http
          .post('/apis/findUserName', this.SignupForm)
          .then((data) => {
            if (data.data.code !== 201) {
              this.$message.error(data.data.msg)
            }else{
              this.$message.success(data.data.msg)
            }
          })
      }
    }
  },
}
</script>

<style lang="less" scoped>

.Signup_box {
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
//   .el-button--primary.is-disabled,
//   .el-button--primary.is-disabled:hover{
//     background-color: #FFE401;
//     border-color: #FFE401;  
//   }

</style>
