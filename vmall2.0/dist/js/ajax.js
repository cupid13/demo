export{
    post,
    get,
    ajax,
    antiShake
}


//函数防抖
function antiShake(func, delay){
    var timer = null;
    return function(...argus){
        clearTimeout(timer);
        if(timer == null){
            func.apply(this, argus);
            timer = "调用一次";
        }else{
            timer = setTimeout(() => {
                func.apply(this, argus);
            }, delay);
        }
    }
}

function post(){
    var argus =Object.assign({"method" :"post"},...arguments)
    var g = new Ajax(argus);
    g.init();
    g.type()
}

function get(){
    var argus =Object.assign({"method" :"get"},...arguments)
    var g = new Ajax(argus);
    g.init();
    g.type()
}

// function ajax(){
//     var a =new Ajax(...arguments);
//     a.init();
//     a.type();
// }

function ajax(){
    var a = new Ajax(...arguments);
    a.init();
    a.type()
}
class Ajax{
    constructor({method,url,data,success,error}){
        this.method = method;
        this.url = url;
        this.data = data;
        this.success = success;
        this.error = error;
    }
    init(){
        var xhr = null;
        try{
            xhr = new  XMLHttpRequest;
        }catch{
            xhr = new ActiveXObject("XMLHTTP");
        }
        return xhr;
    }

    type(){
        var xhr= this.init()
        var querystring=""
        if(this.data){
            querystring = this.queryString(this.data);
        }
        if(this.method=="get"){
            xhr.open(this.method,this.url+"?"+querystring,true);
            xhr.send();
        }else{
            xhr.open(this.method,this.url,true);
            xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");
            xhr.send(querystring);
        }

        xhr.onreadystatechange = ()=>{
            if(xhr.readyState ==4){
                if(xhr.status==200){
                    if(this.success){
                        this.success(xhr.responseText)
                    }
                }else{
                    if(this.error){
                        this.error("error"+xhr.status)
                    }
                }
            }
           
        }
    }

    queryString(dataObj){
        var str='';
        for(var attr in dataObj){
            str+=`${attr}=${dataObj[attr]}&`
        }
        return str.substring(0,str.length-1)
    }
}