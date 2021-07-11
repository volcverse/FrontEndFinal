import React, { Component } from "react";
import { Table, Button, Input, message, Spin, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

let _this;

const columns = [
  {
    title: "课程名称",
    dataIndex: "className",
    key: "className",
    width: 200,
  },
  {
    title: "学号",
    dataIndex: "Student_id",
    key: "Student_id",
  },
  {
    title: "原分数",
    dataIndex: "Quiz_score",
    key: "Quiz_score",
  },
  {
    title: "老师ID",
    dataIndex: "Teacher_id",
    key: "Teacher_id",
  },
  {
    title: "操作",
    key: "action",
    dataIndex: "action",
    width: 200,
    fixed: "right",
    render: (text, record) => (
      <Popconfirm
        title="申请是否通过"
        onConfirm={() => doPass(record.Quiz_id)}
        onCancel={()=>cancel(record.Quiz_id)}
        okText="通过"
        cancelText="拒绝"
      >
        <Button type="primary" style={{ marginRight: "5px" }} size="small">
          审核
        </Button>
      </Popconfirm>
    ),
  },
];

const doPass = (row) => {
  _this.doApplication(row,1)
};

function cancel(row) {
  _this.doApplication(row,2);
}

export default class data extends Component {
  state = {
    userInfo: {},
    data: [],
    loading: true,
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  componentDidMount() {
    _this = this;

    let userInfo = sessionStorage.getItem("userInfo");
    if (!userInfo) {
      this.props.history.push({ pathname: "/LoginInterface" });
    }
    this.state.userInfo = JSON.parse(userInfo);
    this.getData();
  }

  doApplication = (id, type) => {
    axios({
      method: "post",
      url: `http://127.0.0.1:8000/UpdateApplicationState`,
      data: {
        id: id,
        type: type,
      },
    })
      .then((response) => {
        if (response.data.status === 200) {
          message.success(`审核处理成功.`);
          this.getData();
        }
      })
      .catch(function (error) {
        message.error(`审核处理失败.`);
      });
  };

  getData = () => {
    this.setState({
      loading: true,
    });

    const res = axios
      .get("http://localhost:8000/api/ManageGetQuizList", {
        params: {},
      })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({
            data: response.data.quiz,
            loading: false,
          });
        }
      });
  };

  render() {
    let props = {
      action: "/api/StudentUploadAssignment",
      onChange({ file }) {
        const { status } = file;

        if (status !== "uploading") {
        }
        if (status === "done") {
          message.success(`${file.name} 上传成功.`);
          _this.getData();
        } else if (status === "error") {
          message.error(`${file.name} 上传失败.`);
        }
      },
    };

    return (
      <div>
        <span style={{ color: "black", fontSize: "2em" }}>
          {this.state.className} 分数修改申请
        </span>
        <br></br>
        <br></br>

        <br></br>
        <br></br>
        <Spin tips="加载中..." spinning={this.state.loading}>
          <Table
            rowKey="Assignment_id"
            columns={columns}
            dataSource={this.state.data}
          />
        </Spin>
      </div>
    );
  }
}
