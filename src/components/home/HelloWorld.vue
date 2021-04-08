<template>
  <div id="userslist">
    <!-- //导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @clear="pagination"
          >
            <el-button slot="append" icon="el-icon-search" @click="inquiry"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Phone" prop="phone"></el-table-column>
        <el-table-column label="Email" prop="email"></el-table-column>
        <el-table-column label="Character" prop="roles"></el-table-column>
        <el-table-column label="JoinTime" prop="join"></el-table-column>
        <!-- <el-table-column label="Status">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :statused="scope.row.status"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>-->
        <el-table-column label="Operate">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="modifyDialog(scope.row.user_id)"
            ></el-button>

            <el-tooltip effect="dark" content="修改权限" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" circle></el-button>
            </el-tooltip>

            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteuser(scope.row.user_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[2, 5, 10, 50]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="resetAdd">
      <!-- 添加用户表单 -->
      <el-form
        ref="addFormRef"
        :rules="addFormRules"
        :model="addForm"
        label-width="70px"
        class="login_form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" prefix-icon="el-icon-search" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addForm.password"
            prefix-icon="el-icon-search"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入邮箱" prefix-icon="el-icon-search"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone" placeholder="请输入手机号" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUser">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="info" @click="resetAdd">重置</el-button>
      </span>
    </el-dialog>

    <!-- //修改用户信息对话框 -->
    <el-dialog title="修改用户信息" :visible.sync="modifyDialogVisible" width="50%">
      <!-- 修改用户信息表单 -->
      <el-form
        ref="modifyFormRef"
        :rules="addFormRules"
        :model="modifyForm"
        label-width="70px"
        class="login_form"
      >
        <el-form-item label="姓名">
          <el-input prefix-icon="el-icon-search" :placeholder="modifyForm.name" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="modifyForm.email"
            :placeholder="modifyForm.email"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input
            v-model="modifyForm.phone"
            :placeholder="modifyForm.phone"
            prefix-icon="el-icon-search"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modifyUser">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    //验证邮箱的校验规则
    var checkEmail = (rele, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法邮箱地址'))
    }
    //验证手机号的校验规则
    var checkPhone = (rele, value, callback) => {
      const regPhone = /^(0|86|17951)?(13[0-9]|15[01235689]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regPhone.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法手机号'))
    }
    return {
      // 获取用户列表对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      addDialogVisible: false,
      //添加用户的表单数据
      addForm: {
        name: '',
        password: '',
        email: '',
        phone: '',
      },
      //添加用户表单规则
      addFormRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
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
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
      },
      modifyDialogVisible: false,
      modifyForm: {
        id: '',
        name: '',
        email: '',
        phone: '',
      },
    }
  },

  created() {
    this.getUesrInfolist()
  },
  beforeMount() {
    this.pagination()
  },
  methods: {
    resetAdd() {
      this.$refs.addFormRef.resetFields()
    },
    async getUesrInfolist() {
      const { data: res } = await this.$http.get('apis/test')
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      console.log(res.total)
      console.log(res.data)
      this.userlist = res.data
      this.total = res.total
    },

    // 分页数据获取
    async pagination() {
      const { data: res } = await this.$http.get('apis/users/pagination', {
        params: this.queryInfo,
      })
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      console.log(res.data)
      this.userlist = res.data
    },

    // 搜索数据获取
    async inquiry() {
      const { data: res } = await this.$http.get('apis/users/inquiry', {
        params: this.queryInfo,
      })
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      console.log(res.data)
      this.userlist = res.data
      this.total = res.total
    },

    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize
      this.pagination()
    },
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage
      this.pagination()
    },
    async userStateChange(userinfo) {
      console.log(userinfo)
      let newobj = this.Transformation(userinfo)
      const { data: res } = await this.$http.put(
        `apis/users/${newobj.id}/status/${newobj.status}`
      )
      if (res.code !== 200) {
        userinfo.status = !userinfo.status
        return this.$message.error(res.msg)
      }
      this.pagination()
      this.$message.success(res.msg)
    },

    addUser() {
      console.log(this.addForm)
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(this.addForm)
        console.log(valid)
        if (!valid) return
        console.log(this.addForm)
        await this.$http
          .post('apis/users/adduserinfo', this.addForm)
          .then((data) => {
            if (data.data.code !== 201) {
              this.$message.error(data.data.msg)
            }
            this.$message.success(data.data.msg)
            this.getUesrInfolist()
            this.pagination()
            this.addDialogVisible = false
          })
      })
    },
    // 点击修改按钮获取用户信息处理函数
    async modifyDialog(id) {
      console.log(id)
      this.modifyDialogVisible = true
      const { data: res } = await this.$http.get(`apis/users/modifyUser/${id}`)
      if (res.code !== 200) {
        return this.$message.error(res.msg)
      } else {
        let data = res.data[0]
        console.log(data)
        this.$message.success(res.msg)
        this.modifyForm.id = id
        this.modifyForm.name = data.name
        this.modifyForm.email = data.email
        this.modifyForm.phone = data.phone
        console.log(this.modifyForm)
      }
    },

    //点击修改确定按钮提交用户信息处理函数
    modifyUser() {
      console.log(this.modifyForm)
      this.$refs.modifyFormRef.validate(async (valid) => {
        if (!valid) return
        await this.$http
          .post(`apis/users/modifyUsered`, this.modifyForm)
          .then((data) => {
            if (data.data.code !== 200) {
              this.$message.error(data.data.msg)
            }
            this.$message.success(data.data.msg)
            this.pagination()
            this.modifyDialogVisible = false
          })
      })
    },

    async deleteuser(id) {
      const daleteuserRes = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (daleteuserRes !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete(
        'apis/users/deleteuser/' + id
      )
      if (res.code !== 200) {
        this.$message.error(res.msg)
      }
      this.$message.success(res.msg)
      this.getUesrInfolist()
      this.pagination()
    },

    Transformation(obj) {
      if (obj.status !== true) {
        obj.status = 0
        return obj
      } else {
        obj.status = 1
        return obj
      }
    },
  },
}
</script>

<style lang= 'less' scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
