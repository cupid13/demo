define(["jquery","jquery-cookie"], function($){
  function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
  }
  function show(){
  var list = getUrlParam('list');
  $.ajax({
      type: 'get',
      url: "../data/good.json",
      dataType: 'json',
      success: function (obj) {
          for(var l = 0;l < obj.length;l++){
            var arr = obj[l].goodsType;
            for(let m = 0;m<arr.length;m++){      
              if (list== arr[m].list) {
                var arr = arr[m].goods;
                for(let j = 0;j<arr.length;j++){
                  var str = `<div class="list" index="${arr[j].goodsId}">
                  <a target='_blank' href='Details.html?goodsId=${arr[j].goodsId}'>
                     <img src="${arr[j].img}" alt="">
                  </a>
                    <p class="name">${arr[j].name}</p>
                    <p class = "price">${arr[j].price}</p>
                      <h5><span>一站式换新</span> <span>商品赠券</span></h5>
                      <h6><em>2660人评价</em> <em>98%好评</em><h6>
                      </div>`;
                      $('.series').append(str);
                }
              }
            }

          }
     
      },
 });  

  
}
return {
  show: show,

};
})