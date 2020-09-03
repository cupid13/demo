import React, { Component } from 'react'
import axios from 'axios'

export default class TodoList extends Component {
    state={
        list:[],
        name:"",
        age:"",
        selList:[],
        flag:true,
    }
    input=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    componentDidMount(){
        this.find()
    }
    find=()=>{
        axios.get("http://localhost:4000/list").then(res=>{
            this.setState({
                list:res.data
            })
        })
    }
    add=()=>{
        axios.post("http://localhost:4000/list",{
            name:this.state.name,
            age:this.state.age
        }).then(res=>{
            this.find()
        })
    }
    delete=id=>{
        axios.delete("http://localhost:4000/list/"+id).then(res=>{
            this.find()
        })
    }
    update = item=>{
        var con =  prompt("请输入修改内容",item.name+","+item.age)
        if(con){
        var up = con.split(",") 
        axios.patch("http://localhost:4000/list/"+item.id,{
            name:up[0],
             age:up[1]
        }).then(res=>{
         this.find()
        })
    }
    }
    select =()=>{
     var sel = prompt("请输入名字进行查询")
       axios.get("http://localhost:4000/list?name="+sel).then(res=>{
           this.setState({
            selList:res.data,
            flag:false
           })
       }) 
    }
    back=()=>{
        this.setState({
            flag:true
        })
    }
    render() {
        let {list,name,age,selList,flag} =this.state
        return (
            <div>
                表格
                <ul style={{display:flag?"block":"none"}}>
                    <input id="name" value={name} onChange={this.input} placeholder="请输入用户名"></input>
                    <input id="age"  value={age} onChange={this.input} placeholder="请输入年龄"></input>
                    <button onClick={this.add}>添加</button>
                    <button onClick={this.select}>查询</button>
                    {  
                        list.map((item,index)=>{
                        return <li key={index}>
                            {item.name}:{item.age}
                            <button onClick={this.delete.bind(this,item.id)}>删除</button>
                            <button onClick={this.update.bind(this,item)}>修改</button>
                            </li> 
                        })
                    }
                    
                </ul>
                <ul  style={{display:!flag?"block":"none"}}>
                <button onClick={this.back} style={{display:!flag?"block":"none"}}>返回</button>
                {  
                        selList.map((item,index)=>{
                        return <li key={index}>
                            {item.name}:{item.age}
                            </li> 
                        })
                    }
                </ul>
            </div>
        )
    }
}
