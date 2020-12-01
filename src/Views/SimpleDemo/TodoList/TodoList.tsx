import React, { Component } from 'react'
import { Input, Button, Checkbox, message, Popconfirm, } from "antd";
import "./TodoList.css"
import { EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import Item from 'antd/lib/list/Item';

interface Props {
    
}
interface State {
    
}
class TodoList extends Component<any, Props, State> {
    public TaskInput:React.RefObject<Input> = React.createRef();
    public state = {
        unComplete:[],
        Complete:[],
        visible:false,
    }
    public onChange = (index:number,event:any) => {
        let data:any = this.state.unComplete;
        data[index].hasFinished = !data[index].hasFinished;
        this.setState({unComplete:data})
    }
    // 添加任务
    public CreateTask = () => {
        if(this.TaskInput.current && !['',undefined].includes(this.TaskInput.current.state.value)){
            let DataArray:any = this.state.unComplete;
            let taskObj = {
                name:this.TaskInput.current.state.value,
                hasFinished:false,
                isEdit:false,
                isDel:false,
            }
            DataArray.push(taskObj);
            this.setState({unComplete:[...DataArray]})
        }else{
            message.warning('请输入任务名称');
        }
    }
    //点击修改按钮
    public OpenEdit = (data:any) => {
        let group:any = this.state.unComplete;
        group.map((val:any,index:number) => {
            if(data.index == index){
                val.isEdit = true;
            }
        })
        this.setState({unComplete:group})
    }
    //修改任务
    public editWork = (index:number,event:any,) => {
        let group:any = this.state.unComplete;
        group.map((item:any,key:number) => {
            if(index == key){
                item.isEdit = false;
                item.name = event.target.defaultValue;
            }
        })
        this.setState({unComplete:group})
    }
    //确定删除
    public handleOk = (index:number) => {
        let group:any = this.state.unComplete;
        group.splice(index,1);
        this.setState({unComplete:group});
    };
    //取消删除
    public handleCancel = (index:number) => {
        let group:any = this.state.unComplete;
        group[index].isDel = false;
        this.setState({unComplete:group})
    }
    //打开删除弹框
    public showPopconfirm = (index:number) => {
        let group:any = this.state.unComplete;
        group[index].isDel = true;
        this.setState({unComplete:group})
    };
    render() {
        const TaskComponent = (data:any) => {
            return (
                <li>
                    <div>
                        <Checkbox onChange={(event) => this.onChange(data.index,event)} defaultChecked={data.item.hasFinished}></Checkbox>
                        <p className='edit'>
                            <span>任务{data.index + 1}：</span> 
                            <Input defaultValue={data.item.name} onBlur={(event) => this.editWork(data.index,event)} style={{display:(data.item.isEdit?'block':'none')}}></Input>
                            <span style={{display:(data.item.isEdit ? 'none' : 'block')}}>{data.item["name"]}</span>
                        </p>
                    </div>
                    <div>
                        <EditOutlined style={{color:'#FF9500',fontSize:'16px'}} onClick={() => this.OpenEdit(data)} />
                        <Popconfirm
                            title="请确实是否删除该任务？"
                            visible={data.item.isDel}
                            onConfirm={() => this.handleOk(data.index)}
                            onCancel={() => this.handleCancel(data.index)}
                            cancelText="取消"
                            okText="确定"
                        >
                            <DeleteOutlined style={{color:'red',fontSize:'16px'}} onClick={() => this.showPopconfirm(data.index)} />
                        </Popconfirm>
                    </div>
                </li>
            )
        }
        const unComplete = this.state.unComplete;
        const Complete = this.state.Complete;
        return (
            <div className="todolist"> 
                <header>
                    <Input placeholder="请输入任务内容" ref={this.TaskInput} />
                    <Button type="primary" onClick={this.CreateTask}>添加任务</Button>
                </header>
                <main>
                    {/* 未完成的任务 */}
                    <ul className="incomplete">
                        <p>未完成任务：<span>{(unComplete.filter(item => !item['hasFinished'])).length}</span> 个</p>
                        {
                            unComplete.map((item,key) => {
                                return !item["hasFinished"]?<TaskComponent item={item} key={key} index={key}></TaskComponent>:''
                            })
                        }
                    </ul>
                    {/* 已完成的任务 */}
                    <ul className="finished">
                        <p>已完成任务：<span>{(unComplete.filter(item => item['hasFinished'])).length}</span> 个</p>
                        {
                            unComplete.map((item,key) => {
                                return item["hasFinished"]?<TaskComponent item={item} key={key} index={key}></TaskComponent>:''
                            })
                        }
                    </ul>
                </main>
            </div>
        )
    }
}

export default TodoList
