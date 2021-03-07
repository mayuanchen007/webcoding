//监控模块展示
(function() {
    $(".tabs").on("click", "a", function() {
        $(this).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        $(".monitor .content").eq(index).show().siblings(".content").hide();
    });

})();
//点位分布模块
(function() {
    var chars = document.querySelector(".pie");
    var myEcharts = echarts.init(chars);
    var option = {

        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
        },

        series: [{
            name: '面积模式',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 5
            },
            label: {
                fontSize: 10
            },
            // 引导线调整
            labelLine: {
                // 连接扇形图线长
                length: 6,
                // 连接文字线长
                length2: 8
            },
            data: [
                { value: 20, name: '云南' },
                { value: 26, name: '北京' },
                { value: 24, name: '山东' },
                { value: 25, name: '河北' },
                { value: 20, name: '江苏' },
                { value: 25, name: '浙江' },
                { value: 30, name: '四川' },
                { value: 42, name: '湖北' }
            ]
        }],
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
    };
    myEcharts.setOption(option);
    window.addEventListener('resize', function() {
        myEcharts.resize();
    });
})();
//柱状图
(function() {
    var item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
            color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
            itemStyle: {
                color: '#254065'
            }
        },
        // 工具提示隐藏
        tooltip: {
            extraCssText: 'opacity:0'
        },
    }
    var myEcharts = echarts.init(document.querySelector(".bar"));
    var option = {
        tooltip: {
            trigger: 'item',

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            //  图表位置紧贴画布边缘是否显示刻度以及label文字 防止坐标轴标签溢出跟grid 区域有关系
            containLabel: true,
            // 是否显示直角坐标系网格
            show: true,
            //grid 四条边框的颜色
            borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [{
            type: 'category',
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            axisTick: {
                alignWithLabel: false,
                show: false
            },
            // x坐标轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd'
            },
            // x坐标轴颜色设置
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)',
                    // width:8,  x轴线的粗细
                    // opcity: 0,   如果不想显示x轴线 则改为 0
                }
            }

        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                alignWithLabel: false,
                show: false
            },
            // y坐标轴文字标签样式设置
            axisLabel: {
                color: '#4c9bfd'
            },
            // y坐标轴颜色设置
            axisLine: {
                lineStyle: {
                    color: 'rgba(0, 240, 255, 0.3)',
                    width: 8
                        //y轴线的粗细
                        // opcity: 0,   如果不想显示y轴线 则改为 0
                }
            }
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',

            data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
        }],
        // 修改线性渐变色方式 1
        color: new echarts.graphic.LinearGradient(
            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
            0, 0, 0, 1, [
                { offset: 0, color: '#00fffb' }, // 0 起始颜色
                { offset: 1, color: '#0061ce' } // 1 结束颜色
            ]
        )
    };
    myEcharts.setOption(option);
    window.addEventListener('resize', function() {
        myEcharts.resize();
    });
})();
(function() {
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    var myEcharts = echarts.init(document.querySelector(".line"));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['预期销售额', '实际销售额'],
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: "10%"
        },
        // 设置网格样式
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true, // 显示边框
            borderColor: '#012f4a', // 边框颜色
            containLabel: true, // 包含刻度文字在内
            show: true,
            borderColor: '#012f4a'
        },
        xAxis: {
            type: 'category',
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            boundaryGap: false // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false // 去除刻度
            },
            axisLabel: {
                color: '#4c9bfd' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a' // 分割线颜色
                }
            }
        },
        color: ['#00f2f1', '#ed3f35'],
        series: [{
            name: '预期销售额',
            data: data.month[0],
            type: 'line',
            smooth: true
        }, {
            name: '实际销售额',
            data: data.month[1],
            type: 'line',
            smooth: true
        }]
    };
    myEcharts.setOption(option);
    $(".sales .caption").on('click', 'a', function() {
        $(this).addClass("active").siblings("a").removeClass('active');
        var t = data[this.dataset.type];
        option.series[0].data = t[0];
        option.series[1].data = t[1];
        myEcharts.setOption(option);

    });
    var index = 0;
    var timer = window.setInterval(function() {
        if (index >= 4) {
            index = 0;
        }
        var t = $(".sales .caption a").eq(index).click();
        index++;
    }, 1000)
    $(".line").hover(function() {
        window.clearInterval(timer);
    }, function() {
        timer = window.setInterval(function() {
            if (index >= 4) {
                index = 0;
            }
            var t = $(".sales .caption a").eq(index).click();
            index++;
        }, 1000)
    });
    window.addEventListener('resize', function() {
        myEcharts.resize();
    });
})();
//雷达图
(function() {
    var myEcharts = echarts.init(document.querySelector('.radar'));
    var dataBJ = [
        [65, 99, 56, 46, 38, 61]
    ];


    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    option = {
        tooltip: {
            show: true,
            // 控制提示框组件的显示位置
            position: ['60%', '10%'],
        },
        radar: {
            // 雷达图的指示器 内部填充数据
            indicator: [
                { name: '机场', max: 100 },
                { name: '商场', max: 100 },
                { name: '火车站', max: 100 },
                { name: '汽车站', max: 100 },
                { name: '地铁', max: 100 }
            ],
            shape: 'circle',
            splitNumber: 4,
            center: ['50%', '50%'],
            // 外半径占据容器大小
            radius: '60%',
            name: {
                // 修饰雷达图文本颜色
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            // 坐标轴在 grid 区域中的分隔线（圆圈）
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                }
            },
            splitArea: {
                show: false
            },
            // 坐标轴轴线相关设置(竖线)axisLine
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.5)'
                        // width: 1,
                        // type: 'solid'
                }
            }
        },
        series: [{
            name: '北京',
            type: 'radar',
            lineStyle: {
                normal: {
                    color: '#fff',
                    // width: 1
                }
            },
            label: {
                show: true,
                color: '#fff',
                fontSize: 10
            },
            data: dataBJ,
            symbol: 'circle',
            symbolsize: 5,
            itemStyle: {
                color: '#fff'
            },
            areaStyle: {
                color: 'rgba(238, 197, 102, 0.6)',
            }
        }]
    };
    myEcharts.setOption(option);
    window.addEventListener('resize', function() {
        myEcharts.resize();
    });
})();
//饼星图
(function() {
    var myEcharts = echarts.init(document.querySelector(".gauge"));
    option = {
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: ['130%', '150%'],
            center: ['48%', '80%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            startAngle: 180,
            labelLine: {
                show: false
            },
            data: [{
                    value: 75,
                    itemStyle: {
                        // 颜色渐变#00c9e0->#005fc1
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0,
                            0,
                            0,
                            1, [
                                { offset: 0, color: "#00c9e0" }, // 0 起始颜色
                                { offset: 1, color: "#005fc1" } // 1 结束颜色
                            ]
                        )
                    }
                },
                {
                    value: 25,
                    itemStyle: {
                        // 颜色渐变#00c9e0->#005fc1
                        color: new echarts.graphic.LinearGradient(
                            // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                            0,
                            0,
                            0,
                            1, [
                                { offset: 0, color: "#005fc1" }, // 0 起始颜色
                                { offset: 1, color: "#00c9e0" } // 1 结束颜色
                            ]
                        )
                    }
                },
                { value: 100, itemStyle: { color: 'transparent' } },
            ]
        }]
    };
    myEcharts.setOption(option);
    window.addEventListener('resize', function() {
        myEcharts.resize();
    });
})();
//销售
(function() {
    var hotData = [{
            city: '北京', // 城市
            sales: '25, 179', // 销售额
            flag: true, //  上升还是下降
            brands: [ //  品牌种类数据
                { name: '可爱多', num: '9,086', flag: true },
                { name: '娃哈哈', num: '8,341', flag: true },
                { name: '喜之郎', num: '7,407', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '6,724', flag: false },
                { name: '好多鱼', num: '2,170', flag: true },
            ]
        },
        {
            city: '河北',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '3,457', flag: false },
                { name: '娃哈哈', num: '2,124', flag: true },
                { name: '喜之郎', num: '8,907', flag: false },
                { name: '八喜', num: '6,080', flag: true },
                { name: '小洋人', num: '1,724', flag: false },
                { name: '好多鱼', num: '1,170', flag: false },
            ]
        },
        {
            city: '上海',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '2,345', flag: true },
                { name: '娃哈哈', num: '7,109', flag: true },
                { name: '喜之郎', num: '3,701', flag: false },
                { name: '八喜', num: '6,080', flag: false },
                { name: '小洋人', num: '2,724', flag: false },
                { name: '好多鱼', num: '2,998', flag: true },
            ]
        },
        {
            city: '江苏',
            sales: '23,252',
            flag: false,
            brands: [
                { name: '可爱多', num: '2,156', flag: false },
                { name: '娃哈哈', num: '2,456', flag: true },
                { name: '喜之郎', num: '9,737', flag: true },
                { name: '八喜', num: '2,080', flag: true },
                { name: '小洋人', num: '8,724', flag: true },
                { name: '好多鱼', num: '1,770', flag: false },
            ]
        },
        {
            city: '山东',
            sales: '20,760',
            flag: true,
            brands: [
                { name: '可爱多', num: '9,567', flag: true },
                { name: '娃哈哈', num: '2,345', flag: false },
                { name: '喜之郎', num: '9,037', flag: false },
                { name: '八喜', num: '1,080', flag: true },
                { name: '小洋人', num: '4,724', flag: false },
                { name: '好多鱼', num: '9,999', flag: true },
            ]
        }
    ];
    var nr = '';
    $.each(hotData, function(index, item) {
        var li = `<li> <span>${item.city}</span><span>${item.sales}<s class=${item.flag?"icon-up":"icon-down"}></s></span> </li>`;
        nr += li;
    });
    $('.province .sup').html(nr);
    $(".province .sup").on("mouseenter", "li", function() {
        $(this).addClass("active").siblings("li").removeClass("active");
        var a = '';
        for (key in hotData[$(this).index()].brands) {
            var v = `<li><span>${hotData[$(this).index()].brands[key].name}</span><span> <s class=${hotData[$(this).index()].brands[key].flag?"icon-up":"icon-down"}></s></span></li>`;
            a += v;
        }
        console.log(a);
        $('.province .sub').html(a);
    });
})();