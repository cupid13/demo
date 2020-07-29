define(["jquery"], function($){
    function show(){
      console.log("我是列表显示");
      $.ajax({
        url: "../data/good.json",
        success: function(arr){
          for(let i = 0; i < arr.length; i++){
            //返回值就是我创建的这个节点
            var node = $(`<li ><a href="#">${arr[i].type}</a>
            <ul class="menu-panel">
            
            </ul>
            </li>`);
            node.appendTo($(".navLeft .nav"));
  
    //         //取出子标题
            var subTitles = arr[i].goodsType;
            for(let j = 0; j <subTitles.length; j++){
              $(`<li>
              <a target='_blank' href='list.html?list=${subTitles[j].list}'>
              <img src="${subTitles[j].img}"><span>${subTitles[j].series}</span>
              </a></li>`).appendTo(node.find(".menu-panel"));
            }
          }
        },
        error: function(msg){
          console.log(msg);
        }
})
  
    }
    return {
      show: show
    }
  })
  