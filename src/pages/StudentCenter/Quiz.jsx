import React, { Component } from "react";
import { Table, Button, Spin, Modal, Form,Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

let _this = this;
const columns = [

  {
    title: "测试成绩",
    dataIndex: "Quiz_score",
    key: "Quiz_score",
  },
  {
    title: "测验标题",
    dataIndex: "Quiz_title",
    key: "content",
  },
  {
    title: "测试内容",
    dataIndex: "Quiz_content",
    key: "Quiz_content",
  },
  {
    title: "学号",
    dataIndex: "Student_id",
    key: "Quiz_content",
  },
  {
    title: "教师号",
    dataIndex: "Teacher_id",
    key: "Teacher_id",
  },
  {
    title: "班级号",
    dataIndex: "Class_id",
    key: "Class_id",
  },
  {
    title: "测试时间",
    dataIndex: "Quiz_time",
    key: "Quiz_time",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    width: 200,
    render: (text, record) => (
      <span>
        <Button type="primary" onClick={() => showGrade(record)} size="small">
          查看分析结果
        </Button>
      </span>
    ),
  },
];

const showGrade = (row) => {
  _this.showModal();
};

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

export default class Quiz extends Component {
  state = {
    username:this.props.location.state.username ,
    classID: 0,
    quiz: [],
    loading: true,
    className: "",
    isModalVisible: false,
    grade:{
      student_name:"",
      total_credit:0,
      average_score:0,
      gpa:0
    }
  };
  componentDidMount() {
    _this = this;
    this.state.classID = this.props.location.state.classID;
    this.state.className = this.props.location.state.name;

    let userInfo = sessionStorage.getItem("userInfo");
    
    this.state.userInfo = JSON.parse(userInfo);

    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/Quiz", {
        params: {
          id: this.state.username,
          classID: this.state.classID,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            quiz: response.data.quiz,
            loading: false,
          });
        }
      });
  };

  showModal = () => {

    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/GetGradeInfo", {
        params: {
          id: this.state.username
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
     
          this.setState({
            grade: response.data.grade,
            loading: false,
            isModalVisible: true,
          });

       
        }
      });

  
  };

  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  render() {
    return (
      <div>
        <span style={{ color: "black", fontSize: "2em" }}>
          {this.state.className} 课堂测验 {this.state.grade.student_name}
        </span>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <Spin tips="加载中..." spinning={this.state.loading}>
          <Table
            rowKey="Quiz_id"
            columns={columns}
            dataSource={this.state.quiz}
          />
        </Spin>

        <Modal
          title="查看分析结果"
          cancelText="返回"
          okText="确定"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            {...layout}
            name="control-hooks"
          >
              <Form.Item name="student_name" label="姓名">
              <Input defaultValue={this.state.grade.student_name} disabled/>
            </Form.Item>
            <Form.Item name="note" label="总分">
              <Input defaultValue={this.state.grade.total_credit} disabled/>
            </Form.Item>
            <Form.Item name="note" label="平均分">
              <Input defaultValue={this.state.grade.average_score} disabled/>
            </Form.Item>
            <Form.Item name="note" label="gpa">
              <Input defaultValue={this.state.grade.gpa} disabled/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
