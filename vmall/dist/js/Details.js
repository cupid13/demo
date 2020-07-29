console.log("我是详情");
//引入所有的模块
//配置路径
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    Details_list: "Details_list",
    car_list:"car_list"
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD

  },
});

require(["Details_list","car_list"], function(Details_list, car_list){
    Details_list.download(),
    Details_list.ban(),
    Details_list.tz()
    car_list.btn(),
    car_list.download(),
    car_list.sc_num(),
    car_list.sc_msg(),
    car_list.del(),
    car_list.add(),
    car_list.checkbox(),
    car_list.totalMoney()
})
