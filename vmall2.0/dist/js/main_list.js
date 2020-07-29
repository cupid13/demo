define(["jquery", "jquery-cookie"], function ($) {
    function download() {
        $.ajax({
            url: "../data/data.json",
            dataType: "json",
            success: function (arr) {
                for (let i = 0; i < arr.length; i++) {
                    console.log(arr[i].type)
                    var node = $(`<div class="pro" id="${arr[i].name}">
                        <h3><a href="#">${arr[i].type} </a>
                        <ul class="menu-panel">     
                        </ul></h3>
                        <div class="goodsList" >
                        </div>
                        </div>
                        `);
                    node.appendTo($(".goods"));
                    var type = arr[i].goodTy;
                    console.log(arr[i].goodTy)
                    for (var j = 0; j < type.length; j++) {
                        var subTitles = type[j].series;
                        for (let l = 0; l < subTitles.length; l++) {
                            $(`<li>${subTitles[l]}</li>`).appendTo(node.find(".menu-panel"));
                        }

                        var goods = type[j].goods;
                        for (let j = 0; j < 1; j++) {
                            $(`<div class="list"  index="${goods[j].goodsId}">
                        <a target='_blank' href='Details.html?goodsId=${goods[j].goodsId}'>
                           <img src="${goods[j].img}" alt="">
                        </a>
                          <p>${goods[j].name}</p>
                         <u>${goods[j].introduction}</u>
                            <span>${goods[j].price}</span></div>
                         `).appendTo(node.find(".goodsList"));
                        }
                    }

                }

            },
            error: function (msg) {
                console.log(msg);
            }
        });

    }
    function ban() {
        $(' .navLeft .nav').on('mouseenter', "li", function () {
            $(this).find('.menu-panel').show()
        })
        $(' .navLeft .nav').on('mouseleave', "li", function () {
            $(this).find('.menu-panel').hide()
        })
        $(".right_bottom").click(function () {
            $(window).scrollTop(0);
            console.log($(window).scrollTop(0))
        })

    }
    return {
        download: download,
        ban: ban
    };
});