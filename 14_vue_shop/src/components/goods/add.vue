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
            <el-form ref="form" :model="goodsForm" :rules='goodsFormRules' label-width="80px" label-position='top'>
                <el-tabs tab-position="left" v-model='activeName' :before-leave='changeTabs'>
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
                        <el-form-item label="商品数量" prop='goods_number'>
                            <el-cascader
                                v-model="goodsForm.goods_cat"
                                :options="cateList"
                                :props="props"
                                @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name='1'>商品参数</el-tab-pane>
                    <el-tab-pane label="商品属性" name='2'>商品属性</el-tab-pane>
                    <el-tab-pane label="商品图片" name='3'>商品图片</el-tab-pane>
                    <el-tab-pane label="商品内容" name='4'>商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            activeName:'0',
            goodsForm:{
                goods_cat:[]
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
            }
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
            console.log(this.goodsForm.goods_cat.length);
            if(old==='0'&&this.goodsForm.goods_cat.length!==3)
            {
                this.$message.error('请选择商品列表');
                return false;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .el-steps{
        margin: 15px 15px;
    }
</style>