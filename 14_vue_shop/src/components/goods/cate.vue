<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <el-row>
               <el-col :span="24"><el-button type="primary" @click="addCate">添加分类</el-button></el-col> 
        </el-row>
        <!-- 表格区域 -->
        <tree-table :data='cateList' :columns="columns" :show-row-hover="false" :expand-type="false" :show-index="true" index-text='#' :selection-type="false" border>
            <!-- 是否有效 -->
            <template slot="cat_deleted" slot-scope="scope">
                <i class="el-icon-success" v-if='scope.row.cat_deleted===false' style="color:lightgreen"></i>
                <i class="el-icon-error" v-else style="color:red" ></i>
            </template>
            <!-- 排序 -->
            <template slot="order" slot-scope="scope">
                <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
                <el-tag v-else-if="scope.row.cat_level===1">二级</el-tag>
                <el-tag v-else>三级</el-tag>
            </template>
            <!-- 操作 -->
            <template slot="opt" slot-scope="scope">
                <el-button type="primary"  icon="el-icon-edit"  size="samll">编辑</el-button>
                <el-button type="success"  icon="el-icon-delete"  size="samll">删除</el-button>
            </template>
        </tree-table>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"  :current-page="query.pagenum" :page-sizes="[1,5, 15, 20, 30,50]"
                :page-size="query.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
        </el-pagination>
        <!-- 添加分类 -->
        <el-dialog title="添加分类"  :visible.sync="addCateDialogVisible"  width="30%" @close='closeCate'>
                <el-form :model="cateForm" :rules="cateFormRules" ref="cateFormRef" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="分类名称" prop="cat_name">
                        <el-input v-model="cateForm.cat_name"></el-input>
                    </el-form-item>
                    <el-form-item label="父级名称" prop='parent'>
                        <el-cascader :key='isResouceShow' v-model="selectKeys" :options="parentCateList" :props="cascaderProps"  @change="handleChange" clearable ></el-cascader>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="addCateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveCate">确 定</el-button>
                </span>
        </el-dialog>
    </el-card>
</div>

</template>
<script>
export default {
    data(){
        return {
            query:{
                //type:1,
                pagenum:1,
                pagesize:5
            },
            total:0,
            cateList:[],
            columns:[ 
                        {
                            label: '分类名称',
                            prop: 'cat_name',
                            //width: '400px',
                        },
                        {
                            label: '是否有效',
                            type: 'template',
                            template: 'cat_deleted',
                        },
                        {
                            label: '排序',
                            type: 'template',
                            template: 'order',
                        },
                        {
                            label: '操作',
                            type: 'template',
                            template: 'opt',
                        }
                ],
                addCateDialogVisible:false,
                cateForm:{
                    cat_pid:0,
                    cat_name:'',
                    cat_level:0
                },
                cateFormRules:{
                    cat_name:[{ required: true, message: '请输入活动名称分类名称', trigger: 'blur' }],
                    parent:[]
                },
                parentCateList:[],
                selectKeys:[],
                cascaderProps:{
                      value: 'cat_id',
                      label: 'cat_name',
                      children:'children',
                      checkStrictly: true,
                      expandTrigger:'hover' 
                },
                isResouceShow: 0

        }
    },
    created(){
        this.initCate();
    },
    methods:{
        async initCate(){
            const {data:res}=await this.$http.get('/categories',{params:this.query});
            if(res.meta.status!=200) return this.$message.error('查询商品列表失败');
            this.cateList=res.data.result;
            this.total=res.data.total;
        },
        handleSizeChange(newSize){
            this.query.pagesize=newSize;
            this.initCate();
        },
        handleCurrentChange(newPage){
            this.query.pagenum=newPage;
            this.initCate();
        },
        addCate(){
            this.addCateDialogVisible=true;
            this.getparentCateList();
        },
         //获取父级列表
        async getparentCateList(){
            const {data:res}=await this.$http.get('/categories',{params:{type:2}});
            if(res.meta.status!=200) return this.$message.error('获取父级列表失败');
            this.parentCateList=res.data;
            console.log(res.data);
        },
        handleChange(){

            console.log(this.selectKeys);
            if(this.selectKeys.length>0){
                this.cateForm.cat_pid=this.selectKeys[this.selectKeys.length-1];
                this.cateForm.cat_level=this.selectKeys.length;
            }else{
                 this.cateForm.cat_pid=0;
                 this.cateForm.cat_level=0;
            }
        },
        async saveCate(){
            // this.$refs.cateFormRef.validateField( validate=>{
            //     if(!validate) return;
                
            // });
            const {data:res}=await this.$http.post('/categories',this.cateForm);
                console.log(res);
                if(res.meta.status!=201) return this.$message.error("添加分类失败");
                this.addCateDialogVisible=false;
                this.$message.success("添加分类成功");

        },
        closeCate(){
            this.$refs.cateFormRef.resetFields();
            this.cateForm.cat_pid=0;
                 this.cateForm.cat_level=0;
                 this.selectKeys=[];
        }
    }
}

</script>

<style lang="less" scoped>

</style>