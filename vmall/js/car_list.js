define(["jquery", "jquery-cookie"], function ($) {
    function btn() {
        $('.navCar').click(function () {
            window.open("car.html");
        });
    }
    function download() {
        sc_num();
        sc_msg();
        totalMoney();
        $(".Deatail").on("click", ".sc_btn", function () {
            var id = this.id;
            var first = $.cookie("goods") == null ? true : false;
            if (first) {
                var arr = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(arr), {
                    expires: 7
                })
            } else {
                var cookieArr = JSON.parse($.cookie("goods"));
                var index = cookieArr.findIndex(item => item.id == id);
                if (index >= 0) {
                    cookieArr[index].num++;
                } else {
                    cookieArr.push({ id: id, num: 1 });
                }

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            sc_msg();
            sc_num();
        })
    }
    //把购物数量存到购物车图标中
    function sc_num() {
        var cookieStr = $.cookie("goods");
        if (!cookieStr) {
            $("sc_num").html(0);
        } else {
            var cookieArr = JSON.parse(cookieStr);
            var sum = 0;
            for (var i = 0; i < cookieArr.length; i++) {
                sum += cookieArr[i].num;
            }
            $(".sc_num").html(sum);
        }
    }

    //把数据布局在页面上
    function sc_msg() {
        $.ajax({
            url: "./data/good.json",
            success: function (res) {
                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = []; //符合条件数据
                    for (var l = 0; l < res.length; l++) {
                        var arrq = res[l].goodsType;
                        for (let m = 0; m < arrq.length; m++) {
                            var arr = arrq[m].goods
                            for (var i = 0; i < arr.length; i++) {
                                for (var j = 0; j < cookieArr.length; j++) {
                                    if (arr[i].goodsId == cookieArr[j].id) {
                                        arr[i].num = cookieArr[j].num;
                                        newArr.push(arr[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                        // 页面数据
                        var str = ``;
                        for (var i = 0; i < newArr.length; i++) {
                            str += `<li id="${newArr[i].goodsId}">
                            <div class="sc_goodsPic">
                            <input type="checkbox" id="${newArr[i].goodsId}" class = "boxBtn">
                            <label for="${newArr[i].goodsId}"></label>
                                <img src="${newArr[i].img}" alt="">
                            </div>
                            <div class="sc_goodsTitle">
                            <p>${newArr[i].name}</p>
                            <p>${newArr[i].introduction}</p>
                            </div>

                            <p>${newArr[i].price}</p>
                            <div class="sc_goodsNum">
                                <button>+</button>
                                ${newArr[i].num}
                                <button>-</button>
                        </div>
                            <div class="totalPrice">${newArr[i].num * newArr[i].price.substr(1, newArr[i].price.length)}</div>
                            <div class="delete_goodsBtn">删除</div>
                        </li>
                        `
                        }
                        $("#ball").html(str);
                    }

                },
                error: function(msg) {
                    console.log(msg);
                }
            })
    }
    // 商品列表中删除
    function del(){
        $("#ball").on("click", ".delete_goodsBtn", function () {
            var id = $(this).closest("li").remove().attr("id");
            console.log(id)
            var cookieArr = JSON.parse($.cookie("goods"));
            cookieArr = cookieArr.filter(item => item.id != id);
            cookieArr.length ? $.cookie("goods", JSON.stringify(cookieArr), { expires: 7 }) : $.cookie("goods", null);
            sc_num();
            sc_msg();
        })
    }
    function clearCar() {
        //清空购物车按钮
        $("#clearCar").click(function () {
            console.log(1)
          //清空购物车
          //1、清空cookie
          $.cookie("goods", null);
          //2、清空页面
          // $(".sc_right ul").html("");
          $("#ball").empty();
          sc_num();
        });
      }

    function sc_add() {
        // 数量按钮添加减少
        $("#ball").on("click", ".sc_goodsNum button", function () {
            var id = $(this).closest("li").attr("id");
            var cookieArr = JSON.parse($.cookie("goods"));
            var res = cookieArr.find(item => item.id == id);
            if (this.innerHTML == "+") {
                res.num++;
            } else {
                res.num == 1 ? alert("数量不能小于1") : res.num--;
            }
            $(this).siblings("span").html(`商品数量：${res.num}`);

            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })
            sc_num();
            sc_msg();
        })
    }
    // 全选
    function checkbox() {
        var $allCheckbox = $('input[type="checkbox"]');
        //全部的按钮
        $allCheckbox.click(function () {
            console.log($(this))
            if ($(this).is(':checked')) {
                $(this).next('label').addClass('mark');
            } else {
                $(this).next('label').removeClass('mark')
            }
        });
        //全选按钮
        $('.boxAll').click(function () {
            var $checkboxs = $('.sc_goodsPic').find('input[type="checkbox"]');
            if ($(this).is(':checked')) {
                $checkboxs.prop("checked", true);
                $checkboxs.next('label').addClass('mark');
            } else {
                $checkboxs.prop("checked", false);
                $checkboxs.next('label').removeClass('mark');
            }
            totalMoney();
        });

        // 判断单个复选框有一个未选中，全选按钮取消选中，若全都选中，则全选打对勾 
        $("#ball").each(function () {
            $("#ball").on("click", ".boxBtn", function () {
                var $btnAll = $('#ball').find('input[type="checkbox"]')
                if ($(this).is(':checked')) {
                    $(this).next('label').addClass('mark');
                    var num = 0;
                    var len = $btnAll.length;
                    $btnAll.each(function () {
                        if ($(this).is(':checked')) {
                            num++;
                        }
                    });
                    if (num == len) {
                        $(this).parents('#ball').prev().find('.boxAll').prop("checked", true);
                        $(this).parents('#ball').prev().find('.boxAll').next('label').addClass('mark');
                    }

                } else {
                    //否则，店铺全选取消
                    $(this).next('label').removeClass('mark')
                    $(this).parents('#ball').prev().find('.boxAll').prop("checked", false);
                    $(this).parents('#ball').prev().find('.boxAll').next('label').removeClass('mark');
                }
                totalMoney();

            });
        })

    }
    function totalMoney() {
        var total_money = 0;
        // $("#ball").on("click", ".boxBtn",function(){
        var $btnAll = $('#ball').find('input[type="checkbox"]');
        $btnAll.each(function () {
            if ($(this).is(':checked')) {
                var goods = parseInt($(this).parent().parent().find('.totalPrice').html());
                total_money += goods;
            }
            // });
            $('.buyBottom .totalMoney').html('￥' + total_money);
        });
    }
    return {
        btn: btn,
        download: download,
        sc_num: sc_num,
        sc_msg: sc_msg,
        del: del,
        clearCar:clearCar,
        add: sc_add,
        checkbox: checkbox,
        totalMoney: totalMoney,
    }

});

