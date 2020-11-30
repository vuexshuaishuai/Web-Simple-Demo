import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"; 
import { Layout } from "antd"
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
import Slider from "./Common/Slider/Slider"
import "./App.css"
import TodoList from "./Views/SimpleDemo/TodoList/TodoList"

const { Header, Content } = Layout;

class App extends React.Component<any> {
    public state = {
        collapsed:false,
        name:"123"
    }
    public toggle = () => {
        this.setState({
          collapsed:!this.state.collapsed
        })
    }
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Layout>
                        {/* 左侧菜单 */}
                        <Slider collapsed = {this.state.collapsed}></Slider>
                        {/* 顶部 */}
                        <Layout className="site-layout">
                            <Header className="site-layout-background" style={{ padding: 0 }}>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: this.toggle,
                                })}
                            </Header>
                            {/* 主要内容 */}
                            <Content
                                className="site-layout-background"
                                style={{
                                margin: '24px 0',
                                padding: 24,
                                minHeight: 280,
                                }}>
                                    <Route path="/SimpleDemo/TodoList" component={TodoList}></Route>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;