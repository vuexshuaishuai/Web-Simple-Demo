import React, { Component } from 'react'
import { Layout, Menu } from "antd";
import { CalculatorOutlined, } from "@ant-design/icons";
import { withRouter, } from "react-router-dom"
import "./Slider.css"

const { Sider }  = Layout;
const { SubMenu } = Menu;

interface Props {
    
}
interface State {
    
}

class Slider extends Component<any, Props, State> {
    state = {}
    public onNavigate = (path:string) => {
        this.props.history.push(path)
    }
    render() {
        return (
            <div className="slider">
                <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                    {/* Logo */}
                    <div className="logo">
                    React Demo
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu key="sub1" icon={<CalculatorOutlined />} title="简单 Demo">
                            <Menu.Item key="3" onClick={ () => this.onNavigate('/SimpleDemo/TodoList') }>TODO LIST</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
            </div>
        )
    }
}

export default withRouter(Slider)
