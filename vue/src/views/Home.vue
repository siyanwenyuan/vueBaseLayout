<template>
  <div style="padding: 10px">
    <!--功能区域-->
    <div style="margin: 10px 0">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>
    <!--搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable></el-input>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <!--表格区域-->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID"/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="handleEdit(scope.row)"
          >编辑
          </el-button
          >
          <el-popconfirm title="确认删除吗?" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button type="text">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!--底部分页-->
    <div style="margin: 10px 0">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />


      <!--点击新增，弹出的对话框-->
      <el-dialog
          v-model="dialogVisible"
          title="提示"
          width="30%"
      >
        <el-form :model="form" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 80%"/>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 80%"/>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"/>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
            <el-radio v-model="form.sex" label="未知">未知</el-radio>
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address" style="width: 80%"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import request from "@/utils/request";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      /*前端中的一些变量*/
      form: {},
      dialogVisible: false,
      search: '',
      currentPage: 1,
      total: 10,
      pageSize: 10,
      tableData: []
    }
  },
  methods: {
    handleEdit(row) {
      /**
       * 进行深拷贝
       * 将row对象的值深拷贝给form表单对象
       * @type {any}
       */
      this.form = JSON.parse(JSON.stringify(row));
      //弹出弹窗
      this.dialogVisible = true;

    },

    /*
    删除，根据id删除
     */
    handleDelete(id) {

      request.delete("/user/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: '删除成功'
          })
        } else {
          this.$message({
            type: "error",
            message: "删除失败"
          })
        }

        this.load();//删除后需要重新加载表格
      })

    },
    handleSizeChange() {
      //改变当前个数触发
      this.load();//重新刷新表格数据

    },
    handleCurrentChange() {
      //改变当前页数触发
      this.load();//重新刷新表格数据
    },

    /**
     * 增加
     */
    add() {
      //点击新增按钮，然后弹出弹框
      this.dialogVisible = true;
      //弹出弹窗则需要清空form中的数据，也就是将from中的表单的数据清空
      this.form = {}//清空表单域 每次一打开这个表单则直接清空form中之前的数据
    },

    /*
    新增接口
    * */
    save() {
      if (this.form.id) {
        //如果form对象中有id 则直接更新
        request.put("/user", this.form).then(res => {
          console.log(res);
          //通过返回结果中的值先进行判断是否更新成功
          //其中res的数据与后端对应
          if (res.code === '0') {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              //res.msg是打印出成功或则失败的信息
              message: res.msg
            })
          }
          this.load();//刷新页面，重新加载查询
          this.dialogVisible = false;//更新成功后关闭弹窗
        })
      } else {
        //如果没有id则直接新增
        request.post("/user", this.form).then(res => {
          console.log(res)
          if (res.code === '0') {
            //其中的￥。message是自带的提示，如果更新成功，则提示更新成功
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load();//新增成功后直接刷新表格中的数据
          this.dialogVisible = false;//然后关闭弹窗
        })
      }


    },
    /*
    分页查询接口
    * */
    load() {
      request.get("/user", {
        /*其中的请求参数，注意其中的{}这样写
        前面要和后端中接口的参数名一致性，后面要和前端中的参数名一致
        this.  代表的是前端的数据
        * */
        /**
         * 其中params
         * 是get请求中使用的，如果是需要请求参数在get请求中则必需使用这个params
         * 但是如果是在post请求中，
         * 则直接this.form
         */
        params: {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }

      }).then(res => {
        console.log(res);
        /*将返回得到的res.data.records中的数据复制给前端中的tableData属性
        * 这样即可展示在前端页面*/
        this.tableData = res.data.records;
        this.total = res.data.total;

      })
    },

  },

  /*这个方法是页面以架子啊就执行其中的方法*/
  created() {
    this.load();
  }
}
</script>
