define(["jquery","jquery-cookie"], function($){
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    function download(){
    var id = getUrlParam('goodsId');
    $.ajax({
        url: "./data/good.json",
        dataType: 'json',
        success: function (res) {
        for(let i = 0;i<res.length;i++){
            var arr = res[i].goodsType
            for(let j =0;j<arr.length;j++){
            $.each(arr[j].goods, function (idx, val) {
                if (id == val.goodsId) {
                    var str = `<div id = 'small'><img src='${val.img}'/><div id = 'mark'></div> </div><div id = 'big'><img src='${val.img}'/> </div>  <div class="goodsRight"><p class="name">产品名称：${val.name}</p><p class="introduction">商品简介：${val.introduction} </p><p class="price">商品价格：抢购价: ${val.price}</p>
                    <div id="${val.goodsId}" class="sc_btn">加入购物车</div></div>`;
                }
                $('.Deatail').append(str);
            });
        }
    }
        },
   });  
}
function ban(){
    $('.Deatail').on('mouseenter', '#small', function () {
        $(".Deatail #mark,#big").show();
    }).mouseleave(function () {
        $(".Deatail  #mark,#big").hide();
    }).mousemove(function (ev) {
        var l = ev.pageX - $(this).offset().left -75;
        if (l <= 0) {
            l = 0;
        }
        if (l >= 300) {
            l = 300;
        }

        var t = ev.pageY - $(this).offset().top -75;
        if (t <= 0) {
            t = 0;
        }
        if (t >= 300) {
            t = 300;
        }
        $(".Deatail  #mark").css({
            left: l,
            top: t
        })

        //让big下面的图片，反方向，对应倍数移动
        $(".Deatail  #big img").css({
            left: -3 * l,
            top: -3 * t
        })
    })
    
}
function tz(){
    $('.navCar').click(function (){
        window.open("car.html");
        });
}



return {
    download: download,
    // down:down,
    ban:ban,
    tz:tz
  };
})