<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-alert title="添加商品信息"   type="info" center show-icon :closable="false"></el-alert>
            <el-steps :space="200" :active="activeName-0" finish-status="success" align-center>
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <el-form ref="goodsFormRef" :model="goodsForm" :rules='goodsFormRules' label-width="80px" label-position='top'>
                <el-tabs tab-position="left" v-model='activeName' :before-leave='changeTabs' @tab-click='tabClick'>
                    <el-tab-pane label="基本信息" name='0'>
                        <el-form-item label="商品名称" prop='goods_name'>
                            <el-input v-model="goodsForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop='goods_price'>
                            <el-input v-model="goodsForm.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量"  prop='goods_weight'>
                            <el-input v-model="goodsForm.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop='goods_number'>
                            <el-input v-model="goodsForm.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" >
                            <el-cascader
                                v-model="goodsForm.goods_cat"
                                :options="cateList"
                                :props="props"
                                @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name='1'>
                        <el-form-item v-for='(item,index) in manyParamList' :label="item.attr_name" :key='index'>
                                <el-checkbox-group v-model="item.attr_vals">
                                    <el-checkbox :label="v" v-for="(v,i) in item.attr_vals" :key='i' border></el-checkbox>
                                </el-checkbox-group>     
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" name='2'>
                        <el-form-item v-for='(item,index) in onlyParamList' :label="item.attr_name" :key='index'>
                                 <el-input v-model="item.attr_vals"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name='3'>
                        <!-- 上传图片 -->
                        <el-upload
                                class="upload-demo"
                                :action="uploadUrl"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                list-type="picture" :headers='headers' :on-success='onSuccess' >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" name='4'>
                        <quill-editor></quill-editor>
                        <el-button class="addBtn" type="primary" @click="add">添加商品</el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
            <!-- 图片预览 -->
            <el-dialog title="图片预览" :visible.sync="previewDialogVisible"  width="50%" >
               <img :src="previewUrl" alt="" class="previewImg">
            </el-dialog>
        </el-card>
    </div>
</template>
<script>
import _ from 'lodash'
export default {
    data(){
        return {
            activeName:'0',
            goodsForm:{
                goods_price:0,
                goods_weight:0,
                goods_number:0,
                attrs:[],
                goods_cat:[],
                pics:[]
            },
            cateList:[],
            props:{ 
                expandTrigger: 'hover' ,
                value:'cat_id',
                label:'cat_name',
                children:'children'
            },
            goodsFormRules:{
                goods_name:[{required: true, message: '请输入商品名称', trigger: 'blur' }],
                goods_price:[{required: true, message: '请输入商品价格', trigger: 'blur' }],
                goods_weight:[{required: true, message: '请输入商品重量', trigger: 'blur' }],
                goods_number:[{required: true, message: '请输入商品数量', trigger: 'blur' }]
            },
            manyParamList:[],
            onlyParamList:[],
            uploadUrl:'http://127.0.0.1:8888/api/private/v1/upload',
            headers:{
                Authorization:window.sessionStorage.getItem('token')
            },
            previewUrl:'',
            previewDialogVisible:false
        }
    },
    created(){
        this.getCateList();
    },
    methods:{
        async getCateList(){
                const {data:res}=await this.$http.get('/categories');
                if(res.meta.status!==200) return this.$message.error('获取商品列表失败');
                this.cateList=res.data;
                
            },
        handleChange(){
            if(this.goodsForm.goods_cat.length!==3) {this.goodsForm.goods_cat=[]}
        },
        changeTabs(x,old){
            if(old==='0'&&this.goodsForm.goods_cat.length!==3)
            {
                this.$message.error('请选择商品列表');
                return false;
            }
        },
        async tabClick(newTag){
            if(newTag.name==='1'){
                const {data:res}=await this.$http.get(`/categories/${this.cateId}/attributes`,{params:{sel:'many'}});
                if(res.meta.status!==200) return  this.$message.error('获取参数失败');
                res.data.forEach((item,index)=>{
                    item.attr_vals?item.attr_vals=item.attr_vals.split(' '):item.attr_vals=[]
                });
                this.manyParamList=res.data;
            }
             if(newTag.name==='2'){
                const {data:res}=await this.$http.get(`/categories/${this.cateId}/attributes`,{params:{sel:'only'}});
                if(res.meta.status!==200) return  this.$message.error('获取参数失败');
                this.onlyParamList=res.data;
            }
        },
        handlePreview(path){
            this.previewUrl=path.response.data.url;
            this.previewDialogVisible=true;

        },
        handleRemove(filePath){
            const file=filePath.response.data.tmp_path;
            const i=this.goodsForm.pics.findIndex((v,i)=>file===v);
            this.goodsForm.pics.splice(i,1);
            console.log(this.goodsForm.pics);
        },
        onSuccess(response){
            this.goodsForm.pics.push(response.data.tmp_path);
        },
         add(){
            this.$refs.goodsFormRef.validate(async valide=>{
                if(!valide) return this.$message.error('请填写必要的表单项');

                const form = _.cloneDeep(this.goodsForm);
                form.goods_cat=this.goodsForm.goods_cat.join(',');
                this.manyParamList.forEach(item=>{
                    const param={
                        attr_id:item.attr_id,
                        attr_value:item.attr_vals.join(' ')
                    }
                    this.goodsForm.attrs.push(param);
                });
                 this.onlyParamList.forEach(item=>{
                    const param={
                                attr_id:item.attr_id,
                                attr_value:item.attr_vals
                            }
                            this.goodsForm.attrs.push(param);
                });
                form.attrs=this.goodsForm.attrs;
                console.log(form);
                const {data:res}=await this.$http.post('/goods',form);
                console.log(res);
                if(res.meta.status!==201) return this.$message.error(res.meta.msg);
                this.$router.push('/goods');
                this.$message.success(res.meta.msg);
            });
           
        }

    },
    computed:{
        cateId(){
            return this.goodsForm.goods_cat[2];
        }
    }
}
</script>
<style lang="less" scoped>
    .el-steps{
        margin: 15px 15px;
    }
    .el-checkbox{
        margin: 0 5px 0 0 !important;
    }
    .previewImg{
        width: 100%;
    }
    .quill-editor{
        height: 300px;
    }
    .addBtn{
        margin-top: 65px;
    }
</style>