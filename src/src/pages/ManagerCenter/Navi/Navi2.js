import {Layout, Breadcrumb, Form, Input, Space, Table, Button, Select, message} from 'antd';
import React, {Component, useState} from 'react';
import 'antd/dist/antd.css';
import './Navi.css';
import {Link} from "react-router-dom";
import {  InputNumber, Popconfirm, Typography } from 'antd';
import axios from "axios";
import Navi from "./Navi";
const { Content } = Layout;
const { Search } = Input;
const {Option} = Select;
let originData = [];
let codetable={
    "-1": "系统繁忙",
    "0": "请求成功",
    "1001": "输入框不得为空！",
    "1002": "教室id已存在",
    "1003": "输入信息不合规！",
    "1004": "未查到匹配信息！",
    "1005": "教室容量不得为负或者为零",
    "1006": "教室位置已经存在",
    "1007": "课程课时安排与课程信息不符",
    "2001": "您尚未排课，请点击自动排课按钮进行排课！",
    "2002": "在此时间段内无课程！",
    "2003": "排课资源不足，排课失败！",
    "2004": "教室课程安排冲突！",
    "2005": "教师时间冲突！",
    "2006": "查无此课！",
    "3001": "您还未排课，请移至排课页面进行排课！",
    "3002": "输入信息不合规！",
    "3003": "无此教师！",
    "3004": "无此教室！",
}
let origin=axios.post(`http://127.0.0.1:8000/CourseManagementDisplay`)
origin.then(res=>{
    let _code=res.data.code;
    console.log(res.data);
    if(_code!=="0")
    {
        message.error(codetable[_code]);
        return;
    }


    let length = res.data.data.length;
    for( let i = 0; i < length; i++ ){
            originData.push({
                key: i.toString(),
                class_id: res.data.data[i].class_id,
                class_name: res.data.data[i].class_name,
                teacher_name: res.data.data[i].teacher_name,
                class_score: res.data.data[i].class_score,
                campus: res.data.data[i].campus,
                classroom_name: res.data.data[i].classroom_name,
                time: res.data.data[i].time,
                teacher_id: res.data.data[i].teacher_id,
                classroom_id: res.data.data[i].classroom_id,
            });
    }
})


//https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists



const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> :<Input/>;
    return(
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin:0}}
                    rules={[
                        {
                            required: true,
                            message: `请输入${title}!`,
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) :(
                children
            )}
        </td>
    );
};
const SiderDemo2 = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [number, setNumber] = useState(1);
    console.log(number);
    const OnSearch2 = (value) => {
        let afterSearch = [];
        let a=axios({
            method:'post',
            url:`http://127.0.0.1:8000/CourseManagementSearch`,
            data:{
                'value': value,
                'num': number,
                // '_token':'{{csrf_token()}}'
            }
        });
        a.then(res=>{
            let _code=res.data.code;
            if(_code!=="0")
            {
                message.error(codetable[_code]);
                return;
            }
            console.log(res.data)
            let length=res.data.data.length;
            for( let i = 0; i < length; i++ )
            {
                afterSearch.push({
                    key: i.toString(),
                    class_id: res.data.data[i].class_id,
                    class_name: res.data.data[i].class_name,
                    teacher_name: res.data.data[i].teacher_name,
                    class_score: res.data.data[i].class_score,
                    campus: res.data.data[i].campus,
                    classroom_name: res.data.data[i].classroom_name,
                    time: res.data.data[i].time,
                    teacher_id: res.data.data[i].teacher_id,
                    classroom_id: res.data.data[i].classroom_id,
                });
            }
            setData(afterSearch);
        });
    };

    const AutoArrange = () => {
        let afterArrange = [];
        let origin=axios.post(`http://127.0.0.1:8000/AutoCourseManagement`)
        origin.then(res=>{
            let _code=res.data.code;
            if(_code!=="0")
            {
                message.error(codetable[_code]);
                return;
            }
            // console.log(res.data);
            let length = res.data.data.length;
            for( let i = 0; i < length; i++ ){
                afterArrange.push({
                    key: i.toString(),
                    class_id: res.data.data[i].class_id,
                    class_name: res.data.data[i].class_name,
                    teacher_name: res.data.data[i].teacher_name,
                    class_score: res.data.data[i].class_score,
                    campus: res.data.data[i].campus,
                    classroom_name: res.data.data[i].classroom_name,
                    time: res.data.data[i].time,
                    teacher_id: res.data.data[i].teacher_id,
                    classroom_id: res.data.data[i].classroom_id,
                    // code: res.data[i].code,
                });
            }
            setData(afterArrange);
        });

    }

    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            课程代码: ``,
            课程名称: ``,
            授课教师: ``,
            课程学分: '',
            上课时间: '',
            校区: '',
            教室名称: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try{
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item)=>key === item.key);
            if(index > -1){
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                setData(newData);
                // setEditingKey('');
                // console.log(originData[index]);
                // console.log(newData[index]);
                // console.log(afterSearch[index]);
                console.log(item);
                console.log(newData[index]);

                let test=axios({
                    method:'post',
                    url:`http://127.0.0.1:8000/CourseManagementModify`,
                    data: {
                        // 'beforeclass_id': originData[index].class_id,
                        // 'beforeteacher_id': originData[index].teacher_id,
                        // 'beforeclassroom_id': originData[index].classroom_id,
                        // 'beforeclassroom_name': originData[index].classroom_name,
                        // 'beforetime': originData[index].time,
                        // 'beforeteacher_name': originData[index].teacher_name,
                        // 'beforecampus': originData[index].campus,
                        'beforeclass_id': item.class_id,
                        'beforeteacher_id': item.teacher_id,
                        'beforeclassroom_id': item.classroom_id,
                        'beforeclassroom_name': item.classroom_name,
                        'beforetime': item.time,
                        'beforeteacher_name': item.teacher_name,
                        'beforecampus': item.campus,
                        'aftercampus': newData[index].campus,
                        'afterclassroom_name': newData[index].classroom_name,
                        'aftertime': newData[index].time,
                        'afterteacher_name': newData[index].teacher_name,
                    }
                })
                test.then(res=>{
                    let _code = res.data.code;

                    // console.log(res.data);
                    if(_code!=="0")
                    {
                        message.error(codetable[_code]);
                        return;
                    }
                    else
                    {
                        setEditingKey('');
                    }
                })
            }
            else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }
    const columns = [
        {
            title:'课程id',
            dataIndex: 'class_id',
            editable: false,
        },
        {
            title:'课程名称',
            dataIndex:'class_name',
            editable: false,
        },
        {
            title:'授课教师',
            dataIndex: 'teacher_name',
            editable: true,
        },
        {
            title:'课程学分',
            dataIndex: 'class_score',
            editable: false,
        },
        {
            title:'上课时间',
            dataIndex: 'time',
            editable: true,
        },
        {
            title:'校区',
            dataIndex: 'campus',
            editable: true,
        },
        {
            title: '教室名称',
            dataIndex: 'classroom_name',
            editable: true,
        },

        {
            title:'操作',
            dataIndex: '操作',
            render:(_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <a
                            onClick={()=>save(record.key)}
                            style={{marginRight:8,}}
                        >
                            保存修改
                        </a>
                        {/*<Popconfirm title="确认要修改吗?" onConfirm={()=>save(record.key)}>*/}
                        {/*    <a>保存修改</a>*/}
                        {/*</Popconfirm>*/}
                        <a onClick={cancel}>取消</a>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey!==''} onClick={()=>edit(record)}>
                        手动排课
                    </Typography.Link>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col)=>{
        if(!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType:col.dataIndex==='age'?'number':'text',
                dataIndex:col.dataIndex,
                title:col.title,
                editing:isEditing(record),
            }),
        };
    });


    return(
        <Content style={{ margin: '-40px -10px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
                {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                {/*<Breadcrumb.Item>Administrator</Breadcrumb.Item>*/}
                <Popconfirm title="确认要修改吗?点击后会刷新已修改过的条目！" onConfirm={AutoArrange}>
                    <Button style={{ margin: '0 200px' }} type="primary" >自动排课</Button>
                </Popconfirm>
                {/*<Button style={{ margin: '0 200px' }} type="primary" onClick={AutoArrange}>自动排课</Button>*/}
                <Space style={{float:'right', paddingRight:'10%'}} direction="vertical">
                    <Select defaultValue="1" style={{width:100}} onChange={(value)=>setNumber(value)}>
                        <Option value="1">课程id</Option>
                        <Option value="2">课程名称</Option>
                        <Option value="3">授课教师</Option>
                        <Option value="4">上课时间</Option>
                        <Option value="5">校区</Option>
                        <Option value="6">教室名称</Option>
                    </Select>
                    <Search placeholder="input information" onSearch={OnSearch2} enterButton />
                </Space>
            </Breadcrumb>
                <Form form={form} component={false}>
                    <Table
                        components={{
                            body:{
                                cell:EditableCell,
                            },
                        }}
                        bordered
                        dataSource={data}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange:cancel,
                        }}
                    />
                </Form>
        </Content>
    )
}



export default SiderDemo2;