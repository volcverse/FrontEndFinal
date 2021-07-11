import React, { Component } from "react";
import { Badge, Table, Button, Form, message, Input, Spin } from "antd";
import { Link } from "react-router-dom";
import { FileOutlined } from "@ant-design/icons";
import axios from "axios";
const { Search } = Input;
let _this;
const columns = [
  {
    title: "学号",
    dataIndex: "studentID",
    key: "studentID",
  },
  {
    title: "姓名",
    dataIndex: "studentName",
    key: "studentName",
  },
  {
    title: "标题",
    dataIndex: "Quiz_title",
    key: "Quiz_title",
    render: (text, record) => (
      <span>
         {
          (record.Application ==
            1 && record.score == 0 ? (
              <span>
                <Input placeholder="请输入标题" defaultValue={record.Quiz_title}  className={"title" + record.studentID} />
              </span>
            ) : (
              <span>
                {record.Quiz_title}
              </span>
            ))
        }
      
      </span>
    ),
  },
  {
    title: "内容",
    dataIndex: "Quiz_content",
    key: "Quiz_content",
    render: (text, record) => (
      <span>
         {
          (record.Application ==
            1 && record.score == 0 ? (
              <span>
                <Input placeholder="请输入内容" defaultValue={record.Quiz_content}  className={"content" + record.studentID} />
              </span>
            ) : (
              <span>
                {record.Quiz_content}
              </span>
            ))
        }
      
      </span>
    ),
  },
  {
    title: "是否参加",
    key: "bool",
    dataIndex: "bool",
    render: (text, record) => (
      <span>
        {record.join ? (
          <Badge status="success" text="参加" />
        ) : (
          <Badge status="warning" text="未参加" />
        )}
      </span>
    ),
  },
  {
    title: "输入成绩",
    key: "score",
    dataIndex: "score",
    render: (text, record) => (
      <span>
        {
          (record.Application ==
            1 && record.score == 0 ? (
              <span>
                <Input
                  defaultValue={record.score}
                  style={{ width: "200px", marginRight: "4px" }}
                  className={"score" + record.studentID}
                />
                <Button type="primary" onClick={() => doUpdateScore(record)}>
                  确定
                </Button>
              </span>
            ) : (
              <span>
                <Input
                  style={{ width: "200px", marginRight: "4px" }}
                  defaultValue={record.score}
                  disabled
                />

                {record.Application == 1 ? (
                  <Button
                    type="danger"
                    onClick={() => doApplicationScore(record)}
                  >
                    申请修改成绩
                  </Button>
                ) : (
                  <Button type="danger">已申请待审核 {record.Application}</Button>
                )}
              </span>
            ))
        }
      </span>
    ),
  },
];
const doUpdateScore = (row) => {
  let value = document.querySelector(".score" + row.studentID).value;
  let title = document.querySelector(".title" + row.studentID).value;
  let content = document.querySelector(".content" + row.studentID).value;

  axios({
    method: "post",
    url: `http://127.0.0.1:8000/UpdateScore`,
    data: {
      classID: _this.state.classID,
      teacherID: _this.state.teacherID,
      studentID: row.studentID,
      score: value,
      title: title,
      content: content,
    },
  })
    .then((response) => {
      if (response.data.status === 200) {
        message.success(`成绩修改成功`);
        _this.getData();
      }
    })
    .catch(function (error) {
      message.error(`成绩修改失败`);
    });
};

const doUpdate = (row) => {
  let value = document.querySelector(".title" + row.studentID).value;
  console.log(value);
};

const doApplicationScore = (row) => {
  axios({
    method: "post",
    url: `http://127.0.0.1:8000/ApplicationScore`,
    data: {
      qID: row.Quiz_id,
      teacherID: _this.state.teacherID,
    },
  })
    .then((response) => {
      if (response.data.status === 200) {
        message.success(`申请修改成绩成功`);
        _this.getData();
      } else {
        message.error(response.data.msg);
      }
    })
    .catch(function (error) {
      message.error(`申请修改成绩失败`);
    });
};

export default class Quiz extends Component {
  //class id
  state = {
    classID: 0,
    teacherID: 0,
    quiz: [],
    loading: true,
    className: "",
  };
  async componentDidMount() {
    _this = this;
    this.state.classID = this.props.location.state.classID;
    this.state.className = this.props.location.state.name;

    let userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) {
      this.props.history.push({ pathname: "/LoginInterface" });
    }
    this.state.teacherID = JSON.parse(userInfo).id;

    this.getData();
  }

  getData = () => {
    this.setState({
      loading: true,
    });
    axios
      .get("http://localhost:8000/api/TQuiz", {
        params: {
          classID: this.state.classID,
          teacherID: this.state.teacherID,
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

  render() {
    return (
      <div>
        <span style={{ color: "black", fontSize: "2em" }}>
          {this.state.className} 课堂测验
        </span>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <Spin tips="加载中..." spinning={this.state.loading}>
          <Table
            rowKey="studentID"
            columns={columns}
            dataSource={this.state.quiz}
          />
        </Spin>
      </div>
    );
  }
}
