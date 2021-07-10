import {Layout, Breadcrumb, Input, Space, Button, Table, Form, message} from 'antd';
import React, {Component, useState} from 'react';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";
import axios from "axios";
let originData = []
const { Content } = Layout;
const { Search } = Input;
const columns=[
    {
        title: ' ',
        dataIndex: 'span',
        key: 'span',
    },
    {
        title: '星期一',
        dataIndex: 'Mon',
        key: 'Mon',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            // return <div>{result}</div>;
        }
    },
    {
        title: '星期二',
        dataIndex: 'Tue',
        key: 'Tue',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            // return <div>{result}</div>;
        }
    },
    {
        title: '星期三',
        dataIndex: 'Wed',
        key: 'Wed',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            return <div>{result}</div>;
        }
    },
    {
        title: '星期四',
        dataIndex: 'Thu',
        key: 'Thu',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            return <div>{result}</div>;
        }
    },
    {
        title: '星期五',
        dataIndex: 'Fri',
        key: 'Fri',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            return <div>{result}</div>;
        }
    },
    {
        title: '星期六',
        dataIndex: 'Sat',
        key: 'Sat',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            return <div>{result}</div>;
        }
    },
    {
        title: '星期日',
        dataIndex: 'Sun',
        key: 'Sun',
        render: (text, record) =>{
            let snArray=[];
            snArray=text.split(";");

            let br=<br></br>;
            let result=null;
            if(snArray.length<2){
                return text;
            }

            for(let i=0;i<snArray.length;i++){
                // eslint-disable-next-line eqeqeq
                if(i==0){
                    result=snArray[i];
                }else{
                    result=<span>{result}{br}{snArray[i]}</span>;
                }
            }
            return <div>{result}</div>;
        }
    },
]

class SiderDemo4 extends React.Component{
    render() {
        let a=axios({
            method:'post',
            mode: 'no-cors',
            url:`http://127.0.0.1:8000/TeacherCourseTable`,
            data: {
                'id': this.props.location.state.username,
            }
        });
        a.then(res=>{
            console.log(res.data)
            for( let i = 0; i < 5; i++ )
            {
                switch (i){
                    case 0:
                        originData.push({
                            span:"一",
                            key: i.toString(),
                            Mon: res.data.data[i].Mon,
                            Tue: res.data.data[i].Tue,
                            Wed: res.data.data[i].Wed,
                            Thu: res.data.data[i].Thu,
                            Fri: res.data.data[i].Fri,
                            Sat: res.data.data[i].Sat,
                            Sun: res.data.data[i].Sun,
                        });
                        break;
                    case 1:
                        originData.push({
                            span:"二",
                            key: i.toString(),
                            Mon: res.data.data[i].Mon,
                            Tue: res.data.data[i].Tue,
                            Wed: res.data.data[i].Wed,
                            Thu: res.data.data[i].Thu,
                            Fri: res.data.data[i].Fri,
                            Sat: res.data.data[i].Sat,
                            Sun: res.data.data[i].Sun,
                        });
                        break;
                    case 2:
                        originData.push({
                            span:"三",
                            key: i.toString(),
                            Mon: res.data.data[i].Mon,
                            Tue: res.data.data[i].Tue,
                            Wed: res.data.data[i].Wed,
                            Thu: res.data.data[i].Thu,
                            Fri: res.data.data[i].Fri,
                            Sat: res.data.data[i].Sat,
                            Sun: res.data.data[i].Sun,
                        });
                        break;
                    case 3:
                        originData.push({
                            span:"四",
                            key: i.toString(),
                            Mon: res.data.data[i].Mon,
                            Tue: res.data.data[i].Tue,
                            Wed: res.data.data[i].Wed,
                            Thu: res.data.data[i].Thu,
                            Fri: res.data.data[i].Fri,
                            Sat: res.data.data[i].Sat,
                            Sun: res.data.data[i].Sun,
                        });
                        break;
                    case 4:
                        originData.push({
                            span:"五",
                            key: i.toString(),
                            Mon: res.data.data[i].Mon,
                            Tue: res.data.data[i].Tue,
                            Wed: res.data.data[i].Wed,
                            Thu: res.data.data[i].Thu,
                            Fri: res.data.data[i].Fri,
                            Sat: res.data.data[i].Sat,
                            Sun: res.data.data[i].Sun,
                        });
                        break;
                }
            }
        });
            function onPrint() {
                window.print();
            }
            // const [data, setData] = useState(originData);



            return (
                <Layout style={{ whiteSpace: 'pre-wrap' }}>
                    <Layout style={{ whiteSpace: 'pre-wrap' }}>
                        <Content style={{ margin: '-40px -10px', whiteSpace: 'pre-wrap' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                                {/*<Breadcrumb.Item>Administrator</Breadcrumb.Item>*/}
                                <Button style={{ margin: '0 200px' }} type="primary" onClick={onPrint}>打印课表</Button>
                            </Breadcrumb>
                            <Table style={{ whiteSpace: 'pre-wrap' }}
                                   bordered
                                   dataSource={originData}
                                   columns={columns}
                            />
                        </Content>
                    </Layout>
                </Layout>
            );

        }

}


export default SiderDemo4;
