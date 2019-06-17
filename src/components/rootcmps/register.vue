<template>
    <div class="register">
        <section class="from_container">
            <div class="manage_tip">
                <span class="title">这是一只结婚的车队</span>
                <form class="form-horizontal" :modle='registerUser' :rules='rules' ref="registerForm">
                    <div class="form-group">
                        <label for="firstname" class="col-sm-3 control-label" prop='name'>用户名</label>
                        <div class="col-sm-9">
                        <input type="text" v-model="registerUser.name" class="form-control" id="firstname" required="required" placeholder="请输入用户名" pattern="[A-Za-z0-9]{6,30}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="firstname" class="col-sm-3 control-label" prop='email'>Email</label>
                        <div class="col-sm-9">
                        <input type="email" v-model="registerUser.email" class="form-control" id="" required placeholder="请输入Email地址">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="firstname" class="col-sm-3 control-label" prop='password'>密码</label>
                        <div class="col-sm-9">
                        <input type="password" v-model="registerUser.password" class="form-control" pattern="{6,16}" id="" placeholder="请输入密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="firstname" class="col-sm-3 control-label" prop='password2'>确认密码</label>
                        <div class="col-sm-9">
                        <input type="password" v-model="registerUser.password2" class="form-control" id="" placeholder="请确认密码">
                        </div>
                    </div>                   
                    <button type="submit" class="btn btn-primary btn-block" @click="submitForm('registerForm')">注册</button>
                </form>
            </div>       
        </section>
    </div>
</template>
<script>
export default{
    name : 'register',
    components : {},
    data(){
        return {
            registerUser : {
                name : '',
                email : '',
                password : '',
                password2 : '',
                
            },
            rules:{
                name:[{
                    required:true,message:'用户名不能为空',trigger:'blur'
                },{
                    min:2,max:30,message:'长度需在2-30个字节内',trigger:'blur'
                }],
                email:[],
                password:[],
                password2:[]
            }
        }
    },
    methods:{
        submitForm(formName){
            
        }
    }
}
</script>


<style scoped>
    .register{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('../../resources/images/timg.jpg') no-repeat center center;
        background-size: 100% 100%;
    }
    .from_container{
        width: 390px;
        position: relative;
        top: 20%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
        background-color:#fff;
        opacity: 0.6;
    }
    .from_container .manage_tip .title{
        font-weight: bold;
        font-size: 20px;
    }
    .form-horizontal{
        padding-top: 10px;
    }
</style>



