<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="10"><el-input placeholder="请输入内容" class="input-with-select"><el-button slot="append" icon="el-icon-search"></el-button></el-input></el-col>
                <el-col :span="6"></el-col>
            </el-row>
            <el-table :data="orderList"   border  style="width: 100%">
                <el-table-column  type="index" label="#" width="50"></el-table-column>
                <el-table-column  prop="order_number" label="订单编号"  width="250"> </el-table-column>
                <el-table-column  prop="order_price" label="订单价格" > </el-table-column>
                <el-table-column  prop="order_pay" label="是否付款" >
                    <template slot-scope="scope">
                        <el-tag type="warning" v-if='scope.row.order_pay===1'>已付款</el-tag>
                        <el-tag type="danger" v-else>未付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  prop="is_send" label="是否发货" > </el-table-column>
                <el-table-column  prop="create_time" label="下单时间" >
                    <template slot-scope="scope">
                        {{scope.row.create_time|dataFormat}}                        
                    </template>    
                </el-table-column>
                <el-table-column  label="操作" > 
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="showAddress" size="mini" circle></el-button>
                        <el-button type="success" icon="el-icon-location" @click="showProgress(scope.row)" size="mini" circle></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="param.pagenum"
                :page-sizes="[8, 15, 20, 50]"
                :page-size="param.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <el-dialog title="修改地址" :visible.sync="addressDialogVisible" width="50%"  >
            <span>
                <el-form ref="addressFromRef" :model="addressFrom" label-width="80px">
                    <el-form-item label="省市区/县">
                        <el-cascader
                            v-model="addressFrom.addr"
                            :options="addressData"  :props="{ expandTrigger: 'hover' }"></el-cascader>
                    </el-form-item>
                     <el-form-item label="详细地址">
                        <el-input v-model="addressFrom.consignee_addr"></el-input>
                    </el-form-item>
                </el-form>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addressDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="查询物流信息" :visible.sync="progressDialogVisible" width="50%"  >
            <span>
               <el-timeline :reverse='true'>
                    <el-timeline-item
                    v-for="(activity, index) in progressList"
                    :key="index"
                    :timestamp="activity.time">
                    {{activity.context}}
                    </el-timeline-item>
                </el-timeline>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="progressDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="progressDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import addressData from '../../citydata.js'
export default {
    data(){
        return {
            orderList:[],
            param:{
                query:'',
                pagenum:1,
                pagesize:8
            },
            total:0,
            addressDialogVisible:false,
            addressData,
            addressFrom:{},
            progressDialogVisible:false,
            progressList:[]
       

        }
    },
    created(){
        this.getOrderList();
    },
    methods:{
        async getOrderList(){
            const {data:res}=await this.$http.get('/orders',{params:this.param});
            if(res.meta.status !==200) return this.$message.error("获取订单列表失败");
            this.orderList=res.data.goods;
            console.log(res);
            this.total=res.data.total;
        },
        handleSizeChange(v){
            this.param.pagesize=v;
            this.getOrderList();
        },
        handleCurrentChange(v){
            this.param.pagenum=v;
            this.getOrderList();
        },
        showAddress(){
            this.addressDialogVisible=true;
        },
        async showProgress(order){
            this.progressDialogVisible=true;
            this.progressList=this.progress.data;
        }
    },
    computed:{
        progress(){
            return {
                "data": [
                    {
                    "time": "2018-05-10 09:39:00",
                    "ftime": "2018-05-10 09:39:00",
                    "context": "已签收,感谢使用顺丰,期待再次为您服务",
                    "location": ""
                    },
                    {
                    "time": "2018-05-10 08:23:00",
                    "ftime": "2018-05-10 08:23:00",
                    "context": "[北京市]北京海淀育新小区营业点派件员 顺丰速运 95338正在为您派件",
                    "location": ""
                    },
                    {
                    "time": "2018-05-10 07:32:00",
                    "ftime": "2018-05-10 07:32:00",
                    "context": "快件到达 [北京海淀育新小区营业点]",
                    "location": ""
                    },
                    {
                    "time": "2018-05-10 02:03:00",
                    "ftime": "2018-05-10 02:03:00",
                    "context": "快件在[北京顺义集散中心]已装车,准备发往 [北京海淀育新小区营业点]",
                    "location": ""
                    },
                    {
                    "time": "2018-05-09 23:05:00",
                    "ftime": "2018-05-09 23:05:00",
                    "context": "快件到达 [北京顺义集散中心]",
                    "location": ""
                    },
                    {
                    "time": "2018-05-09 21:21:00",
                    "ftime": "2018-05-09 21:21:00",
                    "context": "快件在[北京宝胜营业点]已装车,准备发往 [北京顺义集散中心]",
                    "location": ""
                    },
                    {
                    "time": "2018-05-09 13:07:00",
                    "ftime": "2018-05-09 13:07:00",
                    "context": "顺丰速运 已收取快件",
                    "location": ""
                    },
                    {
                    "time": "2018-05-09 12:25:03",
                    "ftime": "2018-05-09 12:25:03",
                    "context": "卖家发货",
                    "location": ""
                    },
                    {
                    "time": "2018-05-09 12:22:24",
                    "ftime": "2018-05-09 12:22:24",
                    "context": "您的订单将由HLA（北京海淀区清河中街店）门店安排发货。",
                    "location": ""
                    },
                    {
                    "time": "2018-05-08 21:36:04",
                    "ftime": "2018-05-08 21:36:04",
                    "context": "商品已经下单",
                    "location": ""
                    }
                ],
                "meta": { "status": 200, "message": "获取物流信息成功！" }
                }
        }
    }

}
</script>
<style lang="less" scoped>
    .el-card{
        height: 100%;
    }
    .el-cascader{
        width: 100%;
    }
</style>