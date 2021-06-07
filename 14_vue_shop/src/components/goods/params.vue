<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类参数</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
             <el-alert class="tx" title="注意：只允许为第三级分类设置相关的参数！" show-icon type="warning"></el-alert>
             <span>选择商品分类：</span>
             <!-- 级连选择框 -->
               <el-cascader v-model="cate" :options="cateList" :props="cateProps"  @change="handleChange"></el-cascader>
            <!-- tab页 -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="动态参数" name="many">
                    <el-button type="primary" :disabled='isBtnDisabled' @click="addManyParams">添加参数</el-button>
                    <el-table :data="manyTable"   border  style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" closable @close="handleClose(index,scope.row)">
                                        {{item}}
                                </el-tag>
                                <el-input  class="input-new-tag" v-if="scope.row.inputVisible"  v-model="scope.row.inputValue" ref="saveTagInput" size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)" > 
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index"  label="#" width="50"></el-table-column>
                        <el-table-column prop="attr_name" label="参数名称"  > </el-table-column>
                        
                             <el-table-column label="操作" >
                                 <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" @click="showEditDialogVisible(scope.row.attr_id)" >编辑</el-button>
                                    <el-button type="success" icon="el-icon-delete" @click="deleteparams(scope.row.attr_id)" >删除</el-button>     
                                     </template>
                             </el-table-column>
                       
                       
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态属性" name="only">
                     <el-button type="primary" :disabled='isBtnDisabled' @click="addManyParams" >添加属性</el-button>
                       <el-table :data="onlyTable"   border  style="width: 100%">
                        
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" closable @close="handleClose(index,scope.row)">
                                        {{item}}
                                </el-tag>
                                <el-input  class="input-new-tag" v-if="scope.row.inputVisible"  v-model="scope.row.inputValue" ref="saveTagInput" size="small"
                                    @keyup.enter.native="handleInputConfirm(scope.row)"
                                    @blur="handleInputConfirm(scope.row)" > 
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column type="index" width="50"></el-table-column>
                        <el-table-column prop="attr_name" label="参数名称"  > </el-table-column>
                        
                             <el-table-column label="操作" >
                                 <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" @click="showEditDialogVisible(scope.row.attr_id)">编辑</el-button>
                                    <el-button type="success" icon="el-icon-delete" @click="deleteparams(scope.row.attr_id)" >删除</el-button>     
                                    </template>
                             </el-table-column>
                        
                       
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <!-- 添加动态参数 -->
            <el-dialog :title="title" :visible.sync="addDialogVisible" width="30%" >
                <span>
                    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef"  label-width="80px">
                        <el-form-item :label="title" prop='attr_name'>
                            <el-input v-model="addForm.attr_name"></el-input>
                        </el-form-item>
                    </el-form>
                </span>  
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveCate">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 编辑按钮 -->
            <el-dialog :title="title" :visible.sync="editDialogVisible" width="30%" >
                <span>
                    <el-form :model="editForm" :rules="editFormRules" ref="editFormRef"  label-width="80px">
                        <el-form-item :label="title" prop='attr_name'>
                            <el-input v-model="editForm.attr_name"></el-input>
                        </el-form-item>
                    </el-form>
                </span>  
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editCate">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            cateList:[],
            cate:[],
            cateProps:{
                value: 'cat_id',
                label: 'cat_name',
                children:'children',
                expandTrigger: 'hover' 
            },
            activeName:'many',
            onlyTable:[],
            manyTable:[],
            addDialogVisible:false,
            addForm:{
                attr_name:''
            },
            addFormRules: {
                attr_name: [
                            { required: true, message: '请输入参数名称', trigger: 'blur' }
                        ]
            },
            editForm:{
                cate_name:''
            },
            editFormRules:{
                attr_name: [
                            { required: true, message: '请输入参数名称', trigger: 'blur' }
                        ]
            },
            editDialogVisible:false,
            

        }
    },
    created(){
        this.initCateList();
    },
    methods:{
        async initCateList(){
            const {data:res}=await this.$http.get('/categories',{params:{type:3}});
            if(res.meta.status!==200) return this.$message.erroe("获取商品分类失败");
            this.cateList=res.data;
        },
        async handleChange(){
            console.log(this.cate);
            if(this.cate.length!==3)
            {
                this.cate=[];
                this.onlyTable=[];
                this.manyTable=[];
               return;
            }
           this.getAttributes();
        },
        async handleClick(){
            this.getAttributes();
        },
        async getAttributes(){
            const {data:res}=await this.$http.get(`/categories/${this.cat_id}/attributes`,{params:{sel:this.activeName}});
            if(res.meta.status!==200) return this.$message.error("获取参数失败");
            
            res.data.forEach((item,index)=>{
                item.attr_vals?item.attr_vals=item.attr_vals.split(' '):item.attr_vals=[];
                item.inputVisible=false;
                item.inputValue=''
            });
            console.log(res.data);
            if(this.activeName==='only'){
               this.onlyTable=res.data;
            }
            else{
                 this.manyTable=res.data;
            }
        },
        addManyParams(){
            this.addDialogVisible=true;
        },
        saveCate(){
            this.$refs.addFormRef.validate(async validate=>{
                if(!validate) return;
                const {data:res}=await this.$http.post(`categories/${this.cat_id}/attributes`,{
                    attr_name:this.addForm.attr_name,attr_sel:this.activeName,
                });
                if(res.meta.status!==201)
                {
                    return this.$message.error("添加参数失败");
                }
                this.getAttributes();
                this.addDialogVisible=false;
                this.$message.success("添加参数成功");

            });
        },
        async showEditDialogVisible(id){
            this.editDialogVisible=true;
            //根据ID查询
            const {data:res}=await this.$http.get(`categories/${this.cat_id}/attributes/${id}`,{params:{attr_sel:this.activeName}});
            this.editForm=res.data
        },
        //保存修改
        
        editCate(){
            this.$refs.editFormRef.validate(async validate=>{
                if(!validate) return;
                const {data:res}=await this.$http.put(`categories/${this.cat_id}/attributes/${this.editForm.attr_id}`,{
                    attr_name:this.editForm.attr_name,attr_sel:this.activeName });
                    if(res.meta.status!==200)
                {
                    return this.$message.error("编辑参数失败");
                }
                this.getAttributes();
                this.editDialogVisible=false;
                this.$message.success("编辑参数成功");
            });         
        },
        //删除
        async deleteparams(id){
            
            const msg= await this.$confirm('是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).catch(error=>error);
                    console.log(msg);
                    if(msg==='cancel')
                    {
                            return;
                    }
                    else{
                        console.log(this.id);
                        const {data:res}=await this.$http.delete(`categories/${this.cat_id}/attributes/${id}`);
                        console.log(res);
                        if(res.meta.status!==200) return this.$message.error("删除失败");
                        this.$message.success("删除成功");
                         this.getAttributes();
                    }
        },
        async handleInputConfirm(param){
            if(param.inputValue.trim().length===0){
                param.inputVisible=false;
                param.inputValue=''
                return;
            }
            //发送请求保存tag
            param.attr_vals.push(param.inputValue.trim());
            console.log(param.attr_vals);
            const {data:res}=await this.$http.put(`categories/${this.cat_id}/attributes/${param.attr_id}`,{
                attr_name:param.attr_name,
                attr_sel:this.activeName,
                attr_vals:param.attr_vals.join(' ')
            });
            if(res.meta.status!==200) return this.$message.error('添加失败');
             param.inputVisible=false;
             param.inputValue=''
        },
        showInput(param){
            param.inputVisible=true;
             this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
        },
        async handleClose(index,param){
            param.attr_vals.splice(index,1);
            const {data:res}=await this.$http.put(`categories/${this.cat_id}/attributes/${param.attr_id}`,{
                attr_name:param.attr_name,
                attr_sel:'many',
                attr_vals:param.attr_vals.join(' ')
            });
            if(res.meta.status!==200) return this.$message.error('删除成功');
             param.inputVisible=false;
             param.inputValue=''
        }

    },
    computed:{
        isBtnDisabled(){
            if(this.cate.length!==3)
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        cat_id(){
             if(this.cate.length===3)
            {
                return this.cate[2];
            }
            else
            {
                return null;
            }
        },
        title(){
            if(this.activeName==='only'){
              return "属性名称";
            }
            else{
                 return "参数名称";
            }
        }
        
    }
}
</script>
<style lang="less" scoped>
    .tx{
        margin: 15px 0;
    }
    .el-tag{
        margin: 0 15px;
    }
    .input-new-tag{
        
        width: 120px;
    }
</style>