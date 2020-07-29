console.log("我是导航");
//引入所有的模块
//配置路径
require.config({
  paths: {
    jquery: "jquery-1.11.3",
    "jquery-cookie": "jquery.cookie",
    main_list: "main_list",
    // navLeft_list :"navLeft_list",
    ban_list:"ban_list"
  },
  shim: {
    //设置依赖关系
    "jquery-cookie": ["jquery"],
    //某一个模块，不遵从AMD

  },
});

require(["main_list","ban_list"], function(main_list,ban_list){
    main_list.download();
    main_list.ban();
    // navLeft_list.show();
    ban_list.banner()
})
