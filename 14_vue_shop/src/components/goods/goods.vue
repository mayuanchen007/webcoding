<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                 <el-col :span="8">  <el-input placeholder="请输入内容" v-model="params.query" @clear="getGoodsList" clearable class="input-with-select"><el-button slot="append" icon="el-icon-search"  @click="getGoodsList"></el-button></el-input></el-col>
                 <el-col :span="8"><el-button type="primary" @click="addGoods">添加商品</el-button></el-col>
            </el-row>
            <el-table :data="goodsList" border  style="width: 100%">
                 <el-table-column type="index" width="50" label="#"></el-table-column>
                 <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
                 <el-table-column prop="goods_price" label="商品价格(元)" ></el-table-column>
                 <el-table-column prop="goods_weight" label="商品重量" ></el-table-column>
                 <el-table-column prop="add_time" label="创建时间" >
                     <template slot-scope="scope">
                         {{scope.row.add_time|dataFormat}}
                     </template>
                 </el-table-column>
                 <el-table-column >
                 <template slot-scope="scope">
                     <el-button type="primary" icon="el-icon-edit" circle></el-button>
                     <el-button type="danger" icon="el-icon-delete" @click="removeById(scope.row)" circle></el-button>
                 </template>
                 </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="params.pagenum"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="params.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total" background>
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return {
            params:{
                query:'',
                pagenum:1,
                pagesize:5
            },
            total:0,
            goodsList:[]
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        async getGoodsList(){
            const {data:res}=await this.$http.get('goods',{params:this.params});
            console.log(res);
            if(res.meta.status!==200) return this.$message.error("查询商品列表失败");
            this.total=res.data.total;
            this.goodsList=res.data.goods;
        },
        handleSizeChange(value){
            this.params.pagesize=value;
            this.getGoodsList();
        },
        handleCurrentChange(value){
            this.params.pagenum=value;
            this.getGoodsList();
        },
        async removeById(goods){
             const flag= await    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                        }).catch(error=>error);
            if(flag!==confirm) return;
            const {data:res} =this.$http.delete(`goods/${goods.id}`);
            if(res.meta.status!==200) return this.$message.error("删除商品失败");
            this.$message.success("删除商品成功");
            this.getGoodsList();
        },
        addGoods(){
            this.$router.push("/goods/add")
        }
    }
}
</script>
<style lang="less" scoped>

</style>