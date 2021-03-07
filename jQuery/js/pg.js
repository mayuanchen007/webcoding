$(function() {
    getSum();
    getTotal()
        //全选按钮
    $(".checkall").change(function() {
        $(".p-checkbox>input").prop("checked", $(".checkall").prop("checked"));
        $(".checkall_a").prop("checked", $(".checkall").prop("checked"));
        //选择改变背景颜色
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("current-checked");
        } else {
            $(".cart-item").removeClass("current-checked");
        }
    });
    $(".checkall_a").change(function() {
        $(".p-checkbox>input").prop("checked", $(".checkall_a").prop("checked"));
        $(".checkall").prop("checked", $(".checkall_a").prop("checked"));
        //选择改变背景颜色
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("current-checked");
        } else {
            $(".cart-item").removeClass("current-checked");
        }
    });
    $(".p-checkbox>input").change(function() {
        if ($(".p-checkbox>input:checked").length === $(".p-checkbox>input").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        //选择改变背景颜色
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("current-checked");
        } else {
            $(this).parents(".cart-item").removeClass("current-checked");
        }

    });
    //产品数量增减
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        var totle = "￥" + price.substr(1, price.length) * n;
        $(this).parents(".p-num").siblings(".p-sum").html(totle);
        getSum();
        getTotal();
    });
    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val();
        n--;
        n < 1 ? $(this).siblings(".itxt").val(0) : $(this).siblings(".itxt").val(n);
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        var totle = "￥" + price.substr(1, price.length) * n;
        $(this).parents(".p-num").siblings(".p-sum").html(totle);
        getSum();
        getTotal();
    });
    $(".itxt").change(function() {
        var n = $(this).val();
        var price = $(this).parents(".p-num").siblings(".p-price").html();
        var totle = "￥" + price.substr(1, price.length) * n;
        $(this).parents(".p-num").siblings(".p-sum").html(totle);
        getSum();
        getTotal();
    });
    //清空购物车
    $(".clear").click(function() {
        $(".cart-item-list").remove();
        getSum();
        getTotal();
    });
    //删除选中的商品
    $(".delete").click(function() {
        $(".p-checkbox>input:checked").parents(".cart-item").remove();
        getSum();
        getTotal();
    });
    //删除按钮
    $(".t-action").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
        getTotal();
    });
});

function getSum() {
    var sum = 0;
    $(".cart-item").each(function(i, ele) {
        var price = $(ele).find(".p-sum").text().trim();
        var price_a = price.substr(1, price.length);
        console.log(price_a);
        sum += parseInt(price_a);

    });
    console.log(sum.toFixed(2));
    $(".tatolPrice>em").html(" ￥" + sum.toFixed(2));
}

function getTotal() {
    var sum = 0;
    $(".cart-item").each(function(i, ele) {
        var a = $(ele).find(".itxt").val().trim();
        sum += parseInt(a);
    });
    console.log(sum);
    $(".tatolNum>span").html(sum);
}