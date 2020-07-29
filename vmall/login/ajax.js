export{
    $ajax,
    $get,
    $post
}

function $post(){
    var argus = Object.assign({"method": "post"}, ...arguments);
    var a1 = new Ajax(argus);
    a1.init();
    a1.type();
}

function $get(){
    
    var argus = Object.assign({"method": "get"}, ...arguments);
    var a1 = new Ajax(argus);
    a1.init();
    a1.type();
}
function $ajax(){
    var a = new Ajax(...arguments);
    a.init();
    a.type()
}
class Ajax{
    constructor({method='get',url,data,success,error}){
        this.method = method;
        this.url = url;
        this.data = data;
        this.success = success;
        this.error = error;
    }
    init(){
        var xhr = null;
        try{
            xhr = new XMLHttpRequest()
        }catch{
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xhr;
    }

    type(){
        var  xhr= this.init();
        var queryString=""
        if(this.data){
         queryString = this.queryString(this.data);
        }
        if(this.method=="get"){
            xhr.open(this.method,this.url+"?"+queryString,true);
            xhr.send();
        }else{
            xhr.open(this.method,this.url,true);
            xhr.setRequestHeader('content-type', "application/x-www-form-urlencoded");
            xhr.send(queryString);
        }

        xhr.onreadystatechange= ()=>{
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(this.success){
                       this.success(xhr.responseText)
                    }
                }else{
                    if(this.error){
                        this.error("error:"+xhr.status)
                    }
                }
            }
        }
    }

    queryString(dataObj){
        var str='';
        for(var attr in dataObj){
            str += `${attr}=${dataObj[attr]}&`;
        }
        return str.substring(0,str.length-1)
    }
    // queryString(dataObj){
    //     var str = '';
    //     for(var attr in dataObj){
    //         str += `${attr}=${dataObj[attr]}&`;
    //     }
    //     return str.substring(0, str.length - 1);
    // }
}